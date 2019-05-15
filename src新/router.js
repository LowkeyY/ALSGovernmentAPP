import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'dva/router';
import App from 'routes/app';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('models/dashboard'));
          cb(null, { component: require('routes/dashboard/') });
        }, 'dashboard');
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/dashboard'));
              cb(null, require('routes/dashboard/'));
            }, 'dashboard');
          },
        },
        {
          path: 'warning',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/warning'));
              cb(null, require('routes/warning/'));
            }, 'warning');
          },
        },
        {
          path: 'building',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/building'));
              cb(null, require('routes/building/'));
            }, 'building');
          },
        },
        {
          path: 'livelihood',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/livelihood'));
              cb(null, require('routes/livelihood/'));
            }, 'livelihood');
          },
        },
        {
          path: 'ecology',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/ecology'));
              cb(null, require('routes/ecology/'));
            }, 'ecology');
          },
        },
        {
          path: 'guard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/guard'));
              cb(null, require('routes/guard/'));
            }, 'guard');
          },
        },
        {
          path: 'news',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/news'));
              cb(null, require('routes/news/'));
            }, 'news');
          },
        }, {
          path: 'newsdetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/newsdetails'));
              cb(null, require('routes/newsdetails/'));
            }, 'newsdetails');
          },
        },
        
        {
          path: 'deren',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/deren'));
              cb(null, require('routes/deren/'));
            }, 'deren');
          },
        },
        {
          path: 'patry',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patry'));
              cb(null, require('routes/patry/'));
            }, 'patry');
          },
        },
        {
          path: 'appeal',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/appeal'));
              cb(null, require('routes/appeal/'));
            }, 'appeal');
          },
        }, {
          path: 'seekdetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/seekdetails'));
              cb(null, require('routes/seekdetails/'));
            }, 'seekdetails');
          },
        },
        {
          path: 'taskdetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/taskdetails'));
              cb(null, require('routes/taskdetails/'));
            }, 'taskdetails');
          },
        },
        {
          path: 'details',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/details'));
              cb(null, require('routes/details/'));
            }, 'details');
          },
        },
        {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/login'));
              cb(null, require('routes/login/'));
            }, 'login');
          },
        },
        {
          path: 'mine',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/mine'));
              cb(null, require('routes/mine/'));
            }, 'mine');
          },
        }, {
          path: 'lvyou',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/lvyou'));
              cb(null, require('routes/lvyou/'));
            }, 'lvyou');
          },
        }, {
          path: 'patrylist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patrylist'));
              cb(null, require('routes/patrylist/'));
            }, 'patrylist');
          },
        }, {
          path: 'patrydetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patrydetails'));
              cb(null, require('routes/patrydetails/'));
            }, 'patrydetails');
          },
        }, {
          path: 'test',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/test'));
              cb(null, require('routes/test/'));
            }, 'test');
          },
        }, {
          path: 'lanmusub',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/lanmusub'));
              cb(null, require('routes/lanmusub/'));
            }, 'lanmusub');
          },
        }, {
          path: 'lanmutab',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/lanmutab'));
              cb(null, require('routes/lanmutab/'));
            }, 'lanmutab');
          },
        },
        {
          path: 'iframe',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('routes/iframe/'));
            }, 'iframe');
          },
        },
        {
          path: 'legallist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/legallist'));
              cb(null, require('routes/legallist/'));
            }, 'legallist');
          },
        },
        {
          path: 'derenitems',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/derenitems'));
              cb(null, require('routes/derenitems/'));
            }, 'derenitems');
          },
        },
        {
          path: 'volunteer',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/volunteer'));
              cb(null, require('routes/volunteer/'));
            }, 'volunteer');
          },
        },
        {
          path: 'camel',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/camel'));
              cb(null, require('routes/camel/'));
            }, 'camel');
          },
        },
        {
          path: 'survey',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/survey'));
              cb(null, require('routes/survey/'));
            }, 'survey');
          },
        },
        {
          path: 'basevoice',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/basevoice'));
              cb(null, require('routes/basevoice/'));
            }, 'basevoice');
          },
        },
        {
          path: 'commonlist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/commonlist'));
              cb(null, require('routes/commonlist/'));
            }, 'commonlist');
          },
        }, {
          path: 'lanmutabshouhu',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/lanmutabshouhu'));
              cb(null, require('routes/lanmutabshouhu/'));
            }, 'lanmutabshouhu');
          },
        },
        {
          path: 'integral',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/integral'));
              cb(null, require('routes/integral/'));
            }, 'integral');
          },
        },
        {
          path: 'payment',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/payment'));
              cb(null, require('routes/payment/'));
            }, 'payment');
          },
        },
        {
          path: 'opinion',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/opinion'));
              cb(null, require('routes/opinion/'));
            }, 'opinion');
          },
        },
        {
          path: 'setup',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/setup'));
              cb(null, require('routes/setup/'));
            }, 'setup');
          },
        },
        {
          path: 'myappeal',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/myappeal'));
              cb(null, require('routes/myappeal/'));
            }, 'myappeal');
          },
        },
        {
          path: 'volunteerdetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/volunteerdetails'));
              cb(null, require('routes/volunteerdetails/'));
            }, 'volunteerdetails');
          },
        },
        {
          path: 'incorrupt',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/incorrupt'));
              cb(null, require('routes/incorrupt/'));
            }, 'incorrupt');
          },
        },
        {
          path: 'search',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/search'));
              cb(null, require('routes/search/'));
            }, 'search');
          },
        },
        {
          path: 'threebig',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/threebig'));
              cb(null, require('routes/threebig/'));
            }, 'threebig');
          },
        },
        {
          path: 'patryworklist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patryworklist'));
              cb(null, require('routes/patryworklist/'));
            }, 'patryworklist');
          },
        },
        {
          path: 'twostupid',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/twostupid'));
              cb(null, require('routes/twostupid/'));
            }, 'twostupid');
          },
        },
        {
          path: 'lawyerlist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/lawyerlist'));
              cb(null, require('routes/lawyerlist/'));
            }, 'lawyerlist');
          },
        },
        {
          path: 'aboutus',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/aboutus'));
              cb(null, require('routes/aboutus/'));
            }, 'aboutus');
          },
        },
        {
          path: 'notary',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/notary'));
              cb(null, require('routes/notary/'));
            }, 'notary');
          },
        },
        {
          path: 'partymembers',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/partymembers'));
              cb(null, require('routes/partymembers/'));
            }, 'partymembers');
          },
        },
        {
          path: 'learnlist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/learnlist'));
              cb(null, require('routes/learnlist/'));
            }, 'learnlist');
          },
        },
        {
          path: 'fazhandangyuan',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/fazhandangyuan'));
              cb(null, require('routes/fazhandangyuan/'));
            }, 'fazhandangyuan');
          },
        },
        {
          path: 'partyintegral',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/partyintegral'));
              cb(null, require('routes/partyintegral/'));
            }, 'partyintegral');
          },
        },
        {
          path: 'fazhandangyuanxinxi',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/fazhandangyuanxinxi'));
              cb(null, require('routes/fazhandangyuanxinxi/'));
            }, 'fazhandangyuanxinxi');
          },
        },
        {
          path: 'fazhandangyuanlist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/fazhandangyuanlist'));
              cb(null, require('routes/fazhandangyuanlist/'));
            }, 'fazhandangyuanlist');
          },
        },
        {
          path: 'selectmembers',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/selectmembers'));
              cb(null, require('routes/selectmembers/'));
            }, 'selectmembers');
          },
        },
        {
          path: 'legalmediation',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/legalmediation'));
              cb(null, require('routes/legalmediation/'));
            }, 'legalmediation');
          },
        },
        {
          path: 'fazhandangyuanstep',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/fazhandangyuanstep'));
              cb(null, require('routes/fazhandangyuanstep/'));
            }, 'fazhandangyuanstep');
          },
        },
        {
          path: 'tspatry',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/tspatry'));
              cb(null, require('routes/tspatry/'));
            }, 'tspatry');
          },
        },
        {
          path: 'patrybuild',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patrybuild'));
              cb(null, require('routes/patrybuild/'));
            }, 'patrybuild');
          },
        },
        {
          path: 'donationDetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/donationDetails'));
              cb(null, require('routes/donationDetails/'));
            }, 'donationDetails');
          },
        },
        {
          path: 'routemap',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/routemap'));
              cb(null, require('routes/routemap/'));
            }, 'routemap');
          },
        },
        {
          path: 'patryprivate',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patryprivate'));
              cb(null, require('routes/patryprivate/'));
            }, 'patryprivate');
          },
        },
        {
          path: 'createtask',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/createtask'));
              cb(null, require('routes/createtask/'));
            }, 'createtask');
          },
        },
        {
          path: 'task110',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/task110'));
              cb(null, require('routes/task110/'));
            }, 'task110');
          },
        },
        {
          path: 'task110details',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/task110details'));
              cb(null, require('routes/task110details/'));
            }, 'task110details');
          },
        },
        {
          path: 'tasklist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/tasklist'));
              cb(null, require('routes/tasklist/'));
            }, 'tasklist');
          },
        },
        {
          path: 'taskstatistics',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/taskstatistics'));
              cb(null, require('routes/taskstatistics/'));
            }, 'taskstatistics');
          },
        },
        {
          path: 'patrymap',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patrymap'));
              cb(null, require('routes/patrymap/'));
            }, 'patrymap');
          },
        },
        {
          path: 'patrymaplist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/patrymaplist'));
              cb(null, require('routes/patrymaplist/'));
            }, 'patrymaplist');
          },
        },
        {
          path: 'speciallist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/speciallist'));
              cb(null, require('routes/speciallist/'));
            }, 'speciallist');
          },
        },
        {
          path: 'personnellist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/personnellist'));
              cb(null, require('routes/personnellist/'));
            }, 'personnellist');
          },
        },
        {
          path: 'personnelmap',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/personnelmap'));
              cb(null, require('routes/personnelmap/'));
            }, 'personnelmap');
          },
        },
        {
          path: 'twinsbox',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/twinsbox'));
              cb(null, require('routes/twinsbox/'));
            }, 'twinsbox');
          },
        },
        {
          path: 'diary',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/diary'));
              cb(null, require('routes/diary/'));
            }, 'diary');
          },
        },
        {
          path: 'diarylist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/diarylist'));
              cb(null, require('routes/diarylist/'));
            }, 'diarylist');
          },
        },
        {
          path: 'diarydetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/diarydetails'));
              cb(null, require('routes/diarydetails/'));
            }, 'diarydetails');
          },
        },
        {
          path: 'mobilepartys',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/mobilepartys'));
              cb(null, require('routes/mobilepartys/'));
            }, 'mobilepartys');
          },
        },
        {
          path: 'communitylist',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/communitylist'));
              cb(null, require('routes/communitylist/'));
            }, 'communitylist');
          },
        },
        {
          path: 'communitydetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/communitydetails'));
              cb(null, require('routes/communitydetails/'));
            }, 'communitydetails');
          },
        },
        {
          path: 'communityjoin',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/communityjoin'));
              cb(null, require('routes/communityjoin/'));
            }, 'communityjoin');
          },
        },
        {
          path: 'searchuser',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/searchuser'));
              cb(null, require('routes/searchuser/'));
            }, 'searchuser');
          },
        },
        {
          path: 'tasktable',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/tasktable'));
              cb(null, require('routes/tasktable/'));
            }, 'tasktable');
          },
        },
        {
          path: 'taskreact',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/taskreact'));
              cb(null, require('routes/taskreact/'));
            }, 'taskreact');
          },
        },
        {
          path: 'centertask',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/centertask'));
              cb(null, require('routes/centertask/'));
            }, 'centertask');
          },
        },
        {
          path: 'centertaskdetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/centertaskdetails'));
              cb(null, require('routes/centertaskdetails/'));
            }, 'centertaskdetails');
          },
        },
        {
          path: 'centerreply',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/centerreply'));
              cb(null, require('routes/centerreply/'));
            }, 'centerreply');
          },
        },
        {
          path: 'centersendtask',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/centersendtask'));
              cb(null, require('routes/centersendtask/'));
            }, 'centersendtask');
          },
        },
        {
          path: 'workers',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/workers'));
              cb(null, require('routes/workers/'));
            }, 'workers');
          },
        },
        {
          path: 'integraldetails',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/integraldetails'));
              cb(null, require('routes/integraldetails/'));
            }, 'integraldetails');
          },
        },
        {
          path: 'integralgoods',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/integralgoods'));
              cb(null, require('routes/integralgoods/'));
            }, 'integralgoods');
          },
        },
        {
          path: 'editortask',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/editortask'));
              cb(null, require('routes/editortask/'));
            }, 'editortask');
          },
        },
        {
          path: 'integralhome',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/integralhome'));
              cb(null, require('routes/integralhome/'));
            }, 'integralhome');
          },
        },
        {
          path: 'integralrule',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/integralrule'));
              cb(null, require('routes/integralrule/'));
            }, 'integralrule');
          },
        },
        {
          path: 'service',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('models/service'));
              cb(null, require('routes/service/'));
            }, 'service');
          },
        },
        {
          path: '*',
          getComponent (nextState, cb) {
            const { location: { pathname } } = nextState;
            if (pathname && /^\/(android).+?index\.html$/.exec(pathname)) {
              require.ensure([], require => {
                registerModel(app, require('models/dashboard'));
                cb(null, require('routes/dashboard/'));
              });
            }
          },
        },
      ],
    },
  ];
  
  return <Router history={history} routes={routes} />;
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
