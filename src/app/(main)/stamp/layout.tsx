"use client";

import React from "react";
import { AuthGuard } from "@/components/auth-guard";

export default function StampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
