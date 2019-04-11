import React from 'react';
import {connect} from 'dva';
import {Router, Route, Link} from 'dva/router';
import {Form, Icon, Input, Button} from 'antd';
import {Tooltip, Cascader, Select, Row, Col, Checkbox, AutoComplete,} from 'antd';
import './Login.less';

const FormItem = Form.Item;

const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;

class Register extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="register">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="登录账号">
            {getFieldDecorator('account', {rules: [{required: true, message: '请输入用户名!',}],})(<Input/>)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码!',}, {validator: this.validateToNextPassword,}],
            })(<Input type="password"/>)}
          </Form.Item>
          <Form.Item label="确认密码">
            {getFieldDecorator('confirm', {
              rules: [{required: true, message: '请确认密码!',},
                {validator: this.compareToFirstPassword,}],
            })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {rules: [{required: true, message: '请输入姓名!',}],})(<Input/>)}
          </Form.Item>
          <Form.Item label="年龄">
            {getFieldDecorator('age', {rules: [{required: true, message: '请输入年龄!',}],})(<Input/>)}
          </Form.Item>
          <Form.Item label="电话">{getFieldDecorator('tel', {
            rules: [{required: true, message: '请输入电话!'}],
          })(<Input/>)}
          </Form.Item>
          <Form.Item label="学号">{getFieldDecorator('student_id', {
            rules: [{required: true, message: '请输入学号!'}],
          })(<Input/>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(Register);
export default connect()(WrappedRegistrationForm);
