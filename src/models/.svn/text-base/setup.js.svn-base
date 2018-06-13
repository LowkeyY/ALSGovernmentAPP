import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { setUserInfo,resetPassword } from 'services/setup'
import {Toast} from 'antd-mobile'

const MD5 = require("md5"), encrypt = (word) => {
  return MD5(word, 'hex');
}

export default modelExtend(model, {
  namespace: 'setup',
  state: {
    animating:false
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        let {pathname, query} = location;
        if (pathname.startsWith('/setup')) {

        }
      })
    }
  },
  effects: {
    * setUserInfo({payload}, {call, put, select}) {
      const { images = {}, mediaFile = {}, params } = payload
      const data = yield call(setUserInfo, params, images, mediaFile);
      const {realName} = params
      if(data.success){
        yield put({
          type: 'app/updateState',
          payload: {
            users:{username:realName}
          },
        })
        Toast.success('修改成功',2)
      }
    },
    * resetPassword({payload}, {call, put, select}) {
      const {passwd,rawpassword} =payload
       const result = {rawpassword:encrypt(rawpassword),passwd}
      const data = yield call(resetPassword, result);
      if(data.success){
        Toast.success('修改成功',2)
      }else {
        const { msg='修改失败' } = data
        Toast.fail(msg)
      }

    },
  }


})
