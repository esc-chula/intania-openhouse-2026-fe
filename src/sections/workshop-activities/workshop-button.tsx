import { Box } from "@mui/material";
import type { Status } from "@/types/workshop/workshop";

interface WorkshopButtonProps {
  isRegistered: boolean;
  status?: Status;
  onAction: (action: boolean) => void;
}

export function WorkshopButton({
  isRegistered,
  status,
  onAction,
}: WorkshopButtonProps) {
  const commonSx = {
    width: {
      xs: "50%",
      sm: "60%",
    },
    alignSelf: "center",
  };

  if (!isRegistered) {
    return (
      <Box
        component="img"
        src="/button/reserve-button.svg"
        onClick={() => onAction(true)}
        sx={{ ...commonSx, cursor: "pointer" }}
      />
    );
  }

  if (status === "Attended") {
    return (
      <Box component="img" src="/button/check-in-button.svg" sx={commonSx} />
    );
  }

  if (status === "Absent") {
    return (
      <Box component="img" src="/button/overtime-button.svg" sx={commonSx} />
    );
  }

  return (
    <Box
      component="img"
      src="/button/cancel-button.svg"
      onClick={() => onAction(false)}
      sx={{ ...commonSx, cursor: "pointer" }}
    />
  );
}
