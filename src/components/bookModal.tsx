import { Box, Modal, Typography, Stack } from "@mui/material";
import { CardItem } from "@/components/workshop-acty-card";

export interface WorkshopBook {
    item: CardItem;
    open: boolean;
    onClose: () => void;
    book: () => void;
    state: boolean;
}

function BookModal({item, open, onClose, book, state}: WorkshopBook) {
    return (
        <Modal open={open} onClose={onClose} sx={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
            <Box sx={{
                display: "flex",  
                alignItems: "center", 
                justifyContent: "center",
                minHeight: "100dvh",
                outline: "none",
                padding: 2,
            }}>
                <Box sx={{
                    width: "100%",
                    maxWidth: "350px", 
                    position: "relative", 
                }}>
                    <Box
                        component="img"
                        src="/background/booking-bg.svg"
                        sx={{
                            width: "100%",
                            display: "block",
                            filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.2))"
                        }}
                    />
                    <Box 
                        sx={{
                            position: "absolute",
                            display: "flex",
                            top: 0, left: 0, right: 0, bottom: 0,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "24px 32px",
                            paddingTop: "40px",
                            textAlign: "center",
                            gap: 1.5,
                        }}>
                        <Typography 
                            sx={{ 
                                color: "#5B3722",
                                fontSize: '24px', 
                                fontWeight: 700,
                            }}>
                            {state === true ? "ยกเลิกเวิร์คช็อป" : "จองเวิร์คช็อป"}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: 500,
                                color: "#637381",
                                fontFamily: "inherit",
                                lineHeight: 1.4,
                                marginBottom: "16px",
                            }}
                        >
                            {state === true ? (
                                <>เมื่อยกเลิกการจองแล้ว<br />ยังสามารถทำการจองใหม่ได้</>
                            ) : (
                                <>กด “จอง” เพื่อสำรองที่นั่ง<br />สำหรับเวิร์คช็อปนี้</>
                            )}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                            <Box
                                component="button"
                                onClick={onClose}
                                sx={{
                                    flex: 1,
                                    padding: "10px 0",
                                    borderRadius: "8px",
                                    border: "2px solid #637381",
                                    backgroundColor: "transparent",
                                    color: "#637381",
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    fontFamily: "inherit",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    "&:hover": { backgroundColor: "rgba(132, 147, 165, 0.1)" },
                                    "&:active": { transform: "scale(0.95)" },
                                }}
                            >
                                ปิด
                            </Box>
                            <Box
                                component="button"
                                onClick={book}
                                sx={{
                                    flex: 1,
                                    padding: "10px 0",
                                    borderRadius: "8px",
                                    border: "none",
                                    backgroundColor: state === true ? "#B71931" : "#267F59",
                                    color: "#FFFFFF",
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    fontFamily: "inherit",
                                    cursor: "pointer",
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
                                    transition: "all 0.2s",
                                    "&:hover": { filter: "brightness(0.9)" },
                                    "&:active": { filter: "brightness(0.8)", transform: "scale(0.95)" },
                                }}
                            >
                                {state === true ? "ยืนยัน" : "จอง"}
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default BookModal;