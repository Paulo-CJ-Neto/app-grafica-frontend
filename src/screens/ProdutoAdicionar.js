import React, { useContext, useEffect, useRef, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Linking,
  Button,
  Alert,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Modalize } from "react-native-modalize"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker'

import axios from "axios"

import { ProductsContext } from "../contexts/productsContext"
import { ClientContext } from "../contexts/clientContext"

import pickImage from "../utils/pickImage"

import { EXPO_PUBLIC_API_URL as API_URL } from '@env'

const InputField = ({ field, setField }) => {
  return (
    <View style={styles.inputBar}>
      <TextInput
        style={styles.input}
        placeholder={field}
        placeholderTextColor={"#AAA"}
        multiline={true}
        numberOfLines={2}
        value={field}
        onChangeText={(newText) => setField(newText)}
      />
    </View>
  )
}

const ProdutoAdicionar = () => {
  const modalizeRef1 = useRef(null)
  const modalizeRef2 = useRef(null)
  const modalizeRef3 = useRef(null)
  const modalizeRef4 = useRef(null)

  const [permissionDenied, setPermissionDenied] = useState(false);

  const [imagem, setImagem] = useState(null)
  const [titulo, setTitulo] = useState(null)
  const [subtitulo, setSubtitulo] = useState(null)
  const [descricao, setDescricao] = useState(null)
  const [preco, setPreco] = useState(null)
  const [deleteHash, setDeleteHash] = useState(null)

  const [tipo, setTipo] = useState(null)
  const [subtipo, setSubtipo] = useState(null)

  const [mensagemError, setMensagemError] = useState(null)

  const { productTypes } = useContext(ProductsContext)
  const { client } = useContext(ClientContext)

  const onOpen = (modalizeRef) => {
    modalizeRef.current?.open()
  }

  const onClose = (modalizeRef) => {
    modalizeRef.current?.close()
  }

  const limpaCampos = () => {
    setImagem(null)
    setTitulo(null)
    setSubtitulo(null)
    setDescricao(null)
    setPreco(null)
    setTipo(null)
    setSubtipo(null)
    setMensagemError(null)
    setDeleteHash(null)
  }

  const saveProduct = async () => {
    const product = {
      titulo,
      imagem,
      subtitulo,
      tipo,
      subtipo,
      descricao,
      preco,
      deleteHash,
      clienteId: client.id
    }
    try {
      const response = await axios.post(`${API_URL}/api/produtos`, product)
      Alert.alert('Sucesso!', 'Produto adicionado')
      limpaCampos()
    } catch (err) {
      setMensagemError("Todos os campos obrigatorios devem ser preenchidos")
      console.error("nao foi possivel adicionar produto", err)
    }
  }

  useEffect(() => {
    if (tipo) {
      const tipoSelecionado = productTypes.find((obj) => obj.type === tipo)
      if (tipoSelecionado && tipoSelecionado.data.length > 0) {
        setSubtipo(tipoSelecionado.data[0])
      }
    }
  }, [tipo])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100} // Ajuste o offset conforme necessário
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps='handled'
        >
          <Modalize
            ref={modalizeRef1}
            modalHeight={400}
          >
            <Picker
              selectedValue={tipo}
              onValueChange={(itemValue, itemIndex) =>
                setTipo(itemValue)
              }>
              {
                productTypes.map((obj) => {
                  return <Picker.Item label={obj.type} value={obj.type} key={obj.type} />
                })
              }
            </Picker>
          </Modalize>


          <Modalize
            ref={modalizeRef2}
            modalHeight={800}
          >
            <View style={{ justifyContent: '' }}>
              <View style={styles.inputModalize}>
                <Text>Tipo: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="novo tipo"
                  autoFocus={true}
                  onChangeText={(text) => setTipo(text)}
                  onSubmitEditing={() => onClose(modalizeRef2)}
                  returnKeyType="done"
                />
              </View>
            </View>
          </Modalize>

          <Modalize
            ref={modalizeRef3}
            modalHeight={400}
          >
            <Picker
              selectedValue={subtipo}
              onValueChange={(itemValue, itemIndex) =>
                setSubtipo(itemValue)
              }>
              {
                productTypes.find((obj) => obj.type === tipo)?.data?.map((item) => {
                  return <Picker.Item label={item} key={item} value={item} />
                })
              }
            </Picker>
          </Modalize>

          <Modalize
            ref={modalizeRef4}
            modalHeight={800}
          >
            <View style={{ justifyContent: '' }}>
              <View style={styles.inputModalize}>
                <Text>Tipo: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="novo subtipo"
                  autoFocus={true}
                  onChangeText={(text) => setSubtipo(text)}
                  onSubmitEditing={() => onClose(modalizeRef4)}
                  returnKeyType="done"
                />
              </View>
            </View>
          </Modalize>

          <Text style={styles.textMedium}>1° Escolha a foto:</Text>
          <TouchableOpacity style={styles.img} onPress={() => pickImage(setPermissionDenied, setImagem, setDeleteHash)}>
            <Image
              source={{ uri: imagem ? imagem : 'https://placehold.co/300x300/png' }}
              style={{ width: 300, height: 300 }}
            />
            {permissionDenied && (
              <Button
                title="Abrir configuracoes"
                onPress={() => Linking.openSettings()}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.textMedium}>2° Informações do produto:</Text>

          <Text style={styles.label}>Título do produto:</Text>
          <InputField field={titulo} setField={setTitulo} />
          <Text style={styles.label}>Subtítulo do produto:</Text>
          <InputField field={subtitulo} setField={setSubtitulo} />
          <Text style={styles.label}>Descrição do produto:</Text>
          <InputField field={descricao} setField={setDescricao} />
          <Text style={styles.label}>Preço do produto:</Text>
          <InputField field={preco} setField={setPreco} />

          <Text style={styles.textMedium}>3° Filtragem do produto:</Text>
          <Text style={styles.label}>Tipo do produto:</Text>
          <View style={styles.inputBar}>
            <TouchableOpacity onPress={() => onOpen(modalizeRef1)} style={styles.picker}>
              <Text style={styles.textPicker}>{tipo ? tipo : 'Selecione'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onOpen(modalizeRef2)} style={styles.picker}>
              <Text style={styles.textPicker}>Novo Tipo</Text>
            </TouchableOpacity>

          </View>
          <Text style={styles.label}>Subtipo do produto:</Text>
          <View style={styles.inputBar}>
            <TouchableOpacity onPress={() => onOpen(modalizeRef3)} style={[styles.picker, !tipo ? { backgroundColor: 'gray' } : null]} disabled={!tipo} >
              <Text style={styles.textPicker}>{tipo ? subtipo : 'Selecione'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onOpen(modalizeRef4)} style={[styles.picker, !tipo ? { backgroundColor: 'gray' } : null]} disabled={!tipo}>
              <Text style={styles.textPicker}>Novo Subtipo</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={saveProduct}>
            <Icon name="plus-circle" size={25} color="#000" />
            <Text style={styles.add}>Adicionar</Text>
          </TouchableOpacity>
          <Text style={styles.error}>{mensagemError}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 200
  },
  textMedium: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: 20,
  },
  img: {
    alignItems: 'center',
    margin: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    padding: 3,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#AAA",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  label: {
    marginTop: 5,
    fontFamily: 'Poppins-Light',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: (Dimensions.get('window').width - 60) * 3 / 5,
    backgroundColor: '#63b620',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 40,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  add: {
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 17
  },
  picker: {
    width: '45%',
    height: 40,
    backgroundColor: '#339926',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,

  },
  textPicker: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  inputModalize: {
    flex: 1,
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20
  },
  error: {
    color: 'red',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    marginTop: 10
  }
})

export default ProdutoAdicionar
