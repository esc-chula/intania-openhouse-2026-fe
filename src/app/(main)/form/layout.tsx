"use client";

import React from "react";
import { FormGuard } from "@/components/auth-guard";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormGuard>{children}</FormGuard>;
}
