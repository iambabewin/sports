import React from 'react';
import './style.less';

class HeadTitle extends React.Component {

  render() {
    const NAMES = {
      collegeManage: '院系管理',
      professionManage: '专业管理',
      classManage: '班级管理',
      year: '历届管理',
      project: '比赛项目管理'
      // competitorInfo: '参赛人员信息',
      // refereeInfo: '裁判信息',
      // managerInfo: '体育部管理员信息',
      // menRace: '男子竞赛项目',
      // womenRace: '女子竞赛项目',
      // gradeManage: '成绩管理',
      // registration: '在线报名',
      // infoStatistics: '信息统计'
    }
    return (
      <div>
        <h2 className="header-title">{NAMES[this.props.title]}</h2>
      </div>
    );
  }
}

export default HeadTitle;
