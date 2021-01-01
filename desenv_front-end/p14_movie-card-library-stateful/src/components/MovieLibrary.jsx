/*
REFERÊNCIAS:
Lógica Principal: https://github.com/tryber/sd-05-block12-project-movie-card-library-stateful/pull/42
Lógicas Auxiliares:
(1) https://pt-br.reactjs.org/docs/forms.html
(2) https://pt-br.reactjs.org/docs/lifting-state-up.html
(3) https://github.com/tryber/sd-07-project-movie-cards-library/pull/16/files
*/

import React from 'react';
import PropTypes from 'prop-types';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends React.Component {
  constructor(props) {
    super(props);
    const { movies } = props; // retirar this no props dentro do constructor (Dica: Thaydds)
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies, // lista de filmes passados pela props movies
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleBookmarkedChange = this.handleBookmarkedChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.newMovie = this.newMovie.bind(this);
  }

  handleTextChange(event) {
    this.setState({ searchText: event.target.value });
  }

  handleBookmarkedChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value; // (1)
    this.setState({ bookmarkedOnly: value });
  }

  handleGenreChange(event) {
    this.setState({ selectedGenre: event.target.value });
  }

  filterMovies() {
    const { searchText, bookmarkedOnly, selectedGenre, movies } = this.state;

    if (searchText !== '') {
      return movies.filter((movie) =>
        movie.title.includes(searchText) ||
        movie.subtitle.includes(searchText) ||
        movie.storyline.includes(searchText));
    }
    if (bookmarkedOnly) {
      return movies.filter((movie) =>
        movie.bookmarked === bookmarkedOnly);
    }
    if (selectedGenre !== '') {
      return movies.filter((movie) =>
        movie.genre === selectedGenre);
    }

    return movies;
  }

  newMovie(add) {
    this.setState({ movies: [...this.state.movies, add] });
  }

  render() {
    return ( // (2)
      <div>
        <h2> My awesome movie library </h2>
        <SearchBar
          searchText={this.state.searchText}
          onSearchTextChange={this.handleTextChange}
          bookmarkedOnly={this.state.bookmarkedOnly}
          onBookmarkedChange={this.handleBookmarkedChange}
          selectedGenre={this.state.selectedGenre}
          onSelectedGenreChange={this.handleGenreChange}
        />
        <MovieList movies={this.filterMovies()} />
        <AddMovie onClick={this.newMovie} />
      </div>
    );
  }
}

MovieLibrary.propTypes = { movies: PropTypes.arrayOf(PropTypes.object).isRequired }; // (3)

export default MovieLibrary;
