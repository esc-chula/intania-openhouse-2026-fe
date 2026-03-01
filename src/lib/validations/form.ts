import { z } from "zod";

export const formFirstStepSchema = z.object({
    firstName: z.string().min(1, "กรุณาระบุชื่อ"),
    lastName: z.string().min(1, "กรุณาระบุนามสกุล"),
    gender: z.string().min(1, "กรุณาระบุเพศ"),
    phone: z.string().min(1, "กรุณาระบุเบอร์โทร").regex(/^\d{10}$/, "กรุณาระบุเบอร์โทรให้ถูกต้อง (10 หลัก)"),
    email: z.email({error: "กรุณาระบุอีเมล"}),
    participantType: z.string().min(1, "กรุณาระบุประเภทผู้เข้าร่วม"),
    attendDates: z.array(z.string()).min(1, "กรุณาระบุวันที่เข้าร่วม"),
    activities: z.array(z.string()).min(1, "กรุณาระบุกิจกรรมที่สนใจ"),
    knows: z.array(z.string()).min(1, "กรุณาระบุช่องทางที่รู้จักงาน"),
    travelMethod: z.string().min(1, "กรุณาระบุวิธีการเดินทางมางาน"),
    province: z.string().min(1, "กรุณาระบุจังหวัด"),
    district: z.string().optional(), // District is still optional initially, handled by refine later
    educationLevel: z.string().optional(),
    school: z.string().optional(),
    studyProgram: z.string().optional(),
    engineeringProgram: z.string().optional(),
    tcasRank: z.string().optional(),
    emergencyPhone: z.string().optional(),
    schoolProvince: z.string().optional(),
    teachingSubject: z.string().optional(),
    chulaId: z.string().optional(),
    studyYear: z.string().optional(),
    otherYear: z.string().optional(),
    faculty: z.string().optional(),
    university: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.province === "กรุงเทพมหานคร" && (!data.district || data.district.trim() === "")) {
        ctx.addIssue({
            code: "custom",
            message: "กรุณาเลือกเขต เนื่องจากจังหวัดที่ระบุคือกรุงเทพมหานคร",
            path: ["district"],
        });
    }
});

export type FormFirstStepValues = z.infer<typeof formFirstStepSchema>;
