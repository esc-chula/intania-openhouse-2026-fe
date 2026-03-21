"use client";

import { BackButton } from "@/components/back-button";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import CheckIn from "../check-in";

import { useCheckInMutation } from "@/services/check-in/mutation/use-check-in";
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
                  const parsed = JSON.parse(raw);
                  const code = parsed.code;

                  doCheckIn(
                    { code },
                    {
                      onSuccess: (data) => {
                        setCheckInName(data.name);
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
