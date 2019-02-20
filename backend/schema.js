const axios = require('axios');

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');

const API_KEY = '0ceedd539b0a1efa834d0c7318eb6355';
const POSTER_PATH = 'http://image.tmdb.org/t/p/w342';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    title: { type: GraphQLString },
    id: { type: GraphQLInt },
    original_title: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    backdrop_path: { type: GraphQLString },
    release_date: { type: GraphQLString },
    overview: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return axios
          .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
          .then(res => res.data.results);
      }
    },
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios.get(`https://api.themoviedb.org/3/movie/${args.id}?api_key=${API_KEY}&language=en-US`).then(res => res.data);
      }
    },
    search: {
      type: new GraphQLList(MovieType),
      args: {
        query: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${args.query}&page=1&include_adult=false`)
          .then(res => res.data.results);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
