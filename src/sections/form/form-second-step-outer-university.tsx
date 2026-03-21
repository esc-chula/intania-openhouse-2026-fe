"use client";

import {
  Stack,
  Typography,
  TextField,
  Radio,
  Autocomplete,
} from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormFirstStepValues } from "@/sections/form/validations/form";

const studyYearOptions: string[] = [
  "ปี 1",
  "ปี 2",
  "ปี 3",
  "ปี 4",
  "อื่นๆ (โปรดระบุ)",
];

export function FormSecondStepOuterUniversity() {
  const { control } = useFormContext<FormFirstStepValues>();
  const studyYear = useWatch({ control, name: "year_level" });

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
          ข้อมูลเพิ่มเติม (สำหรับนิสิต/นักศึกษา)
        </Typography>

        <Controller
          name="year_level"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              value={field.value ?? null}
              onChange={(_, value) => field.onChange(value)}
              options={studyYearOptions}
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
                  label="ชั้นปี"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}
        />

        {studyYear === "อื่นๆ (โปรดระบุ)" && (
          <Controller
            name="other_year"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="ชั้นปีอื่นๆ (โปรดระบุ)"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}

        <Controller
          name="faculty"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="คณะ"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="university"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="มหาวิทยาลัย"
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
