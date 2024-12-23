import React, { useRef, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Alert,
  Keyboard
} from "react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Icon } from 'react-native-elements'
import { EXPO_PUBLIC_API_URL as API_URL } from '@env'

import axios from "axios"

const backgroundBlur = require("../../assets/imgs/background_blur.png")
const logo = require("../../assets/imgs/logo2.png")
const buttonCadastrar = require("../../assets/imgs/buttonCadastrar.png")

const Login = (props) => {

  const bottomSheetRef = useRef(null)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [mensagemErro, setMensagemErro] = useState('')

  const bottomSheetUp = () => bottomSheetRef.current?.expand()
  const bottomSheetDown = () => bottomSheetRef.current?.collapse()

  const changeNome = (nome) => setNome(nome)
  const changeEmail = (email) => setEmail(email)
  const changeSenha = (senha) => setSenha(senha)
  const changeConfirmacao = (confirmacao) => setConfirmacao(confirmacao)

  const limparCampos = () => {
    setNome('')
    setEmail('')
    setSenha('')
    setConfirmacao('')
    setMensagemErro('')
  }

  const cadastrar = async () => {
    setNome(nome.trim())
    setEmail(email.trim())
    setSenha(senha.trim())
    setConfirmacao(confirmacao.trim())
    try {
      await axios.post(`${API_URL}/api/cadastro`, {
        nome,
        email,
        senha,
        confirmacao
      })
      limparCampos()
      Alert.alert('Sucesso!', `Valide o email enviado para '${email}' !`)
      props.navigation.navigate('Login')
    } catch (err) {
      if (err.response) {
        setMensagemErro(err.response.data)
        console.error(err.response.data);
      }
    }
  }

  const resetKeyboardAndBottomSheet = () => {
    Keyboard.dismiss()
    bottomSheetDown()
  }

  return (
    <TouchableWithoutFeedback onPress={resetKeyboardAndBottomSheet}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ImageBackground source={backgroundBlur} style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>

          <BottomSheet
            ref={bottomSheetRef} // Aplique a referência aqui
            snapPoints={["62%", "95%"]}
            backgroundStyle={styles.bottomSheetStyle}
            style={styles.containerBottomSheet}
          >
            <View style={styles.contentBottomSheet}>
              <Text style={styles.title}>Cadastre-se!</Text>
              <Text style={styles.subtitle}>Forneça os dados necessários, por favor:</Text>

              <View style={styles.inputBar}>
                <Icon name="account-outline" type="material-community" size={35} />
                <TextInput
                  style={styles.input}
                  placeholder="Seu nome completo"
                  placeholderTextColor="#AAA"
                  onChangeText={changeNome}
                  value={nome}
                  onFocus={bottomSheetUp}
                />
              </View>
              <View style={styles.inputBar}>
                <Icon name="at" type="material-community" size={35} />
                <TextInput
                  style={styles.input}
                  placeholder="Seu e-mail"
                  placeholderTextColor="#AAA"
                  keyboardType="email-address"
                  onChangeText={changeEmail}
                  value={email}
                  onFocus={bottomSheetUp}
                />
              </View>
              <View style={styles.inputBar}>
                <Icon name="lock-outline" type="material-community" size={35} />
                <TextInput
                  style={styles.input}
                  placeholder="Sua senha"
                  placeholderTextColor="#AAA"
                  secureTextEntry={true}
                  onChangeText={changeSenha}
                  value={senha}
                  onFocus={bottomSheetUp}
                />
              </View>
              <View style={styles.inputBar}>
                <Icon name="repeat" type="material-community" size={35} />
                <TextInput
                  style={styles.input}
                  placeholder="Novamente sua senha"
                  placeholderTextColor="#AAA"
                  secureTextEntry={true}
                  onChangeText={changeConfirmacao}
                  value={confirmacao}
                  onFocus={bottomSheetUp}
                  onBlur={bottomSheetDown}
                />
              </View>

              {mensagemErro
                ? <Text style={styles.error}>{mensagemErro}</Text>
                : null
              }

              <TouchableOpacity onPress={cadastrar}>
                <Image
                  style={styles.button}
                  source={buttonCadastrar}
                />
              </TouchableOpacity>

              <TouchableWithoutFeedback onPress={() => {
                props.navigation.navigate('Login')
                bottomSheetRef.current.close()
              }}>
                <Text style={styles.underlined}>Já possuo conta!</Text>
              </TouchableWithoutFeedback>
            </View>
          </BottomSheet>
        </ImageBackground>
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    resizeMode: 'cover',
    height: '100%',
    width: '100%'
  },
  logoContainer: {
    alignItems: 'center',
    margin: 120
  },
  bottomSheetStyle: {
    backgroundColor: "#FDFDFD",
    borderRadius: 65,
  },
  containerBottomSheet: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  contentBottomSheet: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    marginTop: 20,
    margin: 10
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
  },
  subtitle: {
    marginTop: 25,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 15,
    flexWrap: 'nowrap'
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    padding: 10,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderColor: "#AAA",
  },
  button: {
    marginTop: 15
  },
  underlined: {
    marginTop: 15,
    color: '#646464',
    fontSize: 16,
    textDecorationLine: "underline"
  },
  error: {
    color: 'red',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginTop: 10
  }
})

export default Login
