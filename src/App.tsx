import React from 'react';
import './App.less';
import { Switch, Route, Router } from 'react-router-dom';
import Landing from './Components/Pages/Landing';
import Home from './Components/Pages/Home';
import Join from './Components/Pages/Join';
import JoinDetails from './Components/Pages/JoinDetails';
import New from './Components/Pages/New';
import Lottery from './Components/Pages/Lottery';
import Error404 from './Components/Pages/Error404';
import history from './history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/join/:id" component={JoinDetails} />
          <Route exact path="/new" component={New} />
          <Route path="/lottery/:id" component={Lottery} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
