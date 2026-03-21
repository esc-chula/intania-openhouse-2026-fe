import { Box, Stack, Typography, Avatar } from "@mui/material";

export interface User {
  name: string,
  email: string,
  bookingCount: Number,
  stampCount: Number,
  image: string
}

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Box sx={{ position: "relative", width: "90%", containerType: "inline-size"}}>
        <Box
            component="img"
            src="/card/user-card.svg"
            sx={{
                width: "100%",
                display: "block",
                objectFit: "contain",
                filter: "drop-shadow(0px 5px 2px rgba(0,0,0,0.3))"
            }}
        />

        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                padding: "5% 15%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5,
            }}
        > 
            <Box 
                sx={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "100px",
                    overflow: "hidden",
                }}>
                <Avatar
                    alt="Avatar"
                    variant="circular"
                    src={user.image}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </Box>
            <Stack sx={{alignItems: "center", mt: -1}}>
                <Typography sx={{ fontFamily: "var(--font-noto-thai)", fontSize: "20px", fontWeight: 500, color: "#5B3722" }}>
                    {user.name}
                </Typography>
                <Typography sx={{ fontFamily: "var(--font-noto-thai)", fontSize: "16px", fontWeight: 500, color: "#5B3722" }}>
                    {user.email}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
                <Box sx={{ width: "88px", height: "56px", border: "1.5px solid #5B3722", borderRadius: "8px", p: "4px 8px", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontFamily: "var(--font-manrope)", fontSize: "16px", fontWeight: 700, color: "#5B3722" }}>{String(user.bookingCount)}</Typography>
                    <Typography sx={{ fontFamily: "var(--font-manrope)", fontSize: "16px", fontWeight: 700, color: "#5B3722" }}>Bookings</Typography>
                </Box>
                <Box sx={{ width: "76px", height: "56px", border: "1.5px solid #5B3722", borderRadius: "8px", p: "4px 8px", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontFamily: "var(--font-manrope)", fontSize: "16px", fontWeight: 700, color: "#5B3722" }}>{String(user.stampCount)}</Typography>
                    <Typography sx={{ fontFamily: "var(--font-manrope)", fontSize: "16px", fontWeight: 700, color: "#5B3722" }}>Stamps</Typography>
                </Box>
            </Stack>
        </Box>
    </Box>
  );
}
