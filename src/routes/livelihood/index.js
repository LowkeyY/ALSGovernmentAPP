import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { Tabs, WhiteSpace, Icon } from 'components';
import NoContent from 'components/nocontent';
import { layoutRow } from 'components/row';
import { doDecode, getLocalIcon } from 'utils';
import { handleGridClick, handleListClick } from 'utils/commonevent';
import Robot from 'components/robot';
import ListView from 'components/listview';
import styles from './index.less';

const PrefixCls = 'livelihood';

function Livelihood ({ location, dispatch, livelihood }) {
  const { name = '' } = location.query,
    { tabs, lanmuId, selectIndex, listsBanShi, robotType = 'banshi', lists, paginations, scrollerTop, dataId } = livelihood,
    handleTabClick = (data, index) => {
      const { externalUrl = '', title, type = 'banshi', id } = data;
      if (type === 'bianmin') {
        dispatch({
          type: 'livelihood/updateState',
          payload: {
            dataId: id,
          },
        });
        dispatch({
          type: 'livelihood/queryListview',
          payload: {
            dataId: id,
            isRefresh: true,
          },
        });
      }
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
        dispatch({
          type: 'livelihood/updateState',
          payload: {
            selectIndex: index,
            robotType: type,
            lanmuId: id,
          },
        });
      }
    },

    handlerSubmit = (val) => {
      dispatch({
        type: 'livelihood/queryRes',
        payload: {
          ...val,
          lanmuId,
        },
      });
      dispatch({
        type: `livelihood/updateList${robotType}`,
        payload: {
          header: val.searchText,
          answers: [],
          isMySelf: true,
        },
      });
    },
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
          isRefresh: true,
        },
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
        },
      });
    },
    onScrollerTop = (top) => {
      if (typeof top !== 'undefined' && !isNaN(top * 1)) {
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top,
          },
        });
      }
    },
    getContents = (list) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView
          layoutHeader={''}
          dataSource={list}
          layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />,
      );

      return result;
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer`]}>
        <div>
          <Tabs
            initialPage={selectIndex}
            tabs={tabs}
            swipeable={false}
            onTabClick={handleTabClick}
          >
            <div>
              <Robot handlerSubmit={handlerSubmit} lists={listsBanShi} dispatch={dispatch}/>
            </div>
            <div><NoContent/></div>
            <div>
              {lists.length > 0 ? getContents(lists) : <NoContent/>}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default connect(({ loading, livelihood }) => ({
  loading,
  livelihood,
}))(Livelihood);
