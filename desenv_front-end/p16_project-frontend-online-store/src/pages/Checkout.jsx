import React from 'react';
import boleto from '../images/boleto.png';
import visa from '../images/visa.png';
import mastercard from '../images/mastercard.png';
import elo from '../images/elo.png';

import './css/Checkout.css';

class Checkout extends React.Component {
  constructor() {
    super();

    this.validateForm = this.validateForm.bind(this);
    this.orderForm = this.orderForm.bind(this);

    this.state = {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      redirect: false,
      storage: JSON.parse(localStorage.getItem('productsList')),
    };
  }

  validateForm() {
    const { name, email, cpf, phone, cep, address } = this.state;

    const fieldName = name.length ? name : '';
    const fieldEmail = email.length ? email : '';
    const fieldCpf = cpf.length ? cpf : '';
    const fieldPhone = phone.length ? phone : '';
    const fieldCep = cep.length ? cep : '';
    const fieldAddress = address.length ? address : '';

    const allFields = [
      fieldName, fieldEmail, fieldCpf, fieldPhone, fieldCep, fieldAddress];

    const formNotValidated = allFields.some((field) => field === '');

    if (!formNotValidated) {
      this.setState({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        cep: '',
        address: '',
        redirect: true,
      });
    } else {
      this.setState({
        redirect: false,
      });
    }
  }

  formStates(field, newValue) {
    this.setState({ [field]: newValue });
  }

  orderForm() {
    return (
      <div className="container-form">
        <div>
          <h2>Informações do comprador</h2>
          <label className="container-label" htmlFor="name">
            Nome completo
            <input
              id="name"
              className="container-input"
              type="text"
              placeholder="Digite seu nome completo"
              data-testid="checkout-fullname"
              onChange={ (event) => this.formStates('name', event.target.value) }
            />
          </label>
          <label className="container-label" htmlFor="email">
            E-mail
            <input
              id="email"
              className="container-input"
              type="text"
              placeholder="Digite seu e-mail"
              data-testid="checkout-email"
              onChange={ (event) => this.formStates('email', event.target.value) }
            />
          </label>
          <label className="container-label" htmlFor="cpf">
            CPF
            <input
              id="cpf"
              className="container-input"
              type="text"
              placeholder="Digite seu CPF"
              data-testid="checkout-cpf"
              onChange={ (event) => this.formStates('cpf', event.target.value) }
            />
          </label>
          <label className="container-label" htmlFor="phone">
            Telefone
            <input
              id="phone"
              className="container-input"
              type="text"
              placeholder="Digite seu telefone"
              data-testid="checkout-phone"
              onChange={ (event) => this.formStates('phone', event.target.value) }
            />
          </label>
          <label className="container-label" htmlFor="cep">
            CEP
            <input
              id="cep"
              className="container-input"
              type="text"
              placeholder="Digite seu CEP"
              data-testid="checkout-cep"
              onChange={ (event) => this.formStates('cep', event.target.value) }
            />
          </label>
          <label className="container-label" htmlFor="address">
            Endereço
            <input
              id="address"
              className="container-input"
              type="text"
              placeholder="Digite seu endereço"
              data-testid="checkout-address"
              onChange={ (event) => this.formStates('address', event.target.value) }
            />
          </label>
        </div>
        <div>
          <h2>Método de pagamento</h2>
          <label htmlFor="payment">
            <p>Boleto</p>
            <input
              name="payment"
              id="boleto"
              value="boleto"
              type="radio"
              onChange={ (event) => this.formStates('payment', event.target.value) }
            />
            <img src={ boleto } alt="boleto" width="50px" />
            <p>Cartão de crédito</p>
            <input
              name="payment"
              value="visa"
              type="radio"
              onChange={ (event) => this.formStates('payment', event.target.value) }
            />
            <img src={ visa } alt="visa" width="50px" />
            <input
              name="payment"
              value="mastercard"
              type="radio"
              onChange={ (event) => this.formStates('payment', event.target.value) }
            />
            <img src={ mastercard } alt="mastercard " width="50px" />
            <input
              name="payment"
              value="elo"
              type="radio"
              onChange={ (event) => this.formStates('payment', event.target.value) }
            />
            <img src={ elo } alt="elo" width="50px" />
          </label>
        </div>
      </div>
    );
  }

  render() {
    const { redirect, storage } = this.state;

    const initialPrice = 0;
    const twoDecimalPlaces = 2;

    let totalPrice = storage.reduce(getTotal, initialPrice);
    function getTotal(totalPrice, item) {
      return totalPrice + parseFloat(item.price);
    }

    if (redirect) {
      alert('Compra realizada com sucesso! ');
      window.location.href = '/';
    }

    return (
      <div>
        <div>
          <form>
            { this.orderForm() }
          </form>
        </div>
        <div className="container-rewiew">
          <h2>Revise seus produtos</h2>
          { storage.map(((product) => (
            <div key={ `${product.id}` }>
              <div className="image-line">
                <img
                  src={ product.thumbnail }
                  className="image-rewiew"
                  alt="Product"
                />
              </div>
              <div className="name-line">
                <p data-testid="shopping-cart-product-name">{ product.title }</p>
              </div>
              <div className="quantity-line">
                <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
              </div>
              <div className="price-line">
                <p>
                  { parseFloat(product.price).toFixed(twoDecimalPlaces) }
                </p>
              </div>
            </div>
          ))) }
        </div>
        <div className="container-total">
          <div>
            <h4>Valor total (R$):</h4>
            <h3>{ totalPrice.toFixed(twoDecimalPlaces) }</h3>
          </div>
          <button className="check-btn" type="submit" onClick={ this.validateForm }>
            Finalizar a compra
          </button>
        </div>
      </div>
    );
  }
}

export default Checkout;
