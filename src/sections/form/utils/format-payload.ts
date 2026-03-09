import { FormFirstStepValues } from "@/sections/form/validations/form";
import type { TFormSubmitRequest } from "@/types/form/form-submit";
import {
  GENDER_OPTIONS,
  PARTICIPANT_TYPE_OPTIONS,
  TRANSPORT_MODE_OPTIONS,
  ORIGIN_LOCATIONS,
} from "@/sections/form/constants/form-options";

const getOptionValue = (
  options: { label: string; value: string }[],
  label: string,
) => {
  return options.find((o) => o.label === label)?.value || label;
};

export const formatSubmitPayload = (
  data: FormFirstStepValues,
): TFormSubmitRequest => {
  const rawLocation =
    data.province === "กรุงเทพมหานคร"
      ? data.district || ""
      : data.province || "";

  const payload: TFormSubmitRequest = {
    first_name: data.first_name,
    last_name: data.last_name,
    gender: getOptionValue(GENDER_OPTIONS, data.gender),
    phone_number: data.phone_number,
    participant_type: getOptionValue(
      PARTICIPANT_TYPE_OPTIONS,
      data.participant_type,
    ),
    attendance_dates: data.attendance_dates,
    interested_activities: data.interested_activities,
    discovery_channel: data.discovery_channel,
    is_from_bangkok: data.province === "กรุงเทพมหานคร",
    transport_mode: getOptionValue(TRANSPORT_MODE_OPTIONS, data.transport_mode),
    origin_location: getOptionValue(ORIGIN_LOCATIONS, rawLocation),
  };

  switch (data.participant_type) {
    case "นักเรียน/ผู้ที่สนใจศึกษาต่อ":
      payload.student_extra_attributes = {
        education_level:
          data.education_level === "อื่นๆ (โปรดระบุ)"
            ? data.other_education_level || ""
            : data.education_level || "",
        school_name: data.school_name || "",
        study_plan:
          data.study_plan === "อื่นๆ (โปรดระบุ)"
            ? data.other_study_plan || ""
            : data.study_plan || "",
        province: data.school_province || "",
        tcas_rank: parseInt(data.tcas_rank || "0", 10),
        interested_major: data.interested_major || "",
        emergency_contact: data.emergency_contact || "",
      };
      break;
    case "นิสิตปัจจุบันวิศวะจุฬาฯ":
      payload.intania_extra_attributes = {
        intania_generation: data.intania_generation || "",
      };
      break;
    case "นิสิตเก่าวิศวะจุฬาฯ":
      payload.alumni_extra_attributes = {
        intania_generation: data.intania_generation || "",
      };
      break;
    case "นิสิตจากคณะ/มหาลัยอื่น":
      payload.outside_student_extra_attributes = {
        year_level:
          data.year_level === "อื่นๆ (โปรดระบุ)"
            ? data.other_year || ""
            : data.year_level || "",
        faculty: data.faculty || "",
        university: data.university || "",
      };
      break;
    case "ครู":
      payload.teacher_extra_attributes = {
        school_name: data.school_name || "",
        province: data.school_province || "",
        subject_taught: data.subject_taught || "",
      };
      break;
  }

  return payload;
};
