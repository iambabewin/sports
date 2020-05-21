import React from 'react';
import {connect} from 'dva';
import {Form, Input, Button, Select} from 'antd/lib';
import './Login.less';

const {Option} = Select;

class Register extends React.Component {
  state = {
    confirmDirty: false
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'college/GetAllCollege'
    })
  }
  getProfessionByCollege = (college_id) => {
    this.props.dispatch({
      type: 'profession/GetProfessionByCollege',
      payload: {
        college_id: college_id
      }
    })
  };
  getClassByProfession = (profession_id) => {
    this.props.dispatch({
      type: 'classs/GetClassByProfession',
      payload: {
        profession_id: profession_id
      }
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/register',
          payload: {
            account: values.account,
            password: values.password,
            name: values.name,
            gender: parseInt(values.gender),
            age: parseInt(values.age),
            tel: parseInt(values.tel),
            student_id: parseInt(values.student_id),
            college_id: values.college_id,
            profession_id: values.profession_id,
            class_id: values.class_id
          }
        })
      }
    });
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };
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
  };

  render() {
    const {getFieldDecorator, setFieldsValue} = this.props.form;
    return (
      <div className="register">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="登录账号">
            {getFieldDecorator('account', {rules: [{required: true, message: '请输入用户名!',}],})(<Input/>)}
          </Form.Item>
          <Form.Item></Form.Item>
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
          <Form.Item label="性别">
            {getFieldDecorator('gender', {rules: [{required: true, message: '请选择性别!',}],})(
              <Select>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            )}
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
          <Form.Item label="院系">{getFieldDecorator('college_id', {
            rules: [{required: true, message: '请选择院系!'}],
          })(<Select onChange={(v) => {
            setFieldsValue({profession_id: '', class_id: ''});
            this.getProfessionByCollege(v);
          }}>
            {
              this.props.allCollegeList.map((college) => {
                return <Option key={college.college_id} value={college.college_id}>{college.college_name}</Option>
              })
            }
          </Select>)}
          </Form.Item>
          <Form.Item label="专业">{getFieldDecorator('profession_id', {
            rules: [{required: true, message: '请选择专业!'}],
          })(<Select onChange={(v) => {
            setFieldsValue({class_id: ''});
            this.getClassByProfession(v);
          }}>
            {
              this.props.collegeProfessionList.map((profession) => {
                return <Option key={profession.profession_id}
                               value={profession.profession_id}>{profession.profession_name}</Option>
              })
            }
          </Select>)}
          </Form.Item>
          <Form.Item label="班级">{getFieldDecorator('class_id', {
            rules: [{required: true, message: '请选择班级!'}],
          })(<Select>
            {
              this.props.professionClassList.map((classs) => {
                return <Option key={classs.class_id}
                               value={classs.class_id}>{classs.class_name}</Option>
              })
            }
          </Select>)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">注册</Button>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(Register);
export default connect((state) => {
  return {
    allCollegeList: state.college.allCollegeList,
    collegeProfessionList: state.profession.collegeProfessionList,
    professionClassList: state.classs.professionClassList
  }
})(WrappedRegistrationForm);
