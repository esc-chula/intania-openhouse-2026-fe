import { z } from "zod";

export const formFirstStepSchema = z
  .object({
    first_name: z.string().min(1, "กรุณาระบุชื่อ"),
    last_name: z.string().min(1, "กรุณาระบุนามสกุล"),
    gender: z.string({ error: () => "กรุณาระบุเพศ" }).min(1, "กรุณาระบุเพศ"),
    phone_number: z
      .string()
      .min(1, "กรุณาระบุเบอร์โทร")
      .regex(/^\d{10}$/, "กรุณาระบุเบอร์โทรให้ถูกต้อง (10 หลัก)"),
    email: z.email({ error: "กรุณาระบุอีเมล" }),
    participant_type: z.string({ error: () => "กรุณาระบุประเภทผู้เข้าร่วม" }).min(1, "กรุณาระบุประเภทผู้เข้าร่วม"),
    attendance_dates: z.array(z.string()).min(1, "กรุณาระบุวันที่เข้าร่วม"),
    interested_activities: z
      .array(z.string())
      .min(1, "กรุณาระบุกิจกรรมที่สนใจ"),
    discovery_channel: z
      .array(z.string())
      .min(1, "กรุณาระบุช่องทางที่รู้จักงาน"),
    transport_mode: z.string({ error: () => "กรุณาระบุวิธีการเดินทางมางาน" }).min(1, "กรุณาระบุวิธีการเดินทางมางาน"),
    province: z.string({ error: () => "กรุณาระบุจังหวัด" }).min(1, "กรุณาระบุจังหวัด"),
    district: z.string().optional(),

    // Student fields
    education_level: z.string().optional(),
    other_education_level: z.string().optional(),
    school_name: z.string().optional(),
    study_plan: z.string().optional(),
    other_study_plan: z.string().optional(),
    interested_major: z.string().optional(),
    tcas_rank: z
      .union([
        z.literal(""),
        z.string().refine((val) => {
          const num = parseInt(val, 10);
          return !isNaN(num) && num >= 1 && num <= 10;
        }, "กรุณาระบุอันดับ TCAS ให้ถูกต้อง (1-10)"),
      ])
      .optional(),
    emergency_contact: z
      .union([
        z.literal(""),
        z.string().regex(/^\d{10}$/, "กรุณาระบุเบอร์โทรให้ถูกต้อง (10 หลัก)"),
      ])
      .optional(),

    // Teacher fields
    school_province: z.string().optional(),
    subject_taught: z.string().optional(),

    // Intania / Alumni fields
    intania_generation: z
      .union([
        z.literal(""),
        z.string().regex(/^วศ\.25\d{2}$/, 'กรุณาระบุรุ่นในรูปแบบ "วศ.25XX"'),
      ])
      .optional(),

    // Outside student fields
    year_level: z.string().optional(),
    other_year: z.string().optional(),
    faculty: z.string().optional(),
    university: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Bangkok district required
    if (
      data.province === "กรุงเทพมหานคร" &&
      (!data.district || data.district.trim() === "")
    ) {
      ctx.addIssue({
        code: "custom",
        message: "กรุณาเลือกเขต เนื่องจากจังหวัดที่ระบุคือกรุงเทพมหานคร",
        path: ["district"],
      });
    }

    // Student: all StudentExtraAttributes required
    if (data.participant_type === "นักเรียน/ผู้ที่สนใจศึกษาต่อ") {
      if (!data.education_level && !data.other_education_level) {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุระดับการศึกษา",
          path: ["education_level"],
        });
      }
      if (
        data.education_level === "อื่นๆ (โปรดระบุ)" &&
        (!data.other_education_level || data.other_education_level.trim() === "")
      ) {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุระดับการศึกษา",
          path: ["other_education_level"],
        });
      }
      if (!data.school_name || data.school_name.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุชื่อโรงเรียน",
          path: ["school_name"],
        });
      }
      if (!data.study_plan && !data.other_study_plan) {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุแผนการเรียน",
          path: ["study_plan"],
        });
      }
      if (
        data.study_plan === "อื่นๆ (โปรดระบุ)" &&
        (!data.other_study_plan || data.other_study_plan.trim() === "")
      ) {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุแผนการเรียน",
          path: ["other_study_plan"],
        });
      }
      if (!data.school_province || data.school_province.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุจังหวัดของโรงเรียน",
          path: ["school_province"],
        });
      }
      if (!data.tcas_rank || data.tcas_rank.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุอันดับ TCAS",
          path: ["tcas_rank"],
        });
      }
      if (!data.interested_major || data.interested_major.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุสาขาที่สนใจ",
          path: ["interested_major"],
        });
      }
      if (!data.emergency_contact || data.emergency_contact.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุเบอร์โทรผู้ปกครอง",
          path: ["emergency_contact"],
        });
      }
    }

    // Intania current student
    if (data.participant_type === "นิสิตปัจจุบันวิศวะจุฬาฯ") {
      if (!data.intania_generation || data.intania_generation.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุรุ่นอินทาเนีย",
          path: ["intania_generation"],
        });
      }
    }

    // Intania alumni
    if (data.participant_type === "นิสิตเก่าวิศวะจุฬาฯ") {
      if (!data.intania_generation || data.intania_generation.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุรุ่นอินทาเนีย",
          path: ["intania_generation"],
        });
      }
    }

    // Outside student: all OutsideStudentExtraAttributes required
    if (data.participant_type === "นิสิตจากคณะ/มหาลัยอื่น") {
      if (!data.year_level && !data.other_year) {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุชั้นปี",
          path: ["year_level"],
        });
      }
      if (
        data.year_level === "อื่นๆ (โปรดระบุ)" &&
        (!data.other_year || data.other_year.trim() === "")
      ) {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุชั้นปี",
          path: ["other_year"],
        });
      }
      if (!data.faculty || data.faculty.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุคณะ",
          path: ["faculty"],
        });
      }
      if (!data.university || data.university.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุมหาวิทยาลัย",
          path: ["university"],
        });
      }
    }

    // Teacher: all TeacherExtraAttributes required
    if (data.participant_type === "ครู") {
      if (!data.school_name || data.school_name.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุชื่อโรงเรียน",
          path: ["school_name"],
        });
      }
      if (!data.school_province || data.school_province.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุจังหวัดของโรงเรียน",
          path: ["school_province"],
        });
      }
      if (!data.subject_taught || data.subject_taught.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "กรุณาระบุวิชาที่สอน",
          path: ["subject_taught"],
        });
      }
    }
  });

export type FormFirstStepValues = z.infer<typeof formFirstStepSchema>;
