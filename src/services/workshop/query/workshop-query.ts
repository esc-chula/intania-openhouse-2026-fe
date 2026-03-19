import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";
import type { Workshop } from "@/types/workshop/workshop";

const WORKSHOP_FIELDS =
  "name,start_time,end_time,description,category,location,total_seats,registered_count,affiliation";

export async function fetchGetWorkshopById(
  id: string | number,
): Promise<Workshop> {
  return ky.get(`workshops/${id}?fields=${WORKSHOP_FIELDS}`).json<Workshop>();
}

export const workshopQueryKeys = {
  all: () => ["workshops"] as const,
  details: () => [...workshopQueryKeys.all(), "detail"] as const,
  detail: (id: string | number) =>
    [...workshopQueryKeys.details(), id] as const,

  detailOptions: (id?: string | number, authLoading?: boolean) =>
    queryOptions({
      queryKey: workshopQueryKeys.detail(id ?? ""),
      queryFn: () => fetchGetWorkshopById(id as string | number),
      enabled: !authLoading && !!id,
    }),
};
