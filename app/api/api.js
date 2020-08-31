import generateMovies from '@utils/generate';

export const fetchMovies = async (page) => {
    console.log('fetchMovies');
    const response = await makeAPICall({
        page: page
    });

    if (response.status == 200) {
      // console.log('response: ', response);
      return response.movies
    }
    return response
};

export const makeAPICall = async (page) => {
    //Simulating API call, otherwise we should be fetching the movies list for the given page
    console.log('makeAPICall');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          const movies = randomMovies();
          if (movies) {
              resolve({status: 200, movies: movies});
          } else {
              resolve({status: 404, message: 'Not Found'});
          }
        }, 2000);//latency, just to show the loading indicator for a moment
    });
};

export const randomMovies = () => {
    console.log('randomMovies');
    const shouldFail = Math.random() < 0.1;//failure probability
    var movies = null;
    if (!shouldFail) {//For failure demo
        movies = generateMovies(10, 10, 3);
    }
    return movies;
};
