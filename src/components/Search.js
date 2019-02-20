import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';

const SEARCH_QUERY = gql`
  query SearchQuery($query: String!) {
    search(query: $query) {
      original_title
      title
      id
    }
  }
`;

class Search extends Component {
  state = { movies: null, movie: '' };

  onMoviesFetched = movies => this.setState(() => ({ movies }));

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            <h2>SearchMovie</h2>
            <input type="text" onChange={e => this.setState({ movie: e.target.value })} />
            <button
              onClick={async () => {
                const { data } = await client.query({ query: SEARCH_QUERY, variables: { query: this.state.movie } });
                console.log(data);
                this.onMoviesFetched(data.search);
              }}>
              Submit
            </button>
            <h2>{this.state.value}</h2>
            {this.state.movies &&
              this.state.movies.map(movie => (
                <Fragment>
                  <p>
                    {movie.title} - {movie.id}
                    <br />
                    <Link to={`/movie/${movie.id}`}>To Movie</Link>
                  </p>
                  <hr />
                </Fragment>
              ))}
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
