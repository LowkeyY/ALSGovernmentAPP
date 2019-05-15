
import React from 'react';
import { Carousel, InputItem, Toast, Button, WhiteSpace, WingBlank, ImagePicker } from 'antd-mobile';
import ReactDOM from 'react-dom';
import TitleBox from 'components/titlecontainer';
import styles from './index.less';

const PrefixCls = 'partyfolw';

class Partyfolw extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  componentWillMount () {

  }
  onChange = (files, type, index) => {
    let reg = /image/,
      result = [];
    files.map((data, i) => {
      if (!reg.test(data.file.type)) {
        Toast.fail('这不是图片哟！！！', 2);
      } else {
        result.push(data);
      }
    });
    this.setState({
      files: result,
    });
  }

  layoutItem (nowCount, props) {
    const { getFieldProps, getFieldError } = props;
    switch (nowCount) {
      case 0 :
        return (
          <div>
            <InputItem
              {...this.props.getFieldProps('name', {
                initialValue: '',
                rules: [{ required: true, message: '请输入姓名' },
                ],
              })}
              clear
              error={!!getFieldError('name') && Toast.fail(getFieldError('name'))}
              placeholder="请输入姓名"
            >
              姓名
            </InputItem>
            <InputItem
              {...this.props.getFieldProps('age', {
                initialValue: '',
                rules: [{ required: true, message: '请输入年龄' },
                ],
              })}
              clear
              error={!!getFieldError('age') && Toast.fail(getFieldError('age'))}
              placeholder="请输入年龄"
            >
             年龄
            </InputItem>
            <InputItem
              {...this.props.getFieldProps('idCard', {
                initialValue: '',
                rules: [{ required: true, message: '请输入身份证号' },
                ],
              })}
              type="number"
              clear
              error={!!getFieldError('idCard') && Toast.fail(getFieldError('idCard'))}
              placeholder=""
            >
              身份证号
            </InputItem>
            <WhiteSpace size="md" />
            <TitleBox title="上传附件" />
            <ImagePicker
              files={this.state.files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={this.state.files.length < 4}
              multiple={this.state.multiple}
              accept="image/*"
            />
          </div>
        );
      case 1 :
        return (
          <div>
            456
          </div>
        );
      case 2 :
        return (
          <div>
            456
          </div>
        );
      case 3 :
        return (
          <div>
            456
          </div>
        );
      case 4 :
        return (
          <div>
            456
          </div>
        );
      case 5 :
        return (
          <div>
            456
          </div>
        );
      case 6 :
        return (
          <div>
            456
          </div>
        );
      case 7:
        return (
          <div>
            456
          </div>
        );
    }
  }


  render () {
    return (
      <div >
        {this.layoutItem(this.props.nowCount, this.props)}
      </div>
    );
  }
}

export default Partyfolw;
