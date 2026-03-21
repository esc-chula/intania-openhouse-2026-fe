import { z } from "zod";

export const formFirstStepSchema = z
  .object({
    first_name: z.string().min(1, "กรุณาระบุชื่อ"),
    last_name: z.string().min(1, "กรุณาระบุนามสกุล"),
    gender: z.string().min(1, "กรุณาระบุเพศ"),
    phone_number: z
      .string()
      .min(1, "กรุณาระบุเบอร์โทร")
      .regex(/^\d{10}$/, "กรุณาระบุเบอร์โทรให้ถูกต้อง (10 หลัก)"),
    email: z.email({ error: "กรุณาระบุอีเมล" }),
    participant_type: z.string().min(1, "กรุณาระบุประเภทผู้เข้าร่วม"),
    attendance_dates: z.array(z.string()).min(1, "กรุณาระบุวันที่เข้าร่วม"),
    interested_activities: z
      .array(z.string())
      .min(1, "กรุณาระบุกิจกรรมที่สนใจ"),
    discovery_channel: z
      .array(z.string())
      .min(1, "กรุณาระบุช่องทางที่รู้จักงาน"),
    transport_mode: z.string().min(1, "กรุณาระบุวิธีการเดินทางมางาน"),
    province: z.string().min(1, "กรุณาระบุจังหวัด"),
    district: z.string().optional(),
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
    school_province: z.string().optional(),
    subject_taught: z.string().optional(),
    intania_generation: z.string().optional(),
    year_level: z.string().optional(),
    other_year: z.string().optional(),
    faculty: z.string().optional(),
    university: z.string().optional(),
  })
  .superRefine((data, ctx) => {
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
  });

export type FormFirstStepValues = z.infer<typeof formFirstStepSchema>;
