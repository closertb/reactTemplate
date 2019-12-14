import { Paths, PAGE_SIZE } from '../../configs/constants';
import services from './services';

const initialSearch = {
  pn: 1,
  ps: PAGE_SIZE,
  status: undefined,
};

export default {
  namespace: 'rule',

  state: {
    datas: [],
    total: 0,
    search: initialSearch,
    loading: {},
  },
  subscriptions: {
    setup({ listen, dispatch }) {
      listen(Paths.RULE, () => {
        dispatch({ type: 'getList' });
      }, false); // 将beforeEnterListener方法禁用
    },
  },
  effects: {
    * getList({ payload }, { call, update, select }) {
      const { search } = yield select('rule');
      const { datas, total } = yield call(services.getList, search);
      yield update({ datas, total });
    },
    * save({ payload }, { call, put }) {
      yield call(services.save, payload);
      yield put({ type: 'getList' });
    },
    * update({ payload }, { call, put }) {
      yield call(services.update, payload);
      yield put({ type: 'getList' });
    },
    * getDetail({ payload }, { call }) {
      yield call(services.getDetail, payload);
    }
  },

  reducers: {
    updateSearch(state, { payload }) {
      const { search } = state;
      return { ...state, search: { ...search, ...payload } };
    }
  }
};
