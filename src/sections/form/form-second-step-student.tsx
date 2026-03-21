"use client";

import {
  Stack,
  Typography,
  TextField,
  Autocomplete,
  Radio,
} from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormFirstStepValues } from "@/sections/form/validations/form";
import {
  THAILAND_PROVINCES,
  ENGINEERING_PROGRAMS,
} from "@/sections/form/constants/form-options";

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

  const educationLevel = useWatch({ control, name: "education_level" });
  const studyPlan = useWatch({ control, name: "study_plan" });

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
          name="education_level"
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

        {educationLevel === "อื่นๆ (โปรดระบุ)" && (
          <Controller
            name="other_education_level"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="ระดับชั้นอื่นๆ (โปรดระบุ)"
                variant="outlined"
                fullWidth
              />
            )}
          />
        )}

        <Controller
          name="school_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label='ชื่อโรงเรียน (ไม่ต้องกรอกคำว่า "โรงเรียน")'
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="school_province"
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
                <TextField {...params} label="จังหวัดของโรงเรียน" />
              )}
            />
          )}
        />

        <Controller
          name="study_plan"
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
                <TextField {...params} label="แผนการเรียน/สาย" />
              )}
            />
          )}
        />

        {studyPlan === "อื่นๆ (โปรดระบุ)" && (
          <Controller
            name="other_study_plan"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="แผนการเรียนอื่นๆ (โปรดระบุ)"
                variant="outlined"
                fullWidth
              />
            )}
          />
        )}

        <Controller
          name="interested_major"
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
          name="tcas_rank"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="อันดับที่จะใส่ใน TCAS (1-10)"
              variant="outlined"
              fullWidth
              type="number"
              slotProps={{
                htmlInput: { min: 1, max: 10 },
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="emergency_contact"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="เบอร์ติดต่อฉุกเฉิน (เช่น 0XXXXXXXXX)"
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
