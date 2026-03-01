"use client";

import {
  Stack,
  Typography,
  TextField,
  Autocomplete,
  Radio,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormFirstStepValues } from "@/lib/validations/form";
import {
  THAILAND_PROVINCES,
  ENGINEERING_PROGRAMS,
} from "@/lib/constants/form-options";

const educationLevels: string[] = [
  "มัธยมศึกษาปีที่ 6 หรือเทียบเท่า (dek69)",
  "มัธยมศึกษาปีที่ 5 หรือเทียบเท่า (dek70)",
  "มัธยมศึกษาปีที่ 4 หรือเทียบเท่า (dek71)",
  "มัธยมศึกษาปีที่ 3 หรือเทียบเท่า (dek72)",
  "มัธยมศึกษาปีที่ 2 หรือเทียบเท่า (dek73)",
  "มัธยมศึกษาปีที่ 1 หรือเทียบเท่า (dek74)",
  "ประถมศึกษา",
  "อื่นๆ (โปรดระบุ)",
];

const studyPrograms: string[] = [
  "สายวิทย์",
  "สายศิลป์",
  "ปวช",
  "อื่นๆ (โปรดระบุ)",
];

export function FormSecondStepStudent() {
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
          ข้อมูลนักเรียน/ผู้ที่สนใจศึกษาต่อ
        </Typography>
        <Controller
          name="educationLevel"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              value={field.value ?? null}
              onChange={(_, data) => field.onChange(data)}
              options={educationLevels}
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
                <TextField {...params} label="ระดับชั้นปีการศึกษา 2568" />
              )}
            />
          )}
        />
        <Controller
          name="school"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="โรงเรียน"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Controller
          name="schoolProvince"
          control={control}
          render={({ field }) => (
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
                <TextField {...params} label="จังหวัด" />
              )}
            />
          )}
        />
        <Controller
          name="studyProgram"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              value={field.value ?? null}
              onChange={(_, data) => field.onChange(data)}
              options={studyPrograms}
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
                <TextField {...params} label="แผนการเรียน" />
              )}
            />
          )}
        />
        <Controller
          name="engineeringProgram"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              value={field.value ?? null}
              onChange={(_, data) => field.onChange(data)}
              options={ENGINEERING_PROGRAMS}
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
                <TextField {...params} label="ภาควิชาที่สนใจ" />
              )}
            />
          )}
        />

        <Controller
          name="tcasRank"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="อันดับที่จะใส่ใน TCAS (1-10)"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="emergencyPhone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="เบอร์ติดต่อฉุกเฉิน (เช่น 0XXXXXXXXX)"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Stack>
    </Stack>
  );
}
