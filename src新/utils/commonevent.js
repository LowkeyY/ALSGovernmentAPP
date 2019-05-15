import { routerRedux } from 'dva/router';
import { Modal } from 'components';
import { doDecode } from 'utils';

const getInfo = (info) => {
  if (info) {
    try {
      return doDecode(info);
    } catch (e) {
    }
  }
  return {};
};
const handleGridClick = ({ route = '', title, externalUrl = '', infos = '', ...others }, dispatch, isLogin = false) => {
    if (externalUrl !== '' && externalUrl.startsWith('http')) {
      if (cnOpen) {
        cnOpen(externalUrl);
      } else {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }));
      }
    } else {
      const { name = '' } = getInfo(infos);
      if (name === 'logined') {
        if (isLogin) {
          dispatch(routerRedux.push({
            pathname: `/${route}`,
            query: {
              name: title,
              ...others,
            },
          }));
        } else {
          Modal.alert('您还没登陆', '请登陆后继续收藏', [
            { text: '稍后再说', onPress: () => console.log('cancel') },
            {
              text: '立刻登陆',
              onPress: () =>
                dispatch(routerRedux.push({
                  pathname: '/login',
                })),
            },
          ]);
        }
      } else {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name: title,
            ...others,
          },
        }));
      }
    }
  },
  handleBannerClick = ({ externalUrl = '', id, route = 'details', title = '' }, dispatch, name = '') => {
    if (externalUrl !== '' && externalUrl.startsWith('http')) {
      if (cnOpen) {
        cnOpen(externalUrl);
      } else {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }));
      }
    } else if (route === 'details') {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          name,
          dataId: id,
        },
      }));
    } else {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          name: title,
          id,
        },
      }));
    }
  },
  handleTopLineClick = (data, dispatch) => {
    const { externalUrl = '' } = data,
      { type = '', name = '', id = '', route = '' } = getInfo(externalUrl);
    if (type !== '') {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          id,
          name,
        },
      }));
    } else {
      dispatch(routerRedux.push({
        pathname: '/details',
        query: {
          dataId: data.id,
          name: '阿拉善头条',
        },
      }));
    }
  },
  handleListClick = ({ externalUrl = '', id, infos = '' }, dispatch, title = '') => {
    if (externalUrl !== '' && externalUrl.startsWith('http')) {
      if (cnOpen) {
        cnOpen(externalUrl);
      } else {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }));
      }
    } else {
      const { route = '' } = getInfo(infos);
      if (infos !== '' && route !== '') {
        const { id = '' } = getInfo(infos);
        if (route !== '') {
          dispatch(routerRedux.push({
            pathname: `/${route}`,
            query: {
              name: title,
              id,
            },
          }));
        }
      } else {
        dispatch(routerRedux.push({
          pathname: '/details',
          query: {
            name: title,
            dataId: id,
          },
        }));
      }
    }
  };
module.exports = {
  handleGridClick,
  handleBannerClick,
  handleTopLineClick,
  handleListClick
};
