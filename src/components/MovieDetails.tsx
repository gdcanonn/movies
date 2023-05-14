import currency from 'currency-formatter'
import { FlatList, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Cast } from "../interfaces/CreditsInterface"
import { MovieFull } from "../interfaces/movieFullInterface"
import { CastItem } from './CastItem'

interface Props {
  movieFull: MovieFull
  cast: Cast[]
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
  return (
    <>
      {/* Detalles */}
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="star-outline" color='grey' size={16} />
          <Text> {movieFull.vote_average}</Text>
          <Text style={{ marginLeft: 5 }}>
            - {movieFull.genres.map(g => g.name).join(', ')}
          </Text>
        </View>

        {/* Historia */}
        <Text style={styles.title}>
          Historia
        </Text>
        <Text style={{ fontSize: 16 }}>{movieFull.overview}</Text>

        {/* Presupuesto */}
        <Text style={styles.title}>
          Presupuesto
        </Text>
        <Text style={{ fontSize: 18 }}>
          {currency.format(movieFull.budget, { code: 'USD' })}
        </Text>
      </View>

      {/* Casting */}
      <View style={{ marginTop: 10, marginBottom: 100 }}>
        <Text style={[styles.title, { marginHorizontal: 20 }]}>Actores</Text>

        <FlatList
          data={cast}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CastItem actor={item} />}
          style={{ marginTop: 10, height: 70 }}
        />

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold'
  }
})
