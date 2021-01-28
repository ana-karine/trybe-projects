import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AddProductToCart.css';

class AddProductToCart extends React.Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
      totalQuantity: 1,
    };

    this.changeTotal = this.changeTotal.bind(this);
  }

  changeTotal(value) {
    this.setState((state) => ({ totalPrice: state.totalPrice + value }));
  }

  render() {
    const { products, handleClick } = this.props;
    const { totalPrice, totalQuantity } = this.state;

    return (
      <div>
        {products.map((item) => (
          <div className="products-cart" key={ item.title }>
            <button
              type="button"
              className="remove-item"
              onClick={ () => handleClick(item) }
            >
             X
            </button>
            <img
              className="product-image"
              src={ item.thumbnail }
              alt="Product Image"
            />
            <span
              data-testid="shopping-cart-product-name"
              className="product-name"
            >
              { item.title }
            </span>
            <button
              type="button"
              className="decrease-item"
              onClick={ () => handleClick(item) }
            >
             -
            </button>
            <span
              className="product-quantity"
              data-testid="shopping-cart-product-quantity">
              { totalQuantity }
            </span>
            <button
              type="button"
              className="increase-item"
              onClick={ () => handleClick(item) }
            >
             +
            </button>
            <span
              className="product-price"
            >
              R$ { item.price.toFixed(2) }
            </span>
          </div>
        ))}

        <div>
          <span className="total-price">
            Valor Total da Compra: R$ { totalPrice.toFixed(2) }
          </span>
        </div>

        <div className="checkout">
        <Link to="/checkout" data-testid="checkout-products">
          <button type="button" onClick={ this.handleLocalStorage }>
            Finalizar Compra
          </button>
        </Link>
        </div>
      </div>
    );
  }
}

AddProductToCart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  //handleClick: PropTypes.func.isRequired,
};

export default AddProductToCart;
