import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';


export default modelExtend(model, {
  namespace: 'routemap',
  state: {},
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/routemap') {
        
        }
      });
    },
  },
  effects: {},
  reducers: {},
  
});
