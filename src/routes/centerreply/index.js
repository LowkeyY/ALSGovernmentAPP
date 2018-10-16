import { Component } from 'react'
import { createForm } from 'rc-form'
import { connect } from 'dva'
import Nav from 'components/nav'
import { replaceSystemEmoji } from 'utils'
import {
  List,
  TextareaItem,
  Button,
  Toast,
  WhiteSpace,
} from 'components'
import styles from './index.less'

const PrefixCls = 'centerreply'

class CenterReply extends Component {
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i])
      }
    }
    return obj
  }

  onSubmit = (workId) => {

    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
          ...this.props.form.getFieldsValue(),
        }
        this.props.dispatch({
          type: 'centerreply/sendReply',
          payload: {
            ...this.changeValue(data),
            workId
          },
        })
      } else {
        Toast.fail('您还没有输入内容')
      }
    })
  }

  render () {
    const { name = '回复', workId } = this.props.location.query,
      { getFieldProps, getFieldError } = this.props.form

    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch}/>
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('neirong', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入您的回复' }],
                })}
                rows={10}
                placeholder={'回复'}
              />
            </List.Item>
            <div className={styles[`${PrefixCls}-outer-button`]}>
              <Button type="ghost" onClick={this.onSubmit.bind(this,workId)}>提交</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(({ loading, centerreply }) => ({
  loading,
  centerreply,
}))(createForm()(CenterReply))
