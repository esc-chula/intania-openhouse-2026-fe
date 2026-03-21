"use client";

import {
  formFirstStepSchema,
  FormFirstStepValues,
} from "@/sections/form/validations/form";
import { FormFirstStep } from "@/sections/form/form-first-step";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import { CustomButton } from "@/components/custom-button";
import { defaultValues } from "@/sections/form/validations/schema";
import { useSubmitFormMutation } from "@/services/form/mutation";
import { formatSubmitPayload } from "@/sections/form/utils/format-payload";
import { FormLastStep } from "@/sections/form/form-last-step";
import { FormSecondStepInnerUniversity } from "@/sections/form/form-second-step-inner-university";
import { FormSecondStepOuterUniversity } from "@/sections/form/form-second-step-outer-university";
import { FormSecondStepStudent } from "@/sections/form/form-second-step-student";
import { FormSecondStepTeacher } from "@/sections/form/form-second-step-teacher";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";

function FormView() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { refreshRegistration } = useAuth();
  const { mutateAsync: submitForm } = useSubmitFormMutation();

  const methods = useForm<FormFirstStepValues>({
    resolver: zodResolver(formFirstStepSchema),
    defaultValues,
    mode: "onChange",
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const participantType = useWatch({
    control: methods.control,
    name: "participant_type",
  });

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await methods.trigger([
        "first_name",
        "last_name",
        "gender",
        "phone_number",
        "email",
        "participant_type",
        "attendance_dates",
        "interested_activities",
        "discovery_channel",
        "province",
        "district",
        "transport_mode",
      ]);
    } else if (step === 2) {
      switch (participantType) {
        case "นักเรียน/ผู้ที่สนใจศึกษาต่อ":
          isValid = await methods.trigger([
            "education_level",
            "school_name",
            "school_province",
            "study_plan",
            "interested_major",
            "tcas_rank",
            "emergency_contact",
          ]);
          break;
        case "นิสิตปัจจุบันวิศวะจุฬาฯ":
        case "นิสิตเก่าวิศวะจุฬาฯ":
          isValid = await methods.trigger(["intania_generation"]);
          break;
        case "นิสิตจากคณะ/มหาลัยอื่น":
          isValid = await methods.trigger([
            "year_level",
            "other_year",
            "faculty",
            "university",
          ]);
          break;
        case "ครู":
          isValid = await methods.trigger([
            "school_name",
            "school_province",
            "subject_taught",
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
    if (step === 1) {
      router.back();
      return;
    }
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormFirstStepValues) => {
    const payload = formatSubmitPayload(data);

    try {
      await submitForm(payload);

      await refreshRegistration();
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const renderSecondStep = () => {
    switch (participantType) {
      case "นักเรียน/ผู้ที่สนใจศึกษาต่อ":
        return <FormSecondStepStudent />;
      case "นิสิตปัจจุบันวิศวะจุฬาฯ":
      case "นิสิตเก่าวิศวะจุฬาฯ":
        return <FormSecondStepInnerUniversity />;
      case "นิสิตจากคณะ/มหาลัยอื่น":
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

      <Box
        ref={scrollRef}
        sx={{ height: "100%", borderRadius: 1, overflow: "scroll" }}
      >
        <FormProvider {...methods}>
          <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <Box sx={{ display: step === 1 ? "block" : "none" }}>
              <FormFirstStep />
            </Box>
            <Box
              sx={{
                display:
                  step === 2 && !(participantType === "ผู้ปกครอง/บุคคลภายนอก")
                    ? "block"
                    : "none",
              }}
            >
              {renderSecondStep()}
            </Box>
            <Box
              sx={{
                display:
                  step === 3 ||
                  (step === 2 && participantType === "ผู้ปกครอง/บุคคลภายนอก")
                    ? "block"
                    : "none",
              }}
            >
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
        {step < 3 &&
        !(step === 2 && participantType === "ผู้ปกครอง/บุคคลภายนอก") ? (
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
