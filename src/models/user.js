import * as userServeices from '../services/user';
import {message} from 'antd';

export default {
  namespace: 'user',
  state: {
    adminInfo: {
      username: ''
    }
  },
  effects: {
    * login({payload}, {call, put}) {
      try {
        const {data} = yield call(userServeices.login, payload);
        if (data && data.ret === 0) {
          message.success(data.msg);
          window.localStorage.setItem('token', data.data.token);
          window.location = '/managerInfo';
        } else {
          message.error('random error');
        }
      } catch (error) {
        message.error(error);
      }
      // return data.ret;
    },

    * logout({payload}, {call, put}) {
      const {data} = yield call(userServeices.logout, payload);

      if (data && data.ret === 0) {
        message.success(data.msg);
        window.localStorage.setItem('token', '');
        window.location = '/login';
      } else {
        message.error(data.msg);
      }
      return data.ret;
    },

  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
