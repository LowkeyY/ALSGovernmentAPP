/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { queryPartyTabs } from 'services/querylist'

const { prefix } = config;

export default {
  namespace: 'app',
  state: {
    spinning:false,
    isLogin:false,
    tabs:[]
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({pathname, query, action}) => {
        if (pathname === '/'||pathname === '/patry') {
          dispatch({
            type:'querytabs'
          })
        }
        dispatch({
          type: 'updateState',
          payload: {
             spinning:true
          },
        })
      })
    },
  },
  effects: {
    *querytabs({payload}, {call, put, select}){
      const data = yield call(queryPartyTabs)
      if(data){
        yield put ({
          type: 'updateState',
          payload: {
            tabs:data.data
          },
        })
      }
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
