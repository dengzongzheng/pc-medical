import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { UserDetail } from './data.d';
import { userDetail } from './service';

export interface StateType {
  UserDetail: UserDetail;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBasic: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'systemUserAnddetail',

  state: {
    UserDetail:{
    },
  },

  effects: {
    *fetchBasic({ payload },{ call, put }) {
      const response = yield call(userDetail,payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        UserDetail:payload.data,
      };
    },
  },
};

export default Model;
