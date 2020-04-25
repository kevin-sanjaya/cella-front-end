import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/navigation-bar/NavigationBar';
import CheckIn from './components/check-in/CheckIn';
import Trainers from './components/trainers/Trainers';
import Alert from './components/alert/Alert';
import notFoundSymbol from './assets/404.svg';

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
            <Alert alertSymbol={notFoundSymbol} alertText="Mohon maaf, halaman ini tidak dapat ditemukan." />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
