import { Box, Typography, Stack } from "@mui/material";
import { TWorkshopItem } from "@/types/workshop/get-workshops-list";

export default function WorkshopCard({ workshop }: { workshop: TWorkshopItem }) {
  const availableSeats = workshop.total_seats - workshop.registered_count;

  return (
    <Box
      sx={{
        minWidth: "280px",
        backgroundColor: "#F9F5F0",
        borderRadius: "15px",
        padding: "16px",
        boxShadow: "0px 4px 3px rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography sx={{ color: "#5B3722", fontSize: "18px", fontWeight: 700 }}>
        {workshop.name}
      </Typography>
      
      <Typography sx={{ color: "#6A7E8F", fontSize: "14px", fontWeight: 500 }}>
        {workshop.location}
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
        <Typography sx={{ color: "#5B3722", fontSize: "14px", fontWeight: 600 }}>
          {workshop.start_time.slice(11, 16)} น. - {workshop.end_time.slice(11, 16)} น.
        </Typography>
        
        <Box sx={{ 
          backgroundColor: availableSeats > 0 ? "#5B3722" : "#D1D1D1", 
          padding: "4px 12px", 
          borderRadius: "20px" 
        }}>
          <Typography sx={{ color: "#ffffff", fontSize: "12px", fontWeight: 600 }}>
            {availableSeats > 0 ? `ว่าง ${availableSeats} ที่นั่ง` : "เต็มแล้ว"}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}