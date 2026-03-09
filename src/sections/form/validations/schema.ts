import { FormFirstStepValues } from "./form";

const defaultValues: FormFirstStepValues = {
  // Personal
  first_name: "",
  last_name: "",
  gender: "",
  phone_number: "",
  email: "",

  // Participation
  participant_type: "",
  attendance_dates: [],
  interested_activities: [],
  discovery_channel: [],

  // Travel
  transport_mode: "",
  province: "",
  district: "",

  // Optional section
  education_level: "",
  other_education_level: "",
  school_name: "",
  study_plan: "",
  other_study_plan: "",
  interested_major: "",
  tcas_rank: "",
  emergency_contact: "",
  school_province: "",
  subject_taught: "",
  intania_generation: "",
  year_level: "",
  other_year: "",
  faculty: "",
  university: "",
};

export { defaultValues };
