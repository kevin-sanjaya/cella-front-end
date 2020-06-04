import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/navigation-bar/NavigationBar';
import CheckIn from './components/check-in/CheckIn';
import Trainers from './components/trainers/Trainers';
import Members from './components/members/Members';
import CCTV from './components/cctv/CCTV';
import EmergencyContact from './components/emergency-contact/EmergencyContact';
import Alert from './components/alert/Alert';
import notFoundSymbol from './assets/404.svg';

function App() {
  return (
    <div className="root">
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/check-in/:param">
            <CheckIn />
          </Route>
          <Route path="/trainers/:param">
            <Trainers />
          </Route>
          <Route path="/members/:param">
            <Members />
          </Route>
          <Route path="/security-cctv">
            <CCTV />
          </Route>
          <Route path="/emergency-contact">
            <EmergencyContact />
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
