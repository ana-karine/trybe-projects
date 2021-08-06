import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

function App() {
  const localStorageProducts = JSON.parse(localStorage.getItem('productsList'));

  if (!localStorageProducts) {
    localStorage.setItem('productsList', JSON.stringify([]));
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/product/:category_id/:id" component={ ProductDetails } />
        <Route path="/shopping-cart" component={ ShoppingCart } />
        <Route path="/checkout" component={ Checkout } />
        <Route component={ NotFound } />
      </Switch>
    </Router>
  );
}

export default App;
