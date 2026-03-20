export type TWorkshop = {
  end_time: string;
  location: string;
  event_date: string;
  name: string;
  start_time: string;
  registered_count: number;
  total_seats: number;
  affiliation: string;
};

export type TBookingItem = {
  id: number;
  workshop_id: number;
  status: string;
  created_at: string;
  checked_in_at?: string;
  workshop: TWorkshop;
};

export type TGetMyBookingsResponse = {
  bookings: TBookingItem[] | null;
};