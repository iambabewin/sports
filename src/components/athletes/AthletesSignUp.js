import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Button, Popconfirm} from 'antd/lib';

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
    this.getGames()
  }

  getGames = (page) => {
    const location = (page - 1) * limit;
    this.props.dispatch({
      type: 'athletes/GetGames',
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

  joinGames = (id) => {
    this.props.dispatch({
      type: 'athletes/JoinGames',
      payload: {
        token: token,
        year_project_id: id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getGames()
      }
    })
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
        (record.is_join == 0) ?
          <Popconfirm title="确定要报名这个项目吗?" onConfirm={() => this.joinGames(record.year_project_id)}>
            <Button type="primary" size="small" style={{fontSize: '12px'}}>报名</Button>
          </Popconfirm>
          :
          <span style={{fontSize: '12px', color: '#333333'}}>已报名</span>
      ),
    }];
    const {gamesList} = this.props;
    const pagination = {
      total: gamesList.total,
      pageSize: limit,
      onChange: (page) => {
        this.setState({current: page});
        this.getGames(page)
      },
    };

    return (
      <div style={{position: 'relative'}}>
        <Table
          loading={this.state.loadingList}
          className="manageTable"
          rowKey={record => record.year_project_id}
          columns={columns}
          dataSource={gamesList.list}
          pagination={pagination}/>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    gamesList: state.athletes.gamesList
  }
})(AthletesSignUp);


