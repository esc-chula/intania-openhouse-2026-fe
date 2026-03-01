"use client";

import { Stack, Typography, TextField, Button } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormFirstStepValues } from "@/lib/validations/form";

export function FormSecondStepInnerUniversity({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { control, trigger } = useFormContext<FormFirstStepValues>();

  const handleNext = async () => {
    const isValid = await trigger(["chulaId"]); // Validate fields specific to this step
    if (isValid) {
      onNext();
    }
  };
  return (
    <Stack
      margin={2}
      sx={{
        minHeight: "calc(100vh - 32px)",
      }}
    >
      <Stack
        spacing={1.5}
        sx={{ padding: "14px 16px" }}
        bgcolor={"#FFFBF6"}
        borderRadius={1}
      >
        <Typography sx={{ color: "primary.main", fontWeight: "bold" }}>
          ข้อมูลนิสิตปัจจุบัน/นิสิตเก่าวิศวะจุฬาฯ
        </Typography>
        <Controller
          name="chulaId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""} 
              label="รุ่น (เช่น วศ.25XX)"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Stack>
      <Stack spacing={2} sx={{ mt: "auto", alignItems: "center", pt: 2 }}>
        <Button
          variant="contained"
          size="large"
          sx={{ width: "100%", maxWidth: "300px", borderRadius: 8 }}
          onClick={handleNext}
        >
          ถัดไป
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{ width: "100%", maxWidth: "300px", borderRadius: 8 }}
          onClick={onBack}
        >
          ย้อนกลับ
        </Button>
      </Stack>
    </Stack>
  );
}
