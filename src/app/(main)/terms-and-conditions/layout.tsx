"use client";

import React from "react";
import { AuthOnlyGuard } from "@/components/auth-guard";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthOnlyGuard>{children}</AuthOnlyGuard>;
}
