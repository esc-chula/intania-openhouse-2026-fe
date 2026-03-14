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
  signInGoogle: (returnUrl?: string) => Promise<void>;
  signOutAll: () => Promise<void>;
  refreshRegistration: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const api: AuthCtx = {
    user: {
      uid: "mock-user-123",
      displayName: "Mock User",
      email: "mock@example.com",
    } as User,
    loading: false,
    isRegistered: false,
    signInGoogle: async () => { console.log("A") },
    signOutAll: async () => { console.log("B") },
    refreshRegistration: async () => { console.log("C") }
  }

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
