import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchBar from '../images/search-bar.png';
import shoppingCart from '../images/cart-icon.png';

import './css/SearchBar.css';

class SearchBar extends React.Component {
  render() {
    const { inputText, onClick, cartQuantity } = this.props;

    return (
      <div>
        <div className="container-search-bar">
          <input
            type="text"
            className="input-search-bar"
            placeholder="Buscar..."
            onChange={ inputText }
            data-testid="query-input"
          />
          <button
            type="button"
            className="btn-search-bar"
            onClick={ onClick }
            data-testid="query-button"
          >
            <img src={ searchBar } className="icon" alt="Search Bar Icon" />
          </button>
        </div>
        <div className="container-cart-icon">
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            <img src={ shoppingCart } className="icon-two" alt="Shopping Cart Icon" />
          </Link>
        </div>
        <div className="container-cart-size">
          <span data-testid="shopping-cart-size">{ cartQuantity }</span>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  inputText: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  cartQuantity: PropTypes.number.isRequired,
};

export default SearchBar;
