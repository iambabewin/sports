import request from '../utils/request';

export async function GetProject(params) {
  return request(`http://sports.handley.cn/project?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

export async function GetAllProject(params) {
  return request(`http://sports.handley.cn/project/all?token=${params.token}`);
}

export async function AddProject(params) {
  return request('http://sports.handley.cn/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...params}),
  });
}

export async function DelProject(params) {
  return request(`http://sports.handley.cn/project?token=${params.token}&project_id	=${params.project_id}`, {
    method: 'DELETE',
  });
}

export async function EditProject(params) {
  return request('http://sports.handley.cn/project', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...params}),
  });
}
