export type TStamp = {
  id: number;
  name: string;
  checked_in_at: string;
};

export type TGetUserStampsResponse = {
  club_stamp_count: number;
  department_stamp_count: number;
  exhibition_stamp_count: number;
  
  club_stamps: TStamp[] | null;
  department_stamps: TStamp[] | null;
  exhibition_stamps: TStamp[] | null;
  
  total_count: number;
};