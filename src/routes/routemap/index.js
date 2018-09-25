import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Eventlisten, Toast } from 'components';
import Ifreams from 'components/ifream';
import Nav from 'components/nav';
import HawkButton from 'components/hawkbutton';
import { config, cookie } from 'utils';

const { baseURL, privateApi, userTag } = config,
  { iframeUrlguiji, sumbitUrlPositions } = privateApi,
  { userid: userTagUserId } = userTag,
  { _cg } = cookie,
  PrefixCls = 'routemap';

function Routemap ({ location, dispatch, routemap, app }) {
  const { name = '', userId = '' } = location.query,
    { guiji = {} } = app,
    { serverId = '', entityId = '', guijiId = '' } = guiji;
  const handleGuijiClick = (callback) => {
    let canStart = (guijiId === '');
    const onSuccess = () => {
        console.log('handleGuijiClick - onSuccess');
        dispatch({
          type: 'app/guiji',
          payload: {
            type: canStart ? 'start' : 'end',
            guijiId,
          },
        });
        callback();
        Toast.success(canStart ? '开始记录轨迹。' : '结束记录轨迹。');
      },
      onFail = (err) => {
        console.log('handleGuijiClick - onFail', err, canStart, guijiId);
        callback();
        if (!canStart) {
          dispatch({
            type: 'app/guiji',
            payload: {
              type: 'end',
              guijiId,
            },
          });
        }
        Toast.offline('请开启手机定位权限，否则无法记录轨迹。');
      };
    if (canStart) {
      cnStartJiluguiji(serverId, entityId, onSuccess.bind(this), onFail.bind(this), {
        key: _cg(userTagUserId),
        url: `${baseURL + sumbitUrlPositions}`,
      }, 1000);
    } else {
      onSuccess();
      cnStopJiluguiji();
    }
  };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div style={{ position: 'relative' }}>
        <Ifreams src={`${baseURL + iframeUrlguiji + (userId === '' ? '' : `?userId=${userId}`)}`}
                 dispatch={dispatch}
        />
        {serverId !== '' && entityId !== '' ?
          <HawkButton btnStatus={guijiId !== ''} handleClick={handleGuijiClick} /> : ''}
      </div>
    </div>
  
  );
}

export default connect(({ loading, routemap, app }) => ({
  loading,
  routemap,
  app,
}))(Routemap);
