import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

class MovieList extends React.Component {
  render() {
    return (
      <div className="movie-list">
        {this.props.movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}
      </div>
    );
  }
}

// Auxílio: instrutor Thaydds
const aux = PropTypes.shape({ title: PropTypes.string });
MovieList.propTypes = { movies: PropTypes.arrayOf(aux).isRequired };

export default MovieList;
