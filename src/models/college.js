import * as college from '../services/college';
import {message} from 'antd';

export default {
  namespace: 'college',
  state: {
    collegeList: {
      list: []
    },
  },
  effects: {
    /**
     * 添加院系
     */
    *AddCollege({payload}, {call, put}) {
      const {data} = yield call(college.AddCollege, payload);
      if (data && data.ret === 0) {
        message.success('添加成功');
        return data.ret;
      } else {
        message.error(data.msg || '添加失败')
      }
    },

    /**
     * 删除院系
     */
    *DelCollege({payload}, {call, put}) {
      const {data} = yield call(college.DelCollege, payload);
      if (data && data.ret === 0) {
        message.success('删除成功');
        return data.ret;
      } else {
        message.error(data.msg || '删除失败')
      }
    },

    /**
     * 获取院系
     */
    *GetCollege({payload}, {call, put}) {
      try {
        const {data} = yield call(college.GetCollege, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {collegeList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    /**
     * 更新院系
     */
    *EditCollege({payload}, {call, put}) {
      console.log(payload);
      const {data} = yield call(college.EditCollege, payload);
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
