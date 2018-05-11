import React from 'react';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
class Banner extends React.Component {

  state = {
    data: [],
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        data: this.props.bannerData,
      });
    }, 100);
  }
  render() {
    return (
        <Carousel
          autoplay={true}
          infinite
          selectedIndex={1}
          style={{ height:'100%', verticalAlign: 'top'}}
        >
          {this.state.data&&this.state.data.map((data,i) => {

            return <img
              key={i}
              src={`${data.url}?v=${new Date().getTime()}`}
              alt=""
              style={{width:'100%',height:'100%', verticalAlign: 'top'}}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
              }}

            />
          })}
        </Carousel>

    );
  }
}
export default Banner
