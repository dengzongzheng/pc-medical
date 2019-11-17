import {Card, Descriptions,Divider, Button,Icon,Row, Col} from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { BasicProfileDataType,UserDetail} from './data.d';
import './style.less';
import {match} from "react-router";


interface DetailProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  userNo: string,
  match: match<any>,
  systemUserAnddetail: BasicProfileDataType,
  UserDetail: UserDetail,
}
interface DetailState {
  userNo: string,
  match: match,
  UserDetail: UserDetail,
}

@connect(
  ({
    systemUserAnddetail,
     UserDetail,
    loading,
  }: {
    systemUserAnddetail: BasicProfileDataType;
    UserDetail:UserDetail;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    systemUserAnddetail,
    UserDetail,
    loading: loading.effects['systemUserAnddetail/fetchBasic'],
  }),
)
class Detail extends Component<
  DetailProps,
  DetailState
> {
  componentDidMount() {
    const { dispatch } = this.props;
    const { userNo } = this.props.match.params;
    console.log(userNo)
    dispatch({
      type: 'systemUserAnddetail/fetchBasic',
      payload:{userNo}
    });
  }

  render() {
    const { systemUserAnddetail } = this.props;
    // @ts-ignore
    const UserDetail = systemUserAnddetail.UserDetail;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Descriptions title="" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="用户编号">{UserDetail.userNo}</Descriptions.Item>
            <Descriptions.Item label="用户名">{UserDetail.userName}</Descriptions.Item>
            <Descriptions.Item label="状态">{UserDetail.statusName}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{UserDetail.createDateString}</Descriptions.Item>
            <Descriptions.Item label="修改时间">{UserDetail.updateDateString}</Descriptions.Item>
            <Descriptions.Item label="最近登录时间">{UserDetail.recentLoginTime}</Descriptions.Item>
            <Descriptions.Item label="所管理的组织机构">{UserDetail.organizationsString}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Row>
            <Col span={12} offset={10}>
              <Button type="primary" href={"/system_user_manage"}><Icon type="left" />返回列表</Button>
            </Col>
          </Row>

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;
