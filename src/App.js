import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './navigation-bar/NavigationBar';
import Warehouse from './warehouse/Warehouse';
import Transport from './transport/Transport';
import Transaction from './transaction/Transaction';
import Employee from './employee/Employee';
import Order from './order/Order';
import Invoice from './invoice/Invoice';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/warehouse">
            <Warehouse />
          </Route>
          <Route path="/transport">
            <Transport />
          </Route>
          <Route path="/transaction">
            <Transaction />
          </Route>
          <Route path="/employee">
            <Employee />
          </Route>
          <Route path="/order">
            <Order />
          </Route>
          <Route path="/invoice">
            <Invoice />
          </Route>
          <Route path="/">
            <Warehouse />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
