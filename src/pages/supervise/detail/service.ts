import request from '@/utils/request';
import {getToken} from "@/utils/authority";

export async function userDetail(params:any) {
  return request('/api/system/detail', {
    method: 'GET',
    params: params,
    requestType: "json",
    headers:{'Authorization': 'Bearer '+getToken(),'Content-Type': 'application/json;charset=UTF-8'},
  });
}
