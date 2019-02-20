import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Movies from './components/Movies';
import Search from './components/Search';
import Movie from './components/Movie';

const client = new ApolloClient({
  uri: '/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <Link to={'/'}>Popular Movies</Link>
            <Link to={'/search'}>Search</Link>

            <Route exact path="/" component={Movies} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/movie/:id" component={Movie} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
