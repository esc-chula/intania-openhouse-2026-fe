"use client";

import React from "react";
import { AuthGuard } from "@/components/auth-guard";

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
