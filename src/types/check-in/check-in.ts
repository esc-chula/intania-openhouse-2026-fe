export interface CheckInRequest {
  code: string;
}

export interface CheckInResult {
  type: "workshop" | "booth";
  name: string;
}

export interface CheckinResponse {
  id: number;
  name: string;
  category: string;
}
