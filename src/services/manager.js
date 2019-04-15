import request from '../utils/request';

export async function GetManager(params) {
  return request(`http://sports.handley.cn/sports?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

export async function AddManager(params) {
  return request('http://sports.handley.cn/sports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...params}),
  });
}

export async function DelManager(params) {
  return request(`http://sports.handley.cn/sports?token=${params.token}&sports_id=${params.user_id}`, {
    method: 'DELETE',
  });
}

export async function EditManager(params) {
  return request('http://sports.handley.cn/sports', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...params}),
  });
}
