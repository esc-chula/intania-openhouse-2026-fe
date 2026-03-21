"use client";

import { Button } from "@mui/material";
import type { StampCategory } from "@/services/stamp/mutation/use-redeem-stamps";
import { color } from "@/theme/core/colors";

type Props = {
  isRedeemed?: boolean;
  redeemable?: boolean;
  isLoading?: boolean;
  onRedeem: (category: StampCategory) => void;
  category: StampCategory;
};

export default function RedeemButton({
  isRedeemed,
  redeemable,
  isLoading,
  onRedeem,
  category,
}: Props) {
  if (isRedeemed) {
    return (
      <Button
        disabled
        sx={{
          width: "fit-content",
          backgroundColor: color.GRAY_OPA_32,
          paddingX: 2,
          paddingY: "6px",
          alignSelf: "center",
        }}
      >
        คุณแลกของที่ระลึกเรียบร้อยแล้ว
      </Button>
    );
  }

  return (
    <Button
      disabled={!redeemable || isLoading}
      onClick={() => onRedeem(category)}
      sx={{
        width: "fit-content",
        paddingX: 2,
        paddingY: "6px",
        alignSelf: "center",
        backgroundColor: color.PRIMARY_MAIN,
        color: "#fff",
        "&:hover": {
          backgroundColor: color.PRIMARY_MAIN,
        },
        "&.Mui-disabled": {
          backgroundColor: color.GRAY_OPA_32,
        },
      }}
    >
      รับของที่ระลึก
    </Button>
  );
}
