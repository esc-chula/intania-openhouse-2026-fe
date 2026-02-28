"use client";

import {
  Stack,
  Typography,
  TextField,
  Button,
  Radio,
  Autocomplete,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormFirstStepValues } from "@/lib/validations/form";

const studyYearOptions: string[] = [
  "ปี 1",
  "ปี 2",
  "ปี 3",
  "ปี 4",
  "อื่นๆ (โปรดระบุ)",
];

export function FormSecondStepOuterUniversity({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { control, trigger, watch } = useFormContext<FormFirstStepValues>();
  const studyYear = watch("studyYear");

  const handleNext = async () => {
    const isValid = await trigger([
      "studyYear",
      "otherYear",
      "faculty",
      "university",
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
          ข้อมูลเพิ่มเติม (สำหรับนิสิต/นักศึกษา)
        </Typography>

        <Controller
          name="studyYear"
          control={control}
          render={({ field }) => (
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
              renderInput={(params) => <TextField {...params} label="ชั้นปี" />}
            />
          )}
        />

        {studyYear === "อื่นๆ (โปรดระบุ)" && (
          <Controller
            name="otherYear"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                label="ชั้นปีอื่นๆ (โปรดระบุ)"
                fullWidth
              />
            )}
          />
        )}

        <Controller
          name="faculty"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="คณะ"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="university"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="มหาวิทยาลัย"
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
