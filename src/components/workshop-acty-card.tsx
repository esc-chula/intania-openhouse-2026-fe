import { Box, Stack, Typography } from "@mui/material";

export interface StageItem {
  id: number;
  title: string;
  location: string;
  time: string;
  status?: string;
}

export interface WorkshopItem extends StageItem {
  department: string;
  registered: number;
  max: number;
}

export type CardItem = StageItem | WorkshopItem;

export interface WorkshopActyCardProps {
  item: CardItem;
  mode: "stage" | "workshop";
}

export function WorkshopActyCard({ item, mode }: WorkshopActyCardProps) {
  const workshop = item as WorkshopItem;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        component="img"
        src={
          mode === "workshop" ? "/card/workshop-card.svg" : "/card/acty-card.svg"
        }
        sx={{
          width: "100%",
          display: "block",
          objectFit: "contain",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: "30px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "#5B3722", fontFamily: "inherit" }}
          >
            {item.title}
          </Typography>
          {item.status && (
            <Box
              sx={{
                backgroundColor: "#D4EDDA",
                color: "#155724",
                padding: "2px 12px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {item.status}
            </Box>
          )}
        </Stack>

        <Stack spacing={0.5} sx={{ color: "#3B4252" }}>
          <Typography sx={{ fontSize: "15px", fontFamily: "inherit" }}>
            <b>สถานที่:</b> &nbsp; {item.location}
          </Typography>
          <Typography sx={{ fontSize: "15px", fontFamily: "inherit" }}>
            <b>เวลา:</b> &nbsp; {item.time}
          </Typography>
          {mode === "workshop" && (
            <>
              <Typography sx={{ fontSize: "15px", fontFamily: "inherit" }}>
                <b>ภาควิชา:</b> &nbsp; {workshop.department}
              </Typography>
              <Typography sx={{ fontSize: "15px", fontFamily: "inherit" }}>
                <b>ลงทะเบียน:</b> &nbsp; {workshop.registered}/{workshop.max} คน
              </Typography>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
