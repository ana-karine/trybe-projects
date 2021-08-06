import React from 'react';
import PropTypes from 'prop-types';

import './css/CategoriesList.css';

class CategoriesList extends React.Component {
  render() {
    const { allCategories, handleCategorie } = this.props;
    // console.log('allCategories', allCategories);

    return (
      <div className="categories-list">
        <p>Categorias</p>
        {
          allCategories.map(({ id, name }) => (
            <div key={ id }>
              <label htmlFor={ name }>
                <input
                  type="radio"
                  name="categorieID"
                  category-id={ id }
                  onClick={ handleCategorie }
                  data-testid="category"
                />
                { name }
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

CategoriesList.propTypes = {
  allCategories: PropTypes.array,
  handleCategorie: PropTypes.func,
}.isRequired;

export default CategoriesList;
