export interface StampItemBody {
  id: number;
  name: string;
  checked_in_at: string;
}

export interface GetUserStampsResponse {
  total_count: number;
  department_stamp_count: number;
  club_stamp_count: number;
  exhibition_stamp_count: number;
  department_stamps: StampItemBody[];
  club_stamps: StampItemBody[];
  exhibition_stamps: StampItemBody[];
}

export interface RedemptionStatusItem {
  redeemable: boolean;
  is_redeemed: boolean;
}

export interface GetRedemptionStatusResponse {
  department: RedemptionStatusItem;
  club: RedemptionStatusItem;
  exhibition: RedemptionStatusItem;
}
