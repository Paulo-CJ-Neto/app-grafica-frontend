import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { ProductsContext } from "../contexts/productsContext";
import { Icon } from "react-native-elements";

const ProdutoFoco = props => {
  const [loading, setLoading] = useState(false)
  const [quantidade, setQuantidade] = useState(0)

  const productData = useContext(ProductsContext).productData
  const chosenProduct = productData.find((item) => item.id === props.route.params.id)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{chosenProduct.titulo}</Text>
        { !loading
          ? <Image 
            style={styles.img} 
            source={{ uri: chosenProduct.imagem, height: 350, width: 350 }} 
            onLoad={() => setLoading(false)}
          />
          : <ActivityIndicator size={"large"} style={styles.img} />
        }
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Informações sobre o produto:</Text>
        <View style={styles.infoContent}>
          <Text style={styles.infoText}>{chosenProduct.descricao}</Text>
        </View>
      </View>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade:</Text>
        <Icon name="remove" size={30} onPress={() => setQuantidade(quantidade - 1)} />
        <Text style={styles.qtdText}>{quantidade}</Text>
        <Icon name="add" size={30} onPress={() => setQuantidade(quantidade + 1)} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Adicionar ao carrinho</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    paddingTop: Platform.OS === "ios" ? 50 : 20
  },
  img: {
    resizeMode: 'contain',
    height: 350,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 10
  },
  section: {
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: '#EBEBEB',
    marginTop: 20,
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 6,
  },
  infoLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18
  },
  infoContent: {
    marginLeft: 16,
    marginTop: 10,
    marginRight: 10
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  button: {
    height: 40,
    width: 200,
    backgroundColor: '#FF9D19',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    alignSelf: 'center'
  },
  textButton: {
    color: '#FEFEFE',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16
  },
  qtdContainer: {
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row'
  },
  qtdText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    marginHorizontal: 10
  }
})

export default ProdutoFoco