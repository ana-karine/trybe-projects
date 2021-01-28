import React from 'react';
import PropTypes from 'prop-types';

class CategoryList extends React.Component {
  render() {
    const { check, categories } = this.props;
    return (
      <div className="category-list">
        {categories.map(({ id, name }) => (
          <div key={ id }>
            <label htmlFor={ id }>
              <input
                data-testid="category"
                type="radio"
                name="categories"
                onChange={ () => check(id) }
              />
                { name }
            </label>
          </div>
        ))}
    </div>

    );
  }
}

CategoryList.propTypes = {
  check: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoryList;
