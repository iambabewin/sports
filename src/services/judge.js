import request from '../utils/request';

export async function GetJudge(params) {
  return request(`http://sports.handley.cn/judge?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

export async function AddJudge(params) {
  return request('http://sports.handley.cn/judge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...params }),
  });
}

export async function DelJudge(params) {
  return request(`http://sports.handley.cn/judge?token=${params.token}&judge_id	=${params.user_id}`, {
    method: 'DELETE',
  });
}

export async function EditJudge(params) {
  return request('http://sports.handley.cn/judge', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ...params }),
  });
}
