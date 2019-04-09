import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd';
import YearModal from './YearModal';

const limit = 8;
const token = window.localStorage.getItem("token");

class YearManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      associationVisible:false,
      editVisible: false,
      addVisible: false,
      current: 1,
      year_id: '',
      year_name: ''
    }
  }

  componentDidMount() {
    this.getYear()
  }

  getYear = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'year/GetYear',
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
  delYear = (id) => {
    this.props.dispatch({
      type: 'year/DelYear',
      payload: {
        token: token,
        year_id: id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getYear()
      }
    })
  };
  //todo association project
  showAssociationModal = (e, record) => {
    this.setState({
      associationVisible: true,
      year_id: record.year_id,
    });
  };
  
  showEditModal = (e, record) => {
    this.setState({
      editVisible: true,
      year_id: record.year_id,
      year_name: record.year_name,
    });
  };
  showAddModal = () => {
    this.setState({
      year_name: '',
      addVisible: true
    });
  };
  editYear = () => {
    this.props.dispatch({
      type: 'year/EditYear',
      payload: {
        token: token,
        year_id: this.state.year_id,
        year_name: this.state.year_name,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.setState({
          editVisible: false,
        });
        this.getYear();
      }
    })
  };
  addYear = () => {
    this.props.dispatch({
      type: 'year/AddYear',
      payload: {
        token: token,
        year_name: this.state.year_name,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getYear();
        this.onClean()
      }
    })
  };
  onClean = () => {
    this.setState({
      year_name: '',
      addVisible: false,
      current: 1
    })
  };
  handleCancel = () => {
    this.setState({
      associationVisible:false,
      editVisible: false,
      addVisible: false
    });
  };

  render() {
    const columns = [{
      title: '历届编号',
      dataIndex: 'year_id',
      key: 'year_id',
    }, {
      title: '历届名称',
      dataIndex: 'year_name',
      key: 'year_name',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="editBtn" onClick={(e) => this.showAssociationModal(e, record)}>关联比赛项目</a>
          <Divider type="vertical"/>
          <a className="editBtn" style={{color:'#3390FF'}} onClick={(e) => this.showEditModal(e, record)}>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title="确定要删除这届吗?" onConfirm={() => this.delYear(record.year_id)}>
            <a className="deleteBtn">删除</a>
          </Popconfirm>
        </span>
      ),
    }];
    const {yearList} = this.props;
    const pagination = {
      total: yearList.total,
      pageSize: limit,
      onChange: (page) => {
        const location = (page - 1) * limit;
        this.setState({current: page});
        this.props.dispatch({
          type: 'year/GetYear',
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
        <Button className="addBtn" onClick={this.showAddModal}>新增届</Button>
        <Table
          className="manageTable"
          rowKey={record => record.year_id}
          columns={columns}
          dataSource={yearList.list}
          pagination={pagination}/>

        <YearModal
          onChange={(v) => this.setState({year_name: v})}
          title="编辑届信息"
          year_name={this.state.year_name}
          visible={this.state.editVisible}
          handleOk={this.editYear}
          handleCancel={this.handleCancel}
        />

        <YearModal
          onChange={(v) => this.setState({year_name: v})}
          title="新增届信息"
          year_name={this.state.year_name}
          visible={this.state.addVisible}
          handleOk={this.addYear}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    yearList: state.year.yearList
  }
})(YearManage);


