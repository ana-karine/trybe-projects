import React from 'react';

class productEvaluation extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="text-area">
            Escreva sua avaliação
            <textarea id="text-area" data-testid="product-detail-evaluation" />
          </label>
        </form>
      </div>
    );
  }
}

export default productEvaluation;
