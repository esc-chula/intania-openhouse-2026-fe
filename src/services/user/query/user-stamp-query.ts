import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";

import type { TGetUserStampsResponse } from "@/types/user/get-my-stamps";

// ---------------------------------------------------------------------------------

async function fetchUserStamps(): Promise<TGetUserStampsResponse> {
  const res = await ky.get("users/me/stamps").json<TGetUserStampsResponse>();
  return res;
}

// ---------------------------------------------------------------------------------

const userStampsQueryKeys = {
  all: () => ["user-stamps"] as const,
  me: () => [...userStampsQueryKeys.all(), "me"] as const,
  meOptions: () =>
    queryOptions({
      queryKey: userStampsQueryKeys.me(),
      queryFn: () => fetchUserStamps(),
    }),
};

export { userStampsQueryKeys, fetchUserStamps };