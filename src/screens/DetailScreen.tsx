import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { MovieDetails } from '../components/MovieDetails'
import { useMovieDetails } from '../hooks/useMovieDetails'
import { RootStackParams } from '../navigation/Navigation'

const screenHeight = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { }

export const DetailScreen = ({ route, navigation }: Props) => {
  const movie = route.params
  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

  const { isLoading, movieFull, cast } = useMovieDetails(movie.id)

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={{ uri }}
            style={styles.posterImage}
          />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ?
        <ActivityIndicator size={35} color='gray' style={{ marginTop: 20 }} />
        : <MovieDetails movieFull={movieFull!} cast={cast} />
      }

      {/* Boton para cerrar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon
          color='white'
          name='arrow-back-outline'
          size={50}
        />
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 10,
    marginBottom: 25,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  posterImage: {
    flex: 1
  },
  marginContainer: {
    marginHorizontal: 20
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 5
  }
})
