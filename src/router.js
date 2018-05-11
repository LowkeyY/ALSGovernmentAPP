import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from 'routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('models/dashboard'));
          cb(null, { component: require('routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/dashboard'));
              cb(null, require('routes/dashboard/'))
            }, 'dashboard')
          }
        }
        ,{
          path: 'warning',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/warning'));
              cb(null, require('routes/warning/'))
            }, 'warning')
          }
        }
        ,{
          path: 'contacts',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/contacts'));
              cb(null, require('routes/contacts/'))
            }, 'contacts')
          }
        }
        ,{
          path: 'convenient',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/convenient'));
              cb(null, require('routes/convenient/'))
            }, 'convenient')
          }
        }
        ,{
          path: 'position',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/position'));
              cb(null, require('routes/position/'))
            }, 'position')
          }
        }
        ,{
          path: 'message',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/message'));
              cb(null, require('routes/message/'))
            }, 'message')
          }
        }
        ,{
          path: 'messageroom',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/messageroom'));
              cb(null, require('routes/messageroom/'))
            }, 'messageroom')
          }
        }
        ,{
          path: 'notice',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/notice'));
              cb(null, require('routes/notice/'))
            }, 'notice')
          }
        }
        ,{
          path: 'patry',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patry'));
              cb(null, require('routes/patry/'))
            }, 'patry')
          }
        }
        ,{
          path: 'route',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/route'));
              cb(null, require('routes/route/'))
            }, 'route')
          }
        }
        ,{
          path: 'task',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/task'));
              cb(null, require('routes/task/'))
            }, 'task')
          }
        }
        ,{
          path: 'taskdetails',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/taskdetails'));
              cb(null, require('routes/taskdetails/'))
            }, 'taskdetails')
          }
        }
        ,{
          path: 'details',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/details'));
              cb(null, require('routes/details/'))
            }, 'details')
          }
        }
        ,{
          path: 'login',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/login'));
              cb(null, require('routes/login/'))
            }, 'login')
          }
        }
        ,{
          path: '*',
          getComponent(nextState, cb) {
            const {location : {pathname}} = nextState;
            if (pathname && /^\/(android).+?index\.html$/.exec(pathname)) {
              require.ensure([], require => {
                registerModel(app, require('models/dashboard'));
                cb(null, require('routes/dashboard/'))
              })
            }
          },
        }
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
