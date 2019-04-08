import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd';
import ProfessionModal from './ProfessionModal';
import CollegeModal from "../college/CollegeModal";

const limit = 6;
const token = window.localStorage.getItem("token");

class ProfessionManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      addVisible: false,
      editVisible: false,
      profession_id: '',
      profession_name: '',
      college_id: '',
      college_name: '',
      current: 1
    }
  }

  componentDidMount() {
    this.getProfession()
  }

  /**获取所有专业 */
  getProfession = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'profession/GetProfession',
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
  delProfession = (id) => {
    this.props.dispatch({
      type: 'profession/DelProfession',
      payload: {
        token: token,
        profession_id: id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getProfession()
      }
    })
  };
  showEditModal = (e, record) => {
    this.setState({
      editVisible: true,
      profession_id: record.profession_id,
      profession_name: record.profession_name,
      college_id: record.college_id,
      college_name: record.college_name
    });
  };
  showAddModal = () => {
    this.setState({
      addVisible: true,
      profession_name: '',
      college_id: '',
    });
  };
  editProfession = () => {
    this.props.dispatch({
      type: 'profession/EditProfession',
      payload: {
        token: token,
        profession_id: this.state.profession_id,
        profession_name: this.state.profession_name,
        college_id: this.state.college_id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.setState({
          editVisible: false,
        });
        this.getProfession();
      }
    })
  };
  addProfession = () => {
    this.props.dispatch({
      type: 'profession/AddProfession',
      payload: {
        token: token,
        profession_name: this.state.profession_name,
        college_id: this.state.college_id
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getProfession();
        this.onClean()
      }
    })
  };
  onClean = () => {
    this.setState({
      profession_name: '',
      college_id: '',
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
      title: '专业编号',
      dataIndex: 'profession_id',
      key: 'profession_id',
    }, {
      title: '专业名称',
      dataIndex: 'profession_name',
      key: 'profession_name',
    }, {
      title: '所属院系',
      dataIndex: 'college_name',
      key: 'college_name',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="editBtn" onClick={(e) => this.showEditModal(e, record)}>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title="确定要删除这个专业吗?" onConfirm={() => this.delProfession(record.profession_id)}>
            <a className="deleteBtn">删除</a>
          </Popconfirm>
        </span>
      ),
    }];

    const {professionList} = this.props;
    const pagination = {
      total: professionList.total,
      pageSize: limit,
      onChange: (page) => {
        const location = (page - 1) * limit;
        this.setState({current: page});
        this.props.dispatch({
          type: 'profession/GetProfession',
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
        <Button className="addBtn" onClick={this.showAddModal}>新增专业</Button>
        <Table
          rowKey={record => record.profession_id}
          columns={columns}
          dataSource={professionList.list}
          pagination={pagination}/>

        {/*编辑专业模态框*/}
        <ProfessionModal
          onChange={(v) => this.setState({profession_name: v})}
          onSelectChange={(v) => this.setState({college_id: v})}
          title="编辑专业"
          college_id={this.state.college_id}
          college_name={this.state.college_name}
          profession_name={this.state.profession_name}
          visible={this.state.editVisible}
          handleOk={this.editProfession}
          handleCancel={this.handleCancel}
        />

        {/*新增专业模态框*/}
        <ProfessionModal
          onChange={(v) => this.setState({profession_name: v})}
          onSelectChange={(v) => this.setState({college_id: v})}
          title="新增专业"
          college_id={this.state.college_id}
          profession_name={this.state.profession_name}
          visible={this.state.addVisible}
          handleOk={this.addProfession}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    professionList: state.profession.professionList,
    collegeList: state.college.collegeList
  }
})(ProfessionManage);


