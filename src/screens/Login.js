import React, { useState, useMemo, useRef, useContext } from "react";
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
  Keyboard,
} from "react-native"
import { EXPO_PUBLIC_API_URL as API_URL } from '@env'
import BottomSheet from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Icon } from 'react-native-elements'
import { ClientContext } from "../contexts/clientContext";
import { AdressContext } from "../contexts/adressContext"

import axios from "axios"

const backgroundBlur = require("../../assets/imgs/background_blur.png")
const logo = require("../../assets/imgs/logo2.png")
const buttonAcessar = require("../../assets/imgs/Button-acessar.png")


const Login = props => {
  const [email, setEmail] = useState('paulocjnetopcjn@gmail.com')
  const [senha, setSenha] = useState('P22072004n')
  const [check, setCheck] = useState(false)
  const [checkStyle, setCheckStyle] = useState('checkbox-blank-outline')
  const [mensagemErro, setMensagemErro] = useState('')

  const bottomSheetRef = useRef(null)

  const clientContext = useContext(ClientContext)
  const adressContext = useContext(AdressContext)

  const snapPoints = useMemo(() => ['62%', '90%'], []);

  const bottomSheetUp = () => bottomSheetRef.current?.expand()
  const bottomSheetDown = () => bottomSheetRef.current?.collapse()

  const changeEmail = (email) => setEmail(email)
  const changeSenha = (senha) => setSenha(senha)

  const limparCampos = () => {
    setEmail('')
    setSenha('')
    setCheck(false)
    setCheckStyle('checkbox-blank-outline')
    setMensagemErro('')
  }

  const login = async () => {
    setEmail(email.trim())
    setSenha(senha.trim())
    try {
      const client = await axios.post(`${API_URL}/api/login`, {
        email,
        senha
      })
      props.navigation.navigate("Home")
      props.navigation.canGoBack(false)
      clientContext.setClient(client.data)
      limparCampos()
      adressContext.setIsLoggedIn(true)
    } catch (err) {
      setMensagemErro("Não foi encontrado nenhum registro!")
      if (err.response) {
        setMensagemErro(err.response.data)
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
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            backgroundStyle={styles.bottomSheetStyle}
            style={styles.containerBottomSheet}
          >
            <View style={styles.contentBottomSheet}>
              <Text style={styles.title} >Entre na sua conta!</Text>
              <Text style={styles.subtitle}>Forneça os dados necessários, por favor:</Text>

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
                  onBlur={bottomSheetDown}
                />
              </View>
              <View style={styles.inputBar}>
                <Icon name={checkStyle} type="material-community" size={35}
                  onPress={() => {
                    if (checkStyle === "checkbox-blank-outline") {
                      setCheckStyle('checkbox-marked')
                      setCheck(true)
                    } else {
                      setCheckStyle('checkbox-blank-outline')
                      setCheck(false)
                    }
                  }} />
                <Text style={styles.input}>Lembre-se de mim</Text>
              </View>

              {mensagemErro
                ? <Text style={styles.error}>{mensagemErro}</Text>
                : null
              }

              <TouchableOpacity onPress={login}>
                <Image
                  style={styles.button}
                  source={buttonAcessar}
                />
              </TouchableOpacity>

              <TouchableWithoutFeedback onPress={() => {
                props.navigation.navigate('Cadastro')
                limparCampos()
              }}>
                <Text style={styles.underlined}>Ainda não possui cadastro?</Text>
              </TouchableWithoutFeedback>
            </View>
          </BottomSheet>
        </ImageBackground>
      </GestureHandlerRootView >
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
    marginTop: 37,
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