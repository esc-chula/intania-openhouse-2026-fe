"use client";

import MainLayout from "@/layouts/main/layout";
import { LoginGuard } from "@/components/auth-guard";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <LoginGuard>
      <MainLayout>{children}</MainLayout>
    </LoginGuard>
  );
}
