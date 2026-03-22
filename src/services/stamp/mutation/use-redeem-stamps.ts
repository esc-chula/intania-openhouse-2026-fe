import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { ky } from "@/services/ky";

export type StampCategory = "department" | "club" | "exhibition";

export function useRedeemStampsMutation(): UseMutationResult<
  void,
  Error,
  StampCategory
> {
  return useMutation({
    mutationFn: (category: StampCategory) =>
      ky.post(`stamps/redemptions?category=${category}`).json(),
  });
}
