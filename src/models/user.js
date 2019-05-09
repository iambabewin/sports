import * as userServeices from '../services/user';
import {message} from 'antd';
import * as score from "../services/score";

export default {
  namespace: 'user',
  state: {
    userInfo: {}
  },

  subscriptions: {
    setup({dispatch, history}) {
      if (window.location.pathname !== '/login') {
        const token = window.localStorage.getItem('token');
        if (!token) {
          window.location = '/login';
        }
      }
    },
  },

  effects: {
    * login({payload}, {call, put}) {
      try {
        const {data} = yield call(userServeices.login, payload);
        if (data && data.ret === 0) {
          message.success("登录成功");
          window.localStorage.setItem('token', data.data.token);
          window.localStorage.setItem('name', data.data.name);
          window.localStorage.setItem('role', data.data.role_id);
          if (data.data.role_id == 1) {
            window.location = '/collegeManage';
          } else if (data.data.role_id == 2) {
            window.location = '/professionManage';
          } else if (data.data.role_id == 3) {
            window.location = '/scoreInput'
          } else {
            window.location = '/registration'
          }
        } else {
          message.error(data.msg);
        }
      } catch (error) {
        message.error(error);
      }
    },

    * logout({payload}, {call, put}) {
      const {data} = yield call(userServeices.logout, payload);
      if (data && data.ret === 0) {
        message.success(data.msg);
        window.localStorage.setItem('token', '');
        window.location = '/login';
        console.log(window.localStorage.getItem('token'));
      } else {
        message.error(data.msg);
      }
    },

    * register({payload}, {call, put}) {
      try {
        const {data} = yield call(userServeices.register, payload);
        if (data && data.ret === 0) {
          message.success("注册成功");
          window.location = '/login';
        } else {
          message.error("注册失败");
        }
      } catch (error) {
        message.error(error);
      }
    },

    * GetUserInfo({payload}, {call, put}) {
      try {
        const {data} = yield call(userServeices.GetUserInfo, payload);
        if (data && data.ret === 0) {
          yield put({
            type: 'save',
            payload: {userInfo: data.data}
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
