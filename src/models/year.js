import * as year from '../services/year';
import {message} from 'antd/lib';

export default {
  namespace: 'year',
  state: {
    yearList: {
      list: []
    },
    currentYearConnProjectList: [],
    allYearConnProjectList: []
  },
  effects: {
    * AddYear({payload}, {call, put}) {
      const {data} = yield call(year.AddYear, payload);
      if (data && data.ret === 0) {
        message.success('添加成功');
        return data.ret;
      } else {
        message.error(data.msg || '添加失败')
      }
    },

    * DelYear({payload}, {call, put}) {
      const {data} = yield call(year.DelYear, payload);
      if (data && data.ret === 0) {
        message.success('删除成功');
        return data.ret;
      } else {
        message.error(data.msg || '删除失败')
      }
    },

    * GetYear({payload}, {call, put}) {
      try {
        const {data} = yield call(year.GetYear, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {yearList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * EditYear({payload}, {call, put}) {
      const {data} = yield call(year.EditYear, payload);
      if (data && data.ret === 0) {
        message.success('修改成功');
        return data.ret;
      } else {
        message.error(data.msg || '修改失败')
      }
    },

    * GetCurrentYearConnProject({payload}, {call, put}) {
      try {
        const {data} = yield call(year.GetCurrentYearConnProject, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {currentYearConnProjectList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * GetAllYearConnProject({payload}, {call, put}) {
      try {
        const {data} = yield call(year.GetAllYearConnProject, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {allYearConnProjectList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * ConnYearProject({payload}, {call, put}) {
      const {data} = yield call(year.ConnYearProject, payload);
      if (data && data.ret === 0) {
        message.success('关联成功');
        return data.ret;
      } else {
        message.error(data.msg || '关联失败')
      }
    },

    * CancleConnYearProject({payload}, {call, put}) {
      const {data} = yield call(year.CancleConnYearProject, payload);
      if (data && data.ret === 0) {
        return data.ret;
      } else {
      }
    },
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
