import React from 'react';
import { connect } from 'dva';
import { Card, WingBlank, WhiteSpace } from 'components';
import NoContent from 'components/nocontent';
import StatusBox from 'components/statusbox';
import Nav from 'components/nav';

const getLeve = (index) => {
  switch (index) {
    case -1 :
      return '请示领导';
    case 1 :
      return '处理中心分配';
    case 2 :
      return '各单位分配';
    case 3 :
      return '网格负责人分配';
    default:
      return '';
  }
};

const getStatus = (state) => {
  switch (state) {
    case 0:
      return <StatusBox bg="#1ab99d" status="已分发" />;
    case 1 :
      return <StatusBox bg="#f58b3f" status="已执行" />;
    case 2 :
      return <StatusBox bg="#9c9595" status="已退回" />;
    case 3 :
      return <StatusBox bg="#dcce29" status="执行中" />;
    case 4 :
      return <StatusBox bg="#3fb900" status="已完成" />;
    default:
      return <StatusBox bg="#9c9595" status="未知" />;
  }
};

function AppealFlow ({ location, dispatch, appealflow }) {
  const { data } = appealflow;
  return (
    <div>
      <Nav title="诉求流程" dispatch={dispatch} />
      {
        cnIsArray(data) && data.length > 0 ?
          data.map((item, i) => {
            const { assigonr = '', creatDate = '', flowLeve = '', flowState = '', id = '', toUser = '' } = item;
            return (
              <div key={id}>
                <WingBlank size="lg">
                  <WhiteSpace size="lg" />
                  <Card>
                    <Card.Header
                      title={assigonr}
                      extra={<span>{getStatus(parseInt(flowState, 10))}</span>}
                    />
                    <Card.Body>
                      <div>{`流程发布人：${getLeve(parseInt(flowLeve, 10))}`}</div>
                      <WhiteSpace size="md" />
                      <div>{`流程负责人：${toUser}`}</div>
                    </Card.Body>
                    <Card.Footer content={`创建时间:${creatDate}`} />
                  </Card>
                  <WhiteSpace size="lg" />
                </WingBlank>

              </div>
            );
          })
          :
          <NoContent />
      }
    </div>
  );
}

export default connect(({ loading, appealflow }) => ({
  loading,
  appealflow,
}))(AppealFlow);
