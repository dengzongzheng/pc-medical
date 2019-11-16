import request from '@/utils/request';


export async function testSupervise(params) {
  const { count = 5, ...restParams } = params;
  return request('/api1/user/testSupervise', {
    method: 'GET',
    params: {
      count,
    },
    data: { ...restParams, method: 'delete' },
  });
}
