import React from 'react';
import PropTypes from 'prop-types';
import ProductList from './ProductList';

class SearchControl extends React.Component {
  searchControl() {
    const { search, query, result, sum } = this.props;
    if (!search) {
      return (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    }
    return (
      <ProductList num={ sum } query={ query } searchProduct={ result } />
    );
  }

  render() {
    return (
      <div>
        {this.searchControl()}
      </div>
    );
  }
}

SearchControl.propTypes = {
  search: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
};

export default SearchControl;
