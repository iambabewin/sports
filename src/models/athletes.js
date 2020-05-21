import * as athletes from '../services/athletes';
import {message} from 'antd/lib';
import * as judge from "../services/judge";

export default {
  namespace: 'athletes',
  state: {
    athletesList: {
      list: []
    },
    gamesList: {
      list: []
    }
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

    * PassAthletes({payload}, {call, put}) {
      const {data} = yield call(athletes.PassAthletes, payload);
      if (data && data.ret === 0) {
        message.success('审核通过');
        return data.ret;
      } else {
        message.error(data.msg || '审核失败')
      }
    },

    * CancelAthletes({payload}, {call, put}) {
      const {data} = yield call(athletes.CancelAthletes, payload);
      if (data && data.ret === 0) {
        message.success('撤销成功');
        return data.ret;
      } else {
        message.error(data.msg || '撤销失败')
      }
    },

    * GetGames({payload}, {call, put}) {
      try {
        const {data} = yield call(athletes.GetGames, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {gamesList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * JoinGames({payload}, {call, put}) {
      const {data} = yield call(athletes.JoinGames, payload);
      if (data && data.ret === 0) {
        message.success('报名成功');
        return data.ret;
      } else {
        message.error(data.msg || '报名失败')
      }
    },
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
