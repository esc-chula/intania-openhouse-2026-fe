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
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";

const USER_FIELDS: string[] = ["first_name", "last_name", "email"];
const QUICK_INFO = [
  { label: 'ข้อมูลภาควิชาและชมรม', href: '/quick-info/department-and-club' },
  { label: 'แผนผังคณะ', href: '/quick-info/map' },
  { label: 'ข้อมูลการเดินทาง', href: '/quick-info/travel-direction' },
  { label: 'Lost & Found', href: '/quick-info/lost-and-found' },
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
          backgroundColor: "#F8F3E8",
          borderRadius: "10px",
          filter: "drop-shadow(0px 4px 3px rgba(0, 0, 0, 0.4))",
        }}
      >
        <Typography sx={{ textAlign: "start", color: "#5B3722", fontFamily: 'var(--font-noto-thai)', fontSize: "14px", fontWeight: 500 }}>
          เหล่านักเดินทางจากทั่วทุกสารทิศได้เดินทางเข้ามา ณ ดินแดน Intania ประเทศแห่งเทคโนโลยีและสิ่งประดิษฐ์ เพื่อหาเทคโนโลยีแห่งยุค<br />เมื่อเหล่านักเดินทางมาถึงจึงได้ขอเข้าเฝ้าราชาของดินแดนแห่งนี้ ท่านได้สั่งให้เหล่านักเดินทางเข้าไปช่วยเหลือ พัฒนา และแก้ปัญหาต่าง ๆ ในพื้นที่ทั้ง 16 regions<br />โดยให้ไปรับภารกิจจาก ผู้ปกครองของแต่ละพื้นที่เพื่อแลกเปลี่ยนความรู้และวิทยาการของดินแดน Intania
        </Typography>
      </Box>

      <Button
        variant="contained"
        component={Link}
        href="/checkin"
        sx={{
          paddingX: "44px",
          paddingY: "10px",
          width: "100%",
          backgroundColor: "#5B3722",
          borderRadius: "10px",
          filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.4))",
          "&:hover": {
            backgroundColor: "#472A1A",
          },
        }}
        endIcon={ <ArrowForwardIosIcon sx={{ fontSize: '14px !important', color: '#ffffff', stroke: '#ffffff', strokeWidth: 1, marginLeft: '4px' }}/>}
      >
        <Typography sx={{ color: "#ffffff", fontFamily: 'var(--font-manrope)', fontSize: "16px", fontWeight: 700 }}>
          Scan QR Code to Check-in Booth
        </Typography>
      </Button>

      <Stack spacing={2} sx={{ width: "100%", mt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ color: "#5B3722", fontFamily: 'var(--font-noto-thai)', fontSize: "20px", fontWeight: 700 }}>กิจกรรมตอนนี้</Typography>
          <Button variant="text" component={Link} href="/workshop-activities" endIcon={ <ArrowForwardIosIcon sx={{ fontSize: '14px !important', stroke: '#5B3722', strokeWidth: 1, marginLeft: '4px' }}/>}
            sx={{
              color: '#5B3722',
              fontFamily: 'var(--font-noto-thai)',
              fontSize: '14px',
              fontWeight: 700,
              width: '92px',
              height: '36px',
              padding: '0 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px #5B3722',
              },
            }}
          >
            ดูเพิ่มเติม
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
          {activityData?.activities?.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          )) || <Typography sx={{ color: "#5B3722", opacity: 0.6 }}>ไม่มีกิจกรรมในขณะนี้</Typography>}
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ color: "#5B3722", fontFamily: 'var(--font-noto-thai)', fontSize: "20px", fontWeight: 700 }}>คอลเลกชัน</Typography>
          <Button variant="text" component={Link} href="/stamp" endIcon={ <ArrowForwardIosIcon sx={{ fontSize: '14px !important', stroke: '#5B3722', strokeWidth: 1, marginLeft: '4px' }}/>}
            sx={{
              color: '#5B3722',
              fontFamily: 'var(--font-noto-thai)',
              fontSize: '14px',
              fontWeight: 700,
              width: '92px',
              height: '36px',
              padding: '0 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px #5B3722',
              },
            }}
          >
            ดูเพิ่มเติม
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
          {collections.map((item, index) => (
            <CollectionCard key={index} {...item} />
          ))}
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ color: "#5B3722", fontFamily: 'var(--font-noto-thai)', fontSize: "20px", fontWeight: 700 }}>
            เวิร์กช็อป
          </Typography>
          <Button variant="text" component={Link} href="/workshop-activities" endIcon={ <ArrowForwardIosIcon sx={{ fontSize: '14px !important', stroke: '#5B3722', strokeWidth: 1, marginLeft: '4px' }}/>}
            sx={{
              color: '#5B3722',
              fontFamily: 'var(--font-noto-thai)',
              fontSize: '14px',
              fontWeight: 700,
              width: '92px',
              height: '36px',
              padding: '0 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px #5B3722',
              },
            }}
          >
            ดูเพิ่มเติม
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" }}}>
          {workshopData?.workshops?.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          )) || (
            <Typography sx={{ color: "#5B3722", opacity: 0.6 }}>ไม่มี Workshop ในขณะนี้</Typography>
          )}
        </Box>
      </Stack>

      <Typography sx={{ color: "#5B3722", fontFamily: 'var(--font-noto-thai)', fontSize: "20px", fontWeight: 700, width: '100%' }}>
        Quick Info
      </Typography>
      <Grid container spacing={2}>
        {QUICK_INFO.map((info) => (
          <Grid key={info.label} size={6}>
            <Button variant="contained" component={Link} href={info.href} sx={{ width: '100%', backgroundColor: '#5B3722', borderRadius: '10px', padding: '10px', boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.4)",
              "&:hover": {
                backgroundColor: "#472A1A",
              },
            }}>
              <Typography sx={{ color: "#ffffff", fontFamily: 'var(--font-noto-thai)', fontSize: "14px", fontWeight: 700  }}>{info.label}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box component="img" src="/banner/sponsor-banner-2.svg" sx={{ width: "100%", mt: 2 }} />
    </Box>
  );
}