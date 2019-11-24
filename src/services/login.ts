import request from '@/utils/request';
import {notification} from "antd";

export interface LoginParamsType {
  username: string;
  password: string;
  grant_type: string,
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  console.log("params:" + JSON.stringify(params));
  return request('/oauth/token', {
    method: 'POST',
    data: params,
    requestType:'form',
    headers:{'Authorization': 'Basic '+"Y2xpZW50XzE6MTIzNDU2",'Content-Type':'application/x-www-form-urlencoded'},
    errorHandler:(error: { response: Response })=>{
      const { response } = error;
      if (response && response.status) {
        const { status } = response;
        if (status === 400 || status===401) {
          notification.error({
            message: '登录失败',
            description: '用户名或密码错误',
          });
        }
      } else if (!response) {
        notification.error({
          description: '您的网络发生异常，无法连接服务器',
          message: '网络异常',
        });
      }
      return response;
    }
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
