export interface UserDetail {
  userNo?: string;
  userName?: string;
  password?: string;
  status?: string | number;
  statusName?: number;
  organizations?: [];
  createDate?: number;
  updateDateString?:string;
  createDateString?:string;
  organizationsString?:string;
  updateDate?: number;
  recentLoginTime?: string;
}

export interface BasicProfileDataType {
  userNo:string
}
