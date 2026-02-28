"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formFirstStepSchema,
  FormFirstStepValues,
} from "@/lib/validations/form";
import { FormFirstStep } from "@/components/form-first-step";

import { FormSecondStepStudent } from "@/components/form-second-step-student";
import { FormSecondStepOuterUniversity } from "@/components/form-second-step-outer-university";
import { FormSecondStepTeacher } from "@/components/form-second-step-teacher";
import { Box, Typography } from "@mui/material";
import { FormSecondStepInnerUniversity } from "@/components/form-second-step-inner-university";
import { FormLastStep } from "@/components/form-last-step";
import { defaultValues } from "@/lib/schema";

export default function FormPage() {
  const [step, setStep] = useState(1);

  const methods = useForm<FormFirstStepValues>({
    resolver: zodResolver(formFirstStepSchema),
    defaultValues
  });

  const participantType = methods.watch("participantType");

  const handleNextStep = () => {
    setStep(2);
  };

  const onSubmit = (data: FormFirstStepValues) => {
    console.log("Form Submitted", data);
    alert(
      `Form successfully submitted for ${data.firstName} ${data.lastName}! Check console for payload.`,
    );
  };

  const renderSecondStep = () => {
    const step2Props = { onNext: () => setStep(3), onBack: () => setStep(1) };
    switch (participantType) {
      case "นักเรียน/ผู้ที่สนใจศึกษาต่อ":
        return <FormSecondStepStudent {...step2Props} />;
      case "นิสิตปัจจุบัน/นิสิตเก่าวิศวะจุฬาฯ":
        return <FormSecondStepInnerUniversity {...step2Props} />;
      case "นิสิต/นักศึกษาจากมหาลัยอื่น":
        return <FormSecondStepOuterUniversity {...step2Props} />;
      case "ครู":
        return <FormSecondStepTeacher {...step2Props} />;
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
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Box sx={{ display: step === 1 ? "block" : "none" }}>
          <FormFirstStep onNext={handleNextStep} />
        </Box>
        <Box sx={{ display: step === 2 ? "block" : "none" }}>
          {renderSecondStep()}
        </Box>
        <Box sx={{ display: step === 3 ? "block" : "none" }}>
          <FormLastStep onBack={() => setStep(2)} />
        </Box>
      </Box>
    </FormProvider>
  );
}
