"use client";
import { Box, Stack, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { WorkshopActyCard, CardItem } from "@/components/workshop-acty-card"
import { UserProfileCard, User } from "@/components/user-profile-card"

interface ProfileViewProps {
  initialWorkshopData: CardItem[];
  userData: User;
}

export default function ProfileView({ initialWorkshopData, userData }: ProfileViewProps) {
    const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleCardClick = (item: CardItem) => {
        setSelectedItem(item);
    };

    const data: CardItem[] = initialWorkshopData;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100dvh",
                background: "url('/background/bg-workshop-activities.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                gap: 2,
                padding: "25px 25px",
            }}
        >  
            <UserProfileCard user={userData} />
            <Box
                sx={{
                    position: 'relative',
                    width: "70%",
                }}
            >
                <Box
                    component="img"
                    src="/button/base-button.svg"
                    sx={{
                        width: '100%',
                        display: 'block',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: "#5B3722",
                        fontSize: '18px',
                        fontWeight: 600,
                        textAlign: 'center',
                    }}
                >
                    My Booking
                </Box>
            </Box>
            
            <Stack
                ref={scrollRef}
                spacing={2}
                sx={{
                    flexGrow: 1, 
                    width: "100%",
                    maxWidth: "500px",
                    paddingTop: 1,
                    paddingBottom: 4, 
                    overflowY: "auto", 
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >   
                {data.length === 0 ? (
                    <Box
                        sx={{
                            padding: "30px",
                        }}>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                color: '#5C3722',
                                fontSize: '18px',
                                fontWeight: 600,
                            }}
                        >
                            ยังไม่มีกิจกรรมที่ลงทะเบียน
                        </Typography>
                    </Box>
                ) : (
                    data.map((item) => (
                        <Box
                            key={item.id}
                            onClick={() => handleCardClick(item)}
                            sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
                        >
                            <WorkshopActyCard item={item} mode={"workshop"} />
                        </Box>
                    ))
                )}
            </Stack>

            <Stack
                spacing={2}
                sx={{
                    marginTop: "auto",
                    alignItems: "center",
                    width: "100%",
                }}
            >
            </Stack>
        </Box>
    );
}
