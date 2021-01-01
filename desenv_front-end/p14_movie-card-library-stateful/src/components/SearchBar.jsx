import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  render() {
    const {
      searchText, onSearchTextChange,
      bookmarkedOnly, onBookmarkedChange,
      selectedGenre, onSelectedGenreChange,
    } = this.props;
    return (
      <form data-testid="search-bar-form">

        <fieldset>
          <label
            htmlFor="textInput" data-testid="text-input-label"
          >Inclui o texto:</label>
          <input
            type="text"
            id="textInput"
            name="searchText"
            data-testid="text-input"
            value={searchText}
            onChange={onSearchTextChange}
          />
        </fieldset>

        <fieldset>
          <label
            htmlFor="checkboxInput" data-testid="checkbox-input-label"
          >Mostrar somente favoritos</label>
          <input
            type="checkbox"
            id="checkboxInput"
            name="bookmarkedOnly"
            data-testid="checkbox-input"
            checked={bookmarkedOnly}
            onChange={onBookmarkedChange}
          />
        </fieldset>

        <fieldset>
          <label
            htmlFor="selectInput" data-testid="select-input-label"
          >Filtrar por gênero</label>
          <select
            type="select"
            id="selectInput"
            name="selectedGenre"
            data-testid="select-input"
            value={selectedGenre}
            onChange={onSelectedGenreChange}
          >
            <option data-testid="select-option" value="">Todos</option>
            <option data-testid="select-option" value="action">Ação</option>
            <option data-testid="select-option" value="comedy">Comédia</option>
            <option data-testid="select-option" value="thriller">Suspense</option>
          </select>
        </fieldset>

      </form>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string,
  onSearchTextChange: PropTypes.func,
  bookmarkedOnly: PropTypes.bool,
  onBookmarkedChange: PropTypes.func,
  selectedGenre: PropTypes.string,
  onSelectedGenreChange: PropTypes.func,
}.isRequired;

export default SearchBar;
