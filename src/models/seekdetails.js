import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryAppealContent } from 'services/queryappeal'

const appendPositions = ({ street = '', district = '', city = '', province = '' }) => {
    return street || district || city || province
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
  appendData = ({
                  username, createDate, address = {}, title, voicePath = '', serverHost, shState = '',
                  status = '', content, images = [], huifu = [], shoucang = false, id = '', userPhoto,situatton
                }) => {
    return {
      username,
      createDate,
      positions: appendPositions(address),
      title,
      status,
      shState,
      content,
      images,
      answers: appendAnswer(huifu),
      isCollect: shoucang,
      id,
      voicePath,
      serverHost,
      userPhoto,
      workId: '',
      taskId: '',
      situatton
    }
  }

export default modelExtend(model, {
  namespace: 'seekdetails',
  state: {
    currentId: '',
    currentData: {},
    name,
    isOpen: false,
    viewImageIndex: -1,
    isTask: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/seekdetails') {
          const { name = '诉求详情', id = '',isTask } = query
          dispatch({
            type: 'updateState',
            payload: {
              name,
              currentId: id,
              isOpen: false,
              isTask
            },
          })
          dispatch({
            type: 'query',
            payload: {
              workId: id,
            },
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryAppealContent, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            currentData: appendData(data),
          },
        })
      }
    },
  },
})
