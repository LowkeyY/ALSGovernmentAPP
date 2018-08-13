import React from 'react'
import {Carousel,Icon} from 'antd-mobile'
import ReactDOM from 'react-dom'
import { routerRedux } from 'dva/router'
import { getLocalIcon } from 'utils'
import styles from './index.less'

const PrefixCls = 'headline',
defaultGifArr = [
  require('../../themes/images/gif/tip.gif'),
  require('../../themes/images/gif/tip1.gif'),
  require('../../themes/images/gif/tip2.gif'),
]
class HeadLine extends React.Component {
  constructor(props) {
    super()
  }

  state = {
    data: [],
    isLoad: false
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        data: this.props.datas,
      })
    }, 300)
  }

  onHandleChange = (num) => {
    this.props.dispatch({
      type: 'dashboard/updateState',
      payload: {
        selectedIndex: num
      }
    })
  }
  handleClick = ({ pathname = 'lanmusub' }) => {
    props.dispatch(routerRedux.push({
      pathname: `/${pathname}`,
      query: {
        name: '阿拉善头条',
      },
    }))
  }
  getGif = () => {
    return defaultGifArr[Math.floor(Math.random() * 3)]
  }

  render() {

    const selectedIndex = this.props.selectedIndex, currentData = this.props.datas || []
    return (
      <div>
        <div className={styles[`${PrefixCls}-outer`]} style={{clear: 'both'}}>
          <Carousel
            className="space-carousel"
            selectedIndex={selectedIndex}
            autoplayInterval={5000}
            autoplay
            infinite
            dotStyle={{
              background: '#fff',
              opacity: '0.5',
              width: '12px',
              height: '2px',
              borderRadius: '0'
            }}
            dotActiveStyle={{
              background: '#fff',
              width: '12px',
              height: '2px',
              borderRadius: '0'
            }}
            afterChange={this.onHandleChange}
          >
            {this.props.bannerDatas && this.props.bannerDatas.map((data, i) => (
              <div
                className={styles[`${PrefixCls}-image`]}
                key={`a_${i}`}
                onClick={this.props.handleClick.bind(null, data)}
              >
                <img
                  ref={el => this.banner = el}
                  src={`${data.url}`}
                  alt=""
                  style={{width: '100%', verticalAlign: 'top'}}
                  onLoad={() => {
                    if (!this.state.isLoad) {
                      this.setState({
                        isLoad: true
                      })
                      window.dispatchEvent(new Event('resize'));
                    }
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className={styles[`${PrefixCls}-noticeouter`]}>
          {currentData.length > 0 ? <img src={this.getGif()} alt=""/> : ''}
          <span style={{color: '#ddd'}}>|</span>
          <Carousel className="my-carousel"
                    vertical
                    dots={false}
                    dragging={false}
                    swiping={false}
                    selectedIndex={this.props.selectedIndex}
                    infinite
          >
            {
              currentData.length > 0 && currentData.map((data, index) =>
                <div onClick={this.props.handleClick.bind(null, data)}
                     className={styles[`${PrefixCls}-noticeouter-container`]}
                     key={index}><span style={{paddingRight: '5px', color: '#888'}}></span>{data.title}</div>)
            }
          </Carousel>
        </div>
      </div>
    )
  }

}

export default HeadLine
