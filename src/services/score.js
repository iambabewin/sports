import request from '../utils/request';

/**
 * 成绩录入*/

// 获取裁判管理的比赛项目
export async function GetJudgeManagedProject(params) {
  return request(`http://sports.handley.cn/judge/project?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

// 获取该项目下的运动员名单
export async function GetProjectJoinAthletes(params) {
  return request(`http://sports.handley.cn/join/athletes?token=${params.token}&location=${params.location}&limit=${params.limit}&year_project_id=${params.year_project_id}`);
}

// 录入成绩
export async function InputScore(params) {
  return request('http://sports.handley.cn/grade', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...params}),
  });
}

/**
 * 成绩查询*/
// 获取运动员参加过的比赛
export async function GetAthletesJoinProject(params) {
  return request(`http://sports.handley.cn/join/project?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}

// 根据比赛项目查询成绩
export async function GetProjectAllScore(params) {
  return request(`http://sports.handley.cn/grade?token=${params.token}&location=${params.location}&limit=${params.limit}&year_project_id=${params.year_project_id}`);
}

/**
 *成绩公布*/
// 获取所有关联届比赛项目
export async function GetAllYearConnProject(params) {
  return request(`http://sports.handley.cn/year/project/page?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}
