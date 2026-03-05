"use client";
import { Box, Stack, ToggleButton, ToggleButtonGroup, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import React from "react";

const mockStageData = [
    { id: 1, title: "Stepout", location: "ลานเกียร์", time: "11:00 น. - 12:00 น.", status: "ตอนนี้" },
    { id: 2, title: "IMC", location: "ลานเกียร์", time: "13:00 น. - 14:00 น.", status: "" },
    { id: 3, title: "Patt Recog", location: "หอประชุม", time: "13:00 น. - 14:00 น.", status: "" },
    { id: 4, title: "Comp Theory", location: "หอประชุม", time: "16:00 น. - 17:00 น.", status: "" },
];

const mockWorkshopData = [
    { id: 1, title: "Mechanical", location: "ลานเกียร์", time: "11:00 น. - 12:00 น.", department: "วิศวกรรมเครื่องกล", registered: 15, max: 20 },
    { id: 2, title: "Computer", location: "ตึก 100 ปี", time: "13:00 น. - 15:00 น.", department: "วิศวกรรมคอมพิวเตอร์", registered: 30, max: 30 },
    { id: 3, title: "Civil", location: "ตึก 3", time: "09:00 น. - 11:00 น.", department: "วิศวกรรมโยธา", registered: 10, max: 25 },
];

export default function WorkshopAndActivitiesView() {
    const [mode, setMode] = useState<"stage" | "workshop">("stage");
    const handleChange = (event: React.MouseEvent<HTMLElement>, value: "stage" | "workshop") => {
        setMode(value);
    };
    const data = mode === "stage" ? mockStageData : mockWorkshopData;
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
                {data.map((item: any) => (
                    <Box key={item.id} sx={{ position: 'relative', width: '100%' }}>
                        <Box
                            component="img"
                            src={mode === "workshop" ? "/card/workshop-card.svg" : "/card/acty-card.svg"}
                            sx={{
                                width: "100%",
                                display: "block",
                                objectFit: "contain",
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                padding: "30px 72px", 
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center', 
                                gap: 1,
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: "#5B3722", fontFamily: "inherit" }}>
                                    {item.title}
                                </Typography>
                                {item.status && (
                                    <Box sx={{ backgroundColor: "#D4EDDA", color: "#155724", padding: "2px 12px", borderRadius: "12px", fontSize: "14px", fontWeight: 700 }}>
                                        {item.status}
                                    </Box>
                                )}
                            </Stack>
                            
                            <Stack spacing={0.5} sx={{ color: "#3B4252" }}>
                                <Typography sx={{ fontSize: "15px", fontFamily: "inherit" }}>
                                    <b>สถานที่:</b> &nbsp; {item.location}
                                </Typography>
                                <Typography sx={{ fontSize: "15px", fontFamily: "inherit" }}>
                                    <b>เวลา:</b> &nbsp; {item.time}
                                </Typography>
                                {mode === "workshop" && (
                                    <>
                                        <Typography sx={{ fontSize: "15px", fontFamily: "inherit" }}>
                                            <b>ภาควิชา:</b> &nbsp; {item.department}
                                        </Typography>
                                        <Typography sx={{ fontSize: "15px", fontFamily: "inherit" }}>
                                            <b>ลงทะเบียน:</b> &nbsp; {item.registered}/{item.max} คน
                                        </Typography>
                                    </>
                                )}
                            </Stack>
                        </Box>
                    </Box>
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
