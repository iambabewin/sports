import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd/lib';
import CollegeModal from './CollegeModal';

const limit = 8;
const token = window.localStorage.getItem("token");

class CollegeManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      editVisible: false, // 编辑院系模态框
      addVisible: false, // 添加院系模态框
      current: 1,
      college_id: '',
      college_name: '',
    }
  }

  componentDidMount() {
    this.getCollege()
  }

  getCollege = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'college/GetCollege',
      payload: {
        token: token,
        location: location,
        limit: limit
      }
    }).then(() => {
      this.setState({loadingList: false})
    }).catch(() => {
      this.setState({loadingList: false})
    })
  };
  delCollege = (id) => {
    this.props.dispatch({
      type: 'college/DelCollege',
      payload: {
        token: token,
        college_id: id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getCollege()
      }
    })
  };
  showEditModal = (e, record) => {
    this.setState({
      editVisible: true,
      college_name: record.college_name,
      college_id: record.college_id,
    });
  };
  showAddModal = () => {
    this.setState({
      college_name: '',
      addVisible: true
    });
  };
  editCollege = () => {
    this.props.dispatch({
      type: 'college/EditCollege',
      payload: {
        token: token,
        college_id: this.state.college_id,
        college_name: this.state.college_name,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.setState({
          editVisible: false,
        });
        this.getCollege();
      }
    })
  };
  addCollege = () => {
    this.props.dispatch({
      type: 'college/AddCollege',
      payload: {
        token: token,
        college_name: this.state.college_name,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getCollege();
        this.onClean()
      }
    })
  };
  onClean = () => {
    this.setState({
      college_name: '',
      addVisible: false,
      current: 1
    })
  };
  handleCancel = () => {
    this.setState({
      editVisible: false,
      addVisible: false
    });
  };

  render() {
    const columns = [{
      title: '院系编号',
      dataIndex: 'college_id',
      key: 'college_id',
    }, {
      title: '院系名称',
      dataIndex: 'college_name',
      key: 'college_name',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="editBtn" onClick={(e) => this.showEditModal(e, record)}>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title="确定要删除这个院系吗?" onConfirm={() => this.delCollege(record.college_id)}>
            <a className="deleteBtn">删除</a>
          </Popconfirm>
        </span>
      ),
    }];
    const {collegeList} = this.props;
    const pagination = {
      total: collegeList.total,
      pageSize: limit,
      onChange: (page) => {
        this.setState({current: page, loadingList: true});
        this.getCollege(page)
      },
    };

    return (
      <div style={{position: 'relative'}}>
        <Button className="addBtn" onClick={this.showAddModal}>新增院系</Button>
        <Table
          loading={this.state.loadingList}
          className="manageTable"
          rowKey={record => record.college_id}
          columns={columns}
          dataSource={collegeList.list}
          pagination={pagination}/>

        {/*编辑院系模态框*/}
        <CollegeModal
          onChange={(v) => this.setState({college_name: v})}
          title="编辑院系"
          college_name={this.state.college_name}
          visible={this.state.editVisible}
          handleOk={this.editCollege}
          handleCancel={this.handleCancel}
        />

        {/*新增院系模态框*/}
        <CollegeModal
          onChange={(v) => this.setState({college_name: v})}
          title="新增院系"
          college_name={this.state.college_name}
          visible={this.state.addVisible}
          handleOk={this.addCollege}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    collegeList: state.college.collegeList
  }
})(CollegeManage);


