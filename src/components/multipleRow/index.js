/* eslint-disable no-undef */
/**
 * @author Lowkey
 * @date 2019/06/05 10:44:39
 * @Description:
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, List } from 'components';
import { getLocalIcon, getImages } from 'utils';
import styles from './index.less';

const Item = List.Item,
  Brief = Item.Brief;
const multipleRow = (rowData, sectionID, rowID, onClick, dispatch, headName, hasDate = 'true') => {
  const { title = '', image = '', time = '', isNew = false, infos = '', contextImg = [] } = rowData;
  let result = [];
  const rows = {
    0: (
      <div className={styles.single}>
        <div className={styles.title}>{title}</div>
        <div className={styles.img} style={{ backgroundImage: `url(${image})` }}/>
        {hasDate === 'true' ? <div className={styles.date}>{time}</div> : ''}
      </div>
    ),
    1: (
      <div
        className={styles.left}
        onClick={onClick.bind(null, rowData, dispatch, headName)}
      >
        <div><img src={getImages(image)} alt=""/></div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
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
          <div className={styles.title}>{title}</div>
          {hasDate === 'true' ? <div className={styles.date}>{time}</div> : ''}
        </div>
        <div>
          <img src={getImages(image)} alt=""/>
        </div>
      </div>
    ),
    3: (
      <div
        className={styles.multiple}
        onClick={onClick.bind(null, rowData, dispatch, headName)}
      >
        <div className={styles.title}>{title}</div>
        {
          contextImg.length > 2 ?
            <div className={styles.imgBox}>
              {contextImg.slice(0, 3)
                .map(item => <img src={getImages(item)} alt=""/>)}
            </div>
            :
            null
        }
        {hasDate === 'true' ? <div className={styles.date}>{time}</div> : ''}
      </div>
    ),
  };

  return (
    <div className={styles.outer} onClick={onClick.bind(null, rowData, dispatch, headName)}>
      {rows[parseInt(rowID) % 4]}
    </div>
  );

};
module.exports = { multipleRow };
