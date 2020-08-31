const Realm = require('realm');

const MovieSchema = {
    name: 'Movie',
    properties: {
        id: {type: 'string', indexed: true},
        name: 'string',
        description: 'string',
        genre: 'string',
        poster: 'string',
        reviews: 'Review[]',
        casts: 'Cast[]',
    },
};

const ReviewSchema = {
    name: 'Review',
    properties: {
        id: {type: 'string', indexed: true},
        body: 'string'
    },
};

const CastSchema = {
    name: 'Cast',
    properties: {
        id: {type: 'string', indexed: true},
        name: 'string'
    },
};

class DBManager {

  getCachedMovies = async () => {
      let realm = await Realm.open({
          schema: [MovieSchema, ReviewSchema, CastSchema]
      });
      return realm.objects('Movie');
  };

  cacheMovies = async (movies) => {
      let realm = await Realm.open({
          schema: [MovieSchema, ReviewSchema, CastSchema]
      });
      movies.forEach((movie) => {
          realm.write(() => {
              realm.create('Movie', {
                  id: movie.id,
                  name: movie.name,
                  description: movie.description,
                  genre: movie.genre,
                  poster: movie.poster,
                  reviews: movie.reviews,
                  casts: movie.casts,
              });
          });
      });
      console.log('realm.objects(movie): ', realm.objects('Movie'));

      return [...realm.objects('Movie')];;
  };

}

export default new DBManager();
