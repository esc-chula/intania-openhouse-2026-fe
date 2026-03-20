"use client";

import { color } from "@/theme/core/colors";
import {
  Box,
  CircularProgress,
  Typography,
  Modal,
  Stack,
  ButtonBase,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-provider";
import { stampQueryKeys } from "@/services/stamp/query/stamp-query";
import {
  useRedeemStampsMutation,
  type StampCategory,
} from "@/services/stamp/mutation/use-redeem-stamps";
import {
  SnackbarAlert,
  type SnackbarSeverity,
} from "@/components/snackbar-alert";
import StampSection from "../stamp-section";

export default function StampCollectionView() {
  const { loading: authLoading } = useAuth();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [pendingCategory, setPendingCategory] = useState<StampCategory | null>(
    null,
  );

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
  }>({ open: false, message: "", severity: "success" });

  const {
    data: stamps,
    isLoading: isLoadingStamps,
    refetch: refetchStamps,
  } = useQuery(stampQueryKeys.userStampsOptions(authLoading));

  const {
    data: status,
    isLoading: isLoadingStatus,
    refetch: refetchStatus,
  } = useQuery(stampQueryKeys.redemptionStatusOptions(authLoading));

  const { mutate: redeemStamps, isPending: isRedeeming } =
    useRedeemStampsMutation();

  const handleRedeemClick = (category: StampCategory) => {
    setPendingCategory(category);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (pendingCategory) {
      redeemStamps(pendingCategory, {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: "รับของที่ระลึกสำเร็จ!",
            severity: "success",
          });
          refetchStamps();
          refetchStatus();
          setDialogOpen(false);
          setPendingCategory(null);
        },
        onError: () => {
          setSnackbar({
            open: true,
            message: "ไม่สามารถรับของที่ระลึกได้",
            severity: "error",
          });
          setDialogOpen(false);
          setPendingCategory(null);
        },
      });
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setPendingCategory(null);
  };

  const isLoading = isLoadingStamps || isLoadingStatus || authLoading;

  if (isLoading && !stamps) {
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

  const deptCount = Math.min(stamps?.department_stamp_count ?? 0, 5);
  const clubCount = Math.min(stamps?.club_stamp_count ?? 0, 5);
  const exhiCount = Math.min(stamps?.exhibition_stamp_count ?? 0, 5);

  const deptStatus = status?.department;
  const clubStatus = status?.club;
  const exhiStatus = status?.exhibition;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "url('/background/bg-landing.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          padding: 2.5,
          position: "relative",
          gap: 2,
        }}
      >
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
              color: "#5B3722",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            Stamp
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#F8F3E8",
            flexDirection: "column",
            alignSelf: "center",
            padding: 2,
            gap: 0.5,
            borderRadius: 1,
            boxShadow:
              "0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.20)",
          }}
        >
          <Typography variant="h4" color={color.PRIMARY_MAIN}>
            เงื่อนไขการรับของที่ระลึก
          </Typography>
          <Typography variant="body2" color="#637381">
            พิเศษ! เพียงน้อง ๆ เดินชมให้ครบ 5 ภาควิชา รับไปเลยโปสการ์ดลาย
            Immersion✨ หรือหากใครสายกิจกรรม อยากแวะไปทำความรู้จักกับพี่ ๆ
            ชมรมให้ครบ 5 ชมรม ก็รับโปสการ์ดลาย From the Sky ไปสะสมได้เลย 🌥️
            นอกจากนี้ เพียงเดินชมให้ครบ 5 นวัตกรรม ก็รับเข็มกลัด Intania Open
            House ได้ทันที และแน่นอนว่าหากน้อง ๆ คนไหนอยากจัดเต็มเดินครบทั้ง 3
            เงื่อนไข ก็สามารถรับของรางวัลทั้งหมดได้เลย! <br /> หมายเหตุ:
            ของรางวัลมีจำนวนจำกัด
            สงวนสิทธิ์ให้กับผู้ที่ทำภารกิจสำเร็จก่อนเท่านั้น
          </Typography>
        </Box>
        <StampSection
          title="ภาควิชาต่างๆ"
          imageSrc="/stamp/department/department"
          imageHeight={480}
          count={deptCount}
          required={5}
          unit="ภาควิชา"
          isRedeemed={deptStatus?.is_redeemed}
          redeemable={deptStatus?.redeemable}
          isRedeeming={isRedeeming}
          onRedeem={handleRedeemClick}
          category="department"
        />
        <StampSection
          title="ชมรมต่างๆ"
          imageSrc="/stamp/club/club"
          imageHeight={480}
          count={clubCount}
          required={5}
          unit="ชมรม"
          isRedeemed={clubStatus?.is_redeemed}
          redeemable={clubStatus?.redeemable}
          isRedeeming={isRedeeming}
          onRedeem={handleRedeemClick}
          category="club"
        />
        <StampSection
          title="นิทรรศการนวัตกรรม"
          imageSrc="/stamp/exhibition/exhibition"
          imageHeight={240}
          count={exhiCount}
          required={5}
          unit="นิทรรศการนวัตกรรม"
          isRedeemed={exhiStatus?.is_redeemed}
          redeemable={exhiStatus?.redeemable}
          isRedeeming={isRedeeming}
          onRedeem={handleRedeemClick}
          category="exhibition"
        />
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
            minHeight: 420,
            backgroundImage: "url('/background/confirm-modal.svg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "30px",
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
            ยืนยันแลกของที่ระลึก
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
            โปรดส่งโทรศัพท์ให้เจ้าหน้าที่ <br />
            เพื่อทำการยืนยัน
            <br />
            <br />
            หมายเหตุ: สามารถกดได้เพียงครั้งเดียวเท่านั้น
            ไม่สามารถยกเลิกได้ในภายหลัง
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
              ยกเลิก
            </ButtonBase>
            <ButtonBase
              onClick={handleConfirm}
              disabled={isRedeeming}
              sx={{
                width: 143,
                height: 40,
                borderRadius: "8px",
                backgroundColor: "#267F59",
                color: "white",
                fontSize: "16px",
                fontWeight: 700,
                opacity: isRedeeming ? 0.6 : 1,
              }}
            >
              ยืนยัน
            </ButtonBase>
          </Stack>
        </Box>
      </Modal>
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </>
  );
}
