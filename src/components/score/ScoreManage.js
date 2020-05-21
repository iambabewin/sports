import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Button, Popconfirm} from 'antd/lib';
import JoinListModal from "./JoinListModal";

const limit = 8;
const token = window.localStorage.getItem("token");

class ScoreManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      current: 1,
      visible: false,
      year_project_id: ''
    }
  }

  componentDidMount() {
    this.getJudgeManagedProject()
  }

  getJudgeManagedProject = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'score/GetJudgeManagedProject',
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
  showJoinListModal = (e, record) => {
    this.props.dispatch({
      type: 'score/GetProjectJoinAthletes',
      payload: {
        token: token,
        location: 0,
        limit: limit,
        year_project_id: record.year_project_id
      }
    });
    this.setState({
      visible: true,
      year_project_id: record.year_project_id
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const columns = [{
      title: '比赛项目编号',
      dataIndex: 'year_project_id',
      key: 'year_project_id',
    }, {
      title: '比赛项目名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" size="small" style={{fontSize: '12px'}}
                onClick={(e) => this.showJoinListModal(e, record)}>报名名单</Button>
      ),
    }];
    const {judgeManagedProjectList} = this.props;
    const {projectJoinAthletesList} = this.props;
    const pagination = {
      total: judgeManagedProjectList.total,
      pageSize: limit,
      onChange: (page) => {
        this.setState({current: page});
        this.getJudgeManagedProject(page)
      },
    };

    return (
      <div style={{position: 'relative'}}>
        <Table
          loading={this.state.loadingList}
          className="manageTable"
          rowKey={record => record.year_project_id}
          columns={columns}
          dataSource={judgeManagedProjectList.list}
          pagination={pagination}/>
        <JoinListModal
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          data={projectJoinAthletesList}
          year_project_id={this.state.year_project_id}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    judgeManagedProjectList: state.score.judgeManagedProjectList,
    projectJoinAthletesList: state.score.projectJoinAthletesList
  }
})(ScoreManage);


