import React from 'react';
import {Modal, Input, Form, Select} from 'antd';
import '../style.less'
import {connect} from "dva";

const {Option} = Select;

class UserInfoEdit extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'college/GetAllCollege'
    });
    const {userInfo} = this.props;
    this.getProfessionByCollege(userInfo.college_id);
    this.getClassByProfession(userInfo.profession_id);
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

  render() {
    const {getFieldDecorator, setFieldsValue} = this.props.form;
    return (
      <Modal
        className="modal"
        width={750}
        mask={true}
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.onCreate}
        onCancel={this.props.handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form className="userinfoEdit">
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              initialValue: this.props.userInfo.name,
              rules: [{required: true, message: '请输入姓名!',}],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('password')(<Input type="password"/>)}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('gender', {
              initialValue: this.props.userInfo.gender,
              rules: [{required: true, message: '请选择性别!',}],
            })(
              <Select>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="年龄">
            {getFieldDecorator('age', {
              initialValue: this.props.userInfo.age,
              rules: [{required: true, message: '请输入年龄!',}],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="电话">{getFieldDecorator('tel', {
            initialValue: this.props.userInfo.tel,
            rules: [{required: true, message: '请输入电话!'}],
          })(<Input/>)}
          </Form.Item>
          <Form.Item label="院系">{getFieldDecorator('college_id', {
            initialValue: parseInt(this.props.userInfo.college_id),
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
            initialValue: parseInt(this.props.userInfo.profession_id),
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
            initialValue: parseInt(this.props.userInfo.class_id),
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
        </Form>
      </Modal>
    )
  }
}

const WrappedUserInfoForm = Form.create()(UserInfoEdit);
export default connect((state) => {
  return {
    allCollegeList: state.college.allCollegeList,
    collegeProfessionList: state.profession.collegeProfessionList,
    professionClassList: state.classs.professionClassList
  }
})(WrappedUserInfoForm);
