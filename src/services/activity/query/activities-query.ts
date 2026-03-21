import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";

import type { TListActivitiesParams, TListActivitiesResponse } from "@/types/activity/get-activities-list";

// ---------------------------------------------------------------------------------

function buildListActivitiesSearchParams(
  p: TListActivitiesParams | undefined,
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

async function fetchListActivities(payload?: TListActivitiesParams): Promise<TListActivitiesResponse> {
  const params = buildListActivitiesSearchParams(payload);
  
  const res = await ky
    .get("activities", {
      ...(params && { searchParams: params }),
    })
    .json<TListActivitiesResponse>();

  return res;
}

// ---------------------------------------------------------------------------------

const activityQueryKeys = {
  all: () => ["activities"] as const,

  list: (payload?: TListActivitiesParams) =>
    [...activityQueryKeys.all(), "list", { payload }] as const,

  listOptions: (payload?: TListActivitiesParams) =>
    queryOptions({
      queryKey: [...activityQueryKeys.list(payload)] as const,
      queryFn: () => fetchListActivities(payload),
    }),
};

export { activityQueryKeys, fetchListActivities };