import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
export default modelExtend(model, {
  namespace: 'position',
  state: {
   src:'http://192.168.0.202:8080/cphsc/htmlpage/ShowAllUserLocation.jcp'
  },

})
