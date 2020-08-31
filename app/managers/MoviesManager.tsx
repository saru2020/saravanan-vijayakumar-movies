import {fetchMovies} from 'app/api/api';

class MoviesManager {
    constructor() {
      this.state = {
        movies: []
      }
    }

    loadMovies = async (page) => {
      var movies = await fetchMovies(page);
      // console.log('page: ', page);
      // console.log('movies.length: ', movies.length);
      // movies = []//Uncomment to test the cached movies being displayed
      if (movies.length > 0) {
          this.state.movies = this.state.movies.concat(movies)
      }
      return this.state.movies;
    };
}

export default new MoviesManager();
