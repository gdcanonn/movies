import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Movie } from '../interfaces/movieInterface'
import { MoviePoster } from './MoviePoster'

interface Props {
  title?: string
  movies: Movie[]
}

export const HorizontalSlider = ({ title, movies }: Props) => {
  return (
    <View style={styles(title).container}>
      <Text style={styles().title}>{title}</Text>
      <FlatList
        data={movies}
        renderItem={({ item }: any) => <MoviePoster movie={item} width={140} height={200} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

const styles = (title?: string) => StyleSheet.create({
  container: {
    height: title ? 260 : 240
  },
  title: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold'
  }
})
