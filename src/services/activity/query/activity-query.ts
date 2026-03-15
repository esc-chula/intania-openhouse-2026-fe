import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";
import type { GetActivityResponse } from "@/types/activity/activity";

export async function fetchGetActivityById(
  id: string | number
): Promise<GetActivityResponse> {
  return await ky.get(`activities/${id}`).json<GetActivityResponse>();
}

export const activityQueryKeys = {
  all: () => ["activities"] as const,
  details: () => [...activityQueryKeys.all(), "detail"] as const,
  detail: (id: string | number) =>
    [...activityQueryKeys.details(), id] as const,

  detailOptions: (id?: string | number) =>
    queryOptions({
      queryKey: activityQueryKeys.detail(id ?? ""),
      queryFn: () => fetchGetActivityById(id as string | number),
      enabled: !!id,
    }),
};

