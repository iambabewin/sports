import request from '../utils/request';

export async function GetCollege(params) {
  return request(`http://sports.handley.cn/college?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

export async function GetAllCollege(params) {
  return request(`http://sports.handley.cn/college/all?token=${params.token}`);
}

export async function AddCollege(params) {
  return request('http://sports.handley.cn/college', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...params }),
  });
}

export async function DelCollege(params) {
  return request(`http://sports.handley.cn/college?token=${params.token}&college_id	=${params.college_id}`, {
    method: 'DELETE',
  });
}

export async function EditCollege(params) {
  return request('http://sports.handley.cn/college', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...params }),
  });
}
