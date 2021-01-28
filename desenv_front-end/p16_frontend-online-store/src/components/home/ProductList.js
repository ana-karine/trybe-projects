import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductList.css';
import cartIcon from '../../images/cart-icon.png';
import searchIcon from '../../images/search-icon.png';


class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
    };

    this.changeByTerm = this.changeByTerm.bind(this);
    this.searchByTerm = this.searchByTerm.bind(this);
  }

  changeByTerm(event) {
    const input = event.target;
    this.setState({ query: input.value });
  }

  searchByTerm() {
    const { query } = this.state;
    const { resultQuery } = this.props;
    resultQuery(query);
  }

  searchControl() {
    const { search, query, result, buy } = this.props;
    if (!search) {
      return (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    } else
    if ((search) && (result.results.length < 1)) {
      return (
        <div>
          <p>Nenhum produto foi encontrado</p>
        </div>
      );
    } else 
    if ((search) && (result.results.length >= 1)) {
      return (
        <div className="product-list">
          {result.results.map((prod) => (
            <ProductCard
              buy={ buy }
              query={ query }
              key={ prod.id }
              product={ prod }
            />
          ))}
        </div>
      );
    }
  }

  render() {
    const { query } = this.state;
    return (
      <div>
        <div className="container-search">
          <input
            data-testid="query-input"
            id="search-field"
            className="search-field"
            type="text"
            value={ query }
            onChange={ this.changeByTerm }
          />
          <button data-testid="query-button" type="button" onClick={ this.searchByTerm }>
            <img className="icon" src={ searchIcon } alt="Search Icon" />
          </button>
          <Link to="/cart">
            <button data-testid="shopping-cart-button" type="button" >
              <img className="cart-icon" src={ cartIcon } alt="Cart Icon" />
            </button>
          </Link>
        </div>
        <div className="container-product-list">
          {this.searchControl()}
        </div>
      </div>
    )
  }
}

ProductList.propTypes = {
  search: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
};

export default ProductList;



/*
class ProductList extends React.Component {
  render() {
    const { query, searchProduct, num } = this.props;
    if (searchProduct.results.length < 1) {
      return (
        <div>
          <p>Nenhum produto foi encontrado</p>
        </div>
      );
    }
    return (
      <div className="product-list">
        {searchProduct.results.map((prod) => (
          <ProductCard
            num={ num }
            query={ query }
            key={ prod.id }
            product={ prod }
          />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  query: PropTypes.string.isRequired,
  searchProduct: PropTypes.objectOf(PropTypes.array).isRequired,
  num: PropTypes.number.isRequired,
};

export default ProductList;
*/


