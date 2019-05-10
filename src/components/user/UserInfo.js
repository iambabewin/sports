import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Card, Button} from 'antd';
import CollegeModal from "../college/CollegeModal";
import UserInfoEdit from "./UserInfoEdit";

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


        <UserInfoEdit
          title="修改个人信息"
          userInfo={userInfo}
          visible={this.state.editVisible}
          handleCancel={this.handleCancel}
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


