import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon, List } from 'components';
import { routerRedux } from 'dva/router';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import rankBg from '../../themes/images/others/rankBg.jpg';
import rankImg from '../../themes/images/others/rankImg.png';
import styles from './index.less';

const rankIcon = ['/rank/left1.svg', '/rank/left2.svg', '/rank/left3.svg'];
const rankIcons = ['/rank/right1.svg', '/rank/right2.svg', '/rank/right3.svg'];

function Rank ({ location, dispatch, rank }) {
  const { name = '排行榜' } = location.query,
    { currentData = {} } = rank,
    { rankingList = [], ranking = '0', rankingTitle = '', score = '' } = currentData;

  return (
    <div className={styles.outer} style={{ backgroundImage: `url(${rankBg})` }}>
      <Nav title={name} dispatch={dispatch} color="transparent" />
      <img className={styles.img} src={rankImg} alt="" />
      <div className={styles.container}>
        <div className={styles.list}>
          {
            parseInt(ranking, 10) > 10 ?
              <div className={styles.mime}>
                <List.Item
                  thumb={
                    <div className={styles.rank}>
                      <span className={styles.index}>{ranking}</span>
                    </div>
                  }
                  extra={
                    <div className={styles.rank}>
                      {score}
                    </div>
                  }
                >
                  {`${rankingTitle}(我自己)`}
                </List.Item>
              </div>
              :
              null
          }
          {
            cnIsArray(rankingList) && rankingList.length > 0 ?
              rankingList.map((item, i) => {
                return (
                  <List.Item
                    thumb={
                      <div className={styles.rank}>
                        {
                          i < 3 ? <Icon type={getLocalIcon(`${rankIcon[i]}`)} /> :
                            <span className={styles.index}>{i + 1}</span>
                        }
                      </div>
                    }
                    extra={
                      <div className={styles.rank}>
                        {
                          i < 3 ? <Icon type={getLocalIcon(`${rankIcons[i]}`)} /> : null

                        }
                        {item.score}
                      </div>
                    }
                  >
                    <span>{`${item.rankingTitle}${item.currentUser ? `(我自己)` : ''}`}</span>
                  </List.Item>
                );
              })
              :
              null
          }
        </div>
      </div>
    </div>
  );
}

export default connect(({ loading, rank }) => ({
  loading,
  rank,
}))(Rank);
