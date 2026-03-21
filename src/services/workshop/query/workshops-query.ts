import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";

import type { TListWorkshopParams, TListWorkshopResponse } from "@/types/workshop/get-workshops-list";

// ---------------------------------------------------------------------------------

function buildListWorkshopSearchParams(
  p: TListWorkshopParams | undefined,
): URLSearchParams | undefined {
  if (!p) return undefined;

  const sp = new URLSearchParams();
  Object.entries(p).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      sp.set(key, String(value));
    }
  });

  return sp.size > 0 ? sp : undefined;
}

async function fetchListWorkshops(payload?: TListWorkshopParams): Promise<TListWorkshopResponse> {
  const params = buildListWorkshopSearchParams(payload);
  
  const res = await ky
    .get("workshops", {
      ...(params && { searchParams: params }),
    })
    .json<TListWorkshopResponse>();

  return res;
}

// ---------------------------------------------------------------------------------

const workshopQueryKeys = {
  all: () => ["workshops"] as const,

  list: (payload?: TListWorkshopParams) =>
    [...workshopQueryKeys.all(), "list", { payload }] as const,

  listOptions: (payload?: TListWorkshopParams) =>
    queryOptions({
      queryKey: [...workshopQueryKeys.list(payload)] as const,
      queryFn: () => fetchListWorkshops(payload),
    }),
};

export { workshopQueryKeys, fetchListWorkshops };