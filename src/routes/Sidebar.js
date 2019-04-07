import React from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Router, Route ,Link} from 'dva/router';

const SubMenu = Menu.SubMenu;
class Sidebar extends React.Component {
  state = {
    theme: 'dark',
    current: '',
    }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Menu
        theme={this.state.theme}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <Menu.Item key="collegeManage"><Link to="/collegeManage"><Icon type="home" /><span>院系管理</span></Link></Menu.Item>
        <Menu.Item key="professionManage"><Link to="/professionManage"><Icon type="book" /><span>专业管理</span></Link></Menu.Item>
        <Menu.Item key="classManage"><Link to="/classManage"><Icon type="team" /><span>班级管理</span></Link></Menu.Item>
        {/*<SubMenu key="personnelInfo" title={<span><Icon type="solution" /><span>人员信息管理</span></span>}>*/}
          {/*<Menu.Item key="competitorInfo"><Link to="/competitorInfo" >参赛人员信息</Link></Menu.Item>*/}
          {/*<Menu.Item key="refereeInfo" ><Link to="/refereeInfo">裁判信息</Link></Menu.Item>*/}
          {/*<Menu.Item key="managerInfo"><Link to="/managerInfo">体育部管理员信息</Link></Menu.Item>*/}
        {/*</SubMenu>*/}
        {/*<SubMenu key="sportsEvent" title={<span><Icon type="flag" /><span>比赛项目管理</span></span>}>*/}
          {/*<Menu.Item key="menRace"><Link to="/menRace">男子竞赛项目</Link></Menu.Item>*/}
          {/*<Menu.Item key="womenRace"><Link to="/womenRace">女子竞赛项目</Link></Menu.Item>*/}
        {/*</SubMenu>*/}
        {/*<Menu.Item key="gradeManage"><Link to="/gradeManage"><Icon type="book" /><span>成绩管理</span></Link></Menu.Item>*/}
        {/*<Menu.Item key="registration"><Link to="/registration"><Icon type="form" /><span>在线报名</span></Link></Menu.Item>*/}
        {/*<Menu.Item key="infoStatistics"><Link to="/infoStatistics"><Icon type="pie-chart" /><span>信息统计</span></Link></Menu.Item>*/}
      </Menu>
    );
  }
}

export default Sidebar;

