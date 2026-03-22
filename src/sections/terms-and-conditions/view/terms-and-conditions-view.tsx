"use client";

import { CustomButton } from "@/components/custom-button";
import { useAuth } from "@/contexts/auth-provider";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TermsAndConditionsView() {
  const router = useRouter();
  const { user, loading, isRegistered, setAcceptedTerms } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/");
      return;
    }
    if (isRegistered) {
      router.replace("/");
      return;
    }
  }, [loading, user, isRegistered, router]);

  const handleAccept = () => {
    setAcceptedTerms(true);
    router.push("/form");
  };

  const handleBack = () => {
    router.back();
  };

  if (loading || !user) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100dvh",
        background: "url('/background/bg-terms-and-conditions.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        gap: 4,
        padding: "40px 25px",
      }}
    >
      <Box
        component="img"
        src="/banner/terms-and-conditions-banner.svg"
        sx={{
          width: "69%",
        }}
      />
      <Stack
        sx={{
          flexGrow: 1,
          minHeight: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "#FFFBF6",
          borderRadius: 1,
          padding: 2,
          overflow: "scroll",
        }}
      >
        <Stack spacing={1.5} color="primary.main">
          <Typography variant="body2">
            PDPA การลงทะเบียน Intania Open House 2026
          </Typography>

          <Typography variant="body2">
            นโยบายการคุ้มครองข้อมูลส่วนบุคคล (PDPA)
            สำหรับงานนิทรรศการคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </Typography>

          <Typography variant="body2">
            คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย (&quot;ผู้จัดงาน&quot;)
            ขอแจ้งรายละเอียดเกี่ยวกับการเก็บรวบรวม ใช้
            และเปิดเผยข้อมูลส่วนบุคคลของท่านที่ได้ให้ไว้ผ่านระบบลงทะเบียนออนไลน์
            ดังนี้
          </Typography>

          <Typography variant="body2">
            1. วัตถุประสงค์ในการเก็บข้อมูล
            {<br />}
            ผู้จัดงานเก็บข้อมูลเพื่อวัตถุประสงค์ดังต่อไปนี้
            <br />
            - เพื่อลงทะเบียนเข้าร่วมงาน และการจัดการกิจกรรมต่างๆ ภายในงาน
            <br />
            - เพื่อวิเคราะห์ข้อมูลเชิงสถิติและจัดทำรายงานสรุปการจัดกิจกรรม
            <br />- เพื่อการประชาสัมพันธ์และเผยแพร่ภาพถ่าย
            วิดีโอที่ถ่ายระหว่างการจัดกิจกรรม
            ผ่านช่องทางสื่อสังคมออนไลน์และช่องทางประชาสัมพันธ์อื่นๆ ของผู้จัดงาน
          </Typography>

          <Typography variant="body2" component="div">
            2. ประเภทข้อมูลที่เก็บรวบรวม
            <br />
            ผู้จัดงานอาจเก็บข้อมูลส่วนบุคคลของท่านดังต่อไปนี้
            <br />
            - ข้อมูลพื้นฐาน: ชื่อ, นามสกุล, เพศ, เบอร์โทรศัพท์, อีเมล
            <br />- ข้อมูลเฉพาะกลุ่มตามประเภทผู้ลงทะเบียน:
            <Typography variant="body2" component="div" sx={{ pl: 2 }}>
              - นักเรียน: ระดับชั้น, สายการเรียน, โรงเรียน, จังหวัด,
              ความสนใจในคณะวิศวกรรมศาสตร์, สาขาที่สนใจ, เบอร์โทรศัพท์ฉุกเฉิน
              <br />
              - นิสิตนักศึกษาจากคณะ/มหาวิทยาลัยอื่น: ชั้นปี, คณะ, มหาวิทยาลัย
              <br />
              - นิสิตปัจจุบัน: รุ่นที่ศึกษา
              <br />
              - ศิษย์เก่าวิศวะจุฬา: รุ่นที่ศึกษา
              <br />- ครู: โรงเรียนในสังกัด, จังหวัด, วิชาที่สอน
            </Typography>
            - ข้อมูลเกี่ยวกับการเข้าร่วมงาน: วันที่เข้าร่วม กิจกรรมที่สนใจ
            และช่องทางที่ทราบข่าวสาร
          </Typography>

          <Typography variant="body2">
            3. การเปิดเผยข้อมูลส่วนบุคคล
            <br />
            ข้อมูลส่วนบุคคลของท่านจะถูกเก็บเป็นความลับและจะไม่ถูกเปิดเผยต่อบุคคลภายนอก
            ยกเว้นการนำข้อมูลไปวิเคราะห์เชิงสถิติและนำเสนอในรูปแบบสรุปที่ไม่สามารถระบุถึงตัวบุคคลได้
            และอาจมีการนำเสนอผ่านช่องทางต่างๆ ของผู้จัดงาน
            โดยผู้จัดงานจะดูแลข้อมูลของท่านอย่างเหมาะสมและปลอดภัย
          </Typography>

          <Typography variant="body2">
            4. ระยะเวลาในการเก็บรักษาข้อมูล
            <br />
            ผู้จัดงานจะเก็บรักษาข้อมูลส่วนบุคคลของท่านไว้ในระยะเวลาที่จำเป็นสำหรับวัตถุประสงค์ที่ระบุไว้ข้างต้น
          </Typography>

          <Typography variant="body2">
            5. สิทธิของเจ้าของข้อมูลส่วนบุคคล
            <br />
            ท่านมีสิทธิในการขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของท่านได้
            โดยสามารถติดต่อแจ้งความประสงค์มายังผู้จัดงานผ่านช่องทางที่กำหนด
          </Typography>

          <Typography variant="body2">intaniaopenhouse@gmail.com</Typography>

          <Typography variant="body2">
            การลงทะเบียนเข้าร่วมงานถือว่าท่านได้รับทราบและยินยอมตามรายละเอียดที่ระบุในนโยบายการคุ้มครองข้อมูลส่วนบุคคลนี้
          </Typography>
        </Stack>
      </Stack>

      <Stack
        spacing={2}
        sx={{
          marginTop: "auto",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CustomButton onClick={handleAccept}>ยอมรับ</CustomButton>

        <Typography
          variant="subtitle1"
          onClick={handleBack}
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
