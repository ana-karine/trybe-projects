import React, { Component } from 'react';

import './css/NotFound.css';

class NotFound extends Component {
  render() {
    return <div className="notFound" data-testid="404-error">Página não encontrada</div>;
  }
}

export default NotFound;