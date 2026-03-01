import { FormFirstStepValues } from "./validations/form";

const defaultValues: FormFirstStepValues = {
  // Personal
  firstName: "",
  lastName: "",
  gender: "",
  phone: "",
  email: "",

  // Participation
  participantType: "",
  attendDates: [],
  activities: [],
  knows: [],

  // Travel
  travelMethod: "",
  province: "",
  district: "",

  // Optional section
  educationLevel: "",
  school: "",
  studyProgram: "",
  engineeringProgram: "",
  tcasRank: "",
  emergencyPhone: "",
  schoolProvince: "",
  teachingSubject: "",
  chulaId: "",
  studyYear: "",
  otherYear: "",
  faculty: "",
  university: "",
};

export { defaultValues };
