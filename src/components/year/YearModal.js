import React from 'react';
import {Modal, Input} from 'antd/lib';
import '../style.less'

class YearModal extends React.Component {
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
          <div className="title">届名称</div>
          <Input value={this.props.year_name} onChange={(e) => this.props.onChange(e.target.value)}/>
        </div>
      </Modal>
    )
  }
}

export default YearModal;


