import React, { useCallback, useContext, useEffect, useState, } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Icon } from "react-native-elements";

import { ClientContext } from "../contexts/clientContext";
import { AdressContext } from "../contexts/adressContext"
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { EXPO_PUBLIC_API_URL as API_URL } from '@env'

const fotoPerfil = require('./../../assets/imgs/perfil/eu_na_bis.jpg')

const Perfil = props => {

  const { client, setClient } = useContext(ClientContext)
  const { adress, setAdress } = useContext(AdressContext)

  const [refreshing, setRefreshing] = useState(false)

  useFocusEffect(
    useCallback(() => {
      onRefresh()
    }, [])
  )

  // useEffect(() => {
  //   if (!isRefreshed) {
  //     onRefresh()
  //     setIsRefreshed(true)
  //   }
  // }, [adress, client])

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      const { clientBD, enderecoBD } = await fetchClient();
      setClient(clientBD || {});
      setAdress(enderecoBD || {});
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setRefreshing(false);
    }
  }

  const fetchClient = async () => {
    const infos = {}
    try {
      const response = await axios.get(`${API_URL}/api/clientes/${client.id}`)
      const clientBD = response.data
      infos.clientBD = clientBD
    } catch (err) {
      console.error("ta no erro do cliente", err.response.data);
    }

    if (client.enderecoId) {
      try {
        const response = await axios.get(`${API_URL}/api/endereco/${client.enderecoId}`)
        const enderecoBD = response.data
        infos.enderecoBD = enderecoBD
      } catch (err) {
        console.error("ta no erro do endereco", err.response.data);
      }
    }

    return infos
  }



  const dataClient = {
    name: client.nome,
    cpf: client.cpf || "",
    telefone: client.telefone || ""
  }

  const dataAdress = {
    city: adress.cidade || "",
    uf: adress.uf || "",
    street: adress.rua || "",
    neighborhood: adress.bairro || "",
    number: adress.numero || "",
    cep: adress.cep || "",
    complement: adress.complemento || "",
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing} onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
        <Image source={fotoPerfil} style={styles.img} />

        <Text style={styles.viewField}> <Text style={styles.textBold}>Nome: </Text>
          {dataClient.name}
        </Text>
        <Text style={styles.viewField}> <Text style={styles.textBold}>CPF: </Text>
          {dataClient.cpf}
        </Text>
        <Text style={styles.viewField}> <Text style={styles.textBold}>Telefone: </Text>
          {dataClient.telefone}
        </Text>

        <View style={styles.viewField}>
          <Text style={styles.textBold}>Endereço de entrega:</Text>
          <View style={styles.endereco}>
            <Text ><Text style={styles.textBold}>Cidade: </Text>{dataAdress.city}</Text>
            <Text><Text style={styles.textBold}>UF: </Text>{dataAdress.uf}</Text>
            <Text><Text style={styles.textBold}>Rua: </Text>{dataAdress.street}</Text>
            <Text><Text style={styles.textBold}>Bairro: </Text>{dataAdress.neighborhood}</Text>
            <Text><Text style={styles.textBold}>Numero: </Text>{dataAdress.number}</Text>
            <Text><Text style={styles.textBold}>CEP: </Text>{dataAdress.cep}</Text>
            <Text><Text style={styles.textBold}>Complemento: </Text>{dataAdress.complement}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.containerLogout}
          onPress={() => props.navigation.navigate('Login')}
        >
          <Text style={styles.logout}>Sair</Text>
          <Icon name="logout" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FDFDFD'
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100
  },
  viewField: {
    borderRadius: 10,
    backgroundColor: '#EBEBEB',
    padding: 10,
    width: Dimensions.get('window').width - 60,
    marginTop: 16,
    overflow: 'hidden',
    fontFamily: 'Poppins-Light',
    fontSize: 16,
  },
  textBold: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },
  endereco: {
    marginTop: 8,
    marginLeft: 16,
  },
  containerLogout: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: (Dimensions.get('window').width - 60) / 3,
    backgroundColor: '#FF8686',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 40,
    flexDirection: 'row'
  },
  logout: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginRight: 10
  }
})

export default Perfil