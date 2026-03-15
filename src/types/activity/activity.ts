export interface Activity {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  building_name?: string;
  floor?: string;
  room_name?: string;
  image?: string;
}

export interface ActivityItem {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  building_name?: string;
  floor?: string;
  room_name?: string;
  description: string;
  image?: string;
  is_happening: boolean;
}

export interface GetActivityResponse {
  body: ActivityItem;
}

