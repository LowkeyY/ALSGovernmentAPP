const defaultGrids = [
    {
      icon: require('themes/images/nmenus/suqiu.png'),
      name: '一键诉求',
      route: 'appeal',
    },
    {
      icon: require('themes/images/nmenus/shouhu.png'),
      name: '守护阿拉善',
      route: 'guard',
    },
    {
      icon: require('themes/images/nmenus/minsheng.png'),
      name: '便民服务',
      route: 'livelihood',
    },
    {
      icon: require('themes/images/nmenus/jifen.png'),
      name: '积分管理',
      route: 'integralhome',
    },
    // ,{
    //   icon:require('themes/images/menu/books.png'),
    //   name:'生态阿拉善',
    //   route:'books'
    // }
  ],
  defaultNewGrids = {
    appeal: {
      image: require('themes/images/grid/suqiu.png'),
      tag: { label: '问题有人应', color: '#3ae1a6' },
      title: '一键诉求',
      content: '各种问题解答',
      route: 'appeal',
    },

    guard: {
      image: require('themes/images/grid/bianming.png'),
      tag: { label: '正能量满满', color: '#7fdd1e' },
      title: '守护阿拉善',
      content: '关注家乡安防',
      route: 'guard',
    },
    integralhome: {
      image: require('themes/images/grid/jifen.png'),
      tag: { label: '奖品多多', color: '#ce7afe' },
      title: '积分管理',
      content: '商城活动积分兑换',
      route: 'integralhome',
    },
    service: {
      image: require('themes/images/grid/shouhu.png'),
      tag: { label: '快捷方便', color: '#ffb044' },
      title: '便民服务',
      content: '各种方便服务',
      route: 'service',
    },
  },
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
    livelihood: require('themes/images/nmenus/jifen.png'),
    news: require('themes/images/nmenus/shengyin.png'),
    deren: require('themes/images/nmenus/shuxiang.png'),
    patry: require('themes/images/nmenus/dangjian.png'),
    lanmutab: require('themes/images/nmenus/lanmutab.png'),
    lvyou: require('themes/images/nmenus/lvyou.png'),
    lanmutabshouhu: require('themes/images/nmenus/minsheng.png'),
    ecology: require('themes/images/nmenus/suqiu.png'),
    defualt: require('themes/images/nmenus/suqiu.png'),
    building: require('themes/images/nmenus/shouhu.png'),
  };
export default { defaultGrids, defaultGridIcon, defaultTabBars, defaultTabBarIcon, defaultNewGrids };
