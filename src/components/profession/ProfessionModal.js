import React from 'react';
import {connect} from 'dva';
import {Modal, Input, Select} from 'antd';
import '../style.less'

const Option = Select.Option;
class ProfessionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'college/GetAllCollege'
    })
  }

  render() {
    const { college_id } = this.props;
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
          <div className="title">所属院系</div>
          <Select style={{width: '100%'}}
                  value={college_id && parseInt(college_id)}
                  onChange={(value) => {
                    this.props.onSelectChange(value);
                  }}>
            {
              this.props.allCollegeList.map((college) => {
                return <Option key={college.college_id} value={college.college_id}>{college.college_name}</Option>
              })
            }
          </Select>
        </div>
        <div className="input">
          <div className="title">专业名称</div>
          <Input value={this.props.profession_name} onChange={(e) => this.props.onChange(e.target.value)}/>
        </div>
      </Modal>
    )
  }
}

export default connect((state) => {
  return {
    allCollegeList: state.college.allCollegeList
  }
})(ProfessionModal);


