import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'components';
import Nav from 'components/nav';
import styles from './index.less';
import TitleBox from 'components/titlecontainer';
import Menu from 'components/menu/index';
import MpaDiv from 'components/mapdiv';
import { routerRedux } from 'dva/router';
import { getTitle } from 'utils';


const PrefixCls = 'patrymap';

function PatryMap ({ location, dispatch, patrymap }) {
  const { name = '' } = location.query, { mapUrl, maskDiv, menu, head } = patrymap,
    handleMenuClick = ({ externalUrl = '', id, route = 'details', title, menuType }) => {
      if (menuType.type === 'statics') {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl: `http://www.myals.gov.cn:9000/cphsc/interface/dangjian/mapStatics.htm?dataId=${id}`,
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
        pathname: `/patrymap`,
        query: {
          name: title,
          id: id,
        },
      }));
    };
  return (
    <div>
      <Nav title={getTitle(name)} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-imgbox`]}>
        <img width='100%' src={mapUrl} alt="" />
        {maskDiv && maskDiv.map((data, i) => {
          
          return <MpaDiv datas={data} handleClick={handleDivClick} />;
        })}
      </div>
      <TitleBox title={head} />
      <div>
        {menu.length > 0 &&
        <Menu handleGridClick={handleMenuClick}
              columnNum={name === '扶贫地图' || name === '左旗扶贫概况' || name === '巴彦诺日公苏木扶贫概况' ? 4 : 3} dispatch={dispatch}
              datas={menu} />}
      </div>
    </div>
  );
}

export default connect(({ loading, patrymap }) => ({
  loading,
  patrymap,
}))(PatryMap);
