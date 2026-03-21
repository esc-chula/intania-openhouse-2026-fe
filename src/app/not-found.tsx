"use client";

import MainLayout from "@/layouts/main/layout";
import { Box, Typography, Stack } from "@mui/material";
import { CustomButton } from "@/components/custom-button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

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
            variant="h1"
            sx={{
              fontFamily: "var(--font-noto-thai)",
              fontWeight: 700,
              color: "#5B3722",
            }}
          >
            404
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--font-noto-thai)",
              fontWeight: 500,
              color: "#5B3722",
            }}
          >
            ไม่พบหน้าที่ต้องการ
          </Typography>
        </Stack>
        <CustomButton onClick={() => router.replace("/home")}>
          กลับหน้าหลัก
        </CustomButton>
      </Box>
    </MainLayout>
  );
}
