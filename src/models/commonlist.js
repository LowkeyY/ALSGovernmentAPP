import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'

const defaultIamge = require('themes/images/lvyou/default.jpg'),
  defaultBanners = [{
    url: defaultIamge,
  }, {
    url: defaultIamge,
  }],
  defaultGrids = [{
    name: '测试1',
    route: '1',
  }, {
    name: '测试2',
    route: '2',
  }],
  defaultFixedGrid = {
    id: '0',
    title: '找律师',
    route: 'legallist',
    image: defaultIamge,
    infos: '婚姻、房产、债权债务、合同纠纷',
  },
  defaultLists = [{
    id: '0',
    title: '测试',
    image: '',
  }, {
    id: '0',
    title: '测试',
    image: '',
  }],
  defaultIcon = require('themes/images/nmenus/suqiu.png'),
  getGrid = (datas = []) => {
    let result = [],
      counts = 0,
      fixedLanmu = []
    datas.map((data, index) => {
      const { id = '', route = '', image = '', ...others } = data
      if (id != '' && counts++ < 4) {
        result.push({
          id,
          route: route || '/',
          icon: image || [],
          ...others,
        })
      }
    })
    if (counts == datas.length && datas[counts - 1]) {
      fixedLanmu = {
        ...datas[counts - 1],
      }
    }
    return {
      grids: result.length > 0 ? result : [],
      fixedLanmu,
    }
  },
  getBanners = (datas = []) => {
    let result = [],
      counts = 0
    datas.map((data, index) => {
      const { image = '', id = '' } = data
      if (image != '' && id != '' && counts++ < 4) {
        result.push({
          url: image,
          ...data,
        })
      }
    })
    return result.length > 0 ? result : []
  },
  getList = (datas = []) => {
    const result = []
    datas.map((_, index) => {
      const { id = '', route = 'details' } = _
      if (id != '' > 0) {
        result.push({
          ..._,
          id,
          route,
        })
      }
    })
    return result.length > 0 ? result : []
  },
  getexternalUrl = (datas=[]) => {
    datas.map((data,index) =>{
      if(data.externalUrl!==''){
        return data.externalUrl
      }
    })
}


export default modelExtend(model, {
  namespace: 'commonlist',
  state: {
    bannerDatas: [],
    grids: [],
    fixedLanmu: {},
    lists: [],
    id: '',
    name: '',
    selectedIndex: 0,
    isOuterChain:false
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query , action}) => {
        if (pathname === '/commonlist') {
          if (action === 'PUSH'){
            const { id = '', name = '' } = query
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
                bannerDatas: [],
                grids: [],
                fixedLanmu: {},
                lists: [],
                selectedIndex: 0,
              },
            })
            dispatch({
              type: 'query',
              payload: {
                ...query,
              },
            })
          }
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        result = yield call(queryPartyTabs, { dataId: id })
      if (result) {
        let { data = [], banners = [] } = result,
          { grids, fixedLanmu } = getGrid(data)
        yield put({
          type: 'updateState',
          payload: {
            grids,
            fixedLanmu,
            bannerDatas: getBanners(banners),
          },
        })
        if (grids.length > 0) {
          const { id = '' } = grids[0]
          yield put({
            type: 'querySelect',
            payload: {
              id,
            },
          })
        } else {
          yield put({
            type: 'updateState',
            payload: {
              lists: [],
            },
          })
        }
      }
    },
    * querySelect ({ payload }, { call, put, select }) {
      const { id = '', selected = -1 } = payload, { selectedIndex ,isOuterChain } = yield select(state => state.commonlist)
      if (!isOuterChain) {
        const result = yield call(queryPartyData, { dataId: id })
        if (result) {
          let { data = [] } = result,
            updates = {
              lists: getList(data),
            }
          if (selected != -1) {
            updates['selectedIndex'] = selected
          }
          yield put({
            type: 'updateState',
            payload: {
              ...updates,
              isOuterChain:false
            },
          })
        }
      } else {
          const  updates = {}
          if (selected != -1) {
            updates['selectedIndex'] = selected
          }
          yield put({
            type: 'updateState',
            payload: {
              ...updates,
              externalUrl:getexternalUrl(),
              isOuterChain:true
            },
          })

      }


    },
  },

})
