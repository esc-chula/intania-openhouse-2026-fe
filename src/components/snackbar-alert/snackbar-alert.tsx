"use client";

import { Alert, Snackbar, type SnackbarProps } from "@mui/material";

export type SnackbarSeverity = "success" | "error";

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  onClose: () => void;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarProps["anchorOrigin"];
}

export function SnackbarAlert({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 4000,
  anchorOrigin = { vertical: "top", horizontal: "right" },
}: SnackbarAlertProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%", fontWeight: 700 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
