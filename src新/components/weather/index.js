import React from 'react';
import { Carousel, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'weather';

class Weather extends React.Component {
  constructor (props) {
    super();
  }

  state = {
    data: [],
    isLoad: false,
  };

  componentWillMount () {
    setTimeout(() => {
      this.setState({
        data: this.props.datas,
      });
    }, 300);
  }

  render () {
    const selectedIndex = this.props.selectedIndex,
      currentData = this.props.datas || [];
    return (

      <div className={styles[`${PrefixCls}-noticeouter`]}>
        <div className={styles[`${PrefixCls}-noticeouter-title`]}><Icon
          type={getLocalIcon('/dashboard/weather.svg')}
        /></div>
        <span style={{ color: '#ddd', padding: '0 5px' }}>|</span>
        <Carousel className="my-carousel"
                  vertical
                  autoplayInterval={4000}
                  autoplay
                  dots={false}
                  dragging={false}
                  swiping={false}
                  infinite
        >
          {
            currentData.length > 0 && currentData.map((data, index) =>
              (<div className={styles[`${PrefixCls}-noticeouter-container`]}
                    key={index}
              ><span style={{ paddingRight: '5px', color: '#888' }}/>{data.text}</div>))
          }
        </Carousel>
      </div>
    );
  }
}

Weather.propTypes = {};
Weather.defaultProps = {};
export default Weather;
