import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { getJicengshenying } from 'services/querylist'

const defaultTabs = [
    { id: 1, title: '待办理' },
    { id: 2, title: '急需办理' },
    { id: 3, title: '已办理' },
    { id: 4, title: '已逾期' },
  ],
  defaultList = [
    {
      bumen: '匿名',
      zeren: '2018-8-15 08:59',
      dingban: '张家界',
      title: '漏水了',
      status: '已批转',
      yijian: '大会覅苏打回访水电费莱克斯顿就发d放大来看结构来看范德萨价格破is打工的时间分工都是佛厉害胜多负少的了多少积分离开是的覅偶第三方第三个风口浪尖的撒供货商大两房和技术都恢复',
      id: 1,
    },
  ],
  defaultSelectedIndex = 0
export default modelExtend(model, {
  namespace: 'basevoice',
  state: {
    tabs: [{ id: 1, title: '待办理' },
      { id: 2, title: '急需办理' },
      { id: 3, title: '已办结' },
      { id: 4, title: '已逾期' }],
    lists: [],
    selectedIndex: defaultSelectedIndex,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({
        type: 'query',
        payload: {
          types: 1,
        },
      })
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/basevoice') {
          const { id = '', name = '' } = query
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name,
            },
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload }, { call, put, select }) {
      const { selected = -1, ...others } = payload
      if (selected != -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        })
      }
      const { success = true, datas = [] } = yield call(getJicengshenying, others)
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            lists: datas,
          },
        })
      }
    },
  },
})
