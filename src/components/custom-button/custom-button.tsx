import {
  ButtonBase,
  ButtonBaseProps,
  SxProps,
  Theme,
  Box,
  Typography,
} from "@mui/material";
import React from "react";

interface CustomButtonProps extends ButtonBaseProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export function CustomButton({ children, sx, ...other }: CustomButtonProps) {
  return (
    <ButtonBase
      disableRipple
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 258,
        aspectRatio: "258 / 58",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "transform 0.1s",
        "&:active": {
          transform: "scale(0.98)",
        },
        ...sx,
      }}
      {...other}
    >
      <Box
        component="img"
        src="/button/base-button.svg"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% * 274 / 258)",
          height: "calc(100% * 74 / 58)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Typography
        variant="subtitle1"
        sx={{
          position: "relative",
          top: -5,
          zIndex: 1,
          color: "primary.main",
          fontWeight: 700,
        }}
      >
        {children}
      </Typography>
    </ButtonBase>
  );
}
