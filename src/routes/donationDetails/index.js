import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List } from 'components';
import { officeList, integralList } from 'components/row';
import Nav from 'components/nav';
import styles from './index.less';
import NoMessage from 'components/nomessage';

const PrefixCls = 'donationDetails',
  Item = List.Item,
  Brief = Item.Brief;

function DonationDetails ({ location, dispatch, donationDetails }) {
  const { name = '' } = location.query,
    { dataList = [] } = donationDetails;
  console.log(dataList);
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace size="md" />
      <List>
        {
          dataList.length > 0 ?
            dataList.map((data) => {
              
              return integralList(data);
            })
            :
            <NoMessage />
        }
      </List>
    </div>
  );
}

export default connect(({ loading, donationDetails }) => ({
  loading,
  donationDetails,
}))(DonationDetails);
