"use client";

import { CustomButton } from "@/components/custom-button";
import { useAuth } from "@/contexts/auth-provider";

export function LandingLoginButton() {
  const { signInGoogle } = useAuth();

  return (
    <CustomButton onClick={() => signInGoogle()}>เข้าสู่ระบบ</CustomButton>
  );
}
