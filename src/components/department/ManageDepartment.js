import React from 'react';
import {connect} from 'dva';
import '../style.less';
import { Table, Divider, Tag } from 'antd';


class ManageDepartment extends React.Component {
  render() {
    const columns = [{
      title: '院系编号',
      dataIndex: 'college_id',
      key: 'college_id',
    }, {
      title: '院系名',
      dataIndex: 'college_name',
      key: 'college_name',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
      <a href="javascript:;">编辑</a>
      <Divider type="vertical" />
      <a href="javascript:;">删除</a>
    </span>
      ),
    }];

    const data = [{
      college_id: '1',
      college_name: '粤台产业科技学院',
    }, {
      college_id: '2',
      college_name: '国际学院',
    }, {
      college_id: '3',
      college_name: '计算机科学与技术学院',
    }];
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default connect((state) => {
  return {}
})(ManageDepartment);


