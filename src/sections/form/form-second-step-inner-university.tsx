"use client";

import { Stack, Typography, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormFirstStepValues } from "@/sections/form/validations/form";

export function FormSecondStepInnerUniversity() {
  const { control } = useFormContext<FormFirstStepValues>();

  return (
    <Stack
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
          name="intania_generation"
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
    </Stack>
  );
}
