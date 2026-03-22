"use client";

import { color } from "@/theme/core/colors";
import { Box, Typography } from "@mui/material";
import RedeemButton from "./redeem-button";
import type { StampCategory } from "@/services/stamp/mutation/use-redeem-stamps";

type Props = {
  title: string;
  imageSrc: string;
  imageHeight: number;
  count: number;
  required: number;
  unit: string;
  isRedeemed?: boolean;
  redeemable?: boolean;
  isRedeeming: boolean;
  onRedeem: (category: StampCategory) => void;
  category: StampCategory;
};

export default function StampSection({
  title,
  imageSrc,
  imageHeight,
  count,
  required,
  unit,
  isRedeemed,
  redeemable,
  isRedeeming,
  onRedeem,
  category,
}: Props) {
  return (
    <>
      <Typography variant="h4" color={color.PRIMARY_MAIN}>
        {title}
      </Typography>
      <Box
        component="img"
        sx={{ height: imageHeight, width: 320, alignSelf: "center" }}
        src={`${imageSrc}_${count}.webp`}
      />
      <Typography
        variant="body2"
        alignSelf="center"
        textAlign="center"
        color={color.PRIMARY_MAIN}
      >
        {count >= required ? (
          <>โปรดส่งโทรศัพท์ให้เจ้าหน้าที่เพื่อแลกของที่ระลึก</>
        ) : (
          <>
            เช็กอิน {required - count} {unit} <br />
            และส่งโทรศัพท์ให้เจ้าหน้าที่เพื่อแลกของที่ระลึก
          </>
        )}
      </Typography>
      <RedeemButton
        isRedeemed={isRedeemed}
        redeemable={redeemable}
        isLoading={isRedeeming}
        onRedeem={onRedeem}
        category={category}
      />
    </>
  );
}
