import { Box, Stack, Typography } from "@mui/material";
import { LandingLoginButton } from "../landing-login-button";
import { LandingRegisterButton } from "../landing-register-button";

function LandingView() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        background: "url('/background/bg-landing.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Box
          component="img"
          src="/border/border-top.svg"
          sx={{
            width: "100%",
            paddingTop: 2.25,
            paddingX: 2.3,
          }}
        />

        <Box
          component="img"
          src="/logo/main-logo.svg"
          sx={{
            width: "100%",
            marginTop: "-7dvh",
            "@media (max-height: 840px)": {
              width: "90%",
              marginTop: "-11dvh",
            },
            "@media (max-height: 750px)": {
              width: "80%",
              marginTop: "-14dvh",
            },
            "@media (max-height: 650px)": {
              width: "70%",
              marginTop: "-20dvh",
            },
            paddingX: 4.625,
            alignSelf: "center",
          }}
        />

        <Stack
          spacing={2}
          sx={{
            marginTop: "auto",
            marginBottom: "10.8dvh",
            alignItems: "center",
            width: "100%",
            zIndex: 1,
          }}
        >
          <LandingLoginButton />

          <Box
            component="img"
            src="/icon/ic-arrow.svg"
            sx={{
              width: "auto",
            }}
          />

          <Typography
            variant="subtitle1"
            sx={{
              color: "#5B3722",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <LandingRegisterButton />
          </Typography>
        </Stack>

        <Box
          component="img"
          src="/border/border-bottom.svg"
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingBottom: 2.25,
            paddingX: 2.3,
          }}
        />
      </Box>

      <Box
        component="img"
        src="/banner/sponsor-banner.svg"
        sx={{
          width: "100%",
          paddingX: 0.75,
          paddingBottom: 2.5,
        }}
      />
    </Box>
  );
}

export default LandingView;
