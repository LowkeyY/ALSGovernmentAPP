import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { Layout, WhiteSpace } from 'components'
import WxImageViewer from 'react-wx-images-viewer'
import styles from './index.less'

const PrefixCls = 'details', { BaseLine } = Layout

function Details ({ location, dispatch, details }) {
  const { name = '' } = location.query,
    { currentData: { content, title, date }, isOpen, viewImages, viewImageIndex } = details,
    getContents = () => {
      return {
        __html: content,
      }
    },
    handleDivClick = (e) => {
      if (e.target.tagName === 'IMG') {
        let src = e.target.src,
          curImageIndex = -1
        if (src && (curImageIndex = viewImages.indexOf(src)) != -1) {
          dispatch({
            type: 'details/updateState',
            payload: {
              isOpen: true,
              viewImageIndex: curImageIndex,
            },
          })
        }
      }
    },
    onClose = () => {
      dispatch({
        type: 'details/updateState',
        payload: {
          isOpen: false,
        },
      })
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-title`]}>
          {title}
        </div>
        <div className={styles[`${PrefixCls}-outer-date`]}>{date}</div>
        <WhiteSpace size="sm"/>
        <div className={styles[`${PrefixCls}-outer-content`]}>
          <div dangerouslySetInnerHTML={getContents()} onClick={handleDivClick}/>
        </div>
      </div>
      <BaseLine/>
      {
        isOpen && viewImageIndex != -1 ?
          <WxImageViewer onClose={onClose} urls={viewImages} index={viewImageIndex}/> : ''
      }
    </div>
  )
}

export default connect(({ loading, details }) => ({
  loading,
  details,
}))(Details)
