import React from 'react';
import {connect} from 'dva';
import {Modal, Input, Select} from 'antd';
import '../style.less'

const Option = Select.Option;
const token = window.localStorage.getItem("token");

class ClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'profession/GetAllProfession',
      payload: {
        token: token
      }
    })
  }

  render() {
    const {profession_id} = this.props;
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
          <div className="title">所属专业</div>
          <Select style={{width: '100%'}}
                  value={profession_id && parseInt(profession_id)}
                  onChange={(value) => {
                    this.props.onSelectChange(value);
                  }}>
            {
              this.props.allProfessionList.map((profession) => {
                return <Option key={profession.profession_id}
                               value={profession.profession_id}>{profession.profession_name}</Option>
              })
            }
          </Select>
        </div>
        <div className="input">
          <div className="title">班级名称</div>
          <Input value={this.props.class_name} onChange={(e) => this.props.onChange(e.target.value)}/>
        </div>
      </Modal>
    )
  }
}

export default connect((state) => {
  return {
    allProfessionList: state.profession.allProfessionList
  }
})(ClassModal);


