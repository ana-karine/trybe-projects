import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cartIcon from '../../images/cart-icon.png';
import './SumCart.css';

class SumCart extends React.Component {
  render() {
    const { sum } = this.props;
    return (
      <div className="sum">
        <div>
        <Link to="/cart">
          <img
            data-testid="shopping-cart-button"
            src={ cartIcon }
            className="cartIcon"
            alt="Cart Icon"
          />
        </Link>
        </div>
        <div>
          <p data-testid="shopping-cart-size">{sum}</p>
        </div>
      </div>
    );
  }
}

SumCart.propTypes = {
  sum: PropTypes.number.isRequired,
};

export default SumCart;
