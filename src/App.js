import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/navigation-bar/NavigationBar';
import CheckIn from './components/check-in/CheckIn';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/check-in/:type">
            <CheckIn />
          </Route>
          <Route path="*">
            Not found
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
