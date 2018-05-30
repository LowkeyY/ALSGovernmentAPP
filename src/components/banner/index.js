import React from 'react'
import { Carousel  } from 'antd-mobile'
import ReactDOM from 'react-dom'
import './index.less'

class Banner extends React.Component {

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
    }, 1000)
  }

  render () {
    const {slideIndex} = this.state;
    return (
      <Carousel
        className="space-carousel"
        selectedIndex={slideIndex}
        cellSpacing={10}
        slideWidth={0.8}
        autoplay
        infinite
        afterChange={index => this.setState({ slideIndex: index })}
      >
        {this.state.data && this.state.data.map((data, i) => (
          <div
            key={`a_${i}`}
             onClick={this.props.handleClick.bind(this)}
          >
            <img
              ref={el => this.banner = el}
              src={`${data.url}?v=${new Date().getTime()}`}
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

export default Banner
