import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Button,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

import { ProductsContext } from "../contexts/productsContext";
import { ClientContext } from "../contexts/clientContext"
import { Icon } from "react-native-elements";
import axios from "axios";
import pickImage from "../utils/pickImage";
import { EXPO_PUBLIC_API_URL as API_URL } from '@env'

const ProdutoFoco = props => {

  const [permissionDenied, setPermissionDenied] = useState(null)
  const [imagem, setImagem] = useState(null)
  const [deleteHash, setDeleteHash] = useState(null)

  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [descricao, setDescricao] = useState('')
  const [quantidade, setQuantidade] = useState(0)

  const { productData } = useContext(ProductsContext)
  const { client, addProductToClientCart } = useContext(ClientContext)

  const limpaCampos = () => {
    setImagem(null)
    setDescricao('')
    setQuantidade(0)
  }

  const chosenProduct = productData.find((item) => item.id === props.route.params.id)

  const deleteProduct = async () => {
    try {
      await axios.delete(`${API_URL}/api/produtos/${props.route.params.id}`)
      Alert.alert('Sucesso!', 'produto excluido com sucesso')
    } catch (err) {
      console.error("nao foi possivel excluir produto: ", err)
    }
  }

  const addToCart = async () => {
    const newItemCart = {
      imagem,
      quantidade,
      descricao,
      clientId: client.id,
      produtoId: chosenProduct?.id
    }
    await addProductToClientCart(newItemCart)
    limpaCampos()
    setModalVisible(false)
    Alert.alert("Produto adicionado com sucesso! 🎉🎉")
  }

  const onDescartar = () => {
    Alert.alert(
      "Descartar Especificações",
      "Você tem certeza que quer descartar as especificações desse produto?",
      [
        {
          text: "Não",
          onPress: () => { },
          style: "cancel"
        },
        {
          text: "Descartar",
          onPress: () => {
            limpaCampos()
            setModalVisible(false)
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{chosenProduct?.titulo}</Text>
        {loading && (
          <ActivityIndicator size="large" color="#0000ff" style={styles.img} />
        )}
        <Image
          style={styles.img}
          source={{ uri: chosenProduct?.imagem }}
          onLoadEnd={() => setLoading(false)}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Informações sobre o produto:</Text>
        <View style={styles.infoContent}>
          <Text style={styles.infoText}>{chosenProduct?.descricao}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.textButton}>Adicionar ao carrinho</Text>
      </TouchableOpacity>
      {client.tipoDeUsuario === "admin"
        ? <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]}
          onPress={() => {
            deleteProduct()
            props.navigation.goBack()
          }}
        >
          <Text style={styles.textButton}>Excluir</Text>
        </TouchableOpacity>
        : null
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.buttonDescartar}
                onPress={() => onDescartar()}
              >
                <Text style={styles.textDescartar}>Descartar</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Preencha os campos:</Text>
              <View style={styles.modalContainerSection}>
                <View style={styles.modalField}>
                  <Text style={styles.modalFieldText}>Adicione uma imagem de exemplo ou inspiração:</Text>
                  <TouchableOpacity
                    onPress={() => pickImage(setPermissionDenied, setImagem, setDeleteHash)}
                  >
                    <Image
                      source={{ uri: imagem ? imagem : 'https://placehold.co/300x300/png' }}
                      style={styles.modalImage}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalField}>
                  <Text style={styles.modalFieldText}>Descreva como quer o produto:</Text>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                      style={styles.modalInput}
                      multiline
                      numberOfLines={5}
                      placeholder="Adicione uma descrição..."
                      placeholderTextColor={'#888'}
                      onChangeText={(newValue) => setDescricao(newValue)}
                      value={descricao}
                    />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.modalField}>
                  <Text style={styles.modalFieldText}>Quantidade (em unidades):</Text>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                      style={styles.modalInput}
                      numberOfLines={1}
                      placeholder="Adicione uma descrição..."
                      placeholderTextColor={'#888'}
                      keyboardType="numeric"
                      onChangeText={(newValue) => setQuantidade(newValue)}
                      value={quantidade}
                    />
                  </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity style={[styles.button, { marginTop: 0 }]} onPress={addToCart}>
                  <Text style={styles.textButton}>Adicionar ao carrinho</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
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
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 10
  },
  section: {
    alignItems: 'center',
    marginBottom: 70,
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
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: Dimensions.get('window').width * 9 / 10,
    height: Dimensions.get('window').height * 4 / 5,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    marginTop: 10,
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  },
  textDescartar: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'red'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonDescartar: {
    alignSelf: 'flex-end'
  },
  modalContainerSection: {
    flex: 1
  },
  modalField: {
    flex: 1,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  modalImage: {
    resizeMode: 'contain',
    minHeight: 150,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalFieldText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: '#DDD',
    maxHeight: 130,
    textAlign: 'top',
    padding: 10,
  }
})

export default ProdutoFoco