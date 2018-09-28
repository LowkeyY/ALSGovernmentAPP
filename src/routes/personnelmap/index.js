import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { Button } from 'components';
import Iframes from 'components/ifream';
import styles from './index.less';

function PersonnelMap ({ location, dispatch, personnelmap }) {
  const { name = '', externalUrl = '', htmlBody = '' } = location.query,
    { buttons = [] } = personnelmap,
    getContents = () => {
      return {
        __html: htmlBody,
      };
    },
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
    };
  return (
    <div style={{ overflow: 'hidden' }} className={styles.outer}>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles.ifream}>
        {htmlBody !== '' ? <div dangerouslySetInnerHTML={getContents()} /> :
        <Iframes src={externalUrl} dispatch={dispatch} height={'65vh'} />}
      </div>
      <div className={styles.buttonbox}>
        {buttons && buttons.map((data, i) => {
          return (
            <Button
              key={data.id}
              type="primary"
              inline
              style={{ marginLeft:'20px',marginBottom: '10px',minWidth:'40%'
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
  );
}

export default connect(({ loading, personnelmap }) => ({
  loading,
  personnelmap,
}))(PersonnelMap);
