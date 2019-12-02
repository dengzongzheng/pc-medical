import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addSystemUser,listSystemUser,updateSystemUser } from './service';

import { TableListData } from './data.d';

export interface StateType {
  data: TableListData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    add: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<any>;
  };
}

const Model: ModelType = {
  namespace: 'supervise',

  state: {
    data: {
      list: [],
      pagination: {
        pageSize:10,
        pageNo:1,
        totalCount: 0
      },
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(listSystemUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addSystemUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      yield call(updateSystemUser, payload);
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      let data = {};
      data["list"] = action.payload.data.data;
      let pagination = {};
      pagination["pageSize"] = action.payload.data.pageSize;
      pagination["pageNo"] = action.payload.data.pageNo;
      pagination["totalCount"] = action.payload.data.totalCount;
      data["pagination"] = pagination;
      return {
        ...state,
        data: data
      }
      ;
    },
  },
};

export default Model;
