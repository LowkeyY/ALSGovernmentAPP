import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'components';
import Nav from 'components/nav';
import TitleBox from 'components/titlecontainer';
import Menu from 'components/menu/index';
import MpaDiv from 'components/mapdiv';
import { routerRedux } from 'dva/router';
import { getTitle } from 'utils';
import styles from './index.less';


const PrefixCls = 'patrymap';

function PatryMap ({ location, dispatch, patrymap }) {
  const { name = '' } = location.query,
    { mapUrl, maskDiv, menu, head } = patrymap,
    handleMenuClick = ({ externalUrl = '', id, route = 'details', title, menuType }) => {
      if (menuType === 'statics') {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl: `${externalUrl}?dataId=${id}`,
          },
        }));
      } else if (menuType === 'lanmu') {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name: title,
            id,
          },
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name: title,
            dataId: id,
          },
        }));
      }
    },
    handleDivClick = ({ id = '', title = '' }) => {
      dispatch(routerRedux.push({
        pathname: '/patrymap',
        query: {
          name: title,
          id,
        },
      }));
    };
  return (
    <div className={styles[`${PrefixCls}-container`]}>
      <Nav title={getTitle(name)} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-imgbox`]}>
        <img width="100%" src={mapUrl} alt=""/>
        {maskDiv && maskDiv.map((data, i) => {
          return <MpaDiv datas={data} handleClick={handleDivClick}/>;
        })}
      </div>
      <TitleBox title={head}/>
      <div className={styles[`${PrefixCls}-menu`]}>
        {menu.length > 0 &&
        <Menu handleGridClick={handleMenuClick}
              columnNum={2}
              dispatch={dispatch}
              datas={menu}
        />}
      </div>
    </div>
  );
}

export default connect(({ loading, patrymap }) => ({
  loading,
  patrymap,
}))(PatryMap);
