export type Category = "Department" | "Club";

export type Status = "Confirmed" | "Cancelled" | "Attended" | "Absent";

export interface Workshop {
  id: number;
  name: string;
  description: string;
  category: Category;
  affiliation: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  total_seats: number;
  registered_count: number;
}

export interface Booking {
  id: number;
  user_id: number;
  workshop_id: number;
  status: Status;
  created_at: string;
  checked_in_at?: string;
}

export interface BookingWithWorkshop {
  id: number;
  workshop_id: number;
  status: Status;
  created_at: string;
  checked_in_at?: string;
  workshop_name: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
}
