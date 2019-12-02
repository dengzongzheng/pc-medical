import { Button, Form, Input, Modal, Select,Checkbox } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '../data.d';
import constants from "@/constants/constant";

export interface FormValsType extends Partial<TableListItem> {
  userName?: string;
  password?: string;
  status?: number;
  organizations?: [];
  userNo?: string;
}

export interface UpdateFormProps extends FormComponentProps {
  handleUpdateModalVisible: (flag?: boolean, formVals?: FormValsType) => void;
  handleUpdate: (values: FormValsType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValsType;
  currentStep: number;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        userNo: props.values.userNo,
        userName: props.values.userName,
        password: props.values.password,
        status: props.values.status,
        organizations: props.values.organizations,
      },
      currentStep: 0,
    };
  }

  renderContent = (formVals: FormValsType) => {
    const { form } = this.props;
    return [
      <FormItem key="userName" {...this.formLayout} label="用户名">
        {formVals.userName}
      </FormItem>,
      <FormItem key="password" {...this.formLayout}  label="密码">
        {form.getFieldDecorator('password', {
          initialValue: formVals.password,
          rules: [{ required: true, message: '请输入规则名称！' }]
        })(<Input type={"password"} placeholder="请输入" />)}
      </FormItem>,
      <FormItem label="用户状态" key="status" {...this.formLayout}>
        {form.getFieldDecorator('status',{
          initialValue: formVals.status+""
        })(
          <Select placeholder="请选择" style={{ width: '100%' }} >
            <Option value="0">停用</Option>
            <Option value="1">使用中</Option>
          </Select>,
        )}
      </FormItem>,
      <FormItem  label="所管理机构" key="organizations" {...this.formLayout}>
        {form.getFieldDecorator('organizations', {
          initialValue: formVals.organizations,
          rules: [{ required: true, message: '请选择所管理机构！'}],
        })(<Checkbox.Group options={constants.organizationsCheckBoxes} />)}
      </FormItem>
    ];
  };

  renderFooter = () => {
    const { handleUpdateModalVisible,handleUpdate, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="handleUpdate" type="primary" onClick={() => handleUpdate(values)}>
        确定
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible,handleUpdate, values,form } = this.props;
    const { formVals } = this.state;
    const okHandle = () => {
      const userNo = formVals.userNo;
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleUpdate({userNo,...fieldsValue});
      });
    };
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="修改用户信息"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
        onOk={okHandle}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
