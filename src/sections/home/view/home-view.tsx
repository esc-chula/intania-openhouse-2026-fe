"use client";
import { Box, Stack, Typography, ButtonBase, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "@/services/user/query/user-query";
import { userStampsQueryKeys } from "@/services/user/query/user-stamp-query";
import { activityQueryKeys } from "@/services/activity/query/activities-query";
import { workshopQueryKeys } from "@/services/workshop/query/workshops-query";
import ActivityCard from "../card/activityCard";
import CollectionCard from "../card/collectionCard";
import WorkshopCard from "../card/workshopCard";

const USER_FIELDS: string[] = ["first_name", "last_name", "email"];
const QUICK_INFO = [
  { label: 'ข้อมูลภาควิชาและชมรม' },
  { label: 'แผนผังคณะ' },
  { label: 'ข้อมูลการเดินทาง' },
  { label: 'Lost & Found' },
];

export default function HomeView() {
  const { data: user, isError } = useQuery(
    usersQueryKeys.meOptions({ fields: USER_FIELDS })
  );

  const { data: stampData } = useQuery(userStampsQueryKeys.meOptions());

  const { data: activityData } = useQuery(
    activityQueryKeys.listOptions({ happening_now: true })
  );

  const { data: workshopData } = useQuery(
    workshopQueryKeys.listOptions({ order: 'asc' }) 
  );

  if (isError || !user) {
    return <div>กรุณาเข้าสู่ระบบ</div>;
  }

  const collections = [
    { label: "ภาควิชา", current: stampData?.department_stamp_count || 0, total: 5 },
    { label: "ชมรม", current: stampData?.club_stamp_count || 0, total: 5 },
    { label: "นวัตกรรม", current: stampData?.exhibition_stamp_count || 0, total: 5 },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100dvh",
        background: "url('/background/bg-workshop-activities.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        gap: 1.5,
        padding: "25px 25px",
      }}
    >
      <Box component="img" src="/logo/logo.svg" sx={{ width: "65%", display: "block" }} />

      <Box
        sx={{
          padding: "15px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.4))",
        }}
      >
        <Typography sx={{ textAlign: "start", color: "#5B3722", fontSize: "14px", fontWeight: 400 }}>
          เหล่านักเดินทางจากทั่วทุกสารทิศได้เดินทางเข้ามา ณ ดินแดน Intania ประเทศแห่งเทคโนโลยีและสิ่งประดิษฐ์ เพื่อหาเทคโนโลยีแห่งยุค เมื่อเหล่านักเดินทางมาถึงจึงได้ขอเข้าเฝ้าราชาของดินแดนแห่งนี้ ท่านได้สั่งให้เหล่านักเดินทางเข้าไปช่วยเหลือ พัฒนา และแก้ปัญหาต่าง ๆ ในพื้นที่ทั้ง 16 regions โดยให้ไปรับภารกิจจาก ผู้ปกครองของแต่ละพื้นที่เพื่อแลกเปลี่ยนความรู้และวิทยาการของดินแดน Intania
        </Typography>
      </Box>

      <ButtonBase
        sx={{
          paddingX: "44px",
          paddingY: "10px",
          backgroundColor: "#5B3722",
          borderRadius: "10px",
          filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.4))",
        }}
      >
        <Typography sx={{ color: "#ffffff", fontSize: "16px", fontWeight: 600 }}>
          Scan QR Code to Check-in Booth {" >"}
        </Typography>
      </ButtonBase>

      <Stack spacing={2} sx={{ width: "100%", mt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ color: "#5B3722", fontSize: "20px", fontWeight: 700 }}>กิจกรรมตอนนี้</Typography>
          <ButtonBase>
            <Typography sx={{ color: "#5B3722", fontSize: "14px", fontWeight: 500 }}>ดูเพิ่มเติม {" >"}</Typography>
          </ButtonBase>
        </Box>
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
          {activityData?.activities?.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          )) || <Typography sx={{ color: "#5B3722", opacity: 0.6 }}>ไม่มีกิจกรรมในขณะนี้</Typography>}
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ color: "#5B3722", fontSize: "20px", fontWeight: 700 }}>คอลเลกชัน</Typography>
          <ButtonBase>
            <Typography sx={{ color: "#5B3722", fontSize: "14px", fontWeight: 500 }}>ดูเพิ่มเติม {" >"}</Typography>
          </ButtonBase>
        </Box>
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
          {collections.map((item, index) => (
            <CollectionCard key={index} {...item} />
          ))}
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ color: "#5B3722", fontSize: "20px", fontWeight: 700 }}>
            Workshop ที่น่าสนใจ
          </Typography>
          <ButtonBase>
            <Typography sx={{ color: "#5B3722", fontSize: "14px", fontWeight: 500 }}>
              ดูเพิ่มเติม {" >"}
            </Typography>
          </ButtonBase>
        </Box>
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" }}}>
          {workshopData?.workshops?.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          )) || (
            <Typography sx={{ color: "#5B3722", opacity: 0.6 }}>ไม่มี Workshop ในขณะนี้</Typography>
          )}
        </Box>
      </Stack>

      <Typography sx={{ color: '#5B3722', fontSize: '24px', fontWeight: 700, width: '100%' }}>
        Quick Info
      </Typography>
      <Grid container spacing={2}>
        {QUICK_INFO.map((info) => (
          <Grid key={info.label} size={6}>
            <ButtonBase sx={{ width: '100%', backgroundColor: '#5B3722', borderRadius: '10px', padding: '10px', boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.4)" }}>
              <Typography sx={{ color: '#ffffff', fontWeight: 600 }}>{info.label}</Typography>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
      <Box component="img" src="/banner/sponsor-banner-2.svg" sx={{ width: "100%", mt: 2 }} />
    </Box>
  );
}