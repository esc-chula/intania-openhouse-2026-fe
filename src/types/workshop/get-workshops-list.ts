export type TWorkshopItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  affiliation: string;
  category: string;
  event_date: string;
  start_time: string;
  end_time: string;
  registered_count: number;
  total_seats: number;
};

export type TListWorkshopResponse = {
  workshops: TWorkshopItem[] | null;
};

export type TListWorkshopParams = {
  category?: string;
  event_date?: string;
  hide_full?: boolean;
  order?: 'asc' | 'desc';
  search?: string;
  sort_by?: 'start_time' | 'name';
};