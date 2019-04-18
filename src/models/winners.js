import * as winners from '../services/winners';
import {message} from 'antd';

export default {
  namespace: 'winners',
  state: {
    collegeWinnersList: [],
    genderWinnersList: []
  },
  effects: {

    * GetCollegeWinnersNumber({payload}, {call, put}) {
      try {
        const {data} = yield call(winners.GetCollegeWinnersNumber, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {collegeWinnersList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * GetGenderWinnersNumber({payload}, {call, put}) {
      try {
        const {data} = yield call(winners.GetGenderWinnersNumber, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {genderWinnersList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
