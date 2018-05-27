import { Carousel } from 'antd-mobile'
import styles from './index.less'

const PrefixCls = 'notice'

const NoticeBar = (props) => {
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <img onClick={props.handleImgClick} src={require('./img/news.png')} alt=""/>
      <Carousel className="my-carousel"
                vertical
                dots={false}
                dragging={false}
                swiping={false}
                autoplay
                infinite
      >
        {
          props.datas && props.datas.map((data, index) => <div onClick={props.handleClick.bind(data.id)}
                                                               className={styles[`${PrefixCls}-outer-container`]}
                                                               key={index}>{data.title}</div>)
        }
      </Carousel>
    </div>
  )

  Static.propTypes = {
    handleNoticeClick: PropTypes.func.isRequired,
    handleImgClick: PropTypes.func.isRequired,
    noticeData: PropTypes.array.isRequired,
  }
  Static.defaultProps = {}
}
export default NoticeBar