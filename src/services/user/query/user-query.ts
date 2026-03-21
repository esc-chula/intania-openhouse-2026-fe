import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";

import type { TGetMeRequest, TGetMeResponse } from "@/types/user/get-me";

// ---------------------------------------------------------------------------------

function buildGetMeSearchParams(
  p: TGetMeRequest | undefined,
): URLSearchParams | undefined {
  if (!p || !p.fields || p.fields.length === 0) return undefined;

  const sp = new URLSearchParams();
  sp.set("fields", p.fields.join(","));
  return sp;
}

async function fetchGetMe(payload?: TGetMeRequest): Promise<TGetMeResponse> {
  const params = buildGetMeSearchParams(payload);
  const res = await ky
    .get("users/me", {
      ...(params && { searchParams: params }),
    })
    .json<TGetMeResponse>();

  return res;
}

// ---------------------------------------------------------------------------------

const usersQueryKeys = {
  all: () => ["users"] as const,

  me: (payload?: TGetMeRequest) =>
    [...usersQueryKeys.all(), "me", { payload }] as const,

  meOptions: (payload?: TGetMeRequest) =>
    queryOptions({
      queryKey: [...usersQueryKeys.me(payload)] as const,
      queryFn: () => fetchGetMe(payload),
    }),
};

export { usersQueryKeys, fetchGetMe };
