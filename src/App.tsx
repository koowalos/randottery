import React from 'react';
import './App.less';
import { Switch, Route, Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  Landing,
  Home,
  Join,
  JoinDetails,
  New,
  Lottery,
  Error404,
  SignIn,
  Register,
} from './Components/Pages';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <div className="custom-container">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ textAlign: 'right' }}
            >
              <Menu.Item key="1">
                <Link to="/signin">Sign in</Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content style={{ padding: '0 10px' }}>
          <div className="custom-container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/landing" component={Landing} />
              <Route exact path="/join" component={Join} />
              <Route exact path="/join/:id" component={JoinDetails} />
              <Route exact path="/new" component={New} />
              <Route path="/lottery/:id" component={Lottery} />
              <Route component={Error404} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <div className="custom-container">
            Ant Design ©2020 Created by Kowal & Kamil
          </div>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
