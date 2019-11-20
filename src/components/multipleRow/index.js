/* eslint-disable no-undef */
/**
 * @author Lowkey
 * @date 2019/08/13 10:44:39
 * @Description:
 */

import React from 'react';
import { Icon, List, Badge } from 'components';
import { getLocalIcon, doDecode, isUsefulPic } from 'utils';
import styles from './index.less';

const getInfo = (info) => {
  if (info) {
    try {
      return doDecode(info);
    } catch (e) {

    }
  }
  return {};
};

const multipleRow = (rowData, sectionID, rowID, onClick, dispatch, headName, hasDate = 'true') => {
  const { title = '', image = '', time = '', isNew = false, infos = '', contextImg = [], id = '' } = rowData;
  const num = parseInt(id, 10) || 1;
  const rows = {
    0: (
      <div className={styles.single}>
        <div className={styles.title}>
          {isNew ? <Badge text={'今日'} style={{ marginRight: 8 }} /> : null}
          {title}
        </div>
        {image !== '' ? <div className={styles.img} style={{ backgroundImage: `url(${image})` }} /> : null}
        {hasDate === 'true' ? <div className={styles.date}>{time}</div> : ''}
      </div>
    ),
    1: (
      <div
        className={styles.left}
        onClick={onClick.bind(null, rowData, dispatch, headName)}
      >
        {image !== '' ? <img src={image} alt="" /> : null}
        <div className={styles.content}>
          <div className={styles.title}>
            {isNew ? <Badge text={'今日'} style={{ marginRight: 8 }} /> : null}
            {title}
          </div>
          {hasDate === 'true' ? <div className={styles.date}>{time}</div> : ''}
        </div>
      </div>
    ),
    2: (
      <div
        className={styles.right}
        onClick={onClick.bind(null, rowData, dispatch, headName)}
      >
        <div className={styles.content}>
          <div className={styles.title}>
            {isNew ? <Badge text={'今日'} style={{ marginRight: 8 }} /> : null}
            {title}
          </div>
          {hasDate === 'true' ? <div className={styles.date}>{time}</div> : ''}
        </div>
          {image !== '' ? <img src={image} alt="" /> : null}
      </div>
    ),
    3: (
      <div
        className={styles.multiple}
        onClick={onClick.bind(null, rowData, dispatch, headName)}
      >
        <div className={styles.title}>
          {isNew ? <Badge text={'今日'} style={{ marginRight: 8 }} /> : null}
          {title}
        </div>
        {
          contextImg.length > 3 ?
            <div className={styles.imgBox}>
              {contextImg.slice(0, 3)
                .map(item => <img src={item} alt="" />)}
            </div>
            :
            null
        }
        {hasDate === 'true' ? <div className={styles.date}>{time}</div> : ''}
      </div>
    ),
  };
  const { type = '' } = getInfo(infos);
  if (type === 'banner') {
    return (
      <div className={styles.outer} onClick={onClick.bind(null, rowData, dispatch, headName)}>
        {rows[0]}
      </div>
    );
  }

  if (type === 'left') {
    return (
      <div className={styles.outer} onClick={onClick.bind(null, rowData, dispatch, headName)}>
        {rows[1]}
      </div>
    );
  }

  if (type === 'right') {
    return (
      <div className={styles.outer} onClick={onClick.bind(null, rowData, dispatch, headName)}>
        {rows[2]}
      </div>
    );
  }

  if (type === 'multiple') {
    return (
      <div className={styles.outer} onClick={onClick.bind(null, rowData, dispatch, headName)}>
        {rows[3]}
      </div>
    );
  }

  return (
    <div className={styles.outer} onClick={onClick.bind(null, rowData, dispatch, headName)}>
      {rows[num % 4]}
    </div>
  );
};
module.exports = { multipleRow };
