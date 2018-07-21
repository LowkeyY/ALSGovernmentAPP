import { Carousel, Icon } from 'antd-mobile'
import styles from './index.less'
import { routerRedux } from 'dva/router'
import { getLocalIcon } from 'utils'

const PrefixCls = 'notice',
  defaultGifArr = [
    require('../../themes/images/gif/tip.gif'),
    require('../../themes/images/gif/tip1.gif'),
    require('../../themes/images/gif/tip2.gif'),
  ]
const NoticeBar = (props) => {
  const handleClick = ({ pathname = 'lanmusub' }) => {
      props.dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name: '阿拉善头条',
        },
      }))
    },
    getGif = () => {
      return defaultGifArr[Math.floor(Math.random() * 3)]
    },
    currentData = props.datas || []
  return (
    /*<div className={styles[`${PrefixCls}-outer`]}>
      <img onClick={props.handleImgClick} src={require('./img/news.png')} alt="" onClick={handleClick}/>
      <Carousel className="my-carousel"
                vertical
                dots={false}
                dragging={false}
                swiping={false}
                autoplay
                infinite
      >
        {
          props.datas && props.datas.map((data, index) =>
            <div onClick={props.handleClick.bind(null , data)}
                 className={styles[`${PrefixCls}-outer-container`]}
                 key={index}>{data.title}</div>)
        }
      </Carousel>
    </div>*/

    <div className={styles[`${PrefixCls}-outer`]}>
      {/*<Icon style={{width:'50px'}} type={getLocalIcon('/others/tip.svg')}/>*/}
      {currentData.length > 0 ? <img src={getGif()} alt=""/> : ''}
      <span style={{ color: '#ddd' }}>|</span>
      <Carousel className="my-carousel"
                vertical
                dots={false}
                dragging={false}
                swiping={false}
                autoplayInterval={5000}
                autoplay
                infinite
      >
        {
          currentData.length > 0 && currentData.map((data, index) =>
            <div onClick={props.handleClick.bind(null, data)}
                 className={styles[`${PrefixCls}-outer-container`]}
                 key={index}><span style={{ paddingRight: '5px', color: '#888' }}></span>{data.title}</div>)
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
