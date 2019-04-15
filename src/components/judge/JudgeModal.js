import React from 'react';
import {connect} from 'dva';
import {Modal, Input, Select} from 'antd';
import '../style.less'

const Option = Select.Option;
const token = window.localStorage.getItem("token");

class JudgeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'year/GetAllYearConnProject',
      payload: {
        token: token,
      }
    })
  }

  render() {
    return (
      <Modal
        className="modal"
        width={600}
        mask={true}
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <div className="input" style={{marginBottom: '20px'}}>
          <div className="title">登录账号</div>
          <Input value={this.props.account} onChange={(e) => this.props.onAccountChange(e.target.value)}/>
        </div>
        <div className="input" style={{marginBottom: '20px'}}>
          <div className="title">登录密码</div>
          <Input value={this.props.password} onChange={(e) => this.props.onPasswordChange(e.target.value)}/>
        </div>
        <div className="input" style={{marginBottom: '20px'}}>
          <div className="title">姓名</div>
          <Input value={this.props.name} onChange={(e) => this.props.onNameChange(e.target.value)}/>
        </div>
        <div className="input" style={{marginBottom: '20px'}}>
          <div className="title">性别</div>
          <Select style={{width: '100%'}} value={this.props.gender}
                  onChange={(value) => {
                    this.props.onGenderSelectChange(value);
                  }}>
            <Option value="1">男</Option>
            <Option value="2">女</Option>
          </Select>
        </div>
        <div className="input" style={{marginBottom: '20px'}}>
          <div className="title">年龄</div>
          <Input value={this.props.age} onChange={(e) => this.props.onAgeChange(e.target.value)}/>
        </div>
        <div className="input" style={{marginBottom: '20px'}}>
          <div className="title">电话</div>
          <Input value={this.props.tel} onChange={(e) => this.props.onTelChange(e.target.value)}/>
        </div>
        <div className="input">
          <div className="title">管理项目</div>
          <Select mode="multiple"
                  style={{width: '100%'}}
                  value={this.props.year_project_id}
                  onChange={(value) => {
                    this.props.onYearProjectSelectChange(value);
                  }}>
            {
              this.props.allYearConnProjectList.map((item) => {
                return <Option key={item.year_project_id} value={item.year_project_id}>{item.name}</Option>
              })
            }
          </Select>
        </div>
      </Modal>
    )
  }
}

export default connect((state) => {
  return {
    allYearConnProjectList: state.year.allYearConnProjectList
  }
})(JudgeModal);


