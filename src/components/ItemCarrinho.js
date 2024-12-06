import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard
} from "react-native";
import { EXPO_PUBLIC_API_URL as API_URL } from '@env'
import { Icon } from "react-native-elements";
import { ClientContext } from "../contexts/clientContext";

const ItemCarrinho = ({ infoCartItem, setModalVisible, setCartItemDetails }) => {

  const { deleteProductFromClientCart } = useContext(ClientContext)

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  

  useEffect(() => {
    const selectProduct = async () => {
      try {
        const result = await axios.get(`${API_URL}/api/produtos/${infoCartItem.produtoId}`)
        setProduct(result.data)
        setLoading(false)
      } catch (err) {
        console.error(`Não foi possivel buscar o produto de id ${infoCartItem.produtoId}`, err)
      }
    }

    selectProduct()
  }, [infoCartItem.produtoId])

  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        {loading && (
          <ActivityIndicator size={"large"} style={styles.img} color={"#0000ff"} />
        )}
        < Image
          source={{ uri: product?.imagem }}
          style={styles.img}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
      <Text style={styles.title}>{product?.titulo}</Text>
      <TouchableOpacity
        onPress={() => {
          setCartItemDetails(infoCartItem)
          setModalVisible(true)
        }}
        style={styles.icon}
      >
        <Icon
          name="file-document"
          type="material-community"
          size={30}
          color="#495057"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={() => {
        Alert.alert("Excluir item", "deseja excluir o item do carrinho?", [
          {
            text: "Não",
            isPreferred: true,
            onPress: () => { },
            style: "cancel"
          },
          {
            text: "Excluir",
            onPress: () => deleteProductFromClientCart(infoCartItem),
            style: "destructive"
          },
        ])
      }}>
        <Icon
          name="delete"
          type="material-community"
          size={30}
          color="#D4111C"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9D9D9',
    height: 100,
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    width: '40%',
  },
  containerImg: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  img: {
    resizeMode: 'contain',
    height: 80,
    width: 80,
  },
  icon: {
    width: '15%',
    alignItems: 'center',
  },
  indicator: {
    height: 80,
    width: 80,
    alignSelf: 'center',
  },

})

export default ItemCarrinho