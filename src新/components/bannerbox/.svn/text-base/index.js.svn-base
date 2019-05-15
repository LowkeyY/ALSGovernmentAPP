import React from 'react'
import { Carousel  } from 'antd-mobile'
import ReactDOM from 'react-dom'
import styles from './index.less'
const PrefixCls = 'bannerbox'

class BannerBox extends React.Component {

  state = {
    data: [],
    slideIndex: 0,
    isLoad:false
  }
  componentWillMount () {
    setTimeout(() => {
      this.setState({
        data: this.props.datas,
      })
    }, 300)
  }

  render () {
    const {slideIndex} = this.state;
    return (
      <Carousel
        className="space-carousel"
        selectedIndex={slideIndex}
        cellSpacing={15}
        slideWidth={0.8}
        autoplayInterval={5000}
        dots={false}
        autoplay
        infinite
        afterChange={index => this.setState({ slideIndex: index })}
      >
        {this.props.datas && this.props.datas.map((data, i) => (
          <div
            className={styles[`${PrefixCls}-image`]}
            key={`a_${i}`}
            style={{
              display: 'block',
              position: 'relative',
              top: this.state.slideIndex === i ?8 :20,
              boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
            }}
            onClick={this.props.handleClick.bind(null , data)}
          >
            <img
              ref={el => this.banner = el}
              src={`${data.url}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                if(!this.state.isLoad){
                  this.setState({
                    isLoad:true
                  })
                  window.dispatchEvent(new Event('resize'));
                }
              }}
            />
          </div>
        ))}
      </Carousel>
    )
  }

}

export default BannerBox
