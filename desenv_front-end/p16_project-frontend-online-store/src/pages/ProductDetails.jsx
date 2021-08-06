import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Return from '../images/return.png';
import shoppingCart from '../images/cart-icon.png';
import Evaluation from '../components/Evaluation';

import './css/ProductDetails.css';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.localStorageAddItem = this.localStorageAddItem.bind(this);
    this.fetchProductDetail = this.fetchProductDetail.bind(this);

    this.state = {
      productDetails: [],
      freeShipping: false,
      storage: JSON.parse(localStorage.getItem('productsList')),
    };
  }

  componentDidMount() {
    this.fetchProductDetail();
  }

  // https://github.com/tryber/sd-07-project-frontend-online-store/blob/main-group-3/src/pages/Home.jsx
  localStorageAddItem({ target }) {
    const firstIndexInArray = 0;
    const twoDecimalPlaces = 2;

    const availableQuantity = (
      // https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter
      parseInt(target.getAttribute('data-available-quantity'), 10)
    );
    const id = target.getAttribute('data-id');
    let price = (
      parseFloat(target.getAttribute('data-price'))).toFixed(twoDecimalPlaces);
    const thumbnail = target.getAttribute('data-thumbnail');
    const title = target.getAttribute('data-title');

    const products = JSON.parse(localStorage.getItem('productsList'));
    const findIndexInArray = products.findIndex((product) => product.id === id);

    if (findIndexInArray >= firstIndexInArray) {
      products[findIndexInArray].quantity += 1;
      price *= products[findIndexInArray].quantity;
      products[findIndexInArray].price = price;
      localStorage.setItem('productsList', JSON.stringify([...products]));
      this.setState({
        storage: JSON.parse(localStorage.getItem('productsList')),
      });
    } else {
      const quantity = 1;
      localStorage.setItem('productsList', JSON.stringify(
        [...products, { availableQuantity, id, price, quantity, thumbnail, title }],
      ));
      this.setState({
        storage: JSON.parse(localStorage.getItem('productsList')),
      });
    }
  }

  async fetchProductDetail() {
    const { match } = this.props;
    // console.log('match', match);
    const { params } = match;
    // console.log('params', params);
    const { id, category_id: categoryId } = params;

    const reqProductDetails = await getProductsFromCategoryAndQuery(categoryId, '');
    // console.log('reqProductDetails', reqProductDetails);
    const detailsProduct = reqProductDetails.results.find((product) => product.id === id);
    // console.log('detailsProduct', detailsProduct);
    const { shipping: { free_shipping: shippingFree } } = detailsProduct;

    if (shippingFree) {
      this.setState({
        productDetails: detailsProduct,
        freeShipping: true,
      });
    } else {
      this.setState({
        productDetails: detailsProduct,
        freeShipping: false,
      });
    }
  }

  render() {
    const { productDetails, freeShipping, storage } = this.state;
    const {
      available_quantity: availableQuantity,
      id,
      price,
      thumbnail,
      title } = productDetails;

    const emptyCart = 0;
    const productQuantity = storage.map((product) => product.quantity)
      .reduce((acc, nextValue) => acc + nextValue, emptyCart);
    const cartQuantity = (storage) ? productQuantity : emptyCart;

    return (
      <div>
        <div className="header-product-details">
          <div className="divIcons">
            <Link to="/">
              <img className="returnIcon" src={ Return } alt="Return Icon" />
            </Link>
          </div>
          <div className="divIcons">
            <Link to="/shopping-cart" data-testid="shopping-cart-button">
              <img className="cartIcon" src={ shoppingCart } alt="Shopping Cart Icon" />
            </Link>
          </div>
          <div className="divIcons">
            <p data-testid="shopping-cart-size">
              { cartQuantity }
            </p>
          </div>
        </div>
        <div>
          <img className="size-photo" alt="Product" src={ thumbnail } />
          <div className="product-details-name-price">
            <h1 data-testid="product-detail-name">{`Nome do Produto: ${title}`}</h1>
            <h2>{`Preço: R$ ${price}`}</h2>
            <h3>{`Quatidade Disponível: ${availableQuantity}`}</h3>
            { freeShipping ? <p data-testid="free-shipping">Frete Grátis</p> : null }
            <button
              type="button"
              className="card-btn"
              data-available-quantity={ availableQuantity }
              data-id={ id }
              data-price={ price }
              data-thumbnail={ thumbnail }
              data-title={ title }
              data-testid="product-detail-add-to-cart"
              onClick={ this.localStorageAddItem }
            >
              Adicionar ao carrinho
            </button>
          </div>
          <Evaluation id={ id } />
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      category_id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
