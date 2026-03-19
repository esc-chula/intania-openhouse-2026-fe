"use client";

import { BackButton } from "@/components/back-button";
import { Box, ButtonBase, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import CheckIn from "../check-in";
import { color } from "@/theme/core/colors";
import { typography } from "@/theme/core";
import { useCheckInMutation } from "@/services/check-in/mutation/use-check-in";
import { useRouter } from "next/navigation";
import {
  SnackbarAlert,
  type SnackbarSeverity,
} from "@/components/snackbar-alert";

export default function CheckInView() {
  const [scanning, setScanning] = useState(true);
  const [checkInName, setCheckInName] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
  }>({
    open: false,
    message: "",
    severity: "error",
  });
  const router = useRouter();

  const { mutate: doCheckIn, isPending } = useCheckInMutation();

  return (
    <>
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
          {!scanning && checkInName ? (
            <CheckIn name={checkInName} />
          ) : isPending ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <CircularProgress color="primary" />
            </Box>
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
                  if (!result || result.length === 0 || isPending) return;
                  const raw = result[0].rawValue;
                  let displayName = "บูธ";
                  if (raw.startsWith("W-")) {
                    displayName = "เวิร์คช็อป";
                  } else if (raw.startsWith("B-")) {
                    displayName = "บูธ";
                  }

                  doCheckIn(
                    { code: raw },
                    {
                      onSuccess: () => {
                        setCheckInName(displayName);
                        setScanning(false);
                      },
                      onError: () => {
                        setSnackbar({
                          open: true,
                          message: "Check in ไม่สำเร็จ",
                          severity: "error",
                        });
                      },
                    },
                  );
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
            onClick={() => router.push("/")}
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
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </>
  );
}
