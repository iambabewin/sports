import request from '../utils/request';

// 获取届列表
export async function GetYear(params) {
  return request(`http://sports.handley.cn/year?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

// 查询当前届所关联的比赛项目
export async function GetCurrentYearConnProject(params) {
  return request(`http://sports.handley.cn/year/project?token=${params.token}&year_id=${params.year_id}`);
}

// 查询所有届对应关联的比赛项目
export async function GetAllYearConnProject(params) {
  return request(`http://sports.handley.cn/year/project/all?token=${params.token}`);
}

// 当前届关联比赛项目
export async function ConnYearProject(params) {
  return request('http://sports.handley.cn/year/project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...params}),
  });
}

// 当前届取消关联比赛项目
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
