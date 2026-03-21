import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface CollectionCardProps {
  label: string;
  current: number;
  total: number;
}

export default function CollectionCard({ label, current, total }: CollectionCardProps) {
  return (
    <Link href={`/stamp`} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          minWidth: "108px",
          backgroundColor: "#F8F3E8",
          borderRadius: "15px",
          padding: "16px",
          boxShadow: "0px 4px 3px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography sx={{ color: "#5B3722", fontFamily: 'var(--font-noto-thai)', fontSize: "16px", fontWeight: 500 }}>
          {label}
        </Typography>
        <Typography sx={{ color: "#637381", fontFamily: 'var(--font-noto-thai)', fontSize: "14px", fontWeight: 500 }}>
          {current}/{total} Stamps
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "12px",
            backgroundColor: "#E0E0E0",
            borderRadius: "10px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${(current / total) * 100}%`,
              height: "100%",
              backgroundColor: "#5B3722",
              borderRadius: "10px",
              transition: "width 0.5s ease-in-out",
            }}
          />
        </Box>
      </Box>
    </Link>
  );
}