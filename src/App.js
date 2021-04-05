import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Calender, About, Trending, Help, Login } from './Pages';

import Footer from './Layout/Footer.jsx';

import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
      <Router >
        <Route render={({location}) =>(
          <TransitionGroup>
            <CSSTransition 
            timeout={300} 
            classNames={'fade'} 
            key={location.key}
            >
              <Switch location={location} >
                <Route path='/Trending' component={Trending} />
                <Route path='/Calender' component={Calender} />
                <Route path='/' component={Login} />
                <Route path='/Help' component={Help} />
                <Route path='/About' component={About} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          )}/>
        </Router>
    </>
  );
}

export default App;
