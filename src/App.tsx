import React, { useContext } from 'react';
import './App.less';
import { Switch, Route, Link,Redirect } from 'react-router-dom';

import { Layout, Menu, Button } from 'antd';
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
import { UserContext } from './Providers/UserProvider';
import { signOut } from './firebase';

const { Header, Content, Footer } = Layout;

function App() {
  const userData: any = useContext(UserContext);


  if (userData.loading){
    return <div>Loading...</div>;
  } 

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <div className="custom-container">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ textAlign: 'right' }}
            >
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                {userData.user ? (
                  <Button
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign Out {userData.user.email}
                  </Button>
                ) : (
                  <Link to="/signin">Sign in</Link>
                )}
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content style={{ padding: '0 10px' }}>
          <div className="custom-container">
            <Switch>
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/landing" component={Landing} />
              {userData.user ? (
                <>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/join" component={Join} />
                  <Route exact path="/join/:id" component={JoinDetails} />
                  <Route exact path="/new" component={New} />
                  <Route path="/lottery/:id" component={Lottery} />
                </>
              ) : (
                <Redirect to="/signin" />
              )}

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
