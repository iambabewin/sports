import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Card, Button} from 'antd';

const token = window.localStorage.getItem("token");

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
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

  render() {
    const {userInfo} = this.props;
    console.log(userInfo);
    return (
      <div style={{position: 'relative'}}>
        <Button className="addBtn">修改信息</Button>
        <Card style={{width: '100%', boxShadow: '0 1px 1px #dddddd;'}}>
          <p>姓名：<span style={{paddingLeft: '15px'}}>win</span></p>
          <p>性别：<span style={{paddingLeft: '15px'}}></span></p>
          <p>年龄：<span style={{paddingLeft: '15px'}}></span></p>
          <p>手机号码：<span style={{paddingLeft: '15px'}}></span></p>
          <p>学号：<span style={{paddingLeft: '15px'}}></span></p>
          <p>院系：<span style={{paddingLeft: '15px'}}></span></p>
          <p>专业：<span style={{paddingLeft: '15px'}}></span></p>
          <p>班级：<span style={{paddingLeft: '15px'}}></span></p>
        </Card>,
      </div>
    );
  }
}

export default connect((state) => {
  return {
    userInfo: state.user.userInfo
  }
})(UserInfo);


