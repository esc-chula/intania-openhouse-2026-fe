"use client";

import { useAuth } from "@/contexts/auth-provider";

export function LandingRegisterButton() {
  const { signInGoogle } = useAuth();

  return (
    <span onClick={() => signInGoogle()} style={{ cursor: "pointer" }}>
      สร้างบัญชี
    </span>
  );
}
