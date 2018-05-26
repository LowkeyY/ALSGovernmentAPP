import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'


export default modelExtend(model, {
  namespace: 'guard',
  state:{
    selectedIndex : 0,
    scrollerTop:0
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query, action}) => {
        if (pathname === '/guard') {

        }
      })
    },
  },
  effects: {

  },

  reducers:{



  }

})
