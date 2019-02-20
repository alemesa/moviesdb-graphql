import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const MOVIE_QUERY = gql`
  query MovieQuery($id: Int!) {
    movie(id: $id) {
      original_title
      title
      id
    }
  }
`;

class Movie extends Component {
  render() {
    let { id } = this.props.match.params;
    id = parseInt(id);
    return (
      <Fragment>
        <h1>Movies</h1>

        <Query query={MOVIE_QUERY} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            console.log(data);

            return (
              <Fragment>
                <p>{data.movie.original_title}</p>
                <p>{data.movie.id}</p>
                <hr />
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Movie;
