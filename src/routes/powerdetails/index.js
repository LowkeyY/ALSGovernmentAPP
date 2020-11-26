import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import TitleBox from 'components/titlecontainer';
import styles from './index.less';


function PowerDetails ({ location, dispatch, powerdetails }) {
  const { data = {} } = powerdetails;
  const { mingcheng = '', quanlileibies = '', tianjiashijian = '', zerenzhutis = '', zerenshixiang = '', shedingyiju = '', qingxingjiyiju = '', banliliucheng = '', beizhu = '' } = data;
  return (
    <div className={styles.outer}>
      <Nav title="职权详情" dispatch={dispatch} />
      <div className={styles.content}>
        <div className={styles.title}>{mingcheng}</div>
        <div className={styles.info}>
          <div>{`权力类别：${quanlileibies}`}</div>
          <div>{tianjiashijian}</div>
        </div>
        <div className={styles.box}>
          <TitleBox title={'设定依据'} sup="" />
          <div className={styles.text}>{shedingyiju}</div>
        </div>
        <div className={styles.box}>
          <TitleBox title={'责任主体'} sup="" />
          <div className={styles.text}>{zerenzhutis}</div>
        </div>
        <div className={styles.box}>
          <TitleBox title={'责任事项'} sup="" />
          <div className={styles.text}>{zerenshixiang}</div>
        </div>
        <div className={styles.box}>
          <TitleBox title={'追责情形及依据'} sup="" />
          <div className={styles.text}>{qingxingjiyiju}</div>
        </div>
        <div className={styles.box}>
          <TitleBox title={'办理流程'} sup="" />
          <div className={styles.text}>{banliliucheng}</div>
        </div>
        {
          beizhu !== '' ?
            <div className={styles.box}>
              <TitleBox title={'备注'} sup="" />
              <div className={styles.text}>{beizhu}</div>
            </div>
            :
            null
        }
      </div>
    </div>
  );
}

export default connect(({ loading, powerdetails }) => ({
  loading,
  powerdetails,
}))(PowerDetails);
