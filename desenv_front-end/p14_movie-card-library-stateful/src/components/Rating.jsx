import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    const { rating } = this.props;
    return (
      <div className="movie-card-rating" data-testid="rating">
        <span className="rating">{rating}</span>
      </div>
    );
  }
}

// https://github.com/tryber/sd-07-project-movie-cards-library/pull/16/files
Rating.propTypes = { rating: PropTypes.number };
Rating.defaultProps = { rating: 0 };

export default Rating;
