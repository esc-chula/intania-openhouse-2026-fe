"use client";

import { Box, ButtonBase, Typography, SxProps, Theme } from "@mui/material";
import { useRouter } from "next/navigation";
import { color } from "@/theme/core/colors";

interface BackButtonProps {
  sx?: SxProps<Theme>;
}

export function BackButton({ sx }: BackButtonProps) {
  const router = useRouter();

  return (
    <ButtonBase
      onClick={() => router.back()}
      disableRipple
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 86,
        height: 40,
        paddingY: "8px",
        paddingX: "11px",
        borderRadius: "8px",
        cursor: "pointer",
        gap: "8px",
        ...sx,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={{
          color: color.PRIMARY_MAIN,
          width: 24,
          height: 24,
          minHeight: 24,
        }}
      >
        <path d="M15 19l-7-7 7-7" />
      </Box>
      <Typography
        sx={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "24px",
          color: color.PRIMARY_MAIN,
        }}
      >
        Back
      </Typography>
    </ButtonBase>
  );
}