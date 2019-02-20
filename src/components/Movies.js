import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const MOVIES_QUERY = gql`
  query MoviesQuery {
    movies {
      original_title
      title
      id
    }
  }
`;

class Movies extends Component {
  render() {
    return (
      <Fragment>
        <h1>Movies</h1>

        <Query query={MOVIES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              <Fragment>
                {data.movies.map(movie => (
                  <Fragment>
                    <p>{movie.original_title}</p>
                    <p>{movie.id}</p>
                    <Link to={`/movie/${movie.id}`}>To Movie</Link>
                    <hr />
                  </Fragment>
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Movies;
