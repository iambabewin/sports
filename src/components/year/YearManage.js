import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd';
import YearModal from './YearModal';
import YearConnProjectModal from './YearConnProjectModal';

const limit = 8;
const token = window.localStorage.getItem("token");

class YearManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      connVisible: false,
      editVisible: false,
      addVisible: false,
      current: 1,
      year_id: '',
      year_name: '',
      oldProject_id: [],
      project_id: []
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
  getConnYearProject = (id) => {
    this.props.dispatch({
      type: 'year/GetCurrentYearConnProject',
      payload: {
        token: token,
        year_id: parseInt(id),
      }
    }).then((ret) => {
      if (ret === 0) {
        let arr = [];
        this.props.currentYearConnProjectList.forEach(function (item) {
          arr.push(parseInt(item.project_id))
        });
        this.setState({
          project_id: arr,
          oldProject_id: arr
        })
      }
    })
  };
  showConnModal = (e, record) => {
    this.setState({
      connVisible: true,
      year_id: record.year_id,
    });
    this.getConnYearProject(record.year_id);
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
        this.onClean();
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
        this.onClean();
        this.getYear();
      }
    })
  };
  onClean = () => {
    this.setState({
      editVisible: false,
      addVisible: false,
      connVisible: false,
      year_name: '',
      current: 1,
      project_id: []
    })
  };
  handleCancel = () => {
    this.setState({
      connVisible: false,
      editVisible: false,
      addVisible: false,
      project_id: []
    });
  };
  connProject = () => {
    this.props.dispatch({
      type: 'year/ConnYearProject',
      payload: {
        token: token,
        year_id: this.state.year_id,
        project_id: this.state.project_id.toString()
      }
    }).then((ret) => {
      if (ret === 0) {
        this.onClean();
      }
    })
  };
  cancelConnProject = (id) => {
    if (this.state.oldProject_id.indexOf(id) !== -1) {
      this.props.dispatch({
        type: 'year/CancleConnYearProject',
        payload: {
          token: token,
          year_id: this.state.year_id,
          project_id: id
        }
      }).then((ret) => {
        if (ret === 0) {
        }
      })
    }
  }

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
          <a className="editBtn" onClick={(e) => this.showConnModal(e, record)}>关联比赛项目</a>
          <Divider type="vertical"/>
          <a className="editBtn" style={{color: '#3390FF'}} onClick={(e) => this.showEditModal(e, record)}>编辑</a>
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
        this.setState({current: page, loadingList: true});
        this.getYear(page);
      },
    };

    return (
      <div style={{position: 'relative'}}>
        <Button className="addBtn" onClick={this.showAddModal}>新增届</Button>
        <Table
          loading={this.state.loadingList}
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

        <YearConnProjectModal
          visible={this.state.connVisible}
          handleOk={this.connProject}
          handleCancel={this.handleCancel}
          project_id={this.state.project_id}
          onSelectChange={(v) => {
            this.setState({project_id: v});
          }}
          onDeselect={(v) => this.cancelConnProject(v)}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    yearList: state.year.yearList,
    currentYearConnProjectList: state.year.currentYearConnProjectList
  }
})(YearManage);


