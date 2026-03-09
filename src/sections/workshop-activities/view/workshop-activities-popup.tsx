import { Box, Stack, Typography, Modal, IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { CardItem, StageItem, WorkshopItem } from "@/components/workshop-acty-card";
import { useState } from 'react';
import BookModal from "@/components/bookModal";


export interface WorkshopActivitiesPopupProps {
  item: CardItem;
  mode: "stage" | "workshop";
  open: boolean;
  onClose: () => void;
}

function WorkshopActyPopUp({item, mode, open, onClose}: WorkshopActivitiesPopupProps) {
    const workshop = item as WorkshopItem;
    const [enroll, setEnroll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const booking = () => {
        setEnroll(!enroll);
        setIsModalOpen(false);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100dvh",
                    bgcolor: "common.black",
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        maxWidth: 425,
                        minHeight: "100dvh",
                        margin: "0 auto",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "100dvh",
                            background: "url('/background/bg-workshop-activities.png')",
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
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                top: 16,
                                left: 16,
                                zIndex: 10,
                                color: "white",
                                boxShadow: 2,
                                borderRadius: '50%',
                                bgcolor: 'rgba(0,0,0,0.2)',
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
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
                            sx={{
                                width: "90%",
                                paddingX: 4.625,
                                alignSelf: "center",
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: -4,
                            }}
                        >   
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0, 
                                    left: "50%",
                                    transform: "translate(-50%, -120%)", 
                                    width: "70%",
                                    zIndex: 3,
                                    display: "flex", 
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/button/base-button.svg"
                                    sx={{
                                        width: "100%",
                                        display: "block",
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        color: "#5B3722",
                                        transform: "translateY(-20%)",
                                        fontSize: '24px', 
                                        fontWeight: 700,
                                        textAlign: 'center',
                                        zIndex: 4,
                                    }}
                                >
                                    {item.title}
                                </Box>
                            </Box>
                            {mode === "stage" && (<>
                            <Box
                                component="img"
                                src="/background/picture-frame.svg"
                                sx={{
                                    width: "100%",
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            />
                            {item.image && (
                                <Box
                                    component="img"
                                    src={item.image}
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "65%", 
                                        height: "auto",
                                        aspectRatio: "4/3",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                        zIndex: 2,
                                    }}
                                />
                            )}
                            </>)}
                        </Box>

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
                    <Box sx={{ position: "relative", width: "100%", zIndex: 4 }}>
                        <Box
                            component="img"
                            src={mode === "stage" ? "/card/acty_hand.svg" : "/card/workshop_hand.svg"}
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                transform: mode === "stage" ? "translateX(-50%) translateY(40%)" : "translateX(-50%) translateY(7%)",
                                width: "77%",
                            }}
                        />
                        </Box>
                        
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: "20%",
                                left: "53%",
                                transform: mode === "stage" ? "translate(-50%, -20%)" : "translate(-50%, -35%)", 
                                width: "60%",
                                height: "auto",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 5,
                            }}
                        >
                            {mode === "workshop" && (<>{item.image && (
                                <Box
                                    component="img"
                                    src={item.image}
                                    sx={{
                                        position: "absolute",
                                        width: "70%", 
                                        height: "auto",
                                        transform: "translateX(-5%) translateY(-130%)",
                                        aspectRatio: "4/3",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                        zIndex: 2,
                                    }}
                                />
                            )}</>)}
                            <Stack spacing={0.5} sx={{ color: "#3B4252" }}>
                                <Typography sx={{ fontSize: "14px", fontFamily: "inherit" }}>
                                    <b>สถานที่:</b> &nbsp; {item.location}
                                </Typography>
                                <Typography sx={{ fontSize: "14px", fontFamily: "inherit" }}>
                                    <b>เวลา:</b> &nbsp; {item.time}
                                </Typography>
                                {mode === "workshop" && (
                                    <>
                                    <Typography sx={{ fontSize: "14px", fontFamily: "inherit" }}>
                                        <b>ภาควิชา:</b> &nbsp; {workshop.department}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px", fontFamily: "inherit" }}>
                                        <b>ลงทะเบียน:</b> &nbsp; {workshop.registered}/{workshop.max} คน
                                    </Typography>
                                    </>
                                )}
                                <Typography sx={{ fontSize: "13px", fontFamily: "inherit" }}>
                                    {item.description}
                                </Typography>
                            </Stack>
                            {mode === "workshop" && (<><Box
                                component="img"
                                src={enroll === true ? "/button/book-cancel.svg" : "/button/book.svg"}
                                onClick={handleOpenModal}
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: "50%",
                                    transform: "translateX(-55%) translateY(120%)",
                                    width: "77%",
                                    '&:hover': {
                                        filter: 'brightness(0.9)',
                                    },
                                    '&:active': {
                                        filter: 'brightness(0.8)',
                                    },
                                }}
                            /></>)}
                        </Box>
                    </Box>
                </Box>
                {isModalOpen && (
                    <BookModal open={isModalOpen} onClose={handleCloseModal} item={item} book={booking} state={enroll}/>
                )}
            </Box>
        </Modal>
    );
}

export default WorkshopActyPopUp;