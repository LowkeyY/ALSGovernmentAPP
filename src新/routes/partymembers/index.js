import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import VociePrev from 'components/voicePrev';
import { WingBlank } from 'components';
import NotesModal from 'components/notesmodal';
import classNames from 'classnames';
import TitleBox from 'components/titlecontainer';
import Partyfolw from 'components/partyworkfolw';
import {
  Button,
  WhiteSpace,
  Toast,
  ActivityIndicator,
} from 'components';
import { getLocalIcon, postionsToString, replaceSystemEmoji } from 'utils';
import styles from './index.less';

const PrefixCls = 'partymembers';


class Partymembers extends Component {
  constructor (props) {
    super(props);
    this.state = {
      nowCount: 0
    };
  }
  handleNextClick = () => {
    this.setState({
      nowCount: this.state.nowCount + 1
    });
  }
  getTitle = (title) => {
    if (Array.isArray(title)) {
      return title[this.state.nowCount];
    }
  }

  render () {
    const props = {
        ...this.props.form
      },
      { title } = this.props.partymembers;

    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <Nav title="发展党员" dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-container`]}>
          <div className={styles[`${PrefixCls}-title`]}>{this.getTitle(title)}</div>
          <Partyfolw nowCount={this.state.nowCount} {...props} />
          <div className={styles[`${PrefixCls}-button`]}>
            <WingBlank><Button type="primary" onClick={this.handleNextClick}>下一步</Button></WingBlank>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, partymembers }) => ({
  loading,
  partymembers,
}))(createForm()(Partymembers));
