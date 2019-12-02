import request from '@/utils/request';
import {AddSystemUserParams,ListSystemUserParams,TableListItem} from './data.d';
import { getToken } from '@/utils/authority';

export async function addSystemUser(params: AddSystemUserParams) {
  return request('/api/system/addUser', {
    method: 'POST',
    data: params,
    requestType: "json",
    headers:{'Authorization': 'Bearer '+getToken(),'Content-Type': 'application/json;charset=UTF-8'},
  });
}

export async function updateSystemUser(params: TableListItem) {
  return request('/api/system/updateUser', {
    method: 'POST',
    data: params,
    requestType: "json",
    headers:{'Authorization': 'Bearer '+getToken(),'Content-Type': 'application/json;charset=UTF-8'},
  });
}


export async function listSystemUser(params: ListSystemUserParams) {
  return request('/api/system/listUsers', {
    params: {...params},
    requestType: 'form',
    headers:{'Authorization': 'Bearer '+getToken(),'Content-Type': 'application/json;charset=UTF-8'},
  });
}
