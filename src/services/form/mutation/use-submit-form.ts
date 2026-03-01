import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import type {
  TFormSubmitRequest,
  TFormSubmitResponse,
} from "@/types/form/form-submit";
import { ky } from "@/services/ky";

// ---------------------------------------------------------------------------------

async function postSubmitForm(
  payload: TFormSubmitRequest,
): Promise<TFormSubmitResponse> {
  const response = await ky
    .post("users", {
      json: payload,
    })
    .json<TFormSubmitResponse>();

  return response;
}

// ---------------------------------------------------------------------------------

function useSubmitFormMutation(): UseMutationResult<
  TFormSubmitResponse,
  unknown,
  TFormSubmitRequest,
  unknown
> {
  return useMutation<TFormSubmitResponse, unknown, TFormSubmitRequest>({
    mutationFn: postSubmitForm,
  });
}

export { useSubmitFormMutation };
