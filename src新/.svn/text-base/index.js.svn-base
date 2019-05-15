import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
//import { browserHistory } from 'dva/router'
import 'babel-polyfill'
import { Toast } from 'antd-mobile'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  onError (error) {
    Toast.offline(error.message)
  },
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
