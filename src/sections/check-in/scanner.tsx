"use client";

import { Box, Button } from "@mui/material";
import { Scanner as YudielScanner, IScannerProps } from "@yudiel/react-qr-scanner";
import { useState, useCallback } from "react";

type Props = {
  onScan: (decodedText: string) => void;
};

export default function Scanner({ onScan }: Props) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const handleScan: IScannerProps["onScan"] = (result) => {
    if (result && result.length > 0) {
      onScan(result[0].rawValue);
    }
  };

  const handleError = useCallback((err: unknown) => {
    console.error(err);
    if (err instanceof Error) {
      if (err.name === "NotAllowedError") {
        setErrorMsg("กรุณาอนุญาตการเข้าถึงกล้อง (Please allow camera access)");
      } else if (err.name === "NotFoundError") {
        setErrorMsg("ไม่พบกล้องบนอุปกรณ์นี้ (No camera found)");
      } else if (err.name === "NotReadableError") {
        setErrorMsg("กล้องถูกใช้งานโดยแอปอื่น หรือไม่สามารถเรียกใช้งานได้ (Camera is in use or unavailable)");
      } else {
        setErrorMsg(`เกิดข้อผิดพลาด: ${err.message}`);
      }
    } else {
      setErrorMsg("เกิดข้อผิดพลาดในการเปิดกล้อง");
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        flexGrow: 1,
        backgroundColor: "black",
      }}
    >
      {errorMsg ? (
        <Box sx={{ color: "white", p: 2, textAlign: "center", display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
          <Box>{errorMsg}</Box>
          <Button 
            variant="contained" 
            onClick={() => {
              setErrorMsg(null);
              setRetryKey(k => k + 1);
            }}
          >
            ลองใหม่ (Retry)
          </Button>
        </Box>
      ) : (
        <YudielScanner
          key={retryKey}
          onScan={handleScan}
          onError={handleError}
          formats={["qr_code"]}
          components={{
            finder: true,
          }}
          constraints={{
            facingMode: "environment",
            width: undefined,
            height: undefined,
          }}
          sound={false}
        />
      )}
    </Box>
  );
}
