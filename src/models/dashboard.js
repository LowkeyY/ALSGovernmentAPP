
import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'


export default modelExtend(model, {
  namespace: 'dashboard',

    state: {
        bannerData:[
          {url:require('themes/images/banner/banner1.jpg')},
          {url:require('themes/images/banner/banner1.jpg')},
          {url:require('themes/images/banner/banner1.jpg')}
        ]
    },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname === '/dashboard' || pathname === '/' || /^\/(android).+?index\.html$/.exec(pathname)) {
          dispatch({
            type: 'query'
          })
        }
      })
    },
  },
  effects: {}
})
