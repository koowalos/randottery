import React from 'react';
import './App.less';
import { Switch, Route, Router, Link } from 'react-router-dom';
import Landing from './Components/Pages/Landing';
import Home from './Components/Pages/Home';
import Join from './Components/Pages/Join';
import JoinDetails from './Components/Pages/JoinDetails';
import New from './Components/Pages/New';
import Lottery from './Components/Pages/Lottery';
import Error404 from './Components/Pages/Error404';
import SignIn from './Components/Pages/SignIn';
import history from './history';
import { Layout, Menu } from 'antd';
import Register from './Components/Pages/Register';

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
                <Router history={history}>
                  <Link to="/signin">Sign in</Link>
                </Router>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content style={{ padding: '0 10px' }}>
          <div className="custom-container">
            <Router history={history}>
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
            </Router>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <div className="custom-container">
            Ant Design ©2018 Created by Ant UED
          </div>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
