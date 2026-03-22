"use client";

import {
  Box,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const PRIMARY = "#5B3722";
const CARD_BG = "#F8F3E8";

function TravelDirectionView() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        overflow: "scroll",
        padding: "35px 16px",
        paddingBottom: "80px",
        gap: 3,
        background: "url('/background/bg-landing.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => router.back()} sx={{ p: 0 }}>
          <KeyboardArrowLeftIcon color="primary" />
        </IconButton>
        <Typography
          variant="h5"
          onClick={() => router.back()}
          color="primary"
          fontWeight={500}
          sx={{ cursor: "pointer" }}
        >
          Back
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ backgroundColor: CARD_BG, padding: 1 }}>
        <Stack alignItems="center">
          <Typography
            variant="h3"
            color="primary"
            fontWeight={700}
            textAlign="center"
          >
            วิธีการเดินทาง
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            textAlign="center"
            fontWeight={400}
          >
            มายังคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </Typography>
          <Typography variant="body2" color="primary" textAlign="center">
            <span style={{ fontWeight: 700 }}>Link : </span>
            <Link
              href="https://www.chula.ac.th/contact/map-and-directions/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: PRIMARY, fontWeight: 400 }}
            >
              แผนที่และการเดินทางจุฬาฯ
            </Link>
          </Typography>
        </Stack>
      </Paper>

      <Paper elevation={3} sx={{ backgroundColor: CARD_BG, padding: 2 }}>
        <Stack spacing={1.5}>
          <Stack>
            <Typography variant="caption" sx={{ color: PRIMARY }}>
              ผู้เข้าร่วมงานสามารถเดินทางมายังคณะวิศวกรรมศาสตร์
              จุฬาลงกรณ์มหาวิทยาลัยได้สะดวกด้วยระบบขนส่งสาธารณะ ทั้ง BTS และ MRT
            </Typography>

            <Typography variant="caption" sx={{ color: PRIMARY }}>
              <span style={{ fontWeight: 700 }}>Link : </span>
              <Link
                href="https://www.bts.co.th/routemap.html"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: PRIMARY }}
              >
                ดูแผนที่เส้นทางรถไฟฟ้าบีทีเอส
              </Link>
            </Typography>
            <Typography variant="caption" sx={{ color: PRIMARY }}>
              <span style={{ fontWeight: 700 }}>Link : </span>
              <Link
                href="https://metro.bemplc.co.th/MRT-System-Map"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: PRIMARY }}
              >
                ดูแผนที่เส้นทางรถไฟฟ้ามหานคร
              </Link>
            </Typography>
          </Stack>

          <Divider />

          <Stack>
            <Typography
              variant="subtitle2"
              sx={{ color: PRIMARY, fontWeight: 700 }}
            >
              1. ลงสถานีสยาม (Siam)
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: PRIMARY,

                whiteSpace: "pre-line",
                pl: 1.5,
              }}
            >
              1. นั่ง BTS มาลงที่ สถานีสยาม (Siam)
              {"\n"}2. ออกทาง Exit 2 มุ่งหน้าไปทาง สนามกีฬาแห่งชาติ
              {"\n"}3. เดินผ่านบริเวณ สยามสแควร์ / ศูนย์หนังสือจุฬา
              {"\n"}4. เดินต่อเข้าทาง จุฬาลงกรณ์มหาวิทยาลัย
              {"\n"}5. เดินตรงไปยังบริเวณ คณะวิศวกรรมศาสตร์
              {"\n"}ระยะเวลาเดินประมาณ 15-20 นาที
            </Typography>
          </Stack>

          <Stack>
            <Typography
              variant="subtitle2"
              sx={{ color: PRIMARY, fontWeight: 700 }}
            >
              2. ลงสถานีสนามกีฬาแห่งชาติ (National Stadium)
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: PRIMARY,
                whiteSpace: "pre-line",
                pl: 1.5,
              }}
            >
              1. นั่ง BTS มาลงที่ สถานีสนามกีฬาแห่งชาติ (W1)
              {"\n"}2. ออกทาง Exit 2{"\n"}3. เดินเข้าทาง ถนนพระราม 1 เข้าสู่
              จุฬาลงกรณ์มหาวิทยาลัย
              {"\n"}4. เดินผ่านบริเวณ สนามศุภชลาศัย
              {"\n"}5. เดินตรงต่อไปยัง คณะวิศวกรรมศาสตร์
              {"\n"}ระยะเวลาเดินประมาณ 10-15 นาที
            </Typography>
          </Stack>

          <Divider />

          <Stack>
            <Typography
              variant="subtitle2"
              sx={{ color: PRIMARY, fontWeight: 700 }}
            >
              การเดินทางโดย MRT ลงสถานีสามย่าน (Sam Yan)
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: PRIMARY,
                whiteSpace: "pre-line",
                pl: 1.5,
              }}
            >
              1. นั่ง MRT มาลงที่ สถานีสามย่าน (Sam Yan)
              {"\n"}2. ออกทาง Exit 2{"\n"}3. เดินมายังบริเวณ สามย่านมิตรทาวน์
              {"\n"}4. เดินเข้าทาง ถนนพญาไท / ซอยจุฬาฯ 11
              {"\n"}5. เดินตรงเข้ามาภายในมหาวิทยาลัยประมาณ 10-15 นาที
              {"\n"}6. จะถึงบริเวณ คณะวิศวกรรมศาสตร์
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      <Paper
        elevation={3}
        sx={{ width: 1, backgroundColor: CARD_BG, padding: 1 }}
      >
        <Typography
          variant="h3"
          color="primary"
          fontWeight={700}
          textAlign="center"
        >
          แผนที่จุฬาลงกรณ์มหาวิทยาลัย
        </Typography>
      </Paper>

      <Box
        sx={{
          backgroundColor: CARD_BG,
          padding: 1,
          borderRadius: 1,
        }}
      >
        <Box
          component="img"
          src="/assets/chula-map.webp"
          alt="แผนที่จุฬาลงกรณ์มหาวิทยาลัย"
          sx={{
            width: "100%",
            display: "block",
          }}
        />
      </Box>

      <Box
        component="img"
        src="/banner/sponsor-banner.svg"
        alt="Sponsor"
        sx={{ width: "100%", display: "block" }}
      />
    </Box>
  );
}

export default TravelDirectionView;
