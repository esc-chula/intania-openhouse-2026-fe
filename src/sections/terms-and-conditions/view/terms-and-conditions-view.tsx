"use client";

import { CustomButton } from "@/components/custom-button";
import { useAuth } from "@/contexts/auth-provider";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TermsAndConditionsView() {
  const router = useRouter();
  const { user, loading, isRegistered } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/");
      return;
    }
    if (isRegistered) {
      router.replace("/");
      return;
    }
  }, [loading, user, isRegistered, router]);

  const handleAccept = () => {
    router.push("/form");
  };

  const handleBack = () => {
    router.back();
  };

  if (loading || !user) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100dvh",
        background: "url('/background/bg-terms-and-conditions.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        gap: 4,
        padding: "40px 25px",
      }}
    >
      <Box
        component="img"
        src="/banner/terms-and-conditions-banner.svg"
        sx={{
          width: "69%",
        }}
      />
      <Stack
        sx={{
          flexGrow: 1,
          minHeight: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          component="img"
          src="/background/board.svg"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            display: "block",
          }}
        />
      </Stack>

      <Stack
        spacing={2}
        sx={{
          marginTop: "auto",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CustomButton onClick={handleAccept}>ยอมรับ</CustomButton>

        <Typography
          variant="subtitle1"
          onClick={handleBack}
          sx={{
            color: "#5B3722",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ย้อนกลับ
        </Typography>
      </Stack>
    </Box>
  );
}
