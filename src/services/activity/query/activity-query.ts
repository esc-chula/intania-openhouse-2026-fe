import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";
import type { GetActivityResponse } from "@/types/activity/activity";

export async function fetchGetActivityById(
  id: string | number,
): Promise<GetActivityResponse> {
  const res = await ky.get(`activities/${id}`).json<GetActivityResponse>();
  return res;
}

export const activityQueryKeys = {
  all: () => ["activities"] as const,
  details: () => [...activityQueryKeys.all(), "detail"] as const,
  detail: (id: string | number) =>
    [...activityQueryKeys.details(), id] as const,

  detailOptions: (id?: string | number, authLoading?: boolean) =>
    queryOptions({
      queryKey: activityQueryKeys.detail(id ?? ""),
      queryFn: () => fetchGetActivityById(id as string | number),
      enabled: !authLoading && !!id,
    }),
};
