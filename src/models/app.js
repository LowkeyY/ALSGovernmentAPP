/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { config, cookie } from 'utils'
import { defaultTabBarIcon , defaultTabBars } from 'utils/defaults'
import { queryAppbase } from 'services/app'

const { userTag: { username, usertoken } } = config, { _cs, _cr, _cg } = cookie,
  getInfoUser = () => ({
      username: _cg(username),
      usertoken: _cg(usertoken),
    }
  ),
  appendIcon = (tar, i) => {
    let { icon = '', selectedIcon = '', route = '/default' } = tar
    tar.key = ++i
    if (icon == '' || selectedIcon == '') {
      route = route.substr(1)
      tar = { ...tar, ...(defaultTabBarIcon[route || 'default'] || {}) }
    }
    return tar
  }

export default {
  namespace: 'app',
  state: {
    spinning: false,
    isLogin: false,
    users: getInfoUser(),
    tabBars: [],
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      dispatch({
        type: 'query',
      })
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/') {
          dispatch({
            type: 'updateUsers',
            payload: {
              others: {
                spinning: true,
              },
            },
          })
        }
      })
    }
    ,
  }
  ,
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryAppbase)
      if (data) {
        let { tabBars = defaultTabBars } = data
        tabBars = tabBars.map((bar, i) => appendIcon(bar, i))
        yield put({
          type: 'updateState',
          payload: {
            tabBars,
          },
        })
      }
    },
  }
  ,
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
    ,
    updateUsers (state, { payload }) {
      const { users = getInfoUser(), others = {} } = payload
      let isLogin = users[usertoken] !== ''
      return {
        ...state,
        ...others,
        users,
        isLogin,
      }
    },
  }
  ,
}
