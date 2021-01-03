import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { MovieList, MovieDetails, NewMovie, EditMovie, NotFound } from './pages';

function App() {
  return (
    <Router>
      <div><h1 className="page-title">Movie Card Library CRUD</h1></div>
      <Switch>
        <Route path="/movies/new" component={NewMovie} />
        <Route path="/movies/:id/edit" render={(props) => <EditMovie {...props} />} />
        <Route path="/movies/:id" render={(props) => <MovieDetails {...props} />} />
        <Route exact path="/" component={MovieList} />
        <Route path="" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
