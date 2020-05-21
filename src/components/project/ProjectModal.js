import React from 'react';
import {Modal, Input, Select} from 'antd/lib';
import '../style.less'

const Option = Select.Option;
const { TextArea } = Input;

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
    const {type} = this.props;
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
          <Input value={this.props.project_name} onChange={(e) => this.props.onNameChange(e.target.value)}/>
        </div>
        <div className="input" style={{marginBottom: '20px'}}>
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
        <div className="input">
          <div className="title">比赛规则</div>
          <TextArea rows={5}  value={this.props.rule} onChange={(e) => this.props.onRuleChange(e.target.value)}/>
        </div>
      </Modal>
    )
  }
}

export default ProjectModal;


