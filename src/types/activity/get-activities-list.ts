export type TActivityItem = {
  id: number;
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  is_happening: boolean;
  building_name?: string;
  floor?: string;
  room_name?: string;
  link?: string;
};

export type TListActivitiesResponse = {
  activities: TActivityItem[] | null;
};

export type TListActivitiesParams = {
  happening_now?: boolean;
  hide_past?: boolean;
  order?: 'asc' | 'desc';
  search?: string;
  sort_by?: 'start_time' | 'title' | 'location';
};