import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd';

const limit = 8;
const token = window.localStorage.getItem("token");

class AthletesManage extends React.Component {
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

  cancelAthletes = (id) => {
    this.props.dispatch({
      type: 'athletes/CancelAthletes',
      payload: {
        token: token,
        user_id: id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getAthletes()
      }
    })
  };

  passAthletes = (id) => {
    this.props.dispatch({
      type: 'athletes/PassAthletes',
      payload: {
        token: token,
        user_id: id,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getAthletes()
      }
    })
  };

  render() {
    const columns = [{
      title: '编号',
      dataIndex: 'user_id',
      key: 'user_id',
    }, {
      title: '账号',
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
      title: '电话',
      dataIndex: 'tel',
      key: 'tel',
    }, {
      title: '学号',
      dataIndex: 'student_id',
      key: 'student_id',
    }, {
      title: '院系',
      dataIndex: 'college_name',
      key: 'college_name',
    }, {
      title: '专业',
      dataIndex: 'profession_name',
      key: 'profession_name',
    }, {
      title: '班级',
      dataIndex: 'class_name',
      key: 'class_name',
    }, {
      title: '通过审核',
      dataIndex: 'is_pass',
      key: 'is_pass',
      render: type => (<span>{type == 1 ? '是' : '否'}</span>),
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        (record.is_pass == 1) ?
          <Popconfirm title="确定要撤销这个运动员吗?" onConfirm={() => this.cancelAthletes(record.user_id)}>
            <Button size="small" style={{fontSize: '12px'}}>撤销审核</Button>
          </Popconfirm>
          :
          <Button type="primary" size="small" style={{fontSize: '12px'}}
                  onClick={() => this.passAthletes(record.user_id)}>审核通过</Button>
      ),
    }];
    const {athletesList} = this.props;
    const pagination = {
      total: athletesList.total,
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
          rowKey={record => record.user_id}
          columns={columns}
          dataSource={athletesList.list}
          pagination={pagination}/>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    athletesList: state.athletes.athletesList
  }
})(AthletesManage);


