"use client";

import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { fetchGetMe } from "@/services/user/query/user-query";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  isRegistered: boolean;
  acceptedTerms: boolean;
  setAcceptedTerms: (v: boolean) => void;
  signInGoogle: (returnUrl?: string) => Promise<void>;
  signOutAll: () => Promise<void>;
  refreshRegistration: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const auth = getFirebaseAuth();

  const checkRegistration = useCallback(async (): Promise<boolean> => {
    try {
      await fetchGetMe();
      setIsRegistered(true);
      return true;
    } catch {
      setIsRegistered(false);
      return false;
    }
  }, []);

  const refreshRegistration = useCallback(async () => {
    await checkRegistration();
  }, [checkRegistration]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        await checkRegistration();
      } else {
        setIsRegistered(false);
      }
      setLoading(false);
    });
    return unsub;
  }, [auth, checkRegistration]);

  const redirectToExternalBrowser = () => {
    const ua = navigator.userAgent;
    const url = window.location.href;
    const separator = url.includes("?") ? "&" : "?";

    if (/Line/i.test(ua)) {
      window.location.href = `${url}${separator}openExternalBrowser=1`;
    } else if (/Android/i.test(ua)) {
      const stripped = url.replace(/^https?:\/\//, "");
      window.location.href = `intent://${stripped}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`;
    } else {
      const chromeUrl = `googlechrome://${url.replace(/^https?:\/\//, "")}`;
      window.location.href = chromeUrl;
      setTimeout(() => {
        window.location.href = url;
      }, 500);
    }
  };

  const api = useMemo<AuthCtx>(
    () => ({
      user,
      loading,
      isRegistered,
      signInGoogle: async (returnUrl?: string) => {
        if (
          typeof navigator !== "undefined" &&
          /Line|FBAN|FBAV|FB_IAB|FBIOS|MessengerForiOS|Instagram|Twitter|KAKAOTALK/i.test(
            navigator.userAgent,
          )
        ) {
          redirectToExternalBrowser();
          return;
        }
        try {
          await signInWithPopup(auth, googleProvider);

          const registered = await checkRegistration();

          if (registered) {
            router.push(returnUrl || "/home");
          } else {
            router.push("/terms-and-conditions");
          }
        } catch (error) {
          console.error("Login failed", error);
        }
      },
      signOutAll: async () => {
        await signOut(auth);
        setIsRegistered(false);
        setAcceptedTerms(false);
      },
      acceptedTerms,
      setAcceptedTerms,
      refreshRegistration,
    }),
    [
      auth,
      user,
      loading,
      isRegistered,
      acceptedTerms,
      router,
      checkRegistration,
      refreshRegistration,
    ],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
