import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from 'routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('models/dashboard'))
          cb(null, { component: require('routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/dashboard'))
              cb(null, require('routes/dashboard/'))
            }, 'dashboard')
          },
        }
        , {
          path: 'warning',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/warning'))
              cb(null, require('routes/warning/'))
            }, 'warning')
          },
        }
        , {
          path: 'livelihood',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/livelihood'))
              cb(null, require('routes/livelihood/'))
            }, 'livelihood')
          },
        }
        , {
          path: 'ecology',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/ecology'))
              cb(null, require('routes/ecology/'))
            }, 'ecology')
          },
        }
        , {
          path: 'guard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/guard'))
              cb(null, require('routes/guard/'))
            }, 'guard')
          },
        }
      , {
          path: 'news',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/news'))
              cb(null, require('routes/news/'))
            }, 'news')
          },
        }, {
          path: 'newsdetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/newsdetails'))
              cb(null, require('routes/newsdetails/'))
            }, 'newsdetails')
          },
        }, {
          path: 'legal',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/legal'))
              cb(null, require('routes/legal/'))
            }, 'legal')
          },
        }

        , {
          path: 'deren',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/deren'))
              cb(null, require('routes/deren/'))
            }, 'deren')
          },
        }
        , {
          path: 'patry',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patry'))
              cb(null, require('routes/patry/'))
            }, 'patry')
          },
        }
        , {
          path: 'appeal',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/appeal'))
              cb(null, require('routes/appeal/'))
            }, 'appeal')
          },
        }, {
          path: 'seekdetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/seekdetails'))
              cb(null, require('routes/seekdetails/'))
            }, 'seekdetails')
          },
        }
        , {
          path: 'taskdetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/taskdetails'))
              cb(null, require('routes/taskdetails/'))
            }, 'taskdetails')
          },
        }
        , {
          path: 'details',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/details'))
              cb(null, require('routes/details/'))
            }, 'details')
          },
        }
        , {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/login'))
              cb(null, require('routes/login/'))
            }, 'login')
          },
        }
        , {
          path: 'mine',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/mine'))
              cb(null, require('routes/mine/'))
            }, 'mine')
          },
        }, {
          path: 'lvyou',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/lvyou'))
              cb(null, require('routes/lvyou/'))
            }, 'lvyou')
          },
        }, {
          path: 'lvyoudetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/lvyoudetails'))
              cb(null, require('routes/lvyoudetails/'))
            }, 'lvyoudetails')
          },
        }, {
          path: 'patrylist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patrylist'))
              cb(null, require('routes/patrylist/'))
            }, 'patrylist')
          },
        }, {
          path: 'patrydetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patrydetails'))
              cb(null, require('routes/patrydetails/'))
            }, 'patrydetails')
          },
        }, {
          path: 'test',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/test'))
              cb(null, require('routes/test/'))
            }, 'test')
          },
        }, {
          path: '*',
          getComponent (nextState, cb) {
            const { location: { pathname } } = nextState
            if (pathname && /^\/(android).+?index\.html$/.exec(pathname)) {
              require.ensure([], require => {
                registerModel(app, require('models/dashboard'))
                cb(null, require('routes/dashboard/'))
              })
            }
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes}/>
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
