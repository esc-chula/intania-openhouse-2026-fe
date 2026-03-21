export type TGetMeRequest = {
  fields?: string[];
};

export type TGetMeResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  google_photo_url: string;
  participant_type: string;
  transport_mode: string;
  is_from_bangkok: boolean;
  origin_location: string;
  attendance_dates: string[];
  interested_activities: string[];
  discovery_channel: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra_attributes: Record<string, any>;
};
