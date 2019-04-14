import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd';
import JudgeModal from './JudgeModal';

const limit = 8;
const token = window.localStorage.getItem("token");

class JudgeManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      addVisible: false,
      editVisible: false,
      current: 1,
      account: '',
      password: '',
      name: '',
      gender: '',
      age: '',
      tel: '',
      year_project_id: []
    }
  }

  componentDidMount() {
    this.getJudge()
  }

  getJudge = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'judge/GetJudge',
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

  delJudge = (id) => {
    this.props.dispatch({
      type: 'judge/DelJudge',
      payload: {
        token: token,
        user_id: id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getJudge()
      }
    })
  };
  showEditModal = (e, record) => {
    this.setState({
      editVisible: true,
    });
  };
  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };
  editJudge = () => {
    this.props.dispatch({
      type: 'judge/EditJudge',
      payload: {
        token: token,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.setState({
          editVisible: false,
        });
        this.getJudge();
      }
    })
  };
  addJudge = () => {
    this.props.dispatch({
      type: 'judge/AddJudge',
      payload: {
        token: token,
        account: this.state.account,
        password: this.state.password,
        name: this.state.name,
        gender: parseInt(this.state.gender),
        age: parseInt(this.state.age),
        tel: parseInt(this.state.tel),
        year_project_id: this.state.year_project_id
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getJudge();
        this.onClean()
      }
    })
  };
  onClean = () => {
    this.setState({
      addVisible: false,
      current: 1
    })
  };
  handleCancel = () => {
    this.setState({
      addVisible: false,
      editVisible: false
    });
  };

  render() {
    const columns = [{
      title: '裁判编号',
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
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '联系电话',
      dataIndex: 'tel',
      key: 'tel',
    }, {
      title: '添加时间',
      dataIndex: 'addtime',
      key: 'addtime',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="editBtn" onClick={(e) => this.showEditModal(e, record)}>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title="确定要删除这个裁判吗?" onConfirm={() => this.delJudge(record.user_id)}>
            <a className="deleteBtn">删除</a>
          </Popconfirm>
        </span>
      ),
    }];

    const {judgeList} = this.props;
    const pagination = {
      total: judgeList.total,
      pageSize: limit,
      onChange: (page) => {
        this.setState({current: page, loadingList: true});
        this.getJudge(page);
      },
    };

    return (
      <div style={{position: 'relative'}}>
        <Button className="addBtn" onClick={this.showAddModal}>新增裁判</Button>
        <Table
          loading={this.state.loadingList}
          className="manageTable"
          rowKey={record => record.user_id}
          columns={columns}
          dataSource={judgeList.list}
          pagination={pagination}/>

        {/*编辑裁判模态框*/}
        {/*<JudgeModal*/}
        {/*title="编辑裁判信息"*/}
        {/*visible={this.state.editVisible}*/}
        {/*handleOk={this.editJudge}*/}
        {/*handleCancel={this.handleCancel}*/}
        {/*/>*/}

        新增裁判模态框
        <JudgeModal
          title="新增裁判"
          visible={this.state.addVisible}
          handleOk={this.addJudge}
          handleCancel={this.handleCancel}
          account={this.state.account}
          onAccountChange={(v) => this.setState({account: v})}
          onPasswordChange={(v) => this.setState({password: v})}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    judgeList: state.judge.judgeList,
  }
})(JudgeManage);
