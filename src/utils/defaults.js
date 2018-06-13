const defaultGrids = [
    {
      icon: require('themes/images/nmenus/suqiu.png'),
      name: '一键诉求',
      route: 'appeal',
    }, {
      icon: require('themes/images/nmenus/minsheng.png'),
      name: '民生阿拉善',
      route: 'livelihood',
    }
    , {
      icon: require('themes/images/nmenus/shengyin.png'),
      name: '融媒体',
      route: 'news',
    }
    , {
      icon: require('themes/images/nmenus/shuxiang.png'),
      name: '德润阿拉善',
      route: 'deren',
    }
    , {
      icon: require('themes/images/nmenus/dangjian.png'),
      name: '党建阿拉善',
      route: 'patry',
    }
    , {
      icon: require('themes/images/nmenus/lanmutab.png'),
      name: '法制阿拉善',
      route: 'legal',
    }
    , {
      icon: require('themes/images/nmenus/lvyou.png'),
      name: '印象阿拉善',
      route: 'lvyou',
    }
    , {
      icon: require('themes/images/nmenus/lanmutabshouhu.png'),
      name: '守护阿拉善',
      route: 'guard',
    }
    , {
      icon: require('themes/images/nmenus/shengtai.png'),
      name: '绿色阿拉善',
      route: 'ecology',
    },
    // ,{
    //   icon:require('themes/images/menu/books.png'),
    //   name:'生态阿拉善',
    //   route:'books'
    // }
  ],
  defaultTabBars = [{
    title: '首页',
    key: 1,
    icon: require('themes/images/ntabr/home1.png'),
    selectedIcon: require('themes/images/ntabr/home2.png'),
    route: '/',
  }
    , {
      title: '诉求',
      key: 2,
      icon: require('themes/images/ntabr/suqiu1.png'),
      selectedIcon: require('themes/images/ntabr/suqiu2.png'),
      route: '/appeal',
    }
    , {
      title: '民生',
      key: 3,
      icon: require('themes/images/ntabr/minsheng1.png'),
      selectedIcon: require('themes/images/ntabr/minsheng2.png'),
      route: '/livelihood',
    }
    , {
      title: '我的',
      key: 4,
      icon: require('themes/images/ntabr/mine1.png'),
      selectedIcon: require('themes/images/ntabr/mine2.png'),
      route: '/mine',
    },
  ],
  defaultTabBarIcon = {
    'default': {
      icon: require('themes/images/ntabr/home1.png'),
      selectedIcon: require('themes/images/ntabr/home2.png'),
    }, 'appeal': {
      icon: require('themes/images/ntabr/suqiu1.png'),
      selectedIcon: require('themes/images/ntabr/suqiu2.png'),
    }, 'livelihood': {
      icon: require('themes/images/ntabr/minsheng1.png'),
      selectedIcon: require('themes/images/ntabr/minsheng2.png'),
    }, 'mine': {
      icon: require('themes/images/ntabr/mine1.png'),
      selectedIcon: require('themes/images/ntabr/mine2.png'),
    },
  },
  defaultGridIcon = {
    'appeal': require('themes/images/nmenus/suqiu.png'),
    'livelihood': require('themes/images/nmenus/minsheng.png'),
    'news': require('themes/images/nmenus/shengyin.png'),
    'deren': require('themes/images/nmenus/shuxiang.png'),
    'patry': require('themes/images/nmenus/dangjian.png'),
    'lanmutab': require('themes/images/nmenus/lanmutab.png'),
    'lvyou': require('themes/images/nmenus/lvyou.png'),
    'lanmutabshouhu': require('themes/images/nmenus/lanmutabshouhu.png'),
    'ecology': require('themes/images/nmenus/shengtai.png'),
    'defualt': require('themes/images/nmenus/suqiu.png'),
  }
export default { defaultGrids, defaultGridIcon, defaultTabBars, defaultTabBarIcon }
