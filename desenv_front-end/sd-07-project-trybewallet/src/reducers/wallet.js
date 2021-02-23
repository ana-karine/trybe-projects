// Esse reducer será responsável por tratar todas as informações relacionadas as despesas
import INITIAL_STATE from './initialState';
import { WALLET_CURRENCIES } from '../actions';
import { WALLET_EXPENSES } from '../actions';


export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
    case WALLET_CURRENCIES:
      return {
        ...state,
        currencies: action.currencies
      };
    case WALLET_EXPENSES:
      return {
        ...state,
        expenses: action.expenses
      };
    default:
      return state;
  }
}
