import React from 'react';
import {Modal, Table} from 'antd';
import '../style.less'

class JoinListModal extends React.Component {
  render() {
    return (
      <Modal
        className="modal"
        width={800}
        mask={true}
        title="运动员名单"
        visible={this.props.visible}
        footer={null}
      >
        <Table />
      </Modal>
    )
  }
}

export default JoinListModal;


