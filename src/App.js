import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/navigation-bar/NavigationBar';
import CheckIn from './components/check-in/CheckIn';
import Trainers from './components/trainers/Trainers';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/check-in/:param">
            <CheckIn />
          </Route>
          <Route path="/trainers/:param">
            <Trainers />
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
