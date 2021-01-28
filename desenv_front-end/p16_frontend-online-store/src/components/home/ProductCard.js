import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FreeShipping from './FreeShipping';
import './ProductCard.css';

class ProductCard extends React.Component {
  constructor() {
    super();

   this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const { product } = this.props;
    const { id, title, thumbnail, price } = product;
    const item = { id, title, thumbnail, price };
    if (!localStorage.cart) {
      localStorage.setItem('cart', JSON.stringify([item]));
    } else {
      const itemsInStorage = JSON.parse(localStorage.getItem('cart'));
      itemsInStorage.push(item);
      localStorage.setItem('cart', JSON.stringify(itemsInStorage));
    }
  }

  render() {
    const { product } = this.props;
    const { id, title, thumbnail, price, shipping } = product;
    return (
      <div data-testid="product" className="product-card">
        <div className="title">
          <span>{ title }</span>
        </div>
        <div className="image">
          <img src={ thumbnail } alt="Product Image" />
        </div>
        <div className="price">
          <span>{`R$ ${price.toFixed(2)}`}</span>
        </div>
        <div className="product-detail">
          <Link
            data-testid="product-detail-link"
            to={ {
              pathname: `/product/${id}`,
              details: { product },
            } }
          >
            Ver Detalhes
          </Link>
        </div>
        <div className="btn">
          <Link to="/cart">
            <button
              type="button"
              data-testid="product-add-to-cart"
              onClick={ this.addToCart }
            >
              Adicionar ao Carrinho
            </button>
          </Link>
        </div>
        <div className="shipping">
          <FreeShipping shipping={ shipping.free_shipping } />
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    shipping: PropTypes.object,
  }).isRequired,
};

export default ProductCard;
