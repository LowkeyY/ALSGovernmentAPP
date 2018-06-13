import modelExtend from 'dva-model-extend'
import { model } from 'models/common'

const defaultData = [
  {
    organization:'民政局',
    problem:'一是对加强基层党建工作力度还不够，没有把抓基层党建工作作为最大政绩，作为硬任务、硬指标来抓。二是没能做到统筹兼顾，没有处理好抓基层党建工作与抓其它工作的关系，没有把基层党建工作有效融入到推动经济社会发展之中。三是抓基层党建工作缺乏经常性、持续性，没有把每个环节抓具体、抓深入。四是对基层党组织帮扶力度不够，措施不尽完善，社会组织党建工作推进缓慢。'
  }
  , {
    organization:'民政局',
    problem:'一是对加强基层党建工作力度还不够，没有把抓基层党建工作作为最大政绩，作为硬任务、硬指标来抓。二是没能做到统筹兼顾，没有处理好抓基层党建工作与抓其它工作的关系，没有把基层党建工作有效融入到推动经济社会发展之中。三是抓基层党建工作缺乏经常性、持续性，没有把每个环节抓具体、抓深入。四是对基层党组织帮扶力度不够，措施不尽完善，社会组织党建工作推进缓慢。'
  },
  , {
    organization:'民政局',
    problem:'一是对加强基层党建工作力度还不够，没有把抓基层党建工作作为最大政绩，作为硬任务、硬指标来抓。二是没能做到统筹兼顾，没有处理好抓基层党建工作与抓其它工作的关系，没有把基层党建工作有效融入到推动经济社会发展之中。三是抓基层党建工作缺乏经常性、持续性，没有把每个环节抓具体、抓深入。四是对基层党组织帮扶力度不够，措施不尽完善，社会组织党建工作推进缓慢。'
  }
]

export default modelExtend(model, {
  namespace: 'patryworklist',
  state: {
     dataList:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/patryworklist') {
          const { id = '', name = '' } = query
          dispatch({
            type: 'query',
            payload: {
             
            },
          })
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
      yield put({
        type:'updateState',
        payload:{
          dataList:defaultData
        }
      })

      // const { selected = -1, ...others } = payload
      // if (selected != -1) {
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //       selectedIndex: selected,
      //     },
      //   })
      // }
      // const { success = true, datas = [] } = yield call(getJicengshenying, others)
      // if (success) {
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //       lists: datas,
      //     },
      //   })
      // }
    },
  },
})
