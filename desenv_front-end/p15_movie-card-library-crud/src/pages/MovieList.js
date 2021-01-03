import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MovieCard, Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: false,
    };
  }

  // Lógica: instrutor Thaydds (plantão dia 19/11/2020)
  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies() { // lista movies da API
    this.setState({ loading: true }, async () => {
      const data = await movieAPI.getMovies();
      this.setState({ movies: data, loading: false });
    });
  }
  // -------------------------------------------------

  render() {
    const { movies, loading } = this.state;

    // Render Loading here if the request is still happening
    if (loading) return <Loading />;

    return (
      <div data-testid="movie-list">
        <div className="movie-list">
          {movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}
        </div>
        <div className="link-movie-new">
          <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        </div>
      </div>
    );
  }
}

export default MovieList;
