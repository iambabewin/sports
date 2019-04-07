import React from 'react';
import {Modal, Input} from 'antd';
import '../style.less'

class CollegeModal extends React.Component {
  render() {
    return (
      <Modal
        className="modal"
        width={500}
        mask={true}
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <div className="input">
          <div className="title">院系名称</div>
          <Input value={this.props.college_name} onChange={(e) => this.props.onChange(e.target.value)}/>
        </div>
      </Modal>
    )
  }
}

export default CollegeModal;


