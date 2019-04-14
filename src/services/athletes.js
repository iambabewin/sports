import request from '../utils/request';

export async function GetAthletes(params) {
  return request(`http://sports.handley.cn/athletes?token=${params.token}&location=${params.location}&limit=${params.limit}`);
}
