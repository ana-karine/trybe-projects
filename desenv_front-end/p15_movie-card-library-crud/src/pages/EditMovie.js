import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MovieForm, Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: [],
      loading: true,
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Lógica: instrutor Thaydds (plantão dia 19/11/2020)
  componentDidMount() {
    this.onSearchMovie();
  }

  async onSearchMovie() {
    const { id } = this.props.match.params; // https://ui.dev/react-router-v4-url-parameters/
    const data = await movieAPI.getMovie(id);
    this.setState({ movie: data, loading: false });
  }
  // -------------------------------------------------

  async handleSubmit(updatedMovie) {
    await movieAPI.updateMovie(updatedMovie);
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { movie, loading, redirect } = this.state;
    if (redirect) {
      // Redirect
      return <Redirect to="/" />;
    }

    if (loading) {
      // render Loading
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={movie} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default EditMovie;
