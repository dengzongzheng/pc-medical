import request from '@/utils/request';
import {getToken} from "@/utils/authority";

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/system/currentUser', {
    method: 'GET',
    requestType: "json",
    headers:{'Authorization': 'Bearer '+getToken(),'Content-Type': 'application/json;charset=UTF-8'},
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
