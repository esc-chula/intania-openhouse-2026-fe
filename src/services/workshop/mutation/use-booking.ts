import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { ky } from "@/services/ky";

async function postBookWorkshop(workshopId: string | number): Promise<void> {
  await ky.post(`workshops/${workshopId}/book`);
}

async function deleteBookWorkshop(workshopId: string | number): Promise<void> {
  await ky.delete(`workshops/${workshopId}/book`);
}

export function useBookWorkshopMutation(): UseMutationResult<
  void,
  Error,
  string | number
> {
  return useMutation({
    mutationFn: postBookWorkshop,
  });
}

export function useCancelWorkshopMutation(): UseMutationResult<
  void,
  Error,
  string | number
> {
  return useMutation({
    mutationFn: deleteBookWorkshop,
  });
}
