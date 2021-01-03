import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: [],
      loading: true,
    };
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.fetchMovie();
  }

  async fetchMovie() {
    const { id } = this.props.match.params; // https://ui.dev/react-router-v4-url-parameters/
    const data = await movieAPI.getMovie(id);
    this.setState({ movie: data, loading: false });
  }

  async deleteMovie() {
    const { id } = this.props.match.params;
    await movieAPI.deleteMovie(id);
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;

    const { movie:
      { title, storyline, imagePath, genre, rating, subtitle, id },
      loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={`../${imagePath}`} />
        <p>{`Title: ${title}`}</p>
        <p>{`Subtitle: ${subtitle}`}</p>
        <p>{`Storyline: ${storyline}`}</p>
        <p>{`Genre: ${genre}`}</p>
        <p>{`Rating: ${rating}`}</p>
        <div className="link-movie-details">
          <button><Link to={`/movies/${id}/edit`}>EDITAR</Link></button>
          <button><Link to="/">VOLTAR</Link></button>
          <button><Link to="/" onClick={this.deleteMovie}>DELETAR</Link></button>
        </div>
      </div>
    );
  }
}

// https://stackoverflow.com/questions/47519612/eslint-match-is-missing-in-props-validation-react-prop-types
MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetails;
