import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

const CardProduto = props => {
  const [loading, setLoading] = useState(false)

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.showIndividualProduct(props.id)}
    >
      <View style={styles.container}>
        { !loading
          ? < Image
            source={{ uri: props.imagem }}
            style={styles.img}
            onLoad={() => setLoading(false)}
          />
          : <ActivityIndicator size={"large"}  style={styles.img}/>
        }
        <Text style={styles.title} numberOfLines={2}>{props.titulo}</Text>
        <View style={styles.button}>
          <Text style={styles.textButton}>+ Detalhes</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 290,
    width: Dimensions.get('window').width * 0.48,
    backgroundColor: '#FF9D1A',
    marginBottom: 16,
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    margin: 7,
    marginBottom: 0,
    textAlign: 'center',
  },
  img: {
    resizeMode: 'cover',
    width: '100%',
    height: '70%',
    alignSelf: 'flex-start'
  },
  button: {
    marginTop: 5,
    height: 25,
    width: '60%',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FF9D1A'
  }
})

export default CardProduto