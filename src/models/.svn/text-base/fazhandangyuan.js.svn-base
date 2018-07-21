import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { model } from 'models/common'
import { Toast } from 'components'
import { getFazhandangyuan, postFazhandangyuan } from 'services/fazhandangyuan'

const namespace = 'fazhandangyuan',
  defaultState = () => ({
    isShenhe: false,
    uploading: false,
    imageFiles: [],
    btnText: '',
  })

export default modelExtend(model, {
  namespace,
  state: {
    liuchengId: '7a9bf0d6-824c-4e04-9775-d268a5ab0325',
    ...defaultState(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location
        if (pathname.startsWith(`/${namespace}`)) {
          const { liuchengId = '7a9bf0d6-824c-4e04-9775-d268a5ab0325', shenhe_tag = '' } = query
          if (action == 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                liuchengId,
                shenhe_tag,
              },
            })
          }
          dispatch({
            type: 'query',
            payload: {
              liuchengId,
              shenhe_tag,
            },
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const result = yield call(getFazhandangyuan, payload), { success = false, message = '发生未知错误。', ...others } = result
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            ...defaultState(),
            ...others,
          },
        })
      } else {
        Toast.fail(message, 2)
        yield put(routerRedux.goBack())
      }
    },
    * submits ({ payload }, { call, put, select }) {
      const { imageFiles = [], ...others } = yield select(_ => _[namespace]),
        filekey = [],
        uploadFiles = {}
      imageFiles.map((file, index) => {
        let key = `${namespace}_file_${index}`
        filekey.push(key)
        uploadFiles[key] = file.file
      })
      if (filekey.length > 0) {
        others.fileKey = filekey.join(',')
      }
      const { success = false, message = '发生未知错误。', ...result } = yield call(postFazhandangyuan, {
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
