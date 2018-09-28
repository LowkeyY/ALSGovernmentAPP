import React from 'react';
import { Carousel } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.less';

const PrefixCls = 'banner';

class Banner extends React.Component {
  constructor (props) {
    super();
  }
  
  state = {
    data: [],
    slideIndex: 0,
    isLoad: false
  };
  
  componentWillMount () {
    setTimeout(() => {
      this.setState({
        data: this.props.datas,
      });
    }, 300);
  }
  
  onHandleChange = (num) => {
    if (this.props && this.props.dispatch) {
      this.props.dispatch({
        type: 'dashboard/updateState',
        payload: {
          selectedIndex: num
        }
      });
    }
  };
  
  render () {
    const selectedIndex = this.props.selectedIndex;
    return (
      <div className={styles[`${PrefixCls}-outer`]} style={{ clear: 'both' }}>
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
          afterChange={this.onHandleChange.bind(this)}
        >
          {this.props.datas && this.props.datas.map((data, i) => (
            <div
              className={styles[`${PrefixCls}-image`]}
              key={`a_${i}`}
              onClick={this.props.handleClick.bind(null, data, this.props.dispatch, this.props.name)}
            >
              <img
                ref={el => this.banner = el}
                src={`${data.url}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  if (!this.state.isLoad) {
                    this.setState({
                      isLoad: true
                    });
                    window.dispatchEvent(new Event('resize'));
                  }
                }}
              />
              {this.props.hasTitle ? <div>{data.title}</div> : ''}
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

Banner.propTypes = {
  handleClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};
Banner.defaultProps = {
  bannerDatas: [],
  hasTitle: false,
  name: ''
};
export default Banner;
