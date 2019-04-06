import React from 'react';
import {connect} from 'dva';
import styles from './IndexPage.css';
import Sidebar from './Sidebar';
import HeadTitle from '../components/HeadTitle';
import {Layout, Menu, Icon} from 'antd';
import {Router, Route, Link, Redirect} from 'dva/router';
import {Popover, Button} from 'antd';
import ManageDepartment from '../components/department/ManageDepartment';


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
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}>
          <div className={styles['systemTitle']}></div>
          <Sidebar/>
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
                content={<a onClick={()=> this.props.dispatch({type: 'user/logout'})}>安全退出</a>}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
                <Button style={{border: 'none'}}>Win</Button>
              </Popover>
            </div>
          </Header>
          <Content className={styles['content']}>
            <HeadTitle title={this.props.match.params.id}/>
            <div className={styles['bg']}></div>
            <Route path="/departmentManage" component={ManageDepartment} />
          </Content>
          <Footer className={styles['footer']}>
            copyright ©2019 WIN All Rights Reserved
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect()(IndexPage);
