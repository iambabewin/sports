import * as profession from '../services/profession';
import {message} from 'antd/lib';

export default {
  namespace: 'profession',
  state: {
    professionList: {
      list: []
    },
    allProfessionList: [],
    collegeProfessionList: []
  },
  effects: {

    * AddProfession({payload}, {call, put}) {
      const {data} = yield call(profession.AddProfession, payload);
      if (data && data.ret === 0) {
        message.success('添加成功');
        return data.ret;
      } else {
        message.error(data.msg || '添加失败')
      }
    },

    * DelProfession({payload}, {call, put}) {
      const {data} = yield call(profession.DelProfession, payload);
      if (data && data.ret === 0) {
        message.success('删除成功');
        return data.ret;
      } else {
        message.error(data.msg || '删除失败')
      }
    },

    * GetProfession({payload}, {call, put}) {
      try {
        const {data} = yield call(profession.GetProfession, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {professionList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * GetAllProfession({payload}, {call, put}) {
      try {
        const {data} = yield call(profession.GetAllProfession, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {allProfessionList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * GetProfessionByCollege({payload}, {call, put}) {
      try {
        const {data} = yield call(profession.GetProfessionByCollege, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {collegeProfessionList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * EditProfession({payload}, {call, put}) {
      const {data} = yield call(profession.EditProfession, payload);
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
