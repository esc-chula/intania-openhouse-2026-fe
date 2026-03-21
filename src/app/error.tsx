"use client";

import MainLayout from "@/layouts/main/layout";
import { Box, Typography, Stack } from "@mui/material";
import { CustomButton } from "@/components/custom-button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <MainLayout background>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
          gap: 3,
          padding: 4,
        }}
      >
        <Stack spacing={1} alignItems="center">
          <Typography
            variant="h3"
            sx={{
              fontFamily: "var(--font-noto-thai)",
              fontWeight: 700,
              color: "#5B3722",
            }}
          >
            เกิดข้อผิดพลาด
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "var(--font-noto-thai)",
              color: "#5B3722",
            }}
          >
            กรุณาลองใหม่อีกครั้ง
          </Typography>
        </Stack>
        <CustomButton onClick={reset}>ลองใหม่</CustomButton>
      </Box>
    </MainLayout>
  );
}
