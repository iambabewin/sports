import * as score from '../services/score';
import {message} from 'antd';
import * as athletes from "../services/athletes";

export default {
  namespace: 'score',
  state: {
    judgeManagedProjectList: {
      list: []
    },
    projectJoinAthletesList: {
      list: []
    },
    athletesJoinProjectList: {
      list: []
    },
    projectAllScoreList: {
      list: []
    }
  },
  effects: {
    * GetJudgeManagedProject({payload}, {call, put}) {
      try {
        const {data} = yield call(score.GetJudgeManagedProject, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {judgeManagedProjectList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * GetProjectJoinAthletes({payload}, {call, put}) {
      try {
        const {data} = yield call(score.GetProjectJoinAthletes, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {projectJoinAthletesList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * InputScore({payload}, {call, put}) {
      const {data} = yield call(score.InputScore, payload);
      if (data && data.ret === 0) {
        message.success('录入成功');
        return data.ret;
      } else {
        message.error(data.msg || '录入失败')
      }
    },


    /**
     * 成绩查询*/

    * GetAthletesJoinProject({payload}, {call, put}) {
      try {
        const {data} = yield call(score.GetAthletesJoinProject, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {athletesJoinProjectList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * GetProjectAllScore({payload}, {call, put}) {
      try {
        const {data} = yield call(score.GetProjectAllScore, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {projectAllScoreList: data.data}
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
