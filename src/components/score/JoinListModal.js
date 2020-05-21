import React from 'react';
import {Modal, Table, Button, Input} from 'antd/lib';
import '../style.less'
import {connect} from "dva";

const limit = 8;
const token = window.localStorage.getItem("token");

class JoinListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      visible: false,
      join_id: '',
      grade: ''
    }
  }

  showInputScoreModal = (e, record) => {
    this.setState({
      visible: true,
      join_id: record.join_id,
      grade: record.grade
    });
  };
  inputScore = () => {
    this.props.dispatch({
      type: 'score/InputScore',
      payload: {
        token: token,
        join_id: this.state.join_id,
        grade: this.state.grade
      }
    }).then((ret) => {
      if (ret === 0) {
        this.setState({
          visible: false,
        });
        this.props.dispatch({
          type: 'score/GetProjectJoinAthletes',
          payload: {
            token: token,
            location: 0,
            limit: limit,
            year_project_id: this.props.year_project_id
          }
        })
      }
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const columns = [{
      title: '参赛编号',
      dataIndex: 'join_id',
      key: 'join_id',
    }, {
      title: '运动员姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '学号',
      dataIndex: 'student_id',
      key: 'student_id',
    }, {
      title: '院系名称',
      dataIndex: 'college_name',
      key: 'college_name',
    }, {
      title: '专业名称',
      dataIndex: 'profession_name',
      key: 'profession_name',
    }, {
      title: '班级名称',
      dataIndex: 'class_name',
      key: 'class_name',
    }, {
      title: '分数',
      dataIndex: 'grade',
      key: 'grade',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" size="small" style={{fontSize: '12px'}}
                onClick={(e) => this.showInputScoreModal(e, record)}>录入成绩</Button>
      ),
    }];
    const judgeManagedProjectList = this.props.data;
    const pagination = {
      total: judgeManagedProjectList.total,
      pageSize: limit,
      onChange: (page) => {
        this.setState({current: page});
        const location = (page - 1) * limit;
        this.props.dispatch({
          type: 'score/GetProjectJoinAthletes',
          payload: {
            token: token,
            location: location,
            limit: limit,
            year_project_id: this.props.year_project_id
          }
        })
      },
    };
    return (
      <Modal
        className="modal"
        width={900}
        mask={true}
        title="运动员名单"
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        footer={null}
      >
        <Table
          className="manageTable"
          rowKey={record => record.join_id}
          columns={columns}
          dataSource={judgeManagedProjectList.list}
          pagination={pagination}
        />

        <Modal
          className="modal"
          width={300}
          mask={true}
          title="录入成绩"
          visible={this.state.visible}
          onOk={this.inputScore}
          onCancel={this.handleCancel}
        >
          <div className="input">
            <div className="title">分数</div>
            <Input value={this.state.grade} onChange={(e) => this.setState({grade: e.target.value})}/>
          </div>
        </Modal>

      </Modal>
    )
  }
}

export default connect((state) => {
  return {}
})(JoinListModal);


