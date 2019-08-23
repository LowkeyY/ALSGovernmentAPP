import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import { WhiteSpace, SearchBar, List } from 'components';
import { defaultThreeIcon } from 'utils/defaults';
import styles from './index.less';

const PrefixCls = 'threeopen';

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
            refreshSelf: true,
          },
        }));
      }
    },
    getLists = (list) => {
      return (
        list && list.map((item, i) => (
          <div key={i} className={styles[`${PrefixCls}-container`]}
            //    style={{ background: getCurrentColor(i) }}
               onClick={handlerClick.bind(null, item, dispatch)}
          >
            <div className={styles[`${PrefixCls}-container-title`]}>
              {item.title}
            </div>
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
      <Nav title={name} dispatch={dispatch} />
      <SearchBar
        placeholder='搜索'
        maxLength={20}
        onSubmit={handleSearchClick.bind(this)}
        onClear={handleCancelClick.bind(this)}
        onCancel={handleCancelClick.bind(this)}
      />
      <div className={styles[`${PrefixCls}-outer`]}>
        {lists.length > 0 &&
        lists.map((item, i) => {
          return (
            <List.Item
              className={styles[`${PrefixCls}-list`]}
              key={item.id}
              thumb={item.icon || <img src={defaultThreeIcon[i]} alt="" />}
              onClick={handlerClick.bind(null, item, dispatch)}
            >
              {item.title}
              <List.Item.Brief>{item.lastUpdate}</List.Item.Brief>
            </List.Item>
          );
        })
        }
      </div>
    </div>
  );
}

export default connect(({ loading, threeopen }) => ({
  loading,
  threeopen,
}))(ThreeOpen);
