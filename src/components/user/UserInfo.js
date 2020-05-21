import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Card, Button} from 'antd/lib';
import UserInfoEdit from "./UserInfoEdit";
import {Form} from "antd/lib/index";

const token = window.localStorage.getItem("token");

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisible: false, // 修改信息模态框
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  getUserInfo = () => {
    this.props.dispatch({
      type: 'user/GetUserInfo',
      payload: {
        token: token
      }
    })
  };
  editUserInfo = (values) => {
    this.props.dispatch({
      type: 'user/EditUserInfo',
      payload: {
        token: token,
        name: values.name,
        password: values.password,
        gender: values.gender,
        age: values.age,
        tel: values.tel,
        college_id: values.college_id,
        profession_id: values.profession_id,
        class_id: values.class_id
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getUserInfo();
      }
    })
  };

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.editUserInfo(values);
      form.resetFields();
      this.setState({editVisible: false});
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  }

  showEditModal = () => {
    this.setState({
      editVisible: true,
    });
  };
  handleCancel = () => {
    this.setState({
      editVisible: false
    });
  };

  render() {
    const {userInfo} = this.props;
    const WrappedUserInfoForm = Form.create()(UserInfoEdit);

    return (
      <div style={{position: 'relative'}}>
        <Button className="addBtn" onClick={this.showEditModal}>修改信息</Button>
        <Card className="userinfo">
          <div>
            <p>姓名：<span style={{paddingLeft: '15px'}}>{userInfo.name}</span></p>
            <p>性别：<span style={{paddingLeft: '15px'}}>{userInfo.gender == '1' ? '男' : '女'}</span></p>
            <p>年龄：<span style={{paddingLeft: '15px'}}>{userInfo.age}</span></p>
            <p>手机号码：<span style={{paddingLeft: '15px'}}>{userInfo.tel}</span></p>
            <p>学号：<span style={{paddingLeft: '15px'}}>{userInfo.student_id}</span></p>
            <p>院系：<span style={{paddingLeft: '15px'}}>{userInfo.college_name}</span></p>
            <p>专业：<span style={{paddingLeft: '15px'}}>{userInfo.profession_name}</span></p>
            <p>班级：<span style={{paddingLeft: '15px'}}>{userInfo.class_name}</span></p>
          </div>
        </Card>

        <WrappedUserInfoForm
          title="修改个人信息"
          userInfo={userInfo}
          visible={this.state.editVisible}
          handleCancel={this.handleCancel}
          onCreate={this.handleCreate}
          ref={this.saveFormRef}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    userInfo: state.user.userInfo
  }
})(UserInfo);


