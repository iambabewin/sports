import React from 'react';
import {connect} from 'dva';
import styles from './IndexPage.css';
import Sidebar from './Sidebar';
import HeadTitle from '../components/HeadTitle';
import {Layout, Icon} from 'antd';
import {Router, Route, Link, Redirect} from 'dva/router';
import {Popover, Button} from 'antd';
import CollegeManage from '../components/college/CollegeManage';
import ProfessionManage from '../components/profession/ProfessionManage';
import ClassManage from '../components/class/ClassManage';
import YearManage from '../components/year/YearManage';
import ProjectManage from "../components/project/ProjectManage";
import AthletesManage from "../components/athletes/AthletesManage";
import JudgeManage from "../components/judge/JudgeManage";
import ManagerManage from "../components/manager/ManagerManage";
import AthletesSignUp from "../components/athletes/AthletesSignUp";
import ScoreManage from "../components/score/ScoreManage";
import ScoreQuery from "../components/score/ScoreQuery";
import Winners from "../components/Winners";
import UserInfo from "../components/user/UserInfo";
import ScoreAll from "../components/score/ScoreAll";

const {Header, Content, Footer, Sider} = Layout;

class IndexPage extends React.Component {
  state = {
    collapsed: false,
    visible: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({visible});
  }

  render() {
    const token = window.localStorage.getItem("token");
    const name = window.localStorage.getItem("name");
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}>
          <div className={styles['systemTitle']}></div>
          <Sidebar
            id={this.props.match.params.id}
          />
        </Sider>
        <Layout>
          <Header className={styles['heads']}>
            <div>
              <Icon
                className={styles['trigger']}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />学校运动会管理系统
            </div>
            <div style={{marginRight: '30px'}}>
              <Popover
                placement="bottomRight"
                content={
                  <div>
                    <Link to="/userInfo"><span style={{display: 'block', padding: '5px 0', color: '#666'}}><Icon
                      type="user"/> 个人信息 </span></Link>
                    <a style={{display: 'block', padding: '5px 0'}}
                       onClick={() => this.props.dispatch({type: 'user/logout', payload: {token: token}})}><Icon
                      type="export"/> 安全退出 </a>
                  </div>
                }
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
                <Button style={{border: 'none'}}>{name}</Button>
              </Popover>
            </div>
          </Header>
          <Content className={styles['content']}>
            <HeadTitle title={this.props.match.params.id}/>
            <div className={styles['bg']}></div>
            <Route path="/userInfo" component={UserInfo}/>
            <Route path="/collegeManage" component={CollegeManage}/>
            <Route path="/professionManage" component={ProfessionManage}/>
            <Route path="/classManage" component={ClassManage}/>
            <Route path="/year" component={YearManage}/>
            <Route path="/project" component={ProjectManage}/>
            <Route path="/athletesInfo" component={AthletesManage}/>
            <Route path="/register" component={ProjectManage}/>
            <Route path="/refereeInfo" component={JudgeManage}/>
            <Route path="/managerInfo" component={ManagerManage}/>
            <Route path="/registration" component={AthletesSignUp}/>
            <Route path="/scoreInput" component={ScoreManage}/>
            <Route path="/scoreQuery" component={ScoreQuery}/>
            <Route path="/scoreAll" component={ScoreAll}/>
            <Route path="/infoStatistics" component={Winners}/>
          </Content>
          <Footer className={styles['footer']}>
            copyright ©2019 ZhangZhonghang All Rights Reserved
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect()(IndexPage);
