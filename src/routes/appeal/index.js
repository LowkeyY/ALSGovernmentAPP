import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { WhiteSpace, Icon, List, Flex, Tabs, Badge, Tag, Layout, Toast, Accordion, SearchBar, Modal } from 'components';
import ListView from 'components/listview';
import { routerRedux } from 'dva/router';
import { appealList } from 'components/row';
import NoContent from 'components/nocontent';
import { getImages, getErrorImg, getLocalIcon, postionsToString } from 'utils';
import styles from './index.less';

const tabs = [
    { title: <Badge>全部求助</Badge> },
    { title: <Badge>我的求助</Badge> },
    { title: <Badge>收藏求助</Badge> },
  ],
  PrefixCls = 'appeal';

function Appeal ({ location, dispatch, appeal, app, loading }) {
  const { paginations, scrollerTop, isLoading } = appeal,
    { isLogin } = app,

    handleCollectClick = (data) => {
      if (isLogin) {
        dispatch({
          type: `${PrefixCls}/collent`,
          payload: {
            ...data,
          },
        });
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

    handleCardClick = ({ id }) => {
      dispatch({
        type: 'seekdetails/updateState',
        payload: {
          isTask: false,
        },
      });
      dispatch(routerRedux.push({
        pathname: '/seekdetails',
        query: {
          id,
        },
      }));
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

    getContents = (lists) => {
      const result = [],
        { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        layoutList = (
          <div className={styles[`${PrefixCls}-list`]}>
            <ListView
              layoutHeader={''}
              dataSource={lists}
              layoutRow={(rowData, sectionID, rowID) => appealList(rowData, sectionID, rowID, isLogin, handleCardClick, handleCollectClick)}
              onEndReached={onEndReached}
              onRefresh={onRefresh}
              hasMore={hasMore}
              onScrollerTop={onScrollerTop.bind(null)}
              scrollerTop={scrollerTop}
            />
          </div>
        );
      for (let i = 0; i < tabs.length; i++) {
        if (i === selectedIndex) {
          result.push(<div>{layoutList}</div>);
        } else {
          result.push(<div />);
        }
      }
      return result;
    },

    getPositions = ({ street = '', district = '', city = '', province = '' }) => {
      return street || district || city || province;
    },

    getDataList = (datas = []) => {
      const result = [];
      datas.map(data => {
        const { username, shState, createDate, address = {}, title, state = 1, content, images = [], shoucang = false, id = '', shoucangId = '', userPhoto, situatton } = data;
        result.push({
          username,
          createDate,
          positions: getPositions(address),
          title,
          state,
          content,
          images,
          answers: [],
          shoucang,
          id,
          shState,
          shoucangId,
          situatton,
          userPhoto,
        });
      });
      return result;
    },

    { btnDisabled, dataList, btnTitle, name, selectedIndex, workCount } = appeal,

    getCountList = (data = {}) => {
      const { shouli = 0, huifu = 0, huifulv = 0, banjie = 0, banjielv = 0 } = data;

      return (
        <div className={styles[`${PrefixCls}-infobox-container`]}>
          {/* middleStart */}
          <Flex>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>受理件 <span>&nbsp;{`${shouli}件`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>回复件 <span>&nbsp;{`${huifu}件`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>回复率 <span>&nbsp;{`${huifulv}%`}</span></span>
              </div>
            </Flex.Item>
          </Flex>
          {/* bottomStart */}
          <Flex>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>办结件 <span>&nbsp;{`${banjie}件`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>办结率 <span>&nbsp;{`${banjielv}`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>满意率 <span>&nbsp;{`${100}%`}</span></span>
              </div>
            </Flex.Item>
          </Flex>
        </div>
      );
    },

    btnVisible = (visible = true) => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          btnDisabled: visible,
        },
      });
    },

    goWarring = (postions = {}) => {
      dispatch(routerRedux.push({
        pathname: '/warning',
        query: {
          name,
          location: postionsToString(postions),
        },
      }));
    },

    handleWarningClick = () => {
      btnVisible();
      const onSuccess = (postions = {}) => {
          btnVisible(false);
          dispatch({
            type: `${PrefixCls}/updateState`,
            payload: {
              notesvisible: true,
            },
          });
          goWarring(postions);
        },
        onError = ({ message = '', code = -999 }) => {
          btnVisible(false);
          let msg = code == -999 ? message : '请允许系统访问您的位置。';
          Toast.offline(msg, 2);
        };
      cnGetCurrentPosition(onSuccess, onError);
    },

    renderNavRight = (handleClick) => {
      return isLogin ? (
        btnDisabled ?
          <div className={styles[`${PrefixCls}-nav`]}>
            <Icon type="loading" size="xs" />
            <span>{btnTitle}</span>
          </div> :
          <div className={styles[`${PrefixCls}-nav`]} onClick={handleClick}>
            <Icon type={getLocalIcon('/others/sendup.svg')} size="xs" />
            <span>{btnTitle}</span>
          </div>
      ) : '';
    },

    currentDataList = getDataList(dataList),

    handleTabClick = (tab, index) => {
      if (isLogin) {
        dispatch({
          type: `${PrefixCls}/queryListview`,
          payload: {
            selected: index,
            isRefresh: true,
          },
        });
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            isLoading: true,
          },
        });
      } else {
        Modal.alert('您还没登陆', '请登陆后浏览', [
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

    handleSearchClick = () => {
      dispatch(routerRedux.push({
        pathname: '/search',
        query: {
          router: PrefixCls,
        },
      }));
    };

  return (
    <div>
      <Nav
        title={name}
        dispatch={dispatch}
        renderNavRight={renderNavRight(handleWarningClick.bind(null, btnTitle))}
      />
      <SearchBar
        placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick}
      />
      <Accordion defaultActiveKey="0" className="my-accordion">
        <Accordion.Panel header={<span>本周数据</span>}>
          <div className={styles[`${PrefixCls}-infobox`]}>
            {getCountList(workCount)}
          </div>
        </Accordion.Panel>
      </Accordion>
      <WhiteSpace size="xs" />
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onChange={(tab, index) => {
        }}
        onTabClick={handleTabClick}
      >
        {loading && isLoading ? <NoContent isLoading={loading} /> : getContents(currentDataList)}
      </Tabs>
    </div>
  );
}

export default connect(({ loading, appeal, app }) => ({
  loading: loading.effects[`${PrefixCls}/queryListview`],
  appeal,
  app,
}))(Appeal);
