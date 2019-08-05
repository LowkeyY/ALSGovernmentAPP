const menus = [{
  icon: require('themes/images/nmenus/suqiu.png'),
  name: '一键诉求',
  route: 'appeal',
},
  {
    icon: require('themes/images/nmenus/minsheng.png'),
    name: '政务服务',
    route: 'livelihood',
  },
  {
    icon: require('themes/images/nmenus/dangjian.png'),
    name: '党群建设',
    route: 'patry',
  },
  {
    icon: require('themes/images/nmenus/shengyin.png'),
    name: '融媒体',
    route: 'news',
  },
  {
    icon: require('themes/images/nmenus/shouhu.png'),
    name: '网格管理',
    route: 'guard',
  },
  {
    icon: require('themes/images/nmenus/shuxiang.png'),
    name: '文明实践',
    route: 'deren',
  },

  {
    icon: require('themes/images/nmenus/falv.png'),
    name: '法律服务',
    route: 'legalservice',
  },
  {
    icon: require('themes/images/nmenus/shehuizuzhi.png'),
    name: '社会组织',
    route: 'ecology',
  },
  {
    icon: require('themes/images/nmenus/lvyou.png'),
    name: '魅力驼乡',
    route: 'lvyou',
  },
  {
    icon: require('themes/images/nmenus/sanwu.png'),
    name: '三务公开',
    route: 'threeopen',
  },

  {
    icon: require('themes/images/nmenus/quntuan.png'),
    name: '群团组织',
    route: 'regiment',
  },
  {
    icon: require('themes/images/menu/books.png'),
    name: '志愿者服务',
    route: 'volunteerservice',
  },
];


const tabBarMenus = [{
  title: '首页',
  key: 1,
  icon: require('themes/images/ntabr/home1.png'),
  selectedIcon: require('themes/images/ntabr/home2.png'),
  route: '/',
},
  {
    title: '诉求',
    key: 2,
    icon: require('themes/images/ntabr/suqiu1.png'),
    selectedIcon: require('themes/images/ntabr/suqiu2.png'),
    route: '/appeal',
  },
  {
    title: '民生',
    key: 3,
    icon: require('themes/images/ntabr/minsheng1.png'),
    selectedIcon: require('themes/images/ntabr/minsheng2.png'),
    route: '/livelihood',
  },
  {
    title: '我的',
    key: 4,
    icon: require('themes/images/ntabr/mine1.png'),
    selectedIcon: require('themes/images/ntabr/mine2.png'),
    route: '/mine',
  },
];
export default { menus, tabBarMenus };
