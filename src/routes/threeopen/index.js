import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import { WhiteSpace, SearchBar } from 'components';
import NoContent from 'components/nocontent';
import { specialRow, sceneryRow } from 'components/row';
import styles from './index.less';

const PrefixCls = 'threeopen';
const getBg = () => {
  const Bg = new Array(3);
  Bg[0] = require('./1.png');
  Bg[1] = require('./2.png');
  Bg[2] = require('./3.png');
  Bg[3] = require('./4.png');
  return Bg[Math.floor(Math.random() * Bg.length)];
};
// const Colors = ['greenyellow', 'lightskyblue', '#e8e862', '#f178d7'],
//   getCurrentColor = (i) => (i > Colors.length ? Colors[i % Colors.length] : Colors[i]);

function ThreeOpen ({ location, dispatch, threeopen }) {
  const { lists } = threeopen,
    { name = '', id = '' } = location.query,
    handlerClick = ({ route = '', title, externalUrl = '', infos = '', ...others }) => {
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
        dispatch(routerRedux.push({
          pathname: '/derenitems',
          query: {
            name: title,
            ...others,
          },
        }));
      }
    },
    getLists = (list) => {
      return (
        list && list.map((item, i) => (
          <div key={i} className={styles[`${PrefixCls}-container`]}
               style={{ backgroundImage: `url(${item.image !== '' ? getBg() : item.image})` }}
            //    style={{ background: getCurrentColor(i) }}
               onClick={handlerClick.bind(null, item, dispatch)}
          >
            <div className={styles[`${PrefixCls}-container-title`]}>
              {item.title}
            </div>
            <div className={styles[`${PrefixCls}-container-mask`]}></div>
          </div>
        ))
      );
    },
    handleSearchClick = (val) => {
      dispatch({
        type: 'threeopen/searchLanmu',
        payload: {
          dataId: id,
          searchText: val,
        },
      });
    },
    handleCancelClick = () => {
      dispatch({
        type: 'threeopen/query',
        payload: {
          id,
        },
      });
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <SearchBar
        placeholder='搜索'
        maxLength={20}
        onSubmit={handleSearchClick.bind(this)}
        onClear={handleCancelClick.bind(this)}
        onCancel={handleCancelClick.bind(this)}
      />
      <WhiteSpace/>
      <div className={styles[`${PrefixCls}-outer`]}>
        {lists.length > 0 ? getLists(lists) : <NoContent/>}
      </div>
    </div>
  );
}

export default connect(({ loading, threeopen }) => ({
  loading,
  threeopen,
}))(ThreeOpen);
