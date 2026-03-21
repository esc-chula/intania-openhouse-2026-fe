export type TActivityItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  building_name: string;
  floor: string;
  room_name: string;
  start_time: string;
  end_time: string;
  is_happening: boolean;
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