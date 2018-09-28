import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import Iframes from 'components/ifream';

function Comp ({ location, dispatch, app }) {
  const { name = '', externalUrl = '', htmlBody = '' } = location.query,
    getContents = () => {
      return {
        __html: htmlBody,
      };
    };
  return (
    <div style={{ overflow: 'hidden' }}>
      <Nav title={name} dispatch={dispatch} />
      {htmlBody != '' ? <div dangerouslySetInnerHTML={getContents()} /> :
      <Iframes src={externalUrl} dispatch={dispatch} />}
    </div>
  );
}

export default connect(({ loading, app }) => ({
  loading,
  app,
}))(Comp);
