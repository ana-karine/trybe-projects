import React from 'react';
import { Link } from 'react-router-dom';
import Return from '../images/return.png';

import './css/ShoppingCart.css';

class ShoppingCart extends React.Component {
  constructor() {
    super();

    this.deleteProduct = this.deleteProduct.bind(this);
    this.increaseProduct = this.increaseProduct.bind(this);
    this.decreaseProduct = this.decreaseProduct.bind(this);

    this.state = {
      storage: JSON.parse(localStorage.getItem('productsList')),
    };
  }

  deleteProduct({ target }) {
    const newProductsList = [];
    const id = target.getAttribute('data-id');
    const products = JSON.parse(localStorage.getItem('productsList'));

    const findIndexInArray = products.findIndex((product) => product.id === id);

    products.forEach((product, index) => {
      if (findIndexInArray !== index) {
        newProductsList.push(product);
      }
    });

    localStorage.setItem('productsList', JSON.stringify(newProductsList));
    this.setState({
      storage: newProductsList,
    });
  }

  increaseProduct({ target }) {
    const id = target.getAttribute('data-id');
    const products = JSON.parse(localStorage.getItem('productsList'));
    const availableQuantity = target.getAttribute('data-available-quantity');

    const findIndexInArray = products.findIndex((product) => product.id === id);

    let price = (
      (
        parseFloat(
          target.getAttribute('data-price'),
        ) / parseInt(target.getAttribute('data-quantity'), 10)
      )
    );

    if ((products[findIndexInArray].quantity) < availableQuantity) {
      products[findIndexInArray].quantity += 1;
      price *= products[findIndexInArray].quantity;
      products[findIndexInArray].price = price;
      localStorage.setItem('productsList', JSON.stringify(products));
      this.setState({
        storage: JSON.parse(localStorage.getItem('productsList')),
      });
    }
  }

  decreaseProduct({ target }) {
    const id = target.getAttribute('data-id');
    const products = JSON.parse(localStorage.getItem('productsList'));

    const findIndexInArray = products.findIndex((product) => product.id === id);

    let price = (
      (
        parseFloat(
          target.getAttribute('data-price'),
        ) / parseInt(target.getAttribute('data-quantity'), 10)
      )
    );

    if (products[findIndexInArray].quantity > 1) {
      products[findIndexInArray].quantity -= 1;
      price *= products[findIndexInArray].quantity;
      products[findIndexInArray].price = price;
      localStorage.setItem('productsList', JSON.stringify(products));
      this.setState({
        storage: JSON.parse(localStorage.getItem('productsList')),
      });
    }
  }

  render() {
    const { storage } = this.state;

    const initialPrice = 0;
    const twoDecimalPlaces = 2;

    let totalPrice = storage.reduce(getTotal, initialPrice);
    function getTotal(totalPrice, item) {
      return totalPrice + parseFloat(item.price);
    }
    // console.log('totalPrice', totalPrice);

    if (!storage.length) {
      return (
        <div>
          <Link to="/">
            <img className="returnIcon" src={ Return } alt="Return Icon" />
          </Link>
          <p className="cart-empty-message" data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        </div>
      );
    }

    return (
      <div className="container-product-cart">
        <Link to="/">
          <img className="returnIcon" src={ Return } alt="Return Icon" />
        </Link>
        <div>
          { storage.map((product) => (
            <div className="product-add-cart" key={ `${product.id}` }>
              <div className="btn-delete-product">
                <button
                  data-id={ product.id }
                  type="button"
                  onClick={ this.deleteProduct }
                >
                  x
                </button>
              </div>
              <div className="div-img">
                <img
                  src={ product.thumbnail }
                  alt="Product Img"
                  className="img-product-cart"
                />
              </div>
              <div className="name-product-cart">
                <p
                  data-testid="shopping-cart-product-name"
                >
                  { product.title }
                </p>
              </div>
              <div className="container-btn">
                <div>
                  <button
                    data-id={ product.id }
                    data-price={ product.price }
                    data-quantity={ product.quantity }
                    data-available-quantity={ product.availableQuantity }
                    type="button"
                    onClick={ this.increaseProduct }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                </div>
                <div className="quantity-product-cart">
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    { product.quantity }
                  </p>
                </div>
                <div>
                  <button
                    data-id={ product.id }
                    data-price={ product.price }
                    data-quantity={ product.quantity }
                    type="button"
                    onClick={ this.decreaseProduct }
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </button>
                </div>
                <div className="btn-decreate-product">
                  <p className="prodPrice">
                    { parseFloat(product.price).toFixed(twoDecimalPlaces) }
                  </p>
                </div>
              </div>
            </div>))}
        </div>
        <div className="total-price">
          <h4>Resumo do pedido</h4>
          <p>Valor total (R$):</p>
          <p>{ totalPrice.toFixed(twoDecimalPlaces) }</p>
          <Link type="button" className="btn" to="/checkout" data-testid="checkout-products">
            Comprar
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
