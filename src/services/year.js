import request from '../utils/request';

export async function GetYear(params) {
  return request(`http://sports.handley.cn/year?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

export async function GetYearConnProject(params) {
  return request(`http://sports.handley.cn/year/project?token=${params.token}&year_id=${params.year_id}`);
}

export async function GetAllYearConnProject(params) {
  return request(`http://sports.handley.cn/year/project/all?token=${params.token}`);
}

export async function ConnYearProject(params) {
  return request('http://sports.handley.cn/year/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...params}),
  });
}

export async function CancleConnYearProject(params) {
  return request(`http://sports.handley.cn/year/project?token=${params.token}&year_id	=${params.year_id}&project_id=${params.project_id}`, {
    method: 'DELETE',
  });
}

export async function AddYear(params) {
  return request('http://sports.handley.cn/year', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...params}),
  });
}

export async function DelYear(params) {
  return request(`http://sports.handley.cn/year?token=${params.token}&year_id	=${params.year_id}`, {
    method: 'DELETE',
  });
}

export async function EditYear(params) {
  return request('http://sports.handley.cn/year', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...params}),
  });
}
