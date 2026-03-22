"use client";

import { Box, Stack, Typography, IconButton, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { ALL_ORGANIZATIONS } from "../../constants/organizations";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

type Props = {
  id: number;
};

export default function DepartmentAndClubView({ id }: Props) {
  const router = useRouter();

  const organization = ALL_ORGANIZATIONS.find((org) => org.org_id == id);

  if (!organization) return;

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
        background: "url('/background/bg-landing.webp')",
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
        >
          Back
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        alignSelf="center"
        maxWidth={280}
      >
        <Box component="img" width={80} height={80} src={organization.logo} />

        <Stack gap={0.5}>
          <Typography variant="h4" fontWeight={700} color="primary">
            {organization.name_th}
          </Typography>
          <Typography variant="caption" color="primary">
            {organization.name_en}
          </Typography>
        </Stack>
      </Stack>

      <Paper elevation={3} sx={{ backgroundColor: "#F8F3E8", padding: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: "#5B3722",
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
          }}
        >
          {organization.org_description}
        </Typography>
      </Paper>

      {organization.city && (
        <>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#F8F3E8",
              padding: 2,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "primary.main",
              }}
            />

            <Typography variant="h4" color="primary.main">
              เมือง {organization.city}
            </Typography>

            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "primary.main",
              }}
            />
          </Paper>

          <Paper elevation={3} sx={{ backgroundColor: "#F8F3E8", padding: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#5B3722",
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
              }}
            >
              {organization.short_story}
            </Typography>
          </Paper>
        </>
      )}
    </Box>
  );
}
