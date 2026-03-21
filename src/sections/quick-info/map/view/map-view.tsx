"use client";

import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const PRIMARY = "#5B3722";
const CARD_BG = "#F8F3E8";

export default function MapView() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        overflow: "scroll",
        padding: "35px 16px",
        paddingBottom: "80px",
        gap: 3,
        background: "url('/background/bg-landing.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => router.back()} sx={{ p: 0 }}>
          <KeyboardArrowLeftIcon color="primary" />
        </IconButton>
        <Typography
          variant="h5"
          onClick={() => router.back()}
          color="primary"
          fontWeight={500}
          sx={{ cursor: "pointer" }}
        >
          Back
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ backgroundColor: CARD_BG, padding: 1 }}>
        <Stack alignItems="center">
          <Typography variant="h3" color="primary" fontWeight={700}>
            แผนผังคณะ
          </Typography>
          <Typography variant="body2" color="primary">
            คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </Typography>
        </Stack>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: CARD_BG,
          padding: "48px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" color="primary" fontWeight={700}>
          Coming Soon!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          แผนผังจะมาเร็วๆนี้!
        </Typography>
      </Paper>

      <Box
        component="img"
        src="/banner/sponsor-banner-2.svg"
        sx={{ width: "100%", display: "block" }}
      />
    </Box>
  );
}
