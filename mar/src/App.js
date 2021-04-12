import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Calender, About, Trending, Help, Profile } from './Pages';
import MyContextProvider from './MyContext';
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
    <MyContextProvider>
      <Router >
        <Route render={({location}) =>(
          <TransitionGroup>
            <CSSTransition 
            timeout={300} 
            classNames={'fade'} 
            key={location.key}
            >
              <Switch location={location} >
                <Route  path='/Trending' component={Trending} />
                <Route  path='/Calender' component={Calender} />
                <Route  path='/Login' component={Profile} />
                <Route  path='/Help' component={Help} />
                <Route  path='/About' component={About} />
                <Route path='/' component={Profile}/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          )}/>
        </Router>
        </MyContextProvider>
    </>
  );
}

export default App;
