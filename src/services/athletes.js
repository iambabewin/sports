import request from '../utils/request';

export async function GetAthletes(params) {
  return request(`http://sports.handley.cn/athletes?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

export async function PassAthletes(params) {
  return request('http://sports.handley.cn/athletes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...params}),
  });
}

export async function CancelAthletes(params) {
  return request(`http://sports.handley.cn/athletes?token=${params.token}&user_id	=${params.user_id}`, {
    method: 'DELETE',
  });
}
