import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { Tabs, WhiteSpace, List, Icon, Accordion } from 'components';
import NoContent from 'components/nocontent';
import { layoutRow, hallRow } from 'components/row';
import { doDecode, getLocalIcon, getImages } from 'utils';
import { handleGridClick, handleListClick } from 'utils/commonevent';
import Robot from 'components/robot';
import liveBg from '../../themes/images/others/liveBg.svg';
import ListView from 'components/listview';
import styles from './index.less';

const PrefixCls = 'livelihood';

function Livelihood ({ location, dispatch, livelihood }) {
  const { name = '' } = location.query,
    { tabs, lanmuId, selectIndex, listsBanShi, serviceItems, robotType = 'banshi', officeData, lists, paginations, scrollerTop, dataId, activeKey } = livelihood,
    handleTabClick = (data, index) => {
      const { externalUrl = '', title, type = '', id } = data;
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
        if (type === 'office') {
          dispatch({
            type: 'livelihood/updateState',
            payload: {
              dataId: id,
            },
          });
          dispatch({
            type: 'livelihood/queryOffice',
            payload: {
              dataId: id,
            },
          });
        }
        if (type === 'zwzx') {
          dispatch({
            type: 'livelihood/updateState',
            payload: {
              dataId: id,
            },
          });
          dispatch({
            type: 'livelihood/queryService',
            payload: {
              dataId: id,
            },
          });
        }
        if (type === '') {
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
            },
          });
        }
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
    },

    handlerChange = (key) => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          activeKey: key,
        },
      });
    },

    getContent = () => {
      const { type = '' } = tabs && tabs[selectIndex];
      if (type === 'zwzx') {
        return (
          <Accordion
            className={styles[`${PrefixCls}-accordion`]}
            activeKey={activeKey}
            onChange={handlerChange}
          >
            {
              cnIsArray(serviceItems) && serviceItems.map((data, i) => {
                return (
                  <Accordion.Panel
                    header={
                      <div className={styles[`${PrefixCls}-accordion-title`]}>
                        <img src={data.image !== '' ? getImages(data.image) : `${liveBg}`} alt="" />
                        <div>{data.title}</div>
                      </div>
                    }
                    key={i}
                  >
                    <List>
                      {
                        data.children.map((item, i) => {
                          return (
                            <List.Item
                              wrap
                              key={item.id}
                              onClick={handleListClick.bind(null, item, dispatch, item.title)}
                            >
                              {item.title}
                            </List.Item>
                          );
                        })
                      }
                    </List>
                  </Accordion.Panel>
                );
              })
            }
          </Accordion>
        );
      }
      if (type === 'office') {
        return <div className={styles[`${PrefixCls}-accordion`]}>{hallRow(officeData, handleGridClick, dispatch)}</div>;
      }
      return <div>{getContents(lists)}</div>;
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-outer`]}>
        <div>
          <Tabs
            initialPage={0}
            page={selectIndex}
            tabs={tabs}
            swipeable={false}
            onTabClick={handleTabClick}
          >
            {tabs.length > 0 && getContent(tabs)}
            {/*<div>*/}
            {/*<Robot handlerSubmit={handlerSubmit} lists={listsBanShi} dispatch={dispatch}/>*/}
            {/*</div>*/}
            {/*<div><NoContent/></div>*/}
            {/*<div>*/}
            {/*{lists.length > 0 ? getContents(lists) : <NoContent/>}*/}
            {/*</div>*/}
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
