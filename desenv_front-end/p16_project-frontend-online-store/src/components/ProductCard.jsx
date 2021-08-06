import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { number } from 'prop-types';

import './css/ProductCard.css';

class ProductCard extends React.Component {
  render() {
    const { product, localStorageAddItem } = this.props;
    // console.log('Info Product', product);
    const {
      thumbnail,
      price,
      title,
      id,
      category_id: categoryId,
      available_quantity: availableQuantity,
      shipping: { free_shipping: freeShipping },
    } = product;

    return (
      <div className="container-product-card" data-testid="product">
        <div>
          <img src={ thumbnail } className="img-product-card" alt="product" />
        </div>
        <div>
          <p>{ `R$ ${price}` }</p>
        </div>
        <div className="card-title">
          <h4>{ title }</h4>
        </div>
        <div>
          <Link
            to={ `product/${categoryId}/${id}` }
            className="card-detail"
            data-testid="product-detail-link"
          >
            Ver Detalhes
          </Link>
        </div>
        <div>
          <button
            type="button"
            className="card-btn"
            data-available-quantity={ availableQuantity }
            data-id={ id }
            data-price={ price }
            data-thumbnail={ thumbnail }
            data-title={ title }
            data-testid="product-add-to-cart"
            onClick={ (event) => localStorageAddItem(event) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <div className="free-shipping">
          { freeShipping ? <p data-testid="free-shipping">Frete Grátis</p> : null }
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    availableQuantity: number,
    id: PropTypes.string,
    price: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
}.isRequired;

export default ProductCard;
