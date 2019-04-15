import * as classs from '../services/class';
import {message} from 'antd';
import * as profession from "../services/profession";

export default {
  namespace: 'classs',
  state: {
    classList: {
      list: []
    },
    professionClassList: [],
    allClassList: []
  },
  effects: {

    * AddClass({payload}, {call, put}) {
      const {data} = yield call(classs.AddClass, payload);
      if (data && data.ret === 0) {
        message.success('添加成功');
        return data.ret;
      } else {
        message.error(data.msg || '添加失败')
      }
    },

    * DelClass({payload}, {call, put}) {
      const {data} = yield call(classs.DelClass, payload);
      if (data && data.ret === 0) {
        message.success('删除成功');
        return data.ret;
      } else {
        message.error(data.msg || '删除失败')
      }
    },

    * GetClass({payload}, {call, put}) {
      try {
        const {data} = yield call(classs.GetClass, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {classList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * GetAllClass({payload}, {call, put}) {
      try {
        const {data} = yield call(classs.GetAllClass, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {allClassList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * GetClassByProfession({payload}, {call, put}) {
      try {
        const {data} = yield call(classs.GetClassByProfession, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {professionClassList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * EditClass({payload}, {call, put}) {
      const {data} = yield call(classs.EditClass, payload);
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
