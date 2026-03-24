"use client";

import { typography } from "@/theme/core";
import { color } from "@/theme/core/colors";
import { Alert, Box, ButtonBase, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CheckIn({ name }: { name: string }) {
  const router = useRouter();

  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        mt: 6,
        mb: 8,
      }}
    >
      <Box
        component="img"
        src="/icon/check-in.svg"
        sx={{
          width: "160px",
        }}
      />
      <Typography
        sx={{
          fontSize: 36,
          fontWeight: 700,
          lineHeight: "52px",
          color: color.PRIMARY_MAIN,
        }}
      >
        เช็กอินสำเร็จ
      </Typography>
      <Box
        sx={{
          padding: 1.5,
          backgroundColor: color.PRIMARY_MAIN,
          borderRadius: 1,
        }}
      >
        <Alert
          sx={{
            width: 300,
            font: typography.h6,
            color: color.PRIMARY_MAIN,
            alignItems: "center",
          }}
        >
          Booth {name}
        </Alert>
      </Box>
      <ButtonBase
        onClick={() => router.push("/home")}
        sx={{
          paddingX: "22px",
          paddingY: 1,
          backgroundColor: color.PRIMARY_MAIN,
          borderRadius: 1,
          alignSelf: "center",
          boxShadow:
            "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
          color: color.TEXT_WHITE,
          fontSize: 16,
          fontWeight: typography.fontWeightBold,
          lineHeight: "24px",
        }}
      >
        กลับสู่เมนูหลัก
      </ButtonBase>
    </Stack>
  );
}
