import React from 'react';
import { Link } from 'react-router-dom';
import returnIcon from '../images/return.png';
import cartIcon from '../images/cart-icon.png';
import './Cart.css';
import AddProductToCart from '../components/cart/AddProductToCart';

class Cart extends React.Component {
  constructor() {
    super();
    // https://stackoverflow.com/questions/55328748/how-to-store-and-retrieve-shopping-cart-items-in-localstorage
    this.state = {
      items: JSON.parse(localStorage.getItem('cart')),
    };

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem() {

  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <div className="container-header">
          <div>
            <Link to="/">
              <img className="return-icon" src={ returnIcon } alt="Return Icon" />
            </Link>
          </div>
          <div>
            <button data-testid="shopping-cart-button" type="button" >
              <img className="cart-icon" src={ cartIcon } alt="Cart Icon" />
            </button>
          </div>
        </div>
        <span className="empty-message" data-testid="shopping-cart-empty-message">
          {items < 1 ? 'Seu carrinho está vazio' : <AddProductToCart products={ items } />}
        </span>
      </div>
    );
  }
}

export default Cart;

/*
class Cart extends React.Component {
  constructor() {
    super();
    // https://stackoverflow.com/questions/55328748/how-to-store-and-retrieve-shopping-cart-items-in-localstorage
    this.state = { items: JSON.parse(localStorage.getItem('cart')) };
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem() {

  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <header>
          <Link to="/">
            <img src={ returnIcon } className="return-button" alt="Return Button" />
          </Link>
        </header>
        <div className="cart-icon-name">
          <img
            data-testid="shopping-cart-button"
            src={ cartIcon }
            className="cart-icon"
            alt="Icon of a Cart"
          />
          <h3>Carrinho de Compras</h3>
          <p data-testid="shopping-cart-empty-message">
            {items < 1 ? 'Seu carrinho está vazio' : <ProductInCart products={ items } />}
          </p>
        </div>
      </div>
    );
  }
}

export default Cart;
*/