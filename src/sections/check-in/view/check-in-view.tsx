"use client";

import { BackButton } from "@/components/back-button";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import CheckIn from "../check-in";
import { color } from "@/theme/core/colors";
import { typography } from "@/theme/core";

export default function CheckInView() {
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        background: "url('/background/bg-landing.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          padding: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 2,
        }}
      >
        <BackButton />
        <Box
          sx={{
            position: "relative",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Box
            component="img"
            src="/banner/activity-banner.svg"
            sx={{
              width: "80%",
              display: "block",
              marginX: "auto",
            }}
          />
          <Typography
            variant="h3"
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#5B3722",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            Check In
          </Typography>
        </Box>
        {scannedResult ? (
          <CheckIn />
        ) : (
          <Box
            sx={{
              width: "100%",
              borderRadius: "12px",
              display: "flex",
              overflow: "hidden",
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Scanner
              sound={false}
              onScan={(result) => {
                if (result && result.length > 0) {
                  setScannedResult(result[0].rawValue);
                  console.log(result[0].rawValue);
                }
              }}
              onError={(error) => {
                console.error(error);
              }}
              components={{
                finder: true,
              }}
            />
          </Box>
        )}
        <ButtonBase
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
      </Box>
    </Box>
  );
}
