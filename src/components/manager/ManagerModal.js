import React from 'react';
import {connect} from 'dva';
import {Modal, Input, Select} from 'antd';
import '../style.less'

const Option = Select.Option;
const token = window.localStorage.getItem("token");

class JudgeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialize: true
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'college/GetAllCollege'
    });
    this.props.dispatch({
      type: 'profession/GetAllProfession',
      payload: {
        token: token
      }
    });
    this.props.dispatch({
      type: 'classs/GetAllClass',
      payload: {
        token: token
      }
    })
  }

  //根据院系id获取对应专业
  getProfessionByCollege = (college_id) => {
    this.setState({initialize: false});
    this.props.dispatch({
      type: 'profession/GetProfessionByCollege',
      payload: {
        college_id: college_id
      }
    })
  };

  //根据专业id获取对应班级
  getClassByProfession = (profession_id) => {
    this.setState({initialize: false});
    this.props.dispatch({
      type: 'classs/GetClassByProfession',
      payload: {
        profession_id: profession_id
      }
    })
  };

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
        afterClose={() => {
          this.setState({initialize: true});
        }}
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
        <div className="input" style={{marginBottom: '20px'}}>
          <div className="title">学号</div>
          <Input value={this.props.student_id} onChange={(e) => this.props.onStudentidChange(e.target.value)}/>
        </div>
        <div className="input" style={{marginBottom: '20px'}}>
          <div className="title">院系</div>
          <Select style={{width: '100%'}}
                  value={this.props.college_id}
                  onChange={(v) => {
                    this.getProfessionByCollege(v);
                    this.props.onCollegeSelectChange(v);
                  }}>
            {
              this.props.allCollegeList.map((college) => {
                return <Option key={college.college_id} value={college.college_id}>{college.college_name}</Option>
              })
            }
          </Select>
        </div>
        <div className="input" style={{marginBottom: '20px'}}>
          <div className="title">专业</div>
          <Select style={{width: '100%'}} id="profession"
                  value={this.props.profession_id}
                  onChange={(v) => {
                    this.getClassByProfession(v);
                    this.props.onProfessionSelectChange(v);
                  }}>
            {
              this.state.initialize ? (
                this.props.allProfessionList.map((profession) => {
                  return <Option key={profession.profession_id}
                                 value={profession.profession_id}>{profession.profession_name}</Option>
                })

              ) : (
                this.props.collegeProfessionList.map((profession) => {
                  return <Option key={profession.profession_id}
                                 value={profession.profession_id}>{profession.profession_name}</Option>
                }))
            }
          </Select>
        </div>
        <div className="input">
          <div className="title">班级</div>
          <Select style={{width: '100%'}}
                  value={this.props.class_id}
                  onChange={(v) => {
                    this.props.onClassSelectChange(v);
                  }}>
            {
              (this.state.initialize) ? (
                this.props.allClassList.map((classs) => {
                  return <Option key={classs.class_id}
                                 value={classs.class_id}>{classs.class_name}</Option>
                })
              ) : (
                this.props.professionClassList.map((classs) => {
                  return <Option key={classs.class_id}
                                 value={classs.class_id}>{classs.class_name}</Option>
                }))

            }
          </Select>
        </div>
      </Modal>
    )
  }
}

export default connect((state) => {
  return {
    allCollegeList: state.college.allCollegeList,
    collegeProfessionList: state.profession.collegeProfessionList,
    professionClassList: state.classs.professionClassList,
    allProfessionList: state.profession.allProfessionList,
    allClassList: state.classs.allClassList
  }
})(JudgeModal);


