import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd';
import ManagerModal from "../manager/ManagerModal";

const limit = 8;
const token = window.localStorage.getItem("token");

class ManagerManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      addVisible: false,
      editVisible: false,
      current: 1,
      user_id: '',
      account: '',
      password: '',
      name: '',
      gender: '',
      age: '',
      tel: '',
      student_id: '',
      college_id: '',
      profession_id: '',
      class_id: ''
    }
  }

  componentDidMount() {
    this.getManager()
  }

  getManager = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'manager/GetManager',
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

  delManager = (id) => {
    this.props.dispatch({
      type: 'manager/DelManager',
      payload: {
        token: token,
        user_id: id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getManager()
      }
    })
  };

  showEditModal = (e, record) => {
    this.setState({
      editVisible: true,
      user_id: record.user_id,
      account: record.account,
      password: '',
      name: record.name,
      gender: record.gender,
      age: record.age,
      tel: record.tel,
      student_id: record.student_id,
      college_id: parseInt(record.college_id),
      profession_id: parseInt(record.profession_id),
      class_id: parseInt(record.class_id)
    });
  };

  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };

  editManager = () => {
    this.props.dispatch({
      type: 'manager/EditManager',
      payload: {
        token: token,
        sports_id: this.state.user_id,
        account: this.state.account,
        password: this.state.password,
        name: this.state.name,
        gender: parseInt(this.state.gender),
        age: parseInt(this.state.age),
        tel: parseInt(this.state.tel),
        student_id: parseInt(this.state.student_id),
        college_id: this.state.college_id,
        profession_id: this.state.profession_id,
        class_id: this.state.class_id
      }
    }).then((ret) => {
      if (ret === 0) {
        this.setState({
          editVisible: false,
        });
        this.getManager();
        this.onClean();
      }
    })
  };

  addManager = () => {
    this.props.dispatch({
      type: 'manager/AddManager',
      payload: {
        token: token,
        account: this.state.account,
        password: this.state.password,
        name: this.state.name,
        gender: parseInt(this.state.gender),
        age: parseInt(this.state.age),
        tel: parseInt(this.state.tel),
        student_id: parseInt(this.state.student_id),
        college_id: this.state.college_id,
        profession_id: this.state.profession_id,
        class_id: this.state.class_id
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getManager();
        this.onClean()
      }
    })
  };

  onClean = () => {
    this.setState({
      editVisible: false,
      addVisible: false,
      current: 1,
      account: '',
      password: '',
      name: '',
      gender: '',
      age: '',
      tel: '',
      student_id: '',
      college_id: '',
      profession_id: '',
      class_id: ''
    })
  };

  handleCancel = () => {
    this.onClean();
  };

  render() {
    const columns = [{
      title: '管理员编号',
      dataIndex: 'user_id',
      key: 'user_id',
    }, {
      title: '登录账号',
      dataIndex: 'account',
      key: 'account',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: gender => (<span>{gender == 1 ? '男' : '女'}</span>),
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '联系电话',
      dataIndex: 'tel',
      key: 'tel',
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
      title: '学号',
      dataIndex: 'class_name',
      key: 'class_name',
    }, {
      title: '班级',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="editBtn" onClick={(e) => this.showEditModal(e, record)}>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title="确定要删除这个管理员吗?" onConfirm={() => this.delManager(record.user_id)}>
            <a className="deleteBtn">删除</a>
          </Popconfirm>
        </span>
      ),
    }];

    const {managerList} = this.props;
    const pagination = {
      total: managerList.total,
      pageSize: limit,
      onChange: (page) => {
        this.setState({current: page, loadingList: true});
        this.getManager(page);
      },
    };

    return (
      <div style={{position: 'relative'}}>
        <Button className="addBtn" onClick={this.showAddModal}>新增管理员</Button>
        <Table
          loading={this.state.loadingList}
          className="manageTable"
          rowKey={record => record.user_id}
          columns={columns}
          dataSource={managerList.list}
          pagination={pagination}/>

        <ManagerModal
          title="编辑管理员信息"
          visible={this.state.editVisible}
          handleOk={this.editManager}
          handleCancel={this.handleCancel}
          account={this.state.account}
          onAccountChange={(v) => this.setState({account: v})}
          password={this.state.password}
          onPasswordChange={(v) => this.setState({password: v})}
          name={this.state.name}
          onNameChange={(v) => this.setState({name: v})}
          gender={this.state.gender}
          onGenderSelectChange={(v) => this.setState({gender: v})}
          age={this.state.age}
          onAgeChange={(v) => this.setState({age: v})}
          tel={this.state.tel}
          onTelChange={(v) => this.setState({tel: v})}
          student_id={this.state.student_id}
          onStudentidChange={(v) => this.setState({student_id: v})}
          college_id={this.state.college_id}
          onCollegeSelectChange={(v) => this.setState({college_id: v})}
          profession_id={this.state.profession_id}
          onProfessionSelectChange={(v) => this.setState({profession_id: v})}
          class_id={this.state.class_id}
          onClassSelectChange={(v) => this.setState({class_id: v})}
        />

        {/*新增管理员模态框*/}
        <ManagerModal
          title="新增管理员"
          visible={this.state.addVisible}
          handleOk={this.addManager}
          handleCancel={this.handleCancel}
          account={this.state.account}
          onAccountChange={(v) => this.setState({account: v})}
          password={this.state.password}
          onPasswordChange={(v) => this.setState({password: v})}
          name={this.state.name}
          onNameChange={(v) => this.setState({name: v})}
          gender={this.state.gender}
          onGenderSelectChange={(v) => this.setState({gender: v})}
          age={this.state.age}
          onAgeChange={(v) => this.setState({age: v})}
          tel={this.state.tel}
          onTelChange={(v) => this.setState({tel: v})}
          student_id={this.state.student_id}
          onStudentidChange={(v) => this.setState({student_id: v})}
          college_id={this.state.college_id}
          onCollegeSelectChange={(v) => this.setState({college_id: v})}
          profession_id={this.state.profession_id}
          onProfessionSelectChange={(v) => this.setState({profession_id: v})}
          class_id={this.state.class_id}
          onClassSelectChange={(v) => this.setState({class_id: v})}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    managerList: state.manager.managerList,
  }
})(ManagerManage);
