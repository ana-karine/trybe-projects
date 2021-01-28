import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ProductDetails.css';
import FreeShipping from '../components/home/FreeShipping';
import returnIcon from '../images/return.png';
import cartIcon from '../images/cart-icon.png';
//import ProductEvaluation from '../components/productDetails/ProductEvaluation';
//import SumCart from '../components/home/SumCart';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const {
      location: {
        details: {
          product: { id, title, price, thumbnail },
        },
      },
    } = this.props;
    const item = { id, title, thumbnail, price };
    if (!localStorage.cart) {
      localStorage.setItem('cart', JSON.stringify([item]));
    } else {
      const itemsInStorage = JSON.parse(localStorage.getItem('cart'));
      itemsInStorage.push(item);
      localStorage.setItem('cart', JSON.stringify(itemsInStorage));
    }
  }

  productDetails() {
    const {
      location: {
        details: {
          product: {
            id,
            title,
            thumbnail,
            price,
            shipping,
            attributes,
          },
        },
      },
    } = this.props;

    return (
      <div className="container">
        <div className="detail-name">
          <h1 data-testid="product-detail-name">{title}</h1>
        </div>
        <div className="detail-image">
          <img src={ thumbnail } alt="Product Image" />
        </div>
        <div className="detail-price">
          <h2>{`R$ ${Number(price).toFixed(2)}`}</h2>
        </div>
        <div className="detail-shipping">
          <FreeShipping shipping={ shipping.free_shipping } />
        </div>
        <div className="detail-specifications">
          <h3>Especificações Técnicas</h3>
          <div key={ id }>
            {attributes.map(({ name, value_name }) => (
              <div key={ name }>
                <div><strong>{ name }: </strong>{ value_name }</div>
              </div>
            ))};
          </div>
        </div>
    </div>
    )
}    
/*
  addToCart() {
    const {
      location: {
        details: {
          product: { id, title, price, thumbnail },
        },
      },
    } = this.props;
    const productInfo = { id, title, price, thumbnail };
    if (!localStorage.cart) {
      localStorage.setItem('cart', JSON.stringify([productInfo]));
    } else {
      const itemsInStorage = JSON.parse(localStorage.getItem('cart'));
      itemsInStorage.push(productInfo);
      localStorage.setItem('cart', JSON.stringify(itemsInStorage));
    }
  }
*/
  render() {
    return (
      <div>
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

        
        {/*<SumCart />*/}
        <div>
          {this.productDetails()}
          <div className="product-details-contents">
          </div>
          {/*<ProductEvaluation />*/}
          <div className="btn">
          <Link to="/cart">
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ this.addToCart }
            >
              Adicionar ao Carrinho
            </button>
          </Link>
        </div>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    details: PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        shipping: PropTypes.object.isRequired,
        attributes: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
