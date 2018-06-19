/* global window */
/* global document */
/* global location */
import {routerRedux} from 'dva/router'
import {parse} from 'qs'
import {config, cookie, setLoginOut, postCurrentPosition} from 'utils'
import {Modal} from 'antd-mobile'
import {defaultTabBarIcon, defaultTabBars} from 'utils/defaults'
import {queryAppbase, logout, guiji} from 'services/app'

const {userTag: {username, usertoken, userid, useravatar, usertype}} = config, {_cs, _cr, _cg} = cookie,
  getInfoUser = () => ({
      username: _cg(username),
      usertoken: _cg(usertoken),
      userid: _cg(userid),
      useravatar: _cg(useravatar),
      usertype: _cg(usertype)
    }
  ),
  getUserLoginStatus = (users) => {
    users = users || getInfoUser()
    return users[usertoken] !== ''
  },
  appendIcon = (tar, i) => {
    let {icon = '', selectedIcon = '', route = '/default'} = tar
    tar.key = ++i
    if (icon == '' || selectedIcon == '') {
      route = route.substr(1)
      tar = {...tar, ...(defaultTabBarIcon[route || 'default'] || {})}
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
    showModal: false
  },
  subscriptions: {
    setupHistory({dispatch, history}) {
      dispatch({
        type: 'query',
        payload: {
          currentVersion: cnVersion,
          systemType: cnDeviceType()
        }
      })
      history.listen(({pathname, query, action}) => {
        if (pathname === '/') {
          dispatch({
            type: 'updateUsers'
          })
        }
      })
    }
    ,
  }
  ,
  effects: {
    * query({payload}, {call, put, select}) {
      const data = yield call(queryAppbase, payload)
      if (data) {
        let {tabBars = defaultTabBars} = data
        const {updates, guiji = {}} = data, {urls} = updates
        tabBars = tabBars.map((bar, i) => appendIcon(bar, i))
        yield put({
          type: 'updateState',
          payload: {
            tabBars,
            updates,
            guiji
          },
        })
        postCurrentPosition(guiji)
        if (urls !== '') {
          yield put({
            type: 'updateState',
            payload: {
              showModal: true
            },
          })
        }
      }
    }
    ,
    * logout({}, {call, put, select}) {
      const data = yield call(logout)
      if (data) {
        setLoginOut()
        yield put({
          type: 'updateState',
          payload: {
            users: {},
            isLogin: false
          },
        })
        yield put(routerRedux.replace({
          pathname: '/login',
        }))
      }
    },
    * guiji({payload}, {call, put, select}) {
      const {success = false, ...others} = yield call(guiji, payload)
      if (success) {
        yield put({
          type: 'updateGuiji',
          payload: others,
        })
      }
    }
  }
  ,
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    }
    ,
    updateUsers(state, {payload = {}}) {
      let {users: appendUsers = getInfoUser(), others = {}} = payload, {users} = state
      users = {...users, ...appendUsers}
      let isLogin = getUserLoginStatus(users)
      return {
        ...state,
        ...others,
        users,
        isLogin,
      }
    }
    ,
    updateGuiji(state, {payload}) {
      const {guiji = {}} = state
      return {
        ...state,
        guiji: {
          ...guiji,
          ...payload
        }
      }
    }
  }
  ,
}
