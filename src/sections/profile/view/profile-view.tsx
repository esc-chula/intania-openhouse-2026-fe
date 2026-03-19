"use client";
import { Box, Stack, Typography, ButtonBase } from "@mui/material";
import { useState, useRef } from "react";
import { WorkshopActyCard, CardItem } from "@/components/workshop-acty-card"
import { UserProfileCard } from "@/components/user-profile-card"
import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "@/services/user/query/user-query";
import { userBookingsQueryKeys } from "@/services/user/query/user-booking-query";
import { userStampsQueryKeys } from "@/services/user/query/user-stamp-query";

const USER_FIELDS: string[] = ["first_name", "last_name", "email"];

export default function ProfileView() {
    const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleCardClick = (item: CardItem) => {
        setSelectedItem(item);
    };

    const { data: user, isLoading: isLoading, isError: isError} = useQuery(
        usersQueryKeys.meOptions({ fields: USER_FIELDS }) 
    );

    const { data: bookingData, isLoading: isBookingLoading, isError: isBookingError } = useQuery(
        userBookingsQueryKeys.meOptions()
    );

    const { data: stampData, isLoading: isStampLoading, isError: isStampError } = useQuery(
        userStampsQueryKeys.meOptions()
    );

    if (isLoading) {
        return <div>กำลังโหลดข้อมูลโปรไฟล์</div>;
    }

    if (isError || !user) {
        return <div>กรุณาเข้าสู่ระบบ</div>;
    }

    if (isBookingError || !user || isStampError) {
        return <div>เกิดความผิดพลาด</div>;
    }

    const UserData = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        bookingCount: bookingData?.bookings?.length || 0,
        stampCount: stampData?.total_count || 0,
        image: user.google_photo_url, 
    };

    const WorkshopData: CardItem[] = bookingData?.bookings?.map((b) => ({
        id: b.workshop_id,
        title: b.workshop.name,
        location: b.workshop.location,
        time: b.workshop.start_time,
        department: "",
        status: b.status,
        registered: b.workshop.registered_count, 
        max: b.workshop.total_seats,
        description: "",
        image:"",
    })) || [];

    /*const UserData = {
        name: "Name Namename",
        email: "676767@gmail.com",
        bookingCount: 2,
        stampCount: 5,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nattee", 
    };

    const WorkshopData: CardItem[] = [
        {
            id: 1,
            title: "Patt recog",
            location: "18-16",
            time: "09:00 - 12:00",
            department: "Computer Engineering",
            status: "จองแล้ว",
            registered: 48,
            max: 50,
            description: "",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop", 
        },
        {
            id: 2,
            title: "Comp theory",
            location: "18-16",
            time: "13:00 - 15:00",
            department: "Computer Engineering",
            status: "จองแล้ว",
            registered: 25,
            max: 30,
            description: "",
            image: "https://images.unsplash.com/photo-1541888081622-441d3d62327c?q=80&w=600&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "DSDE",
            location: "18-16",
            time: "13:00 - 15:00",
            department: "Computer Engineering",
            status: "จองแล้ว",
            registered: 25,
            max: 30,
            description: "",
            image: "https://images.unsplash.com/photo-1541888081622-441d3d62327c?q=80&w=600&auto=format&fit=crop",
        }
    ];*/ // MOCK DATA

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100dvh",
                background: "url('/background/bg-workshop-activities.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                gap: 2,
                padding: "25px 25px",
            }}
        >  
            <UserProfileCard user={UserData} />
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
                spacing={2}
                sx={{
                    width: "100%",
                    maxWidth: "500px",
                    paddingTop: 1,
                    paddingBottom: 4,  
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                }}
            >   
                {WorkshopData.length === 0 ? (
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
                    WorkshopData.map((item) => (
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
                    Certificate
                </Box>
            </Box>
            
            <Box
                sx={{
                    width: "90%",
                    maxWidth: "500px",
                    backgroundColor: "#FDF9F3",
                    borderRadius: "16px",
                    padding: "20px",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))",
                    mt: -1,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: "#212B36",
                        lineHeight: 1.6,
                        textAlign: "justify", 
                        fontFamily: "inherit",
                        wordBreak: "break-word", 
                        overflowWrap: "break-word",
                    }}
                >
                    TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
                    TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
                </Typography>
            </Box>
            <ButtonBase
                sx={{
                    paddingX: "20px",
                    paddingY: "10px",
                    backgroundColor: '#5B3722',
                    borderRadius: "10px",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))",
                    '&:hover': {
                        backgroundColor: '#4a2c1b',
                    },
                    '&:active': {
                        backgroundColor: '#3e2414',
                    }
                }}>
                <Typography
                    sx={{
                        textAlign: 'center',
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: 600,
                    }}
                >
                    ประเมินความพึงพอใจ
                </Typography>
            </ButtonBase>
            <Box
                component="img"
                src="/banner/sponsor-banner-2.svg"
                sx={{
                    width: '100%',
                    display: 'block',
                }}
            />
        </Box>
    );
}
