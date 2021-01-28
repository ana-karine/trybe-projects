import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductList from '../components/home/ProductList';
import CategoryList from '../components/home/CategoryList';
//import SearchBox from '../components/home/SearchBox';
//import SearchControl from '../components/home/SearchControl';
//import SumCart from '../components/home/SumCart';
import './Home.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoryId: '',
      query: '',
      search: false,
      result: '',
      buy: 0,
    };

    this.upCategoryId = this.upCategoryId.bind(this);
    this.upQuery = this.upQuery.bind(this);
  }

  componentDidMount() {
    getCategories().then((allCategories) => {
      this.setState({ categories: allCategories });
    });
  }

  clickSearch() {
    const { categoryId, query } = this.state;
    getProductsFromCategoryAndQuery(categoryId, query).then(
      (result) => {
        this.setState({
          result,
          search: true,
        });
      },
    );
  }

  upCategoryId(selected) {
    this.setState({ categoryId: selected }, () => {
      this.clickSearch();
    });
  }

  upQuery(searchResult) {
    this.setState({ query: searchResult }, () => {
      this.clickSearch();
    });
  }

  render() {
    const { categories, query, search, result, buy } = this.state;
    return (
      <div className="container-home">
        <div className="category-list">
          <CategoryList
            check={ this.upCategoryId }
            categories={ categories }
          />
        </div>
        <div className="product-list">
          <ProductList
            resultQuery={ this.upQuery }
            query={ query }
            search={ search }
            result={ result }
            buy={ buy }
          />
        </div>
      </div>
    )
  }
}

export default Home;

/*
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryId: '',
      query: '',
      search: false,
      result: '',
      buy: 0,
    };

    this.upCategoryId = this.upCategoryId.bind(this);
    this.upQuery = this.upQuery.bind(this);
  }

  componentDidMount() {
    getCategories().then((allCategories) => {
      this.setState({ categories: allCategories });
    });
  }

  clickSearch() {
    const { categoryId, query } = this.state;
    getProductsFromCategoryAndQuery(categoryId, query).then(
      (result) => {
        this.setState({
          result,
          search: true,
        });
      },
    );
  }

  upCategoryId(searchResult) {
    this.setState({ categoryId: searchResult }, () => {
      this.clickSearch();
    });
  }

  upQuery(searchResult) {
    this.setState({ query: searchResult }, () => {
      this.clickSearch();
    });
  }

  render() {
    const { categories, query, search, result, buy } = this.state;
    return (
      <div>

        <div className="container-one">
          <div className="query">
            <SearchBox
              resultQuery={ this.upQuery }
            />
          <div className="sum">
            <SumCart
              sum={ buy }
            />
          </div>
          </div>
        </div>

        <div className="container-two">
          <div className="category-id">
            <CategoryList
              check={ this.upCategoryId }
              categories={ categories }
            />
          <div className="search-control">
            <SearchControl
              data-testid="product-detail-add-to-cart"
              query={ query }
              search={ search }
              result={ result }
              sum={ buy }
            />
          </div>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
}

export default Home;
*/


