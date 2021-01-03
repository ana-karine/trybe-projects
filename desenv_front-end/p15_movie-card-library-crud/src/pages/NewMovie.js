import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Lógica: instrutor Thaydds (plantão dia 19/11/2020)
  handleSubmit(newMovie) {
    this.setState({ loading: true }, async () => {
      await movieAPI.createMovie(newMovie);
      this.setState({ loading: false, redirect: true });
    });
  }
  // -------------------------------------------------

  render() {
    const { redirect } = this.state;

    if (redirect) return <Redirect to="/" />;

    return (
      <div data-testid="new-movie">
        <MovieForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default NewMovie;
