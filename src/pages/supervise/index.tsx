import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Select,
  DatePicker,
  message,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import moment from 'moment';
import { StateType } from './model';
import CreateForm from './components/CreateForm';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import UpdateForm, { FormValsType } from './components/UpdateForm';
import { TableListItem, TableListPagination, TableListParams } from './data.d';
import Link from 'umi/link';
import styles from './style.less';

import constants from '../../constants/constant';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  supervise: StateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<TableListItem>;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
     supervise,
     loading,
   }: {
    supervise: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    supervise,
    loading: loading.models.rule,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {}
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '分类',
      dataIndex: 'statusName'
    },
    {
      title: '行业',
      dataIndex: 'industry'
    },
    {
      title: '提交时间',
      dataIndex: 'recentLoginTime',
      sorter: true,
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
          <Divider type="vertical" />
          <Link to= {`/system_user_manage/detail/${record.userNo}`}>查看详情</Link>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'supervise/fetch',
    // });
  }

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof TableListItem, string[]>,
    sorter: SorterResult<TableListItem>,
  ) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      currentPage: pagination.pageNo,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'supervise/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'supervise/fetch',
      payload: {},
    });
  };

  handleSelectRows = (rows: TableListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const { dispatch, form,supervise } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const pagination = supervise.data.pagination;
      const values = {
        ...fieldsValue,
        ...pagination
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'supervise/fetch',
        payload: {
          ...values
        },
      });
    });
  };

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: FormValsType) => {
    console.log(record);
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = (param: { desc: any }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'supervise/add',
      payload: {
        ...param
      },
    });
    message.success('新建成功');
    this.handleModalVisible();
  };

  handleUpdate = (fields: FormValsType) => {
    console.log(fields);
    const { dispatch } = this.props;
    dispatch({
      type: 'supervise/update',
      payload: {
        ...fields
      },
    });
    dispatch({
      type: 'tableList/fetch',
      payload: {},
    });
    message.success('修改成功');
    this.handleUpdateModalVisible();
  };

  handleOrganizationChange = (value:any) =>{
    console.log(value);
  }

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const options = constants.organizations.map((value, index) => (
      <Option key={index} value={value.organization_code}>{value.organization_name}</Option>));

    const currentOrganization = form.getFieldValue("organization");
    let industries:any = [];
    constants.organizations.map((value, index) => {
      if (value.organization_code === currentOrganization) {
        value.industries.map((value1,index1)=>{
          industries.push(<Option key={index1} value={value1.code}>{value1.name}</Option>)
        });
        return;
      }
    });
    if (industries.length < 1) {
      form.resetFields(["status"]);
    }
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="分类">
              {getFieldDecorator('organization')(<Select placeholder="请选择" onChange={e=>this.handleOrganizationChange(e)} style={{ width: '100%' }}>
                {options}
              </Select>)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="行业">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}  allowClear={true}>
                  {industries}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="开始时间">
              {getFieldDecorator('content1')(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="结束时间">
              {getFieldDecorator('content2')(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col offset={18} md={4} sm={6}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      supervise: { data },
      loading,
    } = this.props;

    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
