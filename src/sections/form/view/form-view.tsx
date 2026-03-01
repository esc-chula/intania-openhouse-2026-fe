"use client";

import {
  formFirstStepSchema,
  FormFirstStepValues,
} from "@/lib/validations/form";
import { FormFirstStep } from "@/sections/form/form-first-step";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import { CustomButton } from "@/components/custom-button";
import { defaultValues } from "@/lib/schema";
import { FormLastStep } from "@/sections/form/form-last-step";
import { FormSecondStepInnerUniversity } from "@/sections/form/form-second-step-inner-university";
import { FormSecondStepOuterUniversity } from "@/sections/form/form-second-step-outer-university";
import { FormSecondStepStudent } from "@/sections/form/form-second-step-student";
import { FormSecondStepTeacher } from "@/sections/form/form-second-step-teacher";
import { Box, Stack, Typography } from "@mui/material";

function FormView() {
  const [step, setStep] = useState(1);

  const methods = useForm<FormFirstStepValues>({
    resolver: zodResolver(formFirstStepSchema),
    defaultValues,
  });

  const participantType = useWatch({
    control: methods.control,
    name: "participantType",
  });

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await methods.trigger([
        "firstName",
        "lastName",
        "gender",
        "phone",
        "email",
        "participantType",
        "attendDates",
        "activities",
        "knows",
        "province",
        "district",
        "travelMethod",
      ]);
    } else if (step === 2) {
      switch (participantType) {
        case "นักเรียน/ผู้ที่สนใจศึกษาต่อ":
          isValid = await methods.trigger([
            "educationLevel",
            "school",
            "schoolProvince",
            "studyProgram",
            "engineeringProgram",
            "tcasRank",
            "emergencyPhone",
          ]);
          break;
        case "นิสิตปัจจุบัน/นิสิตเก่าวิศวะจุฬาฯ":
          isValid = await methods.trigger(["chulaId"]);
          break;
        case "นิสิต/นักศึกษาจากมหาลัยอื่น":
          isValid = await methods.trigger([
            "studyYear",
            "otherYear",
            "faculty",
            "university",
          ]);
          break;
        case "ครู":
          isValid = await methods.trigger([
            "school",
            "schoolProvince",
            "teachingSubject",
          ]);
          break;
        default:
          isValid = true;
      }
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBackStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = (data: FormFirstStepValues) => {
    console.log("Form Submitted", data);
    alert(
      `Form successfully submitted for ${data.firstName} ${data.lastName}! Check console for payload.`,
    );
  };

  const renderSecondStep = () => {
    switch (participantType) {
      case "นักเรียน/ผู้ที่สนใจศึกษาต่อ":
        return <FormSecondStepStudent />;
      case "นิสิตปัจจุบัน/นิสิตเก่าวิศวะจุฬาฯ":
        return <FormSecondStepInnerUniversity />;
      case "นิสิต/นักศึกษาจากมหาลัยอื่น":
        return <FormSecondStepOuterUniversity />;
      case "ครู":
        return <FormSecondStepTeacher />;
      default:
        // Fallback for valid state but unhandled explicitly, theoretically shouldn't reach here if schema strictly allows only the 5 options
        return (
          <Typography margin={2}>
            กรุณาเลือกประเภทผู้เข้าร่วมในหน้าที่ 1 ควบคู่
          </Typography>
        );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        padding: 4,
        gap: 1,
        background: "url('/background/bg-register.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        component="img"
        src="/banner/register-banner.svg"
        sx={{
          width: "69%",
          alignSelf: "center",
        }}
      />

      <Box sx={{ height: "100%", borderRadius: 1, overflow: "scroll" }}>
        <FormProvider {...methods}>
          <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <Box sx={{ display: step === 1 ? "block" : "none" }}>
              <FormFirstStep />
            </Box>
            <Box sx={{ display: step === 2 ? "block" : "none" }}>
              {renderSecondStep()}
            </Box>
            <Box sx={{ display: step === 3 ? "block" : "none" }}>
              <FormLastStep />
            </Box>
          </Box>
        </FormProvider>
      </Box>

      <Stack
        spacing={2}
        sx={{
          marginTop: 2,
          alignItems: "center",
          width: "100%",
        }}
      >
        {step < 3 ? (
          <CustomButton onClick={handleNextStep}>ถัดไป</CustomButton>
        ) : (
          <CustomButton onClick={methods.handleSubmit(onSubmit)}>
            สร้างบัญชี
          </CustomButton>
        )}

        <Typography
          variant="subtitle1"
          onClick={handleBackStep}
          sx={{
            color: "#5B3722",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ย้อนกลับ
        </Typography>
      </Stack>
    </Box>
  );
}

export default FormView;
