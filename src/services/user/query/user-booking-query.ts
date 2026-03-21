import { queryOptions } from "@tanstack/react-query";
import { ky } from "@/services/ky";

import type { TGetMyBookingsResponse } from "@/types/user/get-my-booking";

// ---------------------------------------------------------------------------------

async function fetchMyBookings(): Promise<TGetMyBookingsResponse> {
  const res = await ky.get("users/me/bookings").json<TGetMyBookingsResponse>();
  return res;
}

// ---------------------------------------------------------------------------------

const userBookingsQueryKeys = {
  all: () => ["user-bookings"] as const,
  me: () => [...userBookingsQueryKeys.all(), "me"] as const,

  meOptions: () =>
    queryOptions({
      queryKey: [...userBookingsQueryKeys.me()] as const,
      queryFn: () => fetchMyBookings(),
    }),
};

export { userBookingsQueryKeys, fetchMyBookings };