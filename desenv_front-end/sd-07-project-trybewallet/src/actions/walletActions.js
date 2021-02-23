import { USER_EMAIL } from './index';
import { WALLET_CURRENCIES } from './index';
import { WALLET_EXPENSES } from './index';

export function actionUserEmail(email) {
  return {
    type: USER_EMAIL,
    email,
  };
}

export function actionWalletCurrencies(currencies) {
  return {
    type: WALLET_CURRENCIES,
    currencies,
  };
}

export function actionWalletExpenses(expenses) {
  return {
    type: WALLET_EXPENSES,
    expenses,
  };
}
