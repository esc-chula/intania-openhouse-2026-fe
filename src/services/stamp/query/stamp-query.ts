import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";
import type { GetUserStampsResponse, GetRedemptionStatusResponse } from "@/types/stamp/stamp";

export const stampQueryKeys = {
  all: () => ["stamps"] as const,
  userStamps: () => [...stampQueryKeys.all(), "user"] as const,
  redemptionStatus: () => [...stampQueryKeys.all(), "redemption"] as const,

  userStampsOptions: (authLoading?: boolean) =>
    queryOptions({
      queryKey: stampQueryKeys.userStamps(),
      queryFn: () => ky.get("users/me/stamps").json<GetUserStampsResponse>(),
      enabled: !authLoading,
    }),

  redemptionStatusOptions: (authLoading?: boolean) =>
    queryOptions({
      queryKey: stampQueryKeys.redemptionStatus(),
      queryFn: () => ky.get("users/me/redemption-status").json<GetRedemptionStatusResponse>(),
      enabled: !authLoading,
    }),
};
