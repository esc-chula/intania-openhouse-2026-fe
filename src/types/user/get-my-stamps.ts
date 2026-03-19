export type TStamp = {
  id: number;
  name: string;
  type: string;
  checked_in_at: string;
};

export type TGetUserStampsResponse = {
  stamps: TStamp[] | null; 
  total_count: number;
};