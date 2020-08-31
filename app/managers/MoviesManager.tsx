import {fetchMovies} from 'app/api/api';

import DBManager from 'app/managers/DBManager';

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
          this.state.movies = await DBManager.cacheMovies(movies)
          // this.state.movies = this.state.movies.concat(movies)
      }
      else {
        const cachedMovies = await DBManager.getCachedMovies()
        // console.log('cachedMovies.length: ', cachedMovies.length);
        this.state.movies = cachedMovies
      }
      return this.state.movies;
    };
}

export default new MoviesManager();
