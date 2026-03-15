import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";
import type { Workshop } from "@/types/workshop/workshop";

export async function fetchGetWorkshopById(id: string | number): Promise<Workshop> {
  return await ky.get(`workshops/${id}`).json<Workshop>();
}

export const workshopQueryKeys = {
  all: () => ["workshops"] as const,
  details: () => [...workshopQueryKeys.all(), "detail"] as const,
  detail: (id: string | number) => [...workshopQueryKeys.details(), id] as const,

  detailOptions: (id?: string | number) =>
    queryOptions({
      queryKey: workshopQueryKeys.detail(id ?? ""),
      queryFn: () => fetchGetWorkshopById(id as string | number),
      enabled: !!id,
    }),
};
