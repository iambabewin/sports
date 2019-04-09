import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd';
import ProjectModal from './ProjectModal';

const limit = 6;
const token = window.localStorage.getItem("token");

class ProjectManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      editVisible: false,
      addVisible: false,
      current: 1,
      project_id: '',
      project_name: '',
      type: '',
    }
  }

  componentDidMount() {
    this.getProject()
  }

  getProject = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'project/GetProject',
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
  delProject = (id) => {
    this.props.dispatch({
      type: 'project/DelProject',
      payload: {
        token: token,
        project_id: id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getProject()
      }
    })
  };
  showEditModal = (e, record) => {
    this.setState({
      editVisible: true,
      project_name: record.project_name,
      project_id: record.project_id,
      type: record.type
    });
  };
  showAddModal = () => {
    this.setState({
      project_name: '',
      type: '',
      addVisible: true
    });
  };
  editProject = () => {
    this.props.dispatch({
      type: 'project/EditProject',
      payload: {
        token: token,
        project_id: this.state.project_id,
        project_name: this.state.project_name,
        type: this.state.type
      }
    }).then((ret) => {
      if (ret === 0) {
        this.setState({
          editVisible: false,
        });
        this.getProject();
      }
    })
  };
  addProject = () => {
    this.props.dispatch({
      type: 'project/AddProject',
      payload: {
        token: token,
        project_name: this.state.project_name,
        type: this.state.type
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getProject();
        this.onClean()
      }
    })
  };
  onClean = () => {
    this.setState({
      project_name: '',
      type: '',
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
      title: '比赛项目编号',
      dataIndex: 'project_id',
      key: 'project_id',
    }, {
      title: '比赛项目名称',
      dataIndex: 'project_name',
      key: 'project_name',
    }, {
      title: '比赛项目类型',
      dataIndex: 'type',
      key: 'type',
      render: type => (<span>{type == 1 ? '男子项目' : '女子项目'}</span>),
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="editBtn" onClick={(e) => this.showEditModal(e, record)}>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title="确定要删除这个比赛项目吗?" onConfirm={() => this.delProject(record.project_id)}>
            <a className="deleteBtn">删除</a>
          </Popconfirm>
        </span>
      ),
    }];
    const {projectList} = this.props;
    const pagination = {
      total: projectList.total,
      pageSize: limit,
      onChange: (page) => {
        const location = (page - 1) * limit;
        this.setState({current: page});
        this.props.dispatch({
          type: 'project/GetProject',
          payload: {
            token: token,
            location: location,
            limit: limit,
          }
        })
      },
    };

    return (
      <div style={{position: 'relative'}}>
        <Button className="addBtn" onClick={this.showAddModal}>新增项目</Button>
        <Table
          className="manageTable"
          rowKey={record => record.project_id}
          columns={columns}
          dataSource={projectList.list}
          pagination={pagination}/>

        <ProjectModal
          onChange={(v) => this.setState({project_name: v})}
          onSelectChange={(v) => this.setState({type: v})}
          title="编辑项目"
          project_name={this.state.project_name}
          type={this.state.type}
          visible={this.state.editVisible}
          handleOk={this.editProject}
          handleCancel={this.handleCancel}
        />

        <ProjectModal
          onChange={(v) => this.setState({project_name: v})}
          onSelectChange={(v) => this.setState({type: v})}
          title="新增项目"
          type={this.state.type}
          project_name={this.state.project_name}
          visible={this.state.addVisible}
          handleOk={this.addProject}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    projectList: state.project.projectList
  }
})(ProjectManage);


