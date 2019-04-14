import request from '../utils/request';

export async function GetClass(params) {
  return request(`http://sports.handley.cn/class?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

export async function GetClassByProfession(params) {
  return request(`http://sports.handley.cn/class/profession?profession_id=${params.profession_id}`);
}

export async function AddClass(params) {
  return request('http://sports.handley.cn/class', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...params }),
  });
}

export async function DelClass(params) {
  return request(`http://sports.handley.cn/class?token=${params.token}&class_id	=${params.class_id}`, {
    method: 'DELETE',
  });
}

export async function EditClass(params) {
  return request('http://sports.handley.cn/class', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...params }),
  });
}
