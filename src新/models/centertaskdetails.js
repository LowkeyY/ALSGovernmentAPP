import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryCenterAppealDetails, openAppeal, closeAppeal, refuseAppeal, completeAppeal } from 'services/centertask'
import { baseURL } from 'utils/config'
import { Toast } from 'components'
import { routerRedux } from 'dva/router'

const appendPositions = (street = '', district = '', city = '', province = '', streetNumber = '') => {
    if (street === '' && district === '' && city === '' && province === '' && streetNumber === '') {
      return '未填写'
    } else {
      return `${province}${district}${city}${street}${streetNumber}`
    }
  },
  appendAnswer = (answers = []) => {
    const result = []
    answers.map(answer => {
      const { userName, cdate, neirong } = answer
      result.push({
        contents: neirong,
        date: cdate,
        position: userName,
      })
    })
    return result
  },
  getImages = (url) => {

    if (url !== '') {
      let newArr = []
      url.split(',') && url.split(',')
        .map(data => {
          newArr.push(baseURL + '/' + data)
        })
      return newArr
    } else {
      return ''
    }
  },
  appendData = ({
                  userName, cdate, city, district, province, street, streetNumber, tels, endDate, isOpen, isRegist, phone, title, voicePath = '', workType, shState = '', type, status = '', textInfo, huifu = [], qingShiCount, id = '', situatton, isWgy = '', sswg, photoPath, state,
                }) => {
    return {
      userName,
      cdate,
      positions: appendPositions(street, district, city, province, streetNumber),
      title,
      status,
      shState,
      textInfo,
      images: getImages(photoPath),
      answers: appendAnswer(huifu),
      id,
      voicePath,
      workId: '',
      situatton,
      isRegist,
      isWgy,
      isOpen,
      sswg,
      phone,
      tels,
      workType,
      state,
    }
  }

export default modelExtend(model, {
  namespace: 'centertaskdetails',
  state: {
    currentId: '',
    currentData: {},
    name: '',
    isActive: false,
    viewImageIndex: -1,
    isTask: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/centertaskdetails') {
          const { name = '诉求详情', workId = '' } = query
          dispatch({
            type: 'updateState',
            payload: {
              name,
              isOpen: false,
            },
          })
          dispatch({
            type: 'query',
            payload: {
              workId,
            },
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryCenterAppealDetails, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            currentData: appendData(data.data[0]),
          },
        })
      }
    },
    * openAppeal ({ payload }, { call, put, select }) {
      const data = yield call(openAppeal, payload)
      if (data.success) {
        Toast.success('已公开')
      } else {
        Toast.fail('未知错误，请稍后再试')
      }
    },
    * closeAppeal ({ payload }, { call, put, select }) {
      const data = yield call(closeAppeal, payload)
      if (data.success) {
        Toast.success('已撤回')
      } else {
        Toast.fail('未知错误，请稍后再试')
      }
    },
    * refuseAppeal ({ payload }, { call, put, select }) {
      const data = yield call(refuseAppeal, payload)
      if (data.success) {
        Toast.success('已拒绝该诉求')
        yield put(routerRedux.goBack())
      } else {
        Toast.fail('未知错误，请稍后再试')
      }
    },
    * completeAppeal ({ payload }, { call, put, select }) {
      const data = yield call(completeAppeal, payload)
      if (data.success) {
        Toast.success('已完成')
        yield put(routerRedux.goBack())
      } else {
        Toast.fail('未知错误，请稍后再试')
      }
    },
  },
})
