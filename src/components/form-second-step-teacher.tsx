"use client";

import {
  Stack,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Radio,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormFirstStepValues } from "@/lib/validations/form";
import { THAILAND_PROVINCES } from "@/lib/constants/form-options";

export function FormSecondStepTeacher({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { control, trigger } = useFormContext<FormFirstStepValues>();

  const handleNext = async () => {
    const isValid = await trigger([
      "school",
      "schoolProvince",
      "teachingSubject",
    ]); // Validate fields specific to this step
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
          ข้อมูลครู
        </Typography>
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
          name="teachingSubject"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""} 
              label="วิชาที่สอน"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Stack>
      <Stack spacing={2} sx={{ mt: "auto", alignItems: "center" }}>
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
