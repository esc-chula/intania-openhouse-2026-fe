"use client";

import { useAuth } from "@/contexts/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";
import MainLayout from "@/layouts/main/layout";

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading, isRegistered } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/");
      return;
    }

    if (!isRegistered) {
      router.replace("/terms-and-conditions");
      return;
    }
  }, [loading, user, isRegistered, router]);

  if (loading) {
    return (
      <MainLayout background>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100dvh",
          }}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (!user || !isRegistered) {
    return null;
  }

  return <>{children}</>;
}

export function LoginGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <MainLayout background>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100dvh",
          }}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export function FormGuard({ children }: AuthGuardProps) {
  const { user, loading, isRegistered, acceptedTerms } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/");
      return;
    }

    if (isRegistered) {
      router.replace("/home");
      return;
    }

    if (!acceptedTerms) {
      router.replace("/terms-and-conditions");
      return;
    }
  }, [loading, user, isRegistered, acceptedTerms, router]);

  if (loading) {
    return (
      <MainLayout background>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100dvh",
          }}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (!user || isRegistered || !acceptedTerms) {
    return null;
  }

  return <>{children}</>;
}

export function AuthOnlyGuard({ children }: AuthGuardProps) {
  const { user, loading, isRegistered } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/");
      return;
    }

    if (isRegistered) {
      router.replace("/");
      return;
    }
  }, [loading, user, isRegistered, router]);

  if (loading) {
    return (
      <MainLayout background>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100dvh",
          }}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (!user || isRegistered) {
    return null;
  }

  return <>{children}</>;
}
