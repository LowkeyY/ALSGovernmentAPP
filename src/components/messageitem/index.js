import { SwipeAction, List ,WhiteSpace } from 'antd-mobile';
import {routerRedux} from 'dva/router';

function MessageItem (props) {
  const handleClick = () =>{
    props.dispatch(routerRedux.push('/messageroom'))
  }
  return (
    <div>
      <WhiteSpace size="sm"/>
      <List>
        <SwipeAction
          style={{ backgroundColor: '108ee9' }}
          autoClose
          right={[
            {
              text: '取消',
              onPress: () => console.log('cancel'),
              style: { backgroundColor: '#ddd', color: 'white',padding:'0 10px' },
            },
            {
              text: '删除',
              onPress: () => console.log('delete'),
              style: { backgroundColor: '#F4333C', color: 'white',padding:'0 10px' },
            },
          ]}

          onOpen={() => console.log('global open')}
          onClose={() => console.log('global close')}
        >
          <List.Item
            extra="10:30"
            align="top"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            multipleLine
            onClick={handleClick}
          >
            勒布朗·詹姆斯
            <List.Item.Brief>你们是联盟的未来</List.Item.Brief>
          </List.Item>
        </SwipeAction>
      </List>
    </div>
  )
}
export default MessageItem
