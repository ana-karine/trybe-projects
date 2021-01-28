import React from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../images/search-icon.png';
import './searchBox.css';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };

    this.changeByTerm = this.changeByTerm.bind(this);
    this.searchByTerm = this.searchByTerm.bind(this);
  }

  changeByTerm(event) {
    const input = event.target;
    this.setState({ query: input.value });
  }

  searchByTerm() {
    const { query } = this.state;
    const { resultQuery } = this.props;
    resultQuery(query);
  }

  render() {
    const { query } = this.state;
    return (
      <div className="container">
        <input
          id="queryInput"
          className="queryInput"
          data-testid="query-input"
          type="text"
          value={ query }
          onChange={ this.changeByTerm }
        />
        <button data-testid="query-button" type="button" onClick={ this.searchByTerm }>
          <img className="icon" src={ searchIcon } alt="Search Icon" />
        </button>
        </div>
    );
  }
}

SearchBox.propTypes = {
  resultQuery: PropTypes.func.isRequired,
};

export default SearchBox;
