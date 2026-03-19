import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { ky } from "@/services/ky";

export interface CheckInRequest {
  code: string;
}

export interface CheckInResult {
  type: "workshop" | "booth";
  name: string;
}

async function postCheckIn(payload: CheckInRequest): Promise<void> {
  await ky.post("check-in", {
    json: { code: payload.code },
  });
}

function useCheckInMutation(): UseMutationResult<void, Error, CheckInRequest> {
  return useMutation<void, Error, CheckInRequest>({
    mutationFn: postCheckIn,
  });
}

export { useCheckInMutation };
