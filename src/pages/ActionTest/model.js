import cookie from 'js-cookie';
import { login, getList } from './services';
import { isInBrowser } from '../../configs/server';

export default ({
  namespace: 'index',
  state: {
    count: 0,
    user: {},
    total: 0,
    loading: {
      login: false
    }
  },
  effects: {
    * add({ payload = {} }, { select, update }) {
      const { count } = yield select('index');
      const base = payload.count || 1;
      yield update({ count: count + base });
    },
    * subtract(_, { select, update }) {
      const { count } = yield select('index');
      yield update({ count: count - 1 });
    },
    * login({ payload }, { call, update }) {
      const user = yield call(login, payload);
      const { id, token, name } = user;
      if (isInBrowser) {
        const expires = { expires: 1 };
        cookie.set('uid', id, expires);
        cookie.set('username', name, expires);
        cookie.set('token', token, expires);
        cookie.remove('lastPath');
      }
      yield update({ user });
    },
    * getList({ payload }, { call, update }) {
      const { total, list } = yield call(getList, payload);
      yield update({ total, list });
    }
  },
  subscriptions: {
    setup({ dispatch, listen }) {
      listen('/action', () => {
        dispatch({ type: 'login', payload: { name: 'dom', pwd: '123456' } }); // 模拟请求发起
      });
    }
  },
  reducers: {
    updateCount(state, { payload }) {
      return {
        ...state,
        count: payload.count
      };
    }
  }
});
