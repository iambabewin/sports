import React from 'react';
import {connect} from 'dva';
import '../style.less';
import {Table, Divider, Button, Popconfirm} from 'antd';
import ProfessionModal from './ProfessionModal';

const limit = 6;
const token = window.localStorage.getItem("token");

class ProfessionManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingList: true,
      addVisible:false
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

  showAddModal = () => {
    this.setState({
      addVisible: true
    });
  };
  addProfession = () => {
    this.props.dispatch({
      type: 'profession/AddProfession',
      payload: {
        token: token,
        profession_name: this.state.profession_name,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.getProfession();
      }
    })
  };
  handleCancel = () => {
    this.setState({
      addVisible: false
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
          <a className="editBtn">编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title="确定要删除这个专业吗?">
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

        <ProfessionModal
          onChange={(v) => this.setState({college_name: v})}
          title="新增专业"
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


