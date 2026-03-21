import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { ky } from "@/services/ky";
import { CheckInRequest, CheckinResponse } from "@/types/check-in/check-in";

async function postCheckIn(payload: CheckInRequest): Promise<CheckinResponse> {
  const res = await ky.post("check-in", {
    json: { code: payload.code },
  }).json<CheckinResponse>();
  return res;
}

function useCheckInMutation(): UseMutationResult<CheckinResponse, Error, CheckInRequest> {
  return useMutation<CheckinResponse, Error, CheckInRequest>({
    mutationFn: postCheckIn,
  });
}

export { useCheckInMutation };
