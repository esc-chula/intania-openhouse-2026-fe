"use client";
import { Box, Stack, Typography, ButtonBase } from "@mui/material";
import { useState, useRef } from "react";
import { WorkshopActyCard, CardItem } from "@/components/workshop-acty-card"
import { UserProfileCard } from "@/components/user-profile-card"
import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "@/services/user/query/user-query";
import { userBookingsQueryKeys } from "@/services/user/query/user-booking-query";
import { userStampsQueryKeys } from "@/services/user/query/user-stamp-query";
import { Button } from '@mui/material';

const USER_FIELDS: string[] = ["first_name", "last_name", "email"];

export default function ProfileView() {
    const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const formatThaiDateFull = (dateStr: string) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('th-TH', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

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
        date: formatThaiDateFull(b.workshop.event_date),
        time: b.workshop.start_time + " น. - " + b.workshop.end_time + " น.",
        affiliation: b.workshop.affiliation,
        status: "จองแล้ว",
        registered: b.workshop.registered_count, 
        max: b.workshop.total_seats,
        description: "",
        image:"",
    })) || [];

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
                padding: "25px 25px",
                gap: 2
            }}
        >  
            <UserProfileCard user={UserData} />
            <Box
                component="img"
                src="/banner/booking-banner.svg"
                sx={{
                    width: '70%',
                    display: 'block',
                }}
            />
            <Stack
                spacing={1}
                sx={{
                    width: "100%",
                    maxWidth: "500px",
                    paddingTop: 1,
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    mt: -2
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
                component="img"
                src="/banner/certificate-banner.svg"
                sx={{
                    width: '70%',
                    display: 'block',
                }}
            />
            
            <Box
                sx={{
                    width: "90%",
                    maxWidth: "292px",
                    backgroundColor: "#F8F3E8",
                    borderRadius: "8px",
                    padding: "16px",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))",
                    mt: -1,
                }}
            >
                <Typography
                    sx={{
                        color: '#212B36',
                        fontFamily: 'var(--font-noto-thai)',
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: 1.6,
                        textAlign: "start", 
                        wordBreak: "break-word", 
                        overflowWrap: "break-word",
                    }}
                >
                    เงื่อนไขการรับเกียรติบัตร<br/>ประเภทที่ 1: เกียรติบัตรเข้าร่วมกิจกรรม (Participation Certificate)<br/>เยี่ยมชมบูธกิจกรรมภาควิชา จำนวน 5 ภาควิชาขึ้นไป หรือเยี่ยมชมบูธกิจกรรมชมรม จำนวน 3 ชมรมขึ้นไป<br/>ประเภทที่ 2: เกียรติบัตรเข้าร่วมการอบรม (Workshop Certificate) เข้าร่วมกิจกรรม Workshop อย่างน้อย 1 รายการ
                </Typography>
            </Box>
            <Button
                variant="contained"
                href="https://forms.gle/2GY62wJrT8oTaUkh8"
                target="_blank" 
                sx={{
                    width: "157px", 
                    height: "32px", 
                    backgroundColor: '#5B3722',
                    borderRadius: "6px",
                    padding: "6px 16px",
                    boxShadow: 'none',
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3))",
                    color: '#ffffff',
                    fontFamily: 'var(--font-noto-thai)',
                    fontSize: '14px',
                    fontWeight: 700,
                    '&:hover': {
                        backgroundColor: '#4a2c1b',
                        boxShadow: 'none',
                    },
                    '&:active': {
                        backgroundColor: '#3e2414',
                        boxShadow: 'none',
                    }
                }}
                >
                ประเมินความพึงพอใจ
            </Button>
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
