import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { defaultGrids, defaultGridIcon } from 'utils/defaults'
import { queryDashboard } from 'services/dashboard'

const appendIcon = (grid, i) => {
  let { icon = '', route = 'default' } = grid
  if (icon == '') {
    grid = { ...grid, ...{ icon: defaultGridIcon[route || 'default'] } }
  }
  return grid
}
export default modelExtend(model, {
  namespace: 'dashboard',

  state: {
    bannerData: [
      { url: require('themes/images/banner/banner1.jpg') },
      { url: require('themes/images/banner/banner2.jpg') },
      { url: require('themes/images/banner/banner3.jpg') },
      { url: require('themes/images/banner/banner4.jpg') },
    ],
    noticeDate: [
      {
        title: '阿拉善头条：杨博调研巴彦浩特城市建设重点项目杨博调研巴彦浩特城市建设重点项杨博调研巴彦浩特城市建设重点项推进情况',
        id: 1,
      },
      {
        title: '阿拉善头',
        id: 2,
      },
      {
        title: '阿拉善头条：杨博调研巴彦浩特城市建设重点项目推进情况',
        id: 3,
      },
    ],
    grids: [],
    isScroll: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryDashboard)
      if (data) {
        let { grids = defaultGrids } = data
        grids = grids.map((grid, i) => appendIcon(grid, i))
        yield put({
          type: 'updateState',
          payload: {
            grids,
          },
        })
      }
    },
  },
})
