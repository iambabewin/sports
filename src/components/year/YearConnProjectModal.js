import React from 'react';
import {Modal, Input} from 'antd/lib';
import '../style.less'
import {connect} from "dva";
import {Select} from 'antd/lib';

const Option = Select.Option;
const token = window.localStorage.getItem("token");

class YearConnProjectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'project/GetAllProject',
      payload: {
        token: token
      }
    })
  }

  render() {
    return (
      <Modal
        className="modal"
        width={500}
        mask={true}
        title="关联比赛项目"
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <div className="input">
          <div className="title">比赛项目</div>
          <Select mode="multiple"
                  style={{width: '100%'}}
                  value={this.props.project_id}
                  onChange={(value) => {
                    this.props.onSelectChange(value);
                  }}
                  onDeselect={(value) => {
                    this.props.onDeselect(value);
                  }}>
            {
              this.props.allProjectList.map((project) => {
                return <Option key={project.project_id} value={project.project_id}>{project.project_name}</Option>
              })
            }
          </Select>
        </div>
      </Modal>
    )
  }
}

export default connect((state) => {
  return {
    allProjectList: state.project.allProjectList
  }
})(YearConnProjectModal);


