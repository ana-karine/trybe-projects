import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

class MovieList extends React.Component {
  render() {
    const { movies } = this.props;

    return (
      <div data-testid="movie-list" className="movie-list">
        {movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}
      </div>
    );
  }
}

// https://github.com/tryber/sd-07-project-movie-cards-library/pull/16/files
const aux = PropTypes.shape({ title: PropTypes.string });
MovieList.propTypes = { movies: PropTypes.arrayOf(aux).isRequired };

export default MovieList;
