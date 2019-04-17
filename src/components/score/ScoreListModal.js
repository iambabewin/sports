import React from 'react';
import {Modal, Table, Button, Input} from 'antd';
import '../style.less'
import {connect} from "dva";

const limit = 8;
const token = window.localStorage.getItem("token");

class ScoreListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    }
  }

  render() {
    const columns = [{
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
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
    }];
    const projectAllScoreList = this.props.data;
    const pagination = {
      total: projectAllScoreList.total,
      pageSize: limit,
      onChange: (page) => {
        this.setState({current: page});
        const location = (page - 1) * limit;
        this.props.dispatch({
          type: 'score/GetProjectAllScore',
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
        title="成绩列表"
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        footer={null}
      >
        <Table
          className="manageTable"
          rowKey={record => record.student_id}
          columns={columns}
          dataSource={projectAllScoreList.list}
          pagination={pagination}
        />

      </Modal>
    )
  }
}

export default connect((state) => {
  return {}
})(ScoreListModal);


