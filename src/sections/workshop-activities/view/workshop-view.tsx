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
import { userBookingsQueryKeys } from "@/services/user/query/user-booking-query";
import { useAuth } from "@/contexts/auth-provider";
import { BackButton } from "@/components/back-button";
import {
  SnackbarAlert,
  type SnackbarSeverity,
} from "@/components/snackbar-alert";
import {
  useBookWorkshopMutation,
  useCancelWorkshopMutation,
} from "@/services/workshop/mutation/use-booking";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/th";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(buddhistEra);
dayjs.locale("th");

export default function WorkshopView() {
  const params = useParams<{ id: string }>();
  const { loading: authLoading } = useAuth();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<boolean | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
  }>({ open: false, message: "", severity: "success" });

  const { mutate: bookWorkshop, isPending: isBooking } =
    useBookWorkshopMutation();
  const { mutate: cancelWorkshop, isPending: isCancelling } =
    useCancelWorkshopMutation();

  const {
    data: workshop,
    isLoading,
    isError,
  } = useQuery(workshopQueryKeys.detailOptions(params.id, authLoading));

  const { data: myBookings } = useQuery(userBookingsQueryKeys.meOptions());

  const isReserved = (myBookings?.bookings ?? []).some(
    (b) => String(b.workshop_id) === String(params.id),
  );

  const handleButtonClick = (action: boolean) => {
    setPendingAction(action);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (pendingAction === true) {
      bookWorkshop(params.id, {
        onSuccess: () => {
          setDialogOpen(false);
          setSnackbar({
            open: true,
            message: "จองเวิร์คช็อปสำเร็จ",
            severity: "success",
          });
        },
        onError: () => {
          setDialogOpen(false);
          setSnackbar({
            open: true,
            message: "จองเวิร์คช็อปไม่สำเร็จ",
            severity: "error",
          });
        },
      });
    } else if (pendingAction === false) {
      cancelWorkshop(params.id, {
        onSuccess: () => {
          setDialogOpen(false);
          setSnackbar({
            open: true,
            message: "ยกเลิกเวิร์คช็อปสำเร็จ",
            severity: "success",
          });
        },
        onError: () => {
          setDialogOpen(false);
          setSnackbar({
            open: true,
            message: "ยกเลิกเวิร์คช็อปไม่สำเร็จ",
            severity: "error",
          });
        },
      });
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  if (isLoading || !workshop) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
          background: "url('/background/bg-landing.png')",
          backgroundSize: "cover",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
          background: "url('/background/bg-landing.png')",
          backgroundSize: "cover",
        }}
      >
        <Typography color="error">Failed to load workshop data</Typography>
      </Box>
    );
  }

  return (
    <>
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
              display: "flex",
              backgroundColor: "#F8F3E8",
              alignSelf: "stretch",
              justifyContent: "center",
              paddingX: 1.5,
              paddingY: 1,
              borderRadius: 1,
              boxShadow:
                "0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.20)",
            }}
          >
            <Typography variant="h3">{workshop.name}</Typography>
          </Box>
          <Stack
            sx={{
              display: "flex",
              alignSelf: "stretch",
              backgroundColor: "#F8F3E8",
              flexDirection: "column",
              paddingX: 2,
              paddingY: 3,
              gap: 2,
              borderRadius: 1,
              flexGrow: 1,
              boxShadow:
                "0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.20)",
            }}
          >
            <Box
              component="img"
              src={`/assets${workshop.image}.jpg`}
              sx={{
                width: "75%",
                objectFit: "cover",
                display: "block",
                alignSelf: "center",
              }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "max-content 1fr",
                columnGap: 1,
                marginLeft: 4,
              }}
            >
              <Typography variant="body2">สถานที่:</Typography>
              <Typography variant="body2">{workshop.location}</Typography>
              <Typography variant="body2">วันที่:</Typography>
              <Typography variant="body2">
                {dayjs
                  .utc(workshop.event_date)
                  .tz("Asia/Bangkok")
                  .format("D MMMM BBBB")}
              </Typography>
              <Typography variant="body2">เวลา:</Typography>
              <Typography variant="body2">
                {dayjs.utc(workshop.start_time).format("HH:mm")} น. -{" "}
                {dayjs.utc(workshop.end_time).format("HH:mm")} น.
              </Typography>
              <Typography variant="body2">ภาควิชา:</Typography>
              <Typography variant="body2">{workshop.affiliation}</Typography>
              <Typography variant="body2">ลงทะเบียน:</Typography>
              <Typography variant="body2">
                {workshop.registered_count ?? 0} / {workshop.total_seats}
              </Typography>
            </Box>
            <Typography variant="caption" marginX={4}>
              {workshop.description}
            </Typography>
          </Stack>
          {!workshop.is_registered ? (
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
          disableAutoFocus
          disableEnforceFocus
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
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
              variant="h5"
              sx={{
                color: color.PRIMARY_MAIN,
                marginTop: "80px",
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
                  border: "1px solid #637381",
                  color: color.TEXT_SECONDARY,
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                ปิด
              </ButtonBase>
              <ButtonBase
                onClick={handleConfirm}
                disabled={isBooking || isCancelling}
                sx={{
                  width: 143,
                  height: 40,
                  borderRadius: "8px",
                  backgroundColor:
                    pendingAction === true ? "#267F59" : "#B71931",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 700,
                  opacity: isBooking || isCancelling ? 0.6 : 1,
                }}
              >
                {pendingAction === true ? "จอง" : "ยกเลิก"}
              </ButtonBase>
            </Stack>
          </Box>
        </Modal>
      </Box>
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </>
  );
}
