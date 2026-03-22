import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { ky } from "@/services/ky";
import { workshopQueryKeys } from "@/services/workshop/query/workshop-query";
import { userBookingsQueryKeys } from "@/services/user/query/user-booking-query";

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postBookWorkshop,
    onSuccess: (_data, workshopId) => {
      queryClient.invalidateQueries({
        queryKey: workshopQueryKeys.detail(workshopId),
      });
      queryClient.invalidateQueries({
        queryKey: userBookingsQueryKeys.me(),
      });
    },
  });
}

export function useCancelWorkshopMutation(): UseMutationResult<
  void,
  Error,
  string | number
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBookWorkshop,
    onSuccess: (_data, workshopId) => {
      queryClient.invalidateQueries({
        queryKey: workshopQueryKeys.detail(workshopId),
      });
      queryClient.invalidateQueries({
        queryKey: userBookingsQueryKeys.me(),
      });
    },
  });
}
