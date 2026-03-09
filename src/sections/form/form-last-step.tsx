import { Stack, Typography } from "@mui/material";

export function FormLastStep() {
  //   const { control } = useFormContext<FormFirstStepValues>();
  //   const data = useWatch({ control }) as FormFirstStepValues;

  //   const renderRow = (label: string, value: string | string[] | undefined) => {
  //     if (!value || (Array.isArray(value) && value.length === 0)) return null;

  //     const displayValue = Array.isArray(value) ? value.join(", ") : value;
  //     return (
  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "flex-start",
  //           gap: 2,
  //         }}
  //       >
  //         <Typography
  //           variant="body2"
  //           sx={{ fontWeight: 600, color: "grey.800", minWidth: "120px" }}
  //         >
  //           {label}:
  //         </Typography>
  //         <Typography
  //           variant="body2"
  //           sx={{ color: "grey.600", textAlign: "right" }}
  //         >
  //           {displayValue}
  //         </Typography>
  //       </Box>
  //     );
  //   };

  return (
    <Stack
      sx={{
        minHeight: "calc(100vh - 32px)",
      }}
    >
      <Stack
        spacing={1.5}
        sx={{ p: "14px 16px" }}
        bgcolor={"#FFFBF6"}
        borderRadius={1}
      >
        <Typography sx={{ color: "primary.main", fontWeight: "bold" }}>
          โปรดตรวจสอบความถูกต้องของข้อมูล
        </Typography>
        <Typography variant="body2">
          เมื่อตรวจสอบข้อมูลเรียบร้อย ผู้ใช้งานสามารถกด “สร้างบัญชี”
          เพื่อเข้าใช้งานเว็บไซต์ intania openhouse ได้
        </Typography>

        {/* <Stack spacing={1} sx={{ mt: 2, p: 2, border: "1px solid", borderColor: "grey.300", borderRadius: 1, bgcolor: "white" }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: "grey.700" }}>ข้อมูลเบื้องต้น</Typography>
                {renderRow("ชื่อ", data.first_name)}
                {renderRow("นามสกุล", data.last_name)}
                {renderRow("เพศ", data.gender)}
                {renderRow("เบอร์โทรศัพท์", data.phone_number)}
                {renderRow("อีเมล", data.email)}
                {renderRow("ประเภทผู้เข้าร่วม", data.participant_type)}
                {renderRow("วันที่ต้องการเข้าร่วม", data.attendance_dates)}
                {renderRow("กิจกรรมที่สนใจ", data.interested_activities)}
                {renderRow("ช่องทางที่รู้จัก", data.discovery_channel)}

                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2" sx={{ mb: 1, color: "grey.700" }}>ข้อมูลเพิ่มเติม</Typography> */}
      </Stack>
    </Stack>
  );
}
