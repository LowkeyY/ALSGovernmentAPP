/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { config, cookie, setLoginOut, postCurrentPosition } from 'utils'
import { Modal } from 'antd-mobile'
import { defaultTabBarIcon, defaultTabBars } from 'utils/defaults'
import { queryAppbase, logout, guiji } from 'services/app'
import { GetUnreadMessage } from 'services/querylist'

const { userTag: { username, usertoken, userid, useravatar, usertype } } = config, { _cs, _cr, _cg } = cookie,
  getInfoUser = () => {
    const result = {}
    result[username] = _cg(username)
    result[usertoken] = _cg(usertoken)
    result[userid] = _cg(userid)
    result[useravatar] = _cg(useravatar)
    result[usertype] = _cg(usertype)
    return result
  },
  getUserLoginStatus = (users = '') => {
    users = users || getInfoUser()
    return users[userid] !== '' && users[usertoken] !== '' && users[username] !== ''
  },
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
    isLogin: getUserLoginStatus(),
    users: getInfoUser(),
    tabBars: [],
    updates: {},
    guiji: {},
    showModal: false,
    noViewCount: 0,
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      const others = {}
      others[usertoken] = _cg(usertoken)
      console.log('app setup:', getInfoUser(), getUserLoginStatus())
      dispatch({
        type: 'query',
        payload: {
          currentVersion: cnVersion,
          systemType: cnDeviceType(),
          ...others
        },
      })
      window.addEventListener('cnevent', (e) => {
        const { cneventParam = {} } = (e || {}), { __type = '', ...others } = cneventParam
        if (__type === 'wsmessage') {
          dispatch({
            type: 'updateCount',
          })
        }
      })
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/') {
          dispatch({
            type: 'updateUsers',
          })
        }
      })
    },
  }
  ,
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryAppbase, payload)
      if (data) {
        let { tabBars = defaultTabBars } = data
        const { updates = {}, guiji = {} } = data, { urls } = updates
        tabBars = tabBars.map((bar, i) => appendIcon(bar, i))
        yield put({
          type: 'updateState',
          payload: {
            tabBars,
            updates,
            guiji,
          },
        })
        //postCurrentPosition(guiji)
        if (urls !== '') {
          yield put({
            type: 'updateState',
            payload: {
              showModal: true,
            },
          })
        }
        yield put({
          type: 'queryMessage',
        })
      }
    }
    ,
    * logout ({}, { call, put, select }) {
      const data = yield call(logout)
      if (data) {
        setLoginOut()
        yield put({
          type: 'updateState',
          payload: {
            users: {},
            isLogin: false,
            noViewCount: 0,
          },
        })
        yield put(routerRedux.replace({
          pathname: '/login',
        }))
      }
    },
    * guiji ({ payload }, { call, put, select }) {
      const { success = false, ...others } = yield call(guiji, payload)
      if (success) {
        yield put({
          type: 'updateGuiji',
          payload: others,
        })
      }
    },
    * queryMessage ({ payload }, { call, put, select }) {
      const { isLogin = false } = yield select(_ => _.app)
      if (isLogin) {
        const data = yield call(GetUnreadMessage), { success, noViewCount = 0 } = data
        if (success) {
          yield put({
            type: 'updateState',
            payload: {
              noViewCount: noViewCount * 1,
            },
          })
        }
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
    updateUsers (state, { payload = {} }) {
      let { users: appendUsers = getInfoUser(), others = {} } = payload, { users } = state
      users = { ...users, ...appendUsers }
      let isLogin = getUserLoginStatus(users)
      return {
        ...state,
        ...others,
        users,
        isLogin,
      }
    }
    ,
    updateGuiji (state, { payload }) {
      const { guiji = {} } = state
      return {
        ...state,
        guiji: {
          ...guiji,
          ...payload,
        },
      }
    },
    updateCount (state, { payload }) {
      const { noViewCount } = state,
        nowCount = noViewCount * 1 + 1
      return {
        ...state,
        noViewCount: nowCount,
      }
    },
  }
  ,
}
