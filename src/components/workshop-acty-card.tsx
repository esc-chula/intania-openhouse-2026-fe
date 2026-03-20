import { Box, Stack, Typography } from "@mui/material";

export interface StageItem {
  id: number;
  title: string;
  location: string;
  date: string; // 👈 1. เพิ่มฟิลด์วันที่
  time: string;
  status?: string;
  image?: string;
  description: string;
}

export interface WorkshopItem extends StageItem {
  affiliation: string;
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
    <Box sx={{ position: "relative", width: "100%", containerType: "inline-size" }}>
      <Box
        component="img"
        src={mode === "workshop" ? "/card/workshop-card.svg" : "/card/acty-card.svg"}
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
          padding: "24px 56px", 
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1.5,
            width: "100%", 
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowX: "auto",
              whiteSpace: "nowrap",
              msOverflowStyle: "none", 
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" }
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#5B3722",
                fontFamily: "var(--font-noto-thai)",
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              {item.title}
            </Typography>
          </Box>

          {item.status && (
            <Box
              sx={{
                flexShrink: 0, 
                backgroundColor: "#D4EDDA",
                color: "#155724",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "var(--font-noto-thai)",
              }}
            >
              {item.status}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "max-content 1fr", 
            columnGap: "16px",
            color: "#212B36",
            fontFamily: "var(--font-noto-thai)",
            fontSize: "16px",
            fontWeight: 500,
            width: "100%",
            overflowX: "auto",
            whiteSpace: "nowrap",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" }
          }}
        >
          <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>สถานที่:</Typography>
          <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>{item.location}</Typography>
          <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>วันที่:</Typography>
          <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>{item.date}</Typography>
          <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>เวลา:</Typography>
          <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>{item.time}</Typography>
          {mode === "workshop" && (
            <>
              <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>ภาควิชา:</Typography>
              <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>{workshop.affiliation}</Typography>

              <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>ลงทะเบียน:</Typography>
              <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>{workshop.registered}/{workshop.max} คน</Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}