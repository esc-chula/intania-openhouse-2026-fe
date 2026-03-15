"use client";
import { color } from "@/theme/core/colors";
import {
  Box,
  ButtonBase,
  CircularProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { workshopQueryKeys } from "@/services/workshop/query/workshop-query";
import dayjs from "dayjs";
import { BackButton } from "@/components/back-button";

export default function WorkshopView() {
  const params = useParams<{ id: string }>();
  const [reserve, setReserve] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<boolean | null>(null);

  const {
    data: workshop,
    isLoading,
    isError,
  } = useQuery(workshopQueryKeys.detailOptions(params.id));

  const handleButtonClick = (action: boolean) => {
    setPendingAction(action);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (pendingAction !== null) {
      setReserve(pendingAction);
    }
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100dvh", background: "url('/background/bg-landing.png')", backgroundSize: "cover" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !workshop) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100dvh", background: "url('/background/bg-landing.png')", backgroundSize: "cover" }}>
        <Typography color="error">Failed to load workshop data</Typography>
      </Box>
    );
  }

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
          padding: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 3,
        }}
      >
        <BackButton sx={{ alignSelf: "flex-start" }} />
        <Box
          sx={{
            position: "relative",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Box
            component="img"
            src="/banner/activity-banner.svg"
            sx={{
              width: "80%",
              display: "block",
              marginX: "auto",
            }}
          />
          <Typography
            variant="h3"
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: color.PRIMARY_MAIN,
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            {workshop.name}
          </Typography>
        </Box>
        <Stack
          sx={{
            display: "flex",
            backgroundColor: "#F8F3E8",
            flexDirection: "column",
            alignSelf: "center",
            paddingX: 2,
            paddingY: 3,
            gap: 2,
            borderRadius: 1,
            boxShadow:
              "0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.20)",
          }}
        >
          <Box
            component="img"
            src="/example.png"
            sx={{
              width: "75%",
              objectFit: "cover",
              display: "block",
              alignSelf: "center",
            }}
          />
          <Stack marginX={4}>
            <Typography variant="body2">
              สถานที่: {workshop.location}
            </Typography>
            <Typography variant="body2">
              เวลา: {dayjs(workshop.start_time).format("HH:mm")} -{" "}
              {dayjs(workshop.end_time).format("HH:mm")}
            </Typography>
            <Typography variant="body2">
              ภาควิชา: {workshop.affiliation}
            </Typography>
            <Typography variant="body2">
              ลงทะเบียน: {workshop.registered_count} / {workshop.total_seats}
            </Typography>
          </Stack>
          <Typography variant="caption" marginX={4}>
            {workshop.description}
          </Typography>
        </Stack>
        {reserve === false ? (
          <Box
            component="img"
            src="/button/reserve-button.svg"
            onClick={() => handleButtonClick(true)}
            sx={{
              width: {
                xs: "50%",
                sm: "60%",
                alignSelf: "center",
              },
            }}
          />
        ) : (
          <Box
            component="img"
            src="/button/cancel-button.svg"
            onClick={() => handleButtonClick(false)}
            sx={{
              width: {
                xs: "50%",
                sm: "60%",
                alignSelf: "center",
              },
            }}
          />
        )}
      </Box>
      <Modal
        open={dialogOpen}
        onClose={handleCancel}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
            minHeight: 400,
            backgroundImage: "url('/background/confirm-modal.svg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "60px",
            paddingBottom: "30px",
            paddingX: 4,
            position: "relative",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: color.PRIMARY_MAIN,
              marginTop: "75px",
            }}
          >
            {pendingAction === true
              ? "จองเวิร์คช็อป"
              : "ยกเลิกการจองเวิร์คช็อป"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: color.TEXT_SECONDARY,
              textAlign: "center",
              marginBottom: "32px",
              maxWidth: "80%",
            }}
          >
            {pendingAction === true ? (
              <>
                กด “จอง” เพื่อสำรองที่นั่ง
                <br />
                สำหรับเวิร์คช็อปนี้
              </>
            ) : (
              <>
                เมื่อยกเลิกการจองแล้ว
                <br />
                ยังสามารถทำการจองใหม่ได้
              </>
            )}
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <ButtonBase
              onClick={handleCancel}
              sx={{
                width: 143,
                height: 40,
                borderRadius: "8px",
                border: "1px solid #637381", // Change border color based on theme soon
                color: color.TEXT_SECONDARY,
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              ปิด
            </ButtonBase>
            <ButtonBase
              onClick={handleConfirm}
              sx={{
                width: 143,
                height: 40,
                borderRadius: "8px",
                backgroundColor: pendingAction === true ? "#267F59" : "#B71931", // Green for book, Red for cancel
                color: "white",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              {pendingAction === true ? "จอง" : "ยกเลิก"}
            </ButtonBase>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
