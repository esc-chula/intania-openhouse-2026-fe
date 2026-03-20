import { Box, Typography } from "@mui/material";
import { TActivityItem } from "@/types/activity/get-activities-list";

export default function ActivityCard({ activity }: { activity: TActivityItem }) {
  return (
    <Box
      sx={{
        minWidth: "220px",
        backgroundColor: "#F9F5F0",
        borderRadius: "15px",
        padding: "16px",
        boxShadow: "0px 4px 3px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Typography sx={{ color: "#5B3722", fontSize: "18px", fontWeight: 700, mb: 0.5 }}>
        {activity.title}
      </Typography>
      <Typography sx={{ color: "#6A7E8F", fontSize: "14px", fontWeight: 500 }}>
        {activity.building_name} {activity.start_time.slice(11, 16)}-{activity.end_time.slice(11, 16)}
      </Typography>
    </Box>
  );
}