import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import {QueryMembers,SendTask} from 'services/querylist'
import { Toast } from 'components';
import { routerRedux } from 'dva/router';

const defaultData = [
  {
    name:"选择工作人员",
    data:[
      {
        name:"张三",
        deptPath:"测试部门/测试子部门",
        isMaster:"部门管理员",
        userId:0
      },{
        name:"李四",
        deptPath:"测试部门",
        isMaster:"",
        userId:0
      }
    ]
  },
  {
    name:"选择网格员",
    data:[
      {
        name:"张三",
        deptPath:"测试网格/测试子网格",
        isMaster:"部门管理员",
        userId:0
      },{
        name:"李四",
        deptPath:"测试部门",
        isMaster:"",
        userId:0
      }
    ]
  }
]


export default modelExtend(model, {
  namespace: 'selectmembers',
  state: {
    lists:[],
    taskId:'',
    workId:'',
    isWork:'',
    itemLists:[],
    flowLeve:0,
    currentSelect:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query , action}) => {
        if (pathname === '/selectmembers') {
          if (action === 'PUSH'){
            const { taskId = '', name = '',workId,isWork,flowLeve} = query
            dispatch({
              type: 'updateState',
              payload: {
                name,
                taskId,
                workId,
                isWork,
                flowLeve,
                currentSelect:[]
              },
            })
            dispatch({
              type: 'queryMembers',
              payload:{
                taskId
              }
            })
          }
        }
      })
    },
  },
  effects: {
    * queryMembers ({ payload }, { call, put, select }) {
       const result = yield call(QueryMembers, {...payload})
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            lists: result.data,
          },
        })
      }
    },
    * submit ({ payload }, { call, put, select }) {
      const result = yield call(SendTask, {...payload})
      if (result.success) {
        yield put(routerRedux.goBack());
        Toast.success('成功下发任务');
      }
    },

  }

})
