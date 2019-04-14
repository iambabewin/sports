import request from '../utils/request';

export async function GetProfession(params) {
  return request(`http://sports.handley.cn/profession?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

export async function GetAllProfession(params) {
  return request(`http://sports.handley.cn/profession/all?token=${params.token}`);
}

export async function GetProfessionByCollege(params) {
  return request(`http://sports.handley.cn/profession/college?college_id=${params.college_id}`);
}

export async function AddProfession(params) {
  return request('http://sports.handley.cn/profession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...params }),
  });
}

export async function DelProfession(params) {
  return request(`http://sports.handley.cn/profession?token=${params.token}&profession_id	=${params.profession_id	}`, {
    method: 'DELETE',
  });
}

export async function EditProfession(params) {
  return request('http://sports.handley.cn/profession', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...params }),
  });
}
