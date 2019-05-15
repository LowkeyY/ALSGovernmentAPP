import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'components';
import Nav from 'components/nav';
import styles from './index.less';


const PrefixCls = 'aboutus';

function AboutUs ({ location, dispatch, aboutus }) {
  const { name = '关于我们' } = location.query,
    { content } = aboutus,
    getContents = () => {
      return {
        __html: content,
      };
    };
  return (
    <div >
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace size="md" />
      <div style={{ background: '#fff', padding: '10px' }} dangerouslySetInnerHTML={getContents()} />
    </div>
  );
}

export default connect(({ loading, aboutus }) => ({
  loading,
  aboutus,
}))(AboutUs);
