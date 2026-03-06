"use client";
import { Box, Stack, ToggleButton, ToggleButtonGroup, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import React from "react";
import { WorkshopActyCard, CardItem } from "@/components/workshop-acty-card";


export interface WorkshopAndActivitiesViewProps {
    initialStageData: CardItem[]; 
    initialWorkshopData: CardItem[];
}

export default function WorkshopAndActivitiesView({initialStageData, initialWorkshopData,}: WorkshopAndActivitiesViewProps) {
    const [mode, setMode] = useState<"stage" | "workshop">("stage");
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        value: "stage" | "workshop"
    ) => {
        setMode(value);
    };

    const data: CardItem[] = mode === "stage" ? initialStageData : initialWorkshopData;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100dvh",
                background: "url('/background/bg-workshop-activities.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                gap: 2,
                padding: "25px 25px",
            }}
        >  
            <Box
                sx={{
                    position: 'relative',
                    width: "70%",
                }}
            >
                <Box
                    component="img"
                    src="/banner/banner-no-text.svg"
                    sx={{
                        width: '100%',
                        display: 'block',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: "#5B3722",
                        fontSize: '16px',
                        fontWeight: 600,
                        textAlign: 'center',
                    }}
                >
                    กิจกรรมและ<br />เวิร์คช็อป
                </Box>
            </Box>
            <Box
                component="img"
                src={mode === "workshop" ? "/background/bg-img-workshop.svg" : "/background/bg-img-acty.svg"}
                sx={{
                width: "100%",
                }}
            />

            <ToggleButtonGroup
                color="primary"
                value={mode}
                exclusive
                aria-label="Platform"
                onChange={handleChange}
                sx={{
                    backgroundColor: "#F5F0E6",
                    borderRadius: "50px",
                    padding: "5px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                    border: "none",
                    gap: 1,
                    "& .MuiToggleButtonGroup-grouped": {
                        border: "none",
                        borderRadius: "50px",
                        padding: "8px 15px",
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#5C3722",
                        "&.Mui-selected": {
                            backgroundColor: "#5C3D2E", 
                            color: "#FFFFFF", 
                            "&:hover": {
                                backgroundColor: "#4A3125", 
                            },
                        },
                    }
                }}
                >
                <ToggleButton value="stage">ตารางกลางเวที</ToggleButton>
                <ToggleButton value="workshop">เวิร์คช็อป</ToggleButton>
            </ToggleButtonGroup>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#F5F0E6", 
                    borderRadius: "6px", 
                    padding: "4px 20px",
                    width: "100%",
                    maxWidth: "500px", 
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                    border: 2,
                    borderColor: "#E5E8EB"
                }}
                >
                <InputBase
                    placeholder={mode === "workshop" ? "ค้นหาเวิร์คช็อป" : "ค้นหาตารางเวลาเวที"}
                    sx={{
                        flex: 1,
                        fontSize: "30px",
                        fontFamily: "inherit",
                        color: "#5C3722",
                        "& input::placeholder": {
                            color: "#6B7280", 
                            opacity: 1, 
                        },
                    }}
                />
                <SearchIcon sx={{ color: "#6B7280", fontSize: "35px", cursor: "pointer" }} />
            </Box>
            
            <Stack
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
                {data.map((item) => (
                    <WorkshopActyCard key={item.id} item={item} mode={mode} />
                ))}
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
