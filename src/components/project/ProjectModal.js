import React from 'react';
import {Modal, Input, Select} from 'antd';
import '../style.less'

const Option = Select.Option;

class ProjectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [
        {
          id: 1,
          txt: '男子项目'
        },
        {
          id: 2,
          txt: '女子项目'
        }
      ]
    }
  }

  render() {
    const { type } = this.props;
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
        <div className="input" style={{marginBottom: '20px'}}>
          <div className="title">项目名称</div>
          <Input value={this.props.project_name} onChange={(e) => this.props.onChange(e.target.value)}/>
        </div>
        <div className="input">
          <div className="title">项目类型</div>
          <Select style={{width: '100%'}}
                  value={type && parseInt(type)}
                  onChange={(value) => {
                    this.props.onSelectChange(value);
                  }}>
            {
              this.state.typeList.map((type) => {
                return <Option key={type.id} value={type.id}>{type.txt}</Option>
              })
            }
          </Select>
        </div>
      </Modal>
    )
  }
}

export default ProjectModal;


