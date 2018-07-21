import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { model } from 'models/common'
import { Toast } from 'components'
import { getFazhandangyuanxinxi, postFazhandangyuanxinxi } from 'services/fazhandangyuan'

const namespace = 'fazhandangyuanxinxi',
  defaultState = () => ({
    title: '',
    sort_id: '',
    attachments: [],
    btnText: '',
    uploading: false,
  }),
  getImages = (arr) => {
    let newArr = []
    if(arr&&Array.isArray(arr)){
      arr.map((data,index)=>{
        newArr.push(data.url)
      })
    }
    return newArr
  }

export default modelExtend(model, {
  namespace,
  state: {
    liuchengId: '',
    ...defaultState(),
    isOpen: false,
    images:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location
        if (pathname.startsWith(`/${namespace}`)) {
          const { liuchengId = '' , sort_id = '' , shenhe_tag = ''} = query
          if (action == 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                liuchengId,
                sort_id,
                shenhe_tag,
                isOpen: false,
              },
            })
            dispatch({
              type: 'query',
              payload: {
                liuchengId,
                sort_id,
                shenhe_tag,
              },
            })
          }
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const result = yield call(getFazhandangyuanxinxi, payload), { success = false, message = '发生未知错误。', ...others } = result,
        {attachments} = others
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            ...defaultState(),
            ...others,
            images:getImages(attachments)
          },
        })
      } else {
        Toast.fail(message, 2)
        yield put(routerRedux.goBack())
      }
    },
    * submits ({ payload }, { call, put, select }) {
      const { attachments = [], ...others } = yield select(_ => _[namespace]),
        filekey = [],
        fileContents = [],
        uploadFiles = {}
      attachments.map((file, index) => {
        let key = `${namespace}_file_${index}`
        if (file.file) {
          filekey.push(key)
          uploadFiles[key] = file.file
        } else {
          fileContents.push(file.url)
        }
      })
      if (filekey.length > 0) {
        others.fileKey = filekey.join(',')
      }
      others.fileContents = fileContents.length > 0 ? fileContents.join(',') : ''
      const { success = false, message = '发生未知错误。', ...result } = yield call(postFazhandangyuanxinxi, {
        ...others,
        ...payload,
      }, uploadFiles, {})
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            ...defaultState(),
            ...result,
          },
        })
      } else {
        Toast.fail(message, 2)
      }
    },
  },
})
