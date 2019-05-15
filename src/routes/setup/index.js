import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon, ActivityIndicator, Toast, Modal, Badge } from 'components';
import Nav from 'components/nav';
import FileUpload from 'react-fileupload';
import { routerRedux } from 'dva/router';
import { getErrorImg, getImages, getLocalIcon, config, cookie } from 'utils';
import styles from './index.less';
import doUserAvatarUpload from 'utils/formsubmit';

const PrefixCls = 'setup',
  Item = List.Item,
  prompt = Modal.prompt,
  { baseURL, api: { SetUpAPi }, userTag } = config,
  { _cs, _cr, _cg } = cookie;


class Setup extends React.Component {
  constructor (props) {
    super(props);
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
  handleUpdateClick = (urls, appVerSion, updateInfo) => {
    if (cnIsAndroid()) {
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
          { text: '立刻升级', onPress: () => cnUpdate(urls) },
        ]);
      } else {
        Toast.offline('已经是最新版本啦(#^.^#)');
      }
    }
  };

  render () {
    const { name = '' } = this.props.location.query,
      { animating } = this.props.setup,
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
    const { users: { username, useravatar, usertype }, updates: { upgraded = false, urls = '', appVerSion = '', updateInfo = '' } } = this.props.app;
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <WhiteSpace size="md" />
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
              usertype == 'isRegistUser' ?
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
            <Item extra={appVerSion} onClick={this.handleUpdateClick.bind(null, urls, appVerSion, updateInfo)}>
              {urls !== '' ? <Badge dot>
                版本信息
              </Badge> : '版本信息'}
            </Item>
          </List>
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
