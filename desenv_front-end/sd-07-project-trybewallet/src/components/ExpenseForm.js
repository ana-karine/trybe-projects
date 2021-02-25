import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAPI from '../services/requestAPI';
import { actionWalletCurrencies } from '../actions/walletActions';

class expenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    const { updateValues } = this.props;
    updateValues(getAPI());
  }

  render() {
    const { value } = this.state;
    const { currencies } = this.props;
    // console.log(currencies.USD);
    const obj1 = Object.keys(currencies);
    const obj2 = Object.values(currencies);
    console.log(obj1);
    console.log(obj2[5]);

    // const obj3 = Object.values(obj2[5]);
    // console.log(obj3);

    return (
      <form className="form" onSubmit={ this.handleSubmit }>
        { value }
        <div>
          <label
            htmlFor="value"
          >
            Valor:
            <input
              type="number"
              name="value"
              onChange={ this.handleChangeValue }
              data-testid="value-input"
            />
          </label>
        </div>
        <div>
          Retorno:
          <label
            htmlFor="currency"
          >
            Moeda:
            {/* <select
              name="currency"
              data-testid="currency-input"
              // value={this.props.value}
              // onChange={this.props.onChange}
            >

            </select> */}
          </label>
        </div>
        <div>
          <label
            htmlFor="description"
          >
            Descrição:
            <input
              type="text"
              id="description"
              onChange={ this.handleChangeDescription }
              data-testid="description-input"
            />
          </label>
        </div>
        {/* <Link to="/carteira">
          <button
            type="button"
            disabled={ btnDisabled }
            onClick={ () => writeEmail(email) }
          >
            Entrar
          </button>
        </Link> */}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateValues: (dataAPI) => dispatch(actionWalletCurrencies(dataAPI)),
});

export default connect(mapStateToProps, mapDispatchToProps)(expenseForm);

expenseForm.propTypes = {
  updateValues: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
};
