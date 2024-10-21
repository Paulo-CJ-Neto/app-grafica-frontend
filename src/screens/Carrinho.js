import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";
import ItemCarrinho from "../components/ItemCarrinho";
import { ClientContext } from "../contexts/clientContext";

const Carrinho = () => {
  const { client, clientCart } = useContext(ClientContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartItemDetails, setCartItemDetails] = useState({});

  useEffect(() => {
    console.log(cartItemDetails)
  }, [modalVisible])

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Produtos escolhidos</Text>
        {
          clientCart.map((infoCartItem) => {
            return <ItemCarrinho key={infoCartItem.id} infoCartItem={infoCartItem} setModalVisible={setModalVisible} setCartItemDetails={setCartItemDetails} />
          })
        }
      </ScrollView>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Fazer pedido pelo Whatsapp</Text>
        </TouchableOpacity>
      </View>

      {/* Modal com fundo escuro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Adicionado para gerenciar o fechamento
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.buttonDescartar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textDescartar}>Fechar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Sua descrição pro produto:</Text>
            <View style={styles.modalContainerSection}>
              <View style={styles.modalField}>
                <Text style={styles.modalFieldText}>Imagem adicionada para exemplo ou inspiração:</Text>
                <Image
                  source={{ uri: cartItemDetails.imagem ? cartItemDetails.imagem : 'https://placehold.co/300x300/png' }}
                  style={styles.modalImage}
                />
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalFieldText}>Descrição para inspiração:</Text>
                <TextInput
                  style={styles.modalInput}
                  multiline
                  numberOfLines={8}
                  value={cartItemDetails.descricao}
                  editable={false}
                />
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalFieldText}>Quantidade (em unidades):</Text>
                <TextInput
                  style={styles.modalInput}
                  numberOfLines={1}
                  value={cartItemDetails.quantidade?.toString()}
                  editable={false}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerButton: {
    height: 150,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#09C902',
    height: 50,
    width: 285,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    margin: 16
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparência escura
  },
  modalContainer: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    marginHorizontal: 10,
    marginVertical: 80
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
    maxHeight: 200,
    textAlign: 'top',
    padding: 10,
  },
})

export default Carrinho;
