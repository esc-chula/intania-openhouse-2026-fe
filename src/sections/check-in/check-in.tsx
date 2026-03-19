"use client";

import { typography } from "@/theme/core";
import { color } from "@/theme/core/colors";
import { Alert, Box, Stack, Typography } from "@mui/material";

export default function CheckIn({ name }: { name: string }) {
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
    </Stack>
  );
}
