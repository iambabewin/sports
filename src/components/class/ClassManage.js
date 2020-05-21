import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd/lib';
import ClassModal from "../class/ClassModal";
import ProfessionModal from "../profession/ProfessionModal";

const limit = 6;
const token = window.localStorage.getItem("token");

class ClassManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      current: 1,
      addVisible: false,
      editVisible: false,
      class_id: '',
      class_name: '',
      profession_id: '',
      profession_name: ''
    }
  }

  componentDidMount() {
    this.getClass()
  }

  getClass = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'classs/GetClass',
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
  delClass = (id) => {
    this.props.dispatch({
      type: 'classs/DelClass',
      payload: {
        token: token,
        class_id: id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getClass()
      }
    })
  };
  showEditModal = (e, record) => {
    this.setState({
      editVisible: true,
      class_id: record.class_id,
      class_name: record.class_name,
      profession_id: record.profession_id,
      profession_name: record.profession_name
    });
  };
  showAddModal = () => {
    this.setState({
      addVisible: true,
      profession_id: '',
      class_name: '',
    });
  };
  editClass = () => {
    this.props.dispatch({
      type: 'classs/EditClass',
      payload: {
        token: token,
        class_id: this.state.class_id,
        class_name: this.state.class_name,
        profession_id: this.state.profession_id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.setState({
          editVisible: false,
        });
        this.getClass();
      }
    })
  };
  addClass = () => {
    this.props.dispatch({
      type: 'classs/AddClass',
      payload: {
        token: token,
        class_name: this.state.class_name,
        profession_id: this.state.profession_id
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getClass();
        this.onClean()
      }
    })
  };
  onClean = () => {
    this.setState({
      class_name: '',
      profession_id: '',
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
      title: '班级编号',
      dataIndex: 'class_id',
      key: 'class_id',
    }, {
      title: '班级名称',
      dataIndex: 'class_name',
      key: 'class_name',
    }, {
      title: '所属专业',
      dataIndex: 'profession_name',
      key: 'profession_name',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="editBtn" onClick={(e) => this.showEditModal(e, record)}>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title="确定要删除这个班级吗?" onConfirm={() => this.delClass(record.class_id)}>
            <a className="deleteBtn">删除</a>
          </Popconfirm>
        </span>
      ),
    }];

    const {classList} = this.props;
    const pagination = {
      total: classList.total,
      pageSize: limit,
      onChange: (page) => {
        this.setState({current: page, loadingList: true});
        this.getClass(page)
      },
    };

    return (
      <div style={{position: 'relative'}}>
        <Button className="addBtn" onClick={this.showAddModal}>新增班级</Button>
        <Table
          loading={this.state.loadingList}
          className="manageTable"
          rowKey={record => record.class_id}
          columns={columns}
          dataSource={classList.list}
          pagination={pagination}/>

        {/*编辑班级模态框*/}
        <ClassModal
          onChange={(v) => this.setState({class_name: v})}
          onSelectChange={(v) => this.setState({profession_id: v})}
          title="编辑班级"
          profession_id={this.state.profession_id}
          class_name={this.state.class_name}
          visible={this.state.editVisible}
          handleOk={this.editClass}
          handleCancel={this.handleCancel}
        />

        {/*新增班级模态框*/}
        <ClassModal
          onChange={(v) => this.setState({class_name: v})}
          onSelectChange={(v) => this.setState({profession_id: v})}
          title="新增班级"
          profession_id={this.state.profession_id}
          class_name={this.state.class_name}
          visible={this.state.addVisible}
          handleOk={this.addClass}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    classList: state.classs.classList
  }
})(ClassManage);


