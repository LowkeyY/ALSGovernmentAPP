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
/*        cellSpacing={10}
        slideWidth={0.8}*/
        autoplay
        infinite
        afterChange={index => this.setState({ slideIndex: index })}
      >
        {this.props.datas && this.props.datas.map((data, i) => (
          <div
            key={`a_${i}`}
            style={{
              position: 'relative',
              boxShadow: '4px 2px 2px rgba(0, 0, 0, 0.4)',
              //top: this.state.slideIndex === i ? 0 : 20,
            }}
             onClick={this.props.handleClick.bind(null , data)}
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
