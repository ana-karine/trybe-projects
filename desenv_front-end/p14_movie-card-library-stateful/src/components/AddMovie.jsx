/*
REFERÊNCIAS:
Lógica Principal: https://pt-br.reactjs.org/docs/forms.html
Lógicas Auxiliares:
(1) www.codota.com/code/javascript/functions/react/ChangeEvent/target
(2) encurtador.com.br/aQVW3
(3) medium.com/@henrique.weiand/react-defaultprops-proptypes-plano-de-aula-vi-2ac0f990cdd9
*/

import React from 'react';
import Proptypes from 'prop-types';

const defaultState = {
  title: '',
  subtitle: '',
  imagePath: '',
  storyline: '',
  rating: 0,
  genre: 'action',
};

class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'number' ? Number(target.value) : target.value; // (1)
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onClick(this.state); // (2)
    this.setState(defaultState);
  }

  render() {
    return (
      <form data-testid="add-movie-form" onSubmit={this.handleSubmit}>

        <fieldset>
          <label
            htmlFor="titleInput" data-testid="title-input-label"
          >Título</label>
          <input
            type="text"
            id="titleInput"
            name="title"
            data-testid="title-input"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </fieldset>

        <fieldset>
          <label
            htmlFor="subtitleInput" data-testid="subtitle-input-label"
          >Subtítulo</label>
          <input
            type="text"
            id="subtitleInput"
            name="subtitle"
            data-testid="subtitle-input"
            value={this.state.subtitle}
            onChange={this.handleChange}
          />
        </fieldset>

        <fieldset>
          <label
            htmlFor="imageInput" data-testid="image-input-label"
          >Imagem</label>
          <input
            type="text"
            id="imageInput"
            name="imagePath"
            data-testid="image-input"
            value={this.state.imagePath}
            onChange={this.handleChange}
          />
        </fieldset>

        <fieldset>
          <label
            htmlFor="storylineInput" data-testid="storyline-input-label"
          >Sinopse</label>
          <textarea
            id="storylineInput"
            name="storyline"
            data-testid="storyline-input"
            value={this.state.storyline}
            onChange={this.handleChange}
          />
        </fieldset>

        <fieldset>
          <label
            htmlFor="ratingInput" data-testid="rating-input-label"
          >Avaliação</label>
          <input
            type="number"
            id="ratingInput"
            name="rating"
            data-testid="rating-input"
            value={this.state.rating}
            onChange={this.handleChange}
          />
        </fieldset>

        <fieldset>
          <label
            htmlFor="genreInput" data-testid="genre-input-label"
          >Gênero</label>
          <select
            id="genreInput"
            name="genre"
            data-testid="genre-input"
            value={this.state.genre}
            onChange={this.handleChange}
          >
            <option data-testid="genre-option" value="action">Ação</option>
            <option data-testid="genre-option" value="comedy">Comédia</option>
            <option data-testid="genre-option" value="thriller">Suspense</option>
          </select>
        </fieldset>

        <button
          type="submit"
          data-testid="send-button"
        >
          Adicionar filme
        </button>

      </form>
    );
  }
}

AddMovie.propTypes = { onClick: Proptypes.func.isRequired }; // (3)

export default AddMovie;
