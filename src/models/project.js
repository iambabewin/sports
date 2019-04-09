import * as project from '../services/project';
import {message} from 'antd';

export default {
  namespace: 'project',
  state: {
    projectList: {
      list: []
    },
  },
  effects: {

    * AddProject({payload}, {call, put}) {
      const {data} = yield call(project.AddProject, payload);
      if (data && data.ret === 0) {
        message.success('添加成功');
        return data.ret;
      } else {
        message.error(data.msg || '添加失败')
      }
    },

    * DelProject({payload}, {call, put}) {
      const {data} = yield call(project.DelProject, payload);
      if (data && data.ret === 0) {
        message.success('删除成功');
        return data.ret;
      } else {
        message.error(data.msg || '删除失败')
      }
    },

    * GetProject({payload}, {call, put}) {
      try {
        const {data} = yield call(project.GetProject, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {projectList: data.data}
          });
          return data.ret;
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error.message);
      }
    },

    * EditProject({payload}, {call, put}) {
      const {data} = yield call(project.EditProject, payload);
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
