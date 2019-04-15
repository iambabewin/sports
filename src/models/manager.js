import * as manager from '../services/manager';
import {message} from 'antd';

export default {
  namespace: 'manager',
  state: {
    managerList: {
      list: []
    }
  },
  effects: {

    * AddManager({payload}, {call, put}) {
      const {data} = yield call(manager.AddManager, payload);
      if (data && data.ret === 0) {
        message.success('添加成功');
        return data.ret;
      } else {
        message.error(data.msg || '添加失败')
      }
    },

    * DelManager({payload}, {call, put}) {
      const {data} = yield call(manager.DelManager, payload);
      if (data && data.ret === 0) {
        message.success('删除成功');
        return data.ret;
      } else {
        message.error(data.msg || '删除失败')
      }
    },

    * GetManager({payload}, {call, put}) {
      try {
        const {data} = yield call(manager.GetManager, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {managerList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * EditManager({payload}, {call, put}) {
      const {data} = yield call(manager.EditManager, payload);
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
