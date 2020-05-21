import * as judge from '../services/judge';
import {message} from 'antd/lib';

export default {
  namespace: 'judge',
  state: {
    judgeList: {
      list: []
    }
  },
  effects: {

    * AddJudge({payload}, {call, put}) {
      const {data} = yield call(judge.AddJudge, payload);
      if (data && data.ret === 0) {
        message.success('添加成功');
        return data.ret;
      } else {
        message.error(data.msg || '添加失败')
      }
    },

    * DelJudge({payload}, {call, put}) {
      const {data} = yield call(judge.DelJudge, payload);
      if (data && data.ret === 0) {
        message.success('删除成功');
        return data.ret;
      } else {
        message.error(data.msg || '删除失败')
      }
    },

    * GetJudge({payload}, {call, put}) {
      try {
        const {data} = yield call(judge.GetJudge, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {judgeList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * EditJudge({payload}, {call, put}) {
      const {data} = yield call(judge.EditJudge, payload);
      if (data && data.ret === 0) {
        message.success('修改成功');
        return data.ret;
      } else {
        message.error(data.msg || '修改失败')
      }
    },

  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
