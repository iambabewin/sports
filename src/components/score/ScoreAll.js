import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Button} from 'antd/lib';
import ScoreListModal from "./ScoreListModal";

const limit = 8;
const token = window.localStorage.getItem("token");

class ScoreAll extends React.Component {
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
    this.getAllYearConnProject()
  }

  getAllYearConnProject = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'score/GetAllYearConnProject',
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
  showScoreListModal = (e, record) => {
    this.props.dispatch({
      type: 'score/GetProjectAllScore',
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
                onClick={(e) => this.showScoreListModal(e, record)}>查看成绩</Button>
      ),
    }];
    const {allYearConnProjectList} = this.props;
    const {projectAllScoreList} = this.props;
    const pagination = {
      total: allYearConnProjectList.total,
      pageSize: limit,
      onChange: (page) => {
        this.setState({current: page});
        this.getAllYearConnProject(page)
      },
    };

    return (
      <div style={{position: 'relative'}}>
        <Table
          loading={this.state.loadingList}
          className="manageTable"
          rowKey={record => record.year_project_id}
          columns={columns}
          dataSource={allYearConnProjectList.list}
          pagination={pagination}/>
        <ScoreListModal
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          data={projectAllScoreList}
          year_project_id={this.state.year_project_id}
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    allYearConnProjectList: state.score.allYearConnProjectList,
    projectAllScoreList: state.score.projectAllScoreList
  }
})(ScoreAll);


