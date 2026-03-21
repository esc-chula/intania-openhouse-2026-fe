"use client";

import React from "react";
import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
  background?: boolean;
};

export default function MainLayout({ children, background }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        bgcolor: "common.black",
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: 425,
          minHeight: "100dvh",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          ...(background && {
            background: "url('/background/bg-landing.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
