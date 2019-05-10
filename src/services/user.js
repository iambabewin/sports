import request from '../utils/request';

export async function login(params) {
  return request('http://sports.handley.cn/login', {
    method: 'POST',
    body: JSON.stringify({...params}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function logout(params) {
  return request(`http://sports.handley.cn/login?token=${params.token}`, {
    method: 'DELETE',
  });
}

export async function register(params) {
  return request('http://sports.handley.cn/register', {
    method: 'POST',
    body: JSON.stringify({...params}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function GetUserInfo(params) {
  return request(`http://sports.handley.cn/user/data?token=${params.token}`);
}
