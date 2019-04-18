import request from '../utils/request';

export async function GetCollegeWinnersNumber(params) {
  return request(`http://sports.handley.cn/college/win?token=${params.token}`);
}

export async function GetGenderWinnersNumber(params) {
  return request(`http://sports.handley.cn/gender/win?token=${params.token}`);
}


