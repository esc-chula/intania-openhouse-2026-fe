import MainLayout from "@/layouts/main/layout";
import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <MainLayout background>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
        }}
      >
        <CircularProgress />
      </Box>
    </MainLayout>
  );
}
