import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
// import DataAnalysis from './pages/DataAnalysis';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ Cart } />
          <Route path="/product/:id" component={ ProductDetails } />
          {/* <Route path="/data" component={ DataAnalysis } /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
