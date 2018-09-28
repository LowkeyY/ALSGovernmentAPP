import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon, Modal } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import ListView from 'components/listview';
import { diaryRow } from 'components/row';
import { getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'diarylist';

function DiaryList ({ location, dispatch, diarylist, app }) {
  const { name = '' } = location.query, 
    { isLogin } = app,
    { scrollerTop = 0, diaryList, paginations = {} } = diarylist,
    handlerTaskClick = ({ id = '' }) => {
      dispatch(routerRedux.push(
        {
          pathname: 'diarydetails',
          query: {
            id
          },
        },
      ));
    },
    handlerSendDiaryClick = () => {
      if (isLogin) {
        dispatch(routerRedux.push(
          {
            pathname: 'diary',
            query: {
              name: '写日志'
            }
          },
        ));
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
    },
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/getDiaryList`,
        payload: {
          callback,
          isRefresh: true
        }
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/getDiaryList`,
        payload: {
          callback
        }
      });
    },
    onScrollerTop = (top) => {
      if (typeof top !== 'undefined' && !isNaN(top * 1)) {
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top
          }
        });
      }
    },
    getCurrentView = () => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
      return (
        <ListView
          layoutHeader={''}
          dataSource={diaryList}
          layoutRow={(rowData, sectionID, rowID) => diaryRow(rowData, sectionID, rowID, handlerTaskClick)}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />
      );
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace size="md" />
      <div className={styles[`${PrefixCls}-message-outer`]}>
        {getCurrentView()}
      </div>
      <div className={styles[`${PrefixCls}-sendBtn`]} onClick={handlerSendDiaryClick}>
        <Icon type={getLocalIcon('/others/addDiary.svg')} size="lg" />
      </div>
    </div>
  );
}

export default connect(({ loading, diarylist, app }) => ({
  loading,
  diarylist,
  app
}))(DiaryList);
