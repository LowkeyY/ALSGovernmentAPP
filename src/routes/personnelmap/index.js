import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import TitleBox from 'components/titlecontainer';
import Menu from 'components/menu/index';
import { Button } from 'components';
import MpaDiv from 'components/mapdiv';
import styles from './index.less';

function PersonnelMap ({ location, dispatch, personnelmap }) {
  const { name = '' } = location.query,
    { mapUrl, maskDiv, menu, head } = personnelmap,

    handleListClick = ({ externalUrl = '', id, route = 'details', title = '' }) => {
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
        pathname: '/personnelmap',
        query: {
          name: title,
          id,
        },
      }));
    };
  return (
    <div style={{ overflow: 'hidden' }} className={styles.outer}>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles.imgbox}>
        <img width="100%" src={mapUrl} alt=""/>
        {maskDiv && maskDiv.map((data, i) => {
          return <MpaDiv datas={data} handleClick={handleDivClick}/>;
        })}
      </div>
      <TitleBox title={head}/>
      <div>
        <div className={styles.buttonbox}>
          {menu && menu.map((data, i) => {
            return (
              <Button
                key={data.id}
                type="primary"
                style={{
                  marginLeft: '20px', marginBottom: '20px', minWidth: '40%',
                }}
                onClick={handleListClick.bind(this, data)}
                className="am-button-borderfix"
              >
                {data.title}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default connect(({ loading, personnelmap }) => ({
  loading,
  personnelmap,
}))(PersonnelMap);
