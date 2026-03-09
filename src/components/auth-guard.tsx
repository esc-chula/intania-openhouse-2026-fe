"use client";

import { useAuth } from "@/contexts/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";

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
    );
  }

  if (!user || !isRegistered) {
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
    );
  }

  if (!user || isRegistered) {
    return null;
  }

  return <>{children}</>;
}
