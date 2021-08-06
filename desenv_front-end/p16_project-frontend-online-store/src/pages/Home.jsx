import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { SearchBar, CategoriesList, ProductsList } from '../components';

import './css/Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.upCategoryId = this.upCategoryId.bind(this);
    this.upQuery = this.upQuery.bind(this);
    this.fetchProductsQuery = this.fetchProductsQuery.bind(this);
    this.upLocalStorage = this.upLocalStorage.bind(this);

    this.state = {
      allCategories: [], // lista todas as categorias
      selectedCategoryID: [], // armazena o Id da categoria selecionada
      query: '', // armazena o texto digitado para busca
      productsList: [], // armazena o resultado do filtro de pesquisa
      initialMessage: true,
      msgProductNotFound: false,
      storage: JSON.parse(localStorage.getItem('productsList')),
    };
  }

  componentDidMount() {
    getCategories().then((result) => {
      this.setState({ allCategories: result });
    });
  }

  fetchProductsCategoryId() {
    const { selectedCategoryID } = this.state;

    getProductsFromCategoryAndQuery(selectedCategoryID, '').then(
      (productsFecth) => {
        // console.log('productsFecth', productsFecth);
        this.setState({
          productsList: productsFecth.results,
          initialMessage: false,
        });
      },
    );
  }

  async fetchProductsQuery() {
    const { query } = this.state;
    const productsFecth = await getProductsFromCategoryAndQuery('', query);

    if (!productsFecth) {
      this.setState({
        productsList: [],
        msgProductNotFound: true,
      });
    } else {
      this.setState({
        productsList: productsFecth.results,
        initialMessage: false,
      });
    }
  }

  upCategoryId(event) {
    const id = event.target.getAttribute('category-id');
    // console.log('Category ID', id);
    this.setState({ selectedCategoryID: id }, () => {
      this.fetchProductsCategoryId();
    });
  }

  upQuery(event) {
    const { value } = event.target;
    // console.log('Texto digitado', value);
    this.setState({ query: value });
  }

  // // https://github.com/tryber/sd-07-project-frontend-online-store/blob/main-group-3/src/pages/Home.jsx
  upLocalStorage({ target }) {
    const firstIndexInArray = 0;
    const twoDecimalPlaces = 2;

    const availableQuantity = (
      // https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter
      parseInt(target.getAttribute('data-available-quantity'), 10)
    );
    const id = target.getAttribute('data-id');
    let price = (
      parseFloat(target.getAttribute('data-price'))).toFixed(twoDecimalPlaces);
    const thumbnail = target.getAttribute('data-thumbnail');
    const title = target.getAttribute('data-title');

    const products = JSON.parse(localStorage.getItem('productsList'));
    const findIndexInArray = products.findIndex((product) => product.id === id);

    if (findIndexInArray >= firstIndexInArray) {
      products[findIndexInArray].quantity += 1;
      price *= products[findIndexInArray].quantity;
      products[findIndexInArray].price = price;
      localStorage.setItem('productsList', JSON.stringify([...products]));
      this.setState({
        storage: JSON.parse(localStorage.getItem('productsList')),
      });
    } else {
      const quantity = 1;
      localStorage.setItem('productsList', JSON.stringify(
        [...products, { availableQuantity, id, price, quantity, thumbnail, title }],
      ));
      this.setState({
        storage: JSON.parse(localStorage.getItem('productsList')),
      });
    }
  }

  render() {
    const {
      allCategories,
      productsList,
      initialMessage,
      msgProductNotFound,
      storage } = this.state;

    const emptyCart = 0;

    const productQuantity = storage.map((product) => product.quantity)
      .reduce((acc, nextValue) => acc + nextValue, emptyCart);
    const cartQuantity = (storage) ? productQuantity : emptyCart;

    return (
      <div>
        <div className="searchbar">
          <SearchBar
            inputText={ this.upQuery }
            onClick={ this.fetchProductsQuery }
            cartQuantity={ cartQuantity }
          />
        </div>
        <div className="product">
          <div className="home-list-category">
            <CategoriesList
              allCategories={ allCategories }
              handleCategorie={ this.upCategoryId }
            />
            <div className="home-list-search">
              <ProductsList
                products={ productsList }
                initialMessage={ initialMessage }
                msgProductNotFound={ msgProductNotFound }
                localStorageAddItem={ this.upLocalStorage }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
