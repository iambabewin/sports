import * as college from '../services/college';
import {message} from 'antd/lib';

export default {
  namespace: 'college',
  state: {
    collegeList: {
      list: []
    },
    allCollegeList: []
  },
  effects: {

    * AddCollege({payload}, {call, put}) {
      const {data} = yield call(college.AddCollege, payload);
      if (data && data.ret === 0) {
        message.success('添加成功');
        return data.ret;
      } else {
        message.error(data.msg || '添加失败')
      }
    },

    * DelCollege({payload}, {call, put}) {
      const {data} = yield call(college.DelCollege, payload);
      if (data && data.ret === 0) {
        message.success('删除成功');
        return data.ret;
      } else {
        message.error(data.msg || '删除失败')
      }
    },

    * GetCollege({payload}, {call, put}) {
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

    * GetAllCollege({payload}, {call, put}) {
      try {
        const {data} = yield call(college.GetAllCollege, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {allCollegeList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * EditCollege({payload}, {call, put}) {
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
