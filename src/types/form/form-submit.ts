export type TParticipantType =
  | "นักเรียน/ผู้ที่สนใจศึกษาต่อ"
  | "นิสิตปัจจุบันวิศวะจุฬาฯ"
  | "นิสิตเก่าวิศวะจุฬาฯ"
  | "นิสิตจากคณะ/มหาลัยอื่น"
  | "ครู"
  | "ผู้ปกครอง/บุคคลภายนอก";

export interface TFormSubmitRequest {
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  participant_type: TParticipantType | string;
  attendance_dates: string[];
  interested_activities: string[];
  discovery_channel: string[];
  is_from_bangkok: boolean;
  transport_mode: string;
  origin_location: string;
  extra_attributes: Record<string, any>;
}

export interface TFormSubmitResponse {
  success: boolean;
  message?: string;
  user_id?: string;
}
