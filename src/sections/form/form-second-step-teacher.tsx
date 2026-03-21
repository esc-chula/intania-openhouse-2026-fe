"use client";

import {
  Stack,
  Typography,
  TextField,
  Autocomplete,
  Radio,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormFirstStepValues } from "@/sections/form/validations/form";
import { THAILAND_PROVINCES } from "@/sections/form/constants/form-options";

export function FormSecondStepTeacher() {
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
          ข้อมูลครู
        </Typography>
        <Controller
          name="school_name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="โรงเรียน"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="school_province"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              value={field.value ?? null}
              onChange={(_, data) => field.onChange(data)}
              options={THAILAND_PROVINCES}
              renderOption={(props, option, { selected }) => {
                const { key, ...rest } = props;
                return (
                  <li key={key} {...rest}>
                    <Radio checked={selected} sx={{ mr: 1 }} />
                    {option}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="จังหวัด"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="subject_taught"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="วิชาที่สอน"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}
