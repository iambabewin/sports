import React from 'react';
import {Input, Menu, Dropdown, Button, Icon, message} from 'antd';
import styles from './HeadTitle.css';

class HeadTitle extends React.Component {

  render() {
    const NAMES = {
      departmentManage: '院系管理',
      competitorInfo: '参赛人员信息',
      refereeInfo: '裁判信息',
      managerInfo: '体育部管理员信息',
      menRace: '男子竞赛项目',
      womenRace: '女子竞赛项目',
      gradeManage: '成绩管理',
      registration: '在线报名',
      infoStatistics: '信息统计'
    }
    return (
      <div>
        <h2 className={styles['title']}>{NAMES[this.props.title]}</h2>
      </div>
    );
  }
}

export default HeadTitle;
