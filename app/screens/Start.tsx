import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, FlatList, View, Text, StyleSheet} from 'react-native';
import {useValue} from 'react-native-redash';

import Modal from '@components/Modal';
import Movie from '@components/Movie';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';
import MovieList from '@components/MovieList';
import MoviesManager from 'app/managers/MoviesManager';
import {
  DotIndicator
} from 'react-native-indicators';

interface ModalState {
    movie: MovieType;
    position: PositionType;
}

type StartParamList = {
    Start: {
        movies: Array<MovieType>;
    };
};

type StartRoute = RouteProp<StartParamList, 'Start'>;

const Start = () => {
    const route = useRoute<StartRoute>();
    const [movies, setMovies] = useState([]);
    const activeMovieId = useValue<number>(-1);
    const [modal, setModal] = useState<ModalState | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isLoadingMore, setLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        setLoading(true)
        await loadMovies(0)
        setLoading(false)
    };

    const loadMovies = async (page) => {
        var movies = await MoviesManager.loadMovies(page);
        // movies = []//Just to mock the NoMovies view
        // console.log('movies.length: ', movies.length);
        setMovies(movies);
    };

    const open = (index: number, movie: MovieType, position: PositionType) => {
        activeMovieId.setValue(index);
        setModal({movie, position});
    };

    const close = () => {
        activeMovieId.setValue(-1);
        setModal(null);
    };

    const nextPage = async () => {
        console.log('nextPage');
  
        let page = page + 1
        setPage(page)
        setLoadingMore(true)
        await loadMovies()
        setLoadingMore(false)
      }
  
      const onRefresh = () => {
          setPage(0)
          fetchMovies()
      };
  
      if (isLoading) {
          return (
            <DotIndicator color='black' />
          );
      }
  
      if (movies.length <= 0) {
          return (
            <View style={styles.NoMoviesContainer}>
                <Text style={styles.NoMovies}>
                    No Movies!
                </Text>
            </View>
          );
      }
  
      return (
          <>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView>
                  <MovieList
                    movies={movies}
                    activeMovieId={activeMovieId}
                    open={open}
                    endReached={nextPage}
                    isLoadingMore={isLoadingMore}
                    isLoading={isLoading}
                    onRefresh={onRefresh}
                  />
                  {modal !== null && <Modal {...modal} close={close} />}
              </SafeAreaView>
          </>
      );
  };
  
  const styles = StyleSheet.create({
      NoMoviesContainer: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'orange'
      },
      NoMovies: {
          padding: 16,
          alignItems: 'center',
          justifyContent: 'center',
          width: undefined,
          height: undefined,
          color: 'blue',
          fontSize: 24
      },
  });
    
export default Start;
