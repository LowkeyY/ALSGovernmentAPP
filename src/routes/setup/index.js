/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon, WingBlank, ActivityIndicator, Toast, Modal, Badge, Button } from 'components';
import Nav from 'components/nav';
import FileUpload from 'react-fileupload';
import { routerRedux } from 'dva/router';
import { getErrorImg, getImages, getLocalIcon, config, cookie } from 'utils';
import doUserAvatarUpload from 'utils/formsubmit';
import styles from './index.less';

let currentDownloadProgress = 0;
const PrefixCls = 'setup',
  Item = List.Item,
  prompt = Modal.prompt,
  { baseURL, api: { SetUpAPi }, userTag } = config,
  { _cs } = cookie;


class Setup extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillUnmount () {
    const { users: { username } } = this.props.app;

  }

  handleUserNameClick = (user) => {
    prompt('修改昵称', '', [
      { text: '取消' },
      {
        text: '确定',
        onPress: value => {
          this.props.dispatch({
            type: 'setup/setUserInfo',
            payload: {
              params: { realName: value },
              images: {},
              mediaFile: {},
            },
          });
        },
      },
    ], 'default', `${user}`);
  };
  handlePassWordClick = () => {
    prompt(
      '修改密码',
      '',
      (newpassword, password) => (
        this.props.dispatch({
          type: 'setup/resetPassword',
          payload: {
            rawpassword: newpassword,
            passwd: password,
          },
        })
      ),
      'login-password',
      null,
      ['原密码', '新密码'],
    );
  };
  showActivityIndicator = () => {
    this.props.dispatch({
      type: 'updateState',
      payload: {
        animating: true,
      },
    });
  };
  hiddenActivityIndicator = () => {
    this.props.dispatch({
      type: 'updateState',
      payload: {
        animating: false,
      },
    });
  };
  handleAboutUsClick = ({ name = '关于我们' }) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/aboutus',
      query: {
        name,
      },
    }));
  };
  getContent = (content) => {
    return (
      <div
        style={{ maxHeight: '60vh', overflowY: 'scroll', textAlign: 'left' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };
  updateSuccess = () => {
    this.props.dispatch({
      type: 'app/updateState',
      payload: {
        showUpdate: false,
        percentage: 0,
      },
    });
  };
  updateError = () => {
    this.props.dispatch({
      type: 'app/updateState',
      payload: {
        showUpdate: false,
        percentage: 0,
      },
    });
  };
  progress = (e) => {
    if (e.lengthComputable) {
      let num = ((e.loaded / e.total) * 100).toFixed();
      if (num != currentDownloadProgress) {
        currentDownloadProgress = num;
        this.props.dispatch({
          type: 'app/updateState',
          payload: {
            percentage: num,
          },
        });
      }
    }
  };
  handerUpdate = (urls, appUrl) => {
      this.props.dispatch({
        type: 'app/updateState',
        payload: {
          showUpdate: true,
        },
      });
    if (cnIsAndroid()) {
      this.props.dispatch({
        type: 'app/updateState',
        payload: {
          showUpdate: true,
        },
      });
      cnUpdateByDownloadAPK({
        fileUrl: appUrl,
      }, this.updateSuccess, this.updateError, this.progress);
    } else if (cnIsiOS()) {
      cnUpdate(urls);
    }
  };
  handleUpdateClick = (urls, appUrl, appVerSion, updateInfo) => {
    if (urls !== '') {
      Modal.alert(`版本更新(${appVerSion})`, this.getContent(updateInfo), [
        {
          text: '暂不升级',
          onPress: () => this.props.dispatch({
            type: 'app/updateState',
            payload: {
              showModal: false,
            },
          }),
          style: 'default',
        },
        { text: '立刻升级', onPress: () => this.handerUpdate(urls, appUrl) },
      ]);
    } else {
      Toast.offline('已经是最新版本啦(#^.^#)');
    }
  };
  handleLoginout = () => {
    this.props.dispatch({
      type: 'app/logout',
    });
  };
  showAlert = () => {
    Modal.alert('退出', '离开我的阿拉善', [
      {
        text: ' 确定退出',
        onPress: this.handleLoginout,
      },
      { text: '再看看', onPress: () => console.log('cancel') },

    ]);
  };

  render () {
    const { name = '' } = this.props.location.query,
      { animating } = this.props.setup,
      { isLogin = false } = this.props.app,
      uploadSuccess = (path) => {
        _cs(userTag.useravatar, path);
        this.props.dispatch({
          type: 'app/updateUsers',
          payload: {
            users: {
              useravatar: path,
            },
          },
        });
      },
      options = {
        uploadSuccess: uploadSuccess.bind(this),
        baseUrl: `${baseURL + SetUpAPi}`,
        accept: 'image/*',
        dataType: 'json',
        fileFieldName: 'photo',
        chooseFile (files) {
          // beforeIconChange();
          doUserAvatarUpload(SetUpAPi, {}, {
            photo: files[0],
          }, {}, true)
            .then((res) => {
              this.refs.ajax_upload_file_input.value = '';
              // hiddenActivityIndicator();
              if (res.headPortrait) {
                this.uploadSuccess(res.headPortrait);
                Toast.success('上传成功', 2);
              } else {
                Toast.fail('上传失败，请稍后再试', 2);
              }
            });
        },
      };
    const { users: { username, useravatar, usertype }, updates: { upgraded = false, urls = '', appUrl = '', appVerSion = '', updateInfo = '' } } = this.props.app;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div>
          <List className={`${PrefixCls}-list`}>
            <Item>
              <div className={`${PrefixCls}-user-icon-upload`}>
                <FileUpload options={options}>
                  <p className={'icon-title-avatar'} ref="chooseBtn">
                    <span>更换头像</span>
                  </p>
                  <div className={'icon-img-box'}>
                    <img src={getImages(useravatar, 'user')} alt="icon" onError={getErrorImg} />
                  </div>
                </FileUpload>
              </div>
            </Item>
            {
              usertype === 'isRegistUser' ?
                <Item extra={username} onClick={this.handleUserNameClick.bind(null, username)}>
                  更换昵称
                </Item>
                :
                ''
            }
            {
              usertype !== 'isRegistUser' ?
                <Item onClick={this.handlePassWordClick.bind(null, username)}>
                  修改密码
                </Item>
                : ''
            }
            <Item onClick={this.handleAboutUsClick}>
              关于我们
            </Item>
            <Item extra={`${cnVersion}.${cnCheckCodeVersion(cnCodeVersion, [1, 1, 1])}`} onClick={this.handleUpdateClick.bind(null, urls, appUrl, appVerSion, updateInfo)}>
              {urls !== '' ? <Badge dot>
                版本信息
              </Badge> : '版本信息'}
            </Item>
          </List>
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            {
              !isLogin ?

                null
                :
                <Button
                  style={{ border: '1px solid #fff', color: '#fff', background: '#ff5353' }}
                  type="primary"
                  onClick={this.showAlert}
                >退出
                </Button>
            }
          </WingBlank>
          <ActivityIndicator animating={animating} toast text="上传中..." />
        </div>
      </div>
    );
  }
}

export default connect(({ loading, setup, app }) => ({
  loading,
  setup,
  app,
}))(Setup);
