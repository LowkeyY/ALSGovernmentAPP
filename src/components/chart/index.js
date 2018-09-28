// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Geom, Coord, Legend } from 'bizgoblin';
import PropTypes from 'prop-types';
// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
const pixelRatio = window.devicePixelRatio * 2;

const map = {
  芳华: '40%',
  妖猫传: '20%',
  机器之血: '18%',
  心理罪: '15%',
  寻梦环游记: '5%',
  其他: '2%',
};

const data = [
  {
    name: '芳华',
    percent: 0.4,
    a: '1',
  }, {
    name: '妖猫传',
    percent: 0.2,
    a: '1',
  }, {
    name: '机器之血',
    percent: 0.18,
    a: '1',
  }, {
    name: '心理罪',
    percent: 0.15,
    a: '1',
  }, {
    name: '寻梦环游记',
    percent: 0.05,
    a: '1',
  }, {
    name: '其他',
    percent: 0.02,
    a: '1',
  },
];

const defs = [{
  dataKey: 'percent',
  formatter: val => `${val * 100}%`,
}];

class Charts extends React.Component {
  render () {
    return (
      <Chart width="100%" data={this.props.data || []} defs={defs} pixelRatio={pixelRatio}>
        <Coord type="polar" transposed radius={0.85} />
        <Geom
          geom="interval"
          position="a*percent"
          color={['name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']]}
          adjust="stack"
          style={{
            lineWidth: 1,
            stroke: '#fff',
            lineJoin: 'round',
            lineCap: 'round',
          }}
        />
        <Legend position="right" itemFormatter={value => `${value} ${this.props.map[value]}件`} />
      </Chart>
    );
  }
}

Charts.propTypes = {
  data: PropTypes.array.isRequired,
  map: PropTypes.array.isRequired,
};
Charts.defaultProps = {
  bannerDatas: [],
  hasTitle: false,
  name: ''
};
// CDN END
export default Charts;
