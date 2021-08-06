import React from 'react';

import './css/Evaluation.css';

class Evaluation extends React.Component {
  constructor() {
    super();

    this.state = {
      evaluationText: '',
      rating: 0,
      reviewList: [],
      reviewRating: 0,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
  }

  onChangeHandler(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  renderReviews() {
    const { reviewList } = this.state;
    return (
      <div>
        <h3>Comentários</h3>
        {
          reviewList.map((review) => (
            <div key={ review.id }>
              <h4>{ review.title }</h4>
              <p>{ review.content }</p>
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    const { evaluationText, rating, reviewList, reviewRating } = this.state;

    return (
      <div>
        <form className="container-evaluation">
          <h3>Avaliação</h3>
          <textarea
            value={ evaluationText }
            id="evaluationText"
            cols="30"
            rows="5"
            placeholder="Comentário (opcional)"
            onChange={ this.onChangeHandler }
            data-testid="product-detail-evaluation"
          />
          <br />
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={ rating }
            id="rating"
            onChange={ this.onChangeHandler }
            data-testid="rating-input"
          />
          <button type="button" className="evaluation-btn">Avaliar</button>
        </form>
        <br />
        <span className="reviewRating">{ `Média de opiniões: ${reviewRating}` }</span>
        {
          !reviewList.length
            ? <h4 className="rewiews">Sem Comentários</h4> : this.renderReviews()
        }
      </div>
    );
  }
}

export default Evaluation;
