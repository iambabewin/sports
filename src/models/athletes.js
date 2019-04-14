import * as athletes from '../services/athletes';
import {message} from 'antd';

export default {
  namespace: 'athletes',
  state: {
    athletesList: {
      list: []
    },
  },
  effects: {
    * GetAthletes({payload}, {call, put}) {
      try {
        const {data} = yield call(athletes.GetAthletes, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {athletesList: data.data}
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
