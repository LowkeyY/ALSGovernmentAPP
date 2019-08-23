const defaultGrids = [
    {
      icon: require('themes/images/nmenus/suqiu.png'),
      name: '一键诉求',
      route: 'appeal',
    },
    {
      icon: require('themes/images/nmenus/minsheng.png'),
      name: '民生阿拉善',
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
      icon: require('themes/images/nmenus/wangge.png'),
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
      name: '印象阿拉善',
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
      icon: require('themes/images/nmenus/zhiyuan.png'),
      name: '志愿者服务',
      route: 'volunteerservice',
    },
  ],
  defaultTabBars = [{
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
  ],
  defaultTabBarIcon = {
    default: {
      icon: require('themes/images/ntabr/home1.png'),
      selectedIcon: require('themes/images/ntabr/home2.png'),
    },
    appeal: {
      icon: require('themes/images/ntabr/suqiu1.png'),
      selectedIcon: require('themes/images/ntabr/suqiu2.png'),
    },
    livelihood: {
      icon: require('themes/images/ntabr/minsheng1.png'),
      selectedIcon: require('themes/images/ntabr/minsheng2.png'),
    },
    mine: {
      icon: require('themes/images/ntabr/mine1.png'),
      selectedIcon: require('themes/images/ntabr/mine2.png'),
    },
  },
  defaultGridIcon = {
    appeal: require('themes/images/nmenus/suqiu.png'),
    livelihood: require('themes/images/nmenus/minsheng.png'),
    patry: require('themes/images/nmenus/dangjian.png'),
    news: require('themes/images/nmenus/shengyin.png'),
    guard: require('themes/images/nmenus/wangge.png'),
    deren: require('themes/images/nmenus/shuxiang.png'),
    legalservice: require('themes/images/nmenus/falv.png'),
    ecology: require('themes/images/nmenus/shehuizuzhi.png'),
    lvyou: require('themes/images/nmenus/lvyou.png'),
    threeopen: require('themes/images/nmenus/sanwu.png'),
    regiment: require('themes/images/nmenus/quntuan.png'),
    volunteerservice: require('themes/images/nmenus/zhiyuan.png'),
    defualt: require('themes/images/nmenus/suqiu.png'),
  },
  defaultThreeIcon = [
    require('themes/images/three/app_01.jpg'),
    require('themes/images/three/app_02.jpg'),
    require('themes/images/three/app_03.jpg'),
    require('themes/images/three/app_04.jpg'),
    require('themes/images/three/app_05.jpg'),
    require('themes/images/three/app_06.jpg'),
    require('themes/images/three/app_07.jpg'),
    require('themes/images/three/app_08.jpg'),
    require('themes/images/three/app_09.jpg'),
    require('themes/images/three/app_10.jpg'),
    require('themes/images/three/app_11.jpg'),
    require('themes/images/three/app_12.jpg'),
    require('themes/images/three/app_13.jpg'),
    require('themes/images/three/app_14.jpg'),
    require('themes/images/three/app_15.jpg'),
  ];

export default { defaultGrids, defaultGridIcon, defaultTabBars, defaultTabBarIcon, defaultThreeIcon };
