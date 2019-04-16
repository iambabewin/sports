import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd';

const limit = 8;
const token = window.localStorage.getItem("token");

class AthletesSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      current: 1,
    }
  }

  componentDidMount() {
    this.getAthletes()
  }

  getAthletes = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'athletes/GetAthletes',
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
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" size="small" style={{fontSize: '12px'}}>报名</Button>
      ),
    }];
    const {allYearConnProjectList} = this.props;
    const pagination = {
      total: allYearConnProjectList.total,
      pageSize: limit,
      onChange: (page) => {
        this.setState({current: page, getAthletes: true});
        this.getAthletes(page)
      },
    };

    return (
      <div style={{position: 'relative'}}>
        <Table
          loading={this.state.loadingList}
          className="manageTable"
          rowKey={record => record.project_id}
          columns={columns}
          dataSource={allYearConnProjectList.list}
          pagination={pagination}/>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    allYearConnProjectList: state.year.allYearConnProjectList
  }
})(AthletesSignUp);


