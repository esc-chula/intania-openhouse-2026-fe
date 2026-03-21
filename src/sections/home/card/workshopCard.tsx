import { Box, Typography, Chip } from "@mui/material";
import { TWorkshopItem } from "@/types/workshop/get-workshops-list";
import Link from "next/link";

export default function WorkshopCard({ workshop }: { workshop: TWorkshopItem }) {
  const availableSeats = workshop.total_seats - workshop.registered_count;

  return (
    <Link href={`/workshop/${workshop.id}`} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          width: "160px",
          backgroundColor: "#F8F3E8",
          borderRadius: "15px",
          padding: "16px 20px",
          boxShadow: "0px 4px 3px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: 0.5
        }}
      >
        <Typography sx={{ color: "#5B3722", fontFamily: "var(--font-noto-thai)", fontSize: "20px", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {workshop.name}
        </Typography>
        <Typography sx={{ color: "#637381", fontFamily: "var(--font-noto-thai)", fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {workshop.location}
        </Typography>

        <Typography sx={{ color: "#637381", fontFamily: "var(--font-noto-thai)", fontSize: "14px", fontWeight: 500 }}>
          {workshop.start_time.slice(11, 16)} น. - {workshop.end_time.slice(11, 16)} น.
        </Typography>

        <Chip
          label={availableSeats > 0 ? `เหลืออีก ${availableSeats} ที่เท่านั้น` : "เต็มแล้ว"}
          size="small"
          sx={{
            alignSelf: "flex-start",
            backgroundColor: "#FFE7E7",
            color: "#5B3722",
            fontFamily: "var(--font-noto-thai)",
            fontSize: "12px",
            fontWeight: 700,
            borderRadius: "12px",
            "& .MuiChip-label": {
              padding: "0 10px",
            },
          }}
        />
      </Box>
    </Link>
  );
}