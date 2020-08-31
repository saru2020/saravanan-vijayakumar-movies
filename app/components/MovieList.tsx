import React, {useState, useEffect} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import Movie from '@components/Movie';

const MovieList = ({movies, activeMovieId, open, endReached, isLoadingMore, isLoading, onRefresh}: MovieProps) => {

    return (
      <FlatList contentInsetAdjustmentBehavior="automatic"
          data={movies}
          refreshing={isLoading}
          onRefresh={onRefresh}
          initialNumToRender={5}
          windowSize={5}
          maxToRenderPerBatch={5}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
              <Movie
                  activeMovieId={activeMovieId}
                  key={item.id}
                  index={index}
                  movie={item}
                  open={open}
              />
          )}
          onEndReached={endReached}
          onEndReachedThreshold={0}
          ListFooterComponent={isLoadingMore ? <Text style={styles.footer}>Loading More Items...</Text> : null}
      />
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 16,
        flex: 1,
        height: 60,
        backgroundColor: 'red',
        fontSize: 24
    },
});

export default MovieList;
