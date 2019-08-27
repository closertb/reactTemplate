import { routerRedux } from 'dva/router';
import cookie from 'js-cookie';
import { Paths, SITE_NAME } from '../../configs/constants';
import { login } from './services';

export default {
  namespace: 'login',

  state: {
    siteName: SITE_NAME,
    loading: { login: false, infoInit: false },
  },

  effects: {
    * login({ payload }, { call, put }) {
      const { id, token, name } = yield call(login, payload);

      const expires = { expires: 1 };
      cookie.set('uid', id, expires);
      cookie.set('username', name, expires);
      cookie.set('token', token, expires);
      cookie.remove('lastPath');
      yield put(routerRedux.push('/home'));
    },

    * logout({ payload }, { put }) {
      cookie.remove('username');
      cookie.remove('uid');
      cookie.remove('token');
      yield put(routerRedux.push(Paths.LOGIN));
    },
  },

  reducers: {}
};
