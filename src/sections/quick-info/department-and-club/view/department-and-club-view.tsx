"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  CLUBS,
  INTERNATIONAL_DEPARTMENTS,
  THAI_DEPARTMENTS,
} from "../constants/organizations";

function DepartmentAndClubView() {
  const router = useRouter();

  const handleOrgClick = (id: number) => {
    router.push(`/quick-info/department-and-club/${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        overflow: "scroll",
        padding: "35px 23px ",
        paddingBottom: "80px",
        gap: 3,
        background: "url('/background/bg-landing.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        component="img"
        src="/banner/information-banner.svg"
        sx={{
          alignSelf: "center",
        }}
      />

      <Stack spacing={1.75}>
        <Stack spacing={1}>
          <Typography variant="h4" color="primary">
            หลักสูตรไทย
          </Typography>

          <Stack direction="row" gap={1} flexWrap="wrap">
            {THAI_DEPARTMENTS.map((dept) => (
              <Box
                key={dept.org_id}
                component="img"
                src={dept.logo}
                alt={dept.name_en}
                onClick={() => handleOrgClick(dept.org_id)}
                sx={{
                  cursor: "pointer",
                }}
              />
            ))}
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h4" color="primary">
            หลักสูตรนานาชาติ
          </Typography>

          <Stack direction="row" gap={1} flexWrap="wrap">
            {INTERNATIONAL_DEPARTMENTS.map((dept) => (
              <Box
                key={dept.org_id}
                component="img"
                src={dept.logo}
                alt={dept.name_en}
                onClick={() => handleOrgClick(dept.org_id)}
                sx={{ cursor: "pointer", width: 80, height: 80 }}
              />
            ))}
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h4" color="primary">
            ชมรม
          </Typography>

          <Stack direction="row" gap={1} flexWrap="wrap">
            {CLUBS.map((dept) => (
              <Box
                key={dept.org_id}
                component="img"
                src={dept.logo}
                alt={dept.name_en}
                onClick={() => handleOrgClick(dept.org_id)}
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default DepartmentAndClubView;
