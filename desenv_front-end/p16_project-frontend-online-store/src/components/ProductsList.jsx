import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

import './css/ProductsList.css';

class ProductsList extends React.Component {
  searchControl() {
    const {
      products,
      initialMessage,
      msgProductNotFound,
      localStorageAddItem } = this.props;

    if (initialMessage) {
      return (
        <div>
          <p
            className="home-initial-message"
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
      );
    }

    return (
      <div className="container-product-list">
        { msgProductNotFound
          ? <p>Nenhum produto foi encontrado</p>
          : products.map((product) => (
            <ProductCard
              key={ product.id }
              product={ product }
              localStorageAddItem={ localStorageAddItem }
            />
          ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.searchControl() }
      </div>
    );
  }
}

ProductsList.propTypes = {
  product: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default ProductsList;
