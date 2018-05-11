import styles from './index.less'
import {List, Badge} from 'antd-mobile';
import {getErrorImg, getImages} from 'utils'

const PrefixCls = 'row',

  Item = List.Item,
  Brief = Item.Brief
module.exports = {
  listRows: (rowData, sectionID, rowID, onClick) => (
    <div
      onClick={onClick.bind(null,rowData.id)}
      key={`${sectionID} - ${rowID}`} className={styles[`${PrefixCls}-party-outer`]}>
      <div style={{display: '-webkit-box', display: 'flex', padding: '0.3rem 0'}}>
        <img style={{width:'1.28rem',height: '1.28rem', marginRight: '0.3rem'}} src={getImages(rowData.img)}
             onError={getErrorImg} alt="icon"/>
        <div className={styles[`${PrefixCls}-party-outer-text-box`]}>
          <div style={{marginBottom: '0.16rem', fontWeight: 'bold'}}>{rowData.title}</div>
          <div className={styles[`${PrefixCls}-party-outer-text-box-time`]}>{rowData.time}</div>
        </div>
      </div>
    </div>
  ),
  message: (rowData, sectionID, rowID, onClick) => {
    let isNew = rowData.flag === "0";
    let result = (
      <Item
        className={"row"}
        key={`${sectionID} - ${rowID}`}
        arrow="horizontal"
        multipleLine
        onClick={onClick.bind(null,rowData.id)}
        wrap
      >
        <div className={`${styles[`${PrefixCls}-message-title`]} ${isNew ? "news" : ""}`}>
          <h3>{rowData.title}</h3>
        </div>
        <div className={styles[`${PrefixCls}-message-content`]}>{rowData.content}</div>
        <Brief>
          {rowData.time}
        </Brief>
      </Item>
    );

    return !isNew ? result :
      <Badge key={`badge - ${sectionID} - ${rowID}`} text={'新'} corner>
        {result}
      </Badge>

  }
}
