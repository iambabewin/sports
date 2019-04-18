import React from 'react';
import {Menu, Icon, Switch} from 'antd';
import {Router, Route, Link} from 'dva/router';

const SubMenu = Menu.SubMenu;
const role = window.localStorage.getItem('role');
console.log(role);

class Sidebar extends React.Component {
  state = {
    theme: 'dark',
  }

  render() {
    return (
      <Menu
        theme={this.state.theme}
        selectedKeys={[this.props.id]}
        mode="inline"
      >
        {role == 1 && (<Menu.Item key="collegeManage"><Link to="/collegeManage">
            <Icon type="home"/><span>院系管理</span></Link></Menu.Item>
        )}
        {(role == 1 || role == 2) && (<Menu.Item key="professionManage"><Link to="/professionManage">
            <Icon type="book"/><span>专业管理</span></Link></Menu.Item>
        )}
        {(role == 1 || role == 2) && (<Menu.Item key="classManage"><Link to="/classManage">
            <Icon type="team"/><span>班级管理</span></Link></Menu.Item>
        )}
        {role == 1 && (<SubMenu key="sportsEvent" title={<span><Icon type="flag"/><span>运动会管理</span></span>}>
            <Menu.Item key="year"><Link to="/year">历届管理</Link></Menu.Item>
            <Menu.Item key="project"><Link to="/project">比赛项目管理</Link></Menu.Item>
          </SubMenu>
        )}
        {role != 4 && (<SubMenu key="personnelInfo" title={<span><Icon type="solution"/><span>人员信息管理</span></span>}>
            <Menu.Item key="athletesInfo"><Link to="/athletesInfo">运动员信息</Link></Menu.Item>
            {role == 1 && (<Menu.Item key="refereeInfo"><Link to="/refereeInfo">裁判信息</Link></Menu.Item>)}
            {role == 1 && (<Menu.Item key="managerInfo"><Link to="/managerInfo">体育部管理员信息</Link></Menu.Item>)}
          </SubMenu>
        )}

        <SubMenu key="gradeManage" title={<span><Icon type="line-chart"/><span>成绩管理</span></span>}>
          {(role == 1 || role == 3) && (<Menu.Item key="scoreInput"><Link to="/scoreInput">成绩录入</Link></Menu.Item>)}
          <Menu.Item key="scoreQuery"><Link to="/scoreQuery">成绩查询</Link></Menu.Item>
        </SubMenu>
        {role == 4 && (<Menu.Item key="registration"><Link to="/registration">
          <Icon type="form"/><span>在线报名</span></Link></Menu.Item>)}
        <Menu.Item key="infoStatistics"><Link to="/infoStatistics"><Icon type="pie-chart"/><span>信息统计</span></Link></Menu.Item>
      </Menu>
    );
  }
}

export default Sidebar;

