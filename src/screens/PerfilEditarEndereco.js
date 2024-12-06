import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { AdressContext } from "../contexts/adressContext";
import { ValidContext } from "../contexts/validationContext";
import InputPerfilEditar from "../components/InputPerfilEditar";
import axios from "axios";
import { EXPO_PUBLIC_API_URL as API_URL } from '@env'

const PerfilEditarEndereco = props => {
  const { adress } = useContext(AdressContext);
  const { valid, setValid } = useContext(ValidContext);

  const updateAdressBD = async () => {
    if (valid) {
      try {
        if (props.route.params.enderecoId) {
          await axios.put(`${API_URL}/api/endereco/${props.route.params.enderecoId}`, adress);
        } else {
          await axios.post(`${API_URL}/api/endereco/${props.route.params.clientId}`, adress);
        }
        props.navigation.navigate('PerfilEditar');
      } catch (err) {
        console.error("Erro ao atualizar/criar endereço:", err.response?.data || err.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputPerfilEditar label="Cidade:" field="cidade" />
      <InputPerfilEditar label="UF:" field="uf" />
      <InputPerfilEditar label="Bairro:" field="bairro" />
      <InputPerfilEditar label="Rua:" field="rua" />
      <InputPerfilEditar label="Número:" field="numero" />
      <InputPerfilEditar label="CEP:" field="cep" setValid={setValid} valid={valid} />
      <InputPerfilEditar label="Complemento:" field="complemento" />
      <TouchableOpacity
        disabled={!valid}
        style={valid ? styles.containerSave : [styles.containerSave, styles.disabled]}
        onPress={updateAdressBD}
      >
        <Text style={styles.save}>Salvar endereço</Text>
        <Icon name="done" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FDFDFD'
  },
  textBold: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: 'Poppins-Light',
    fontSize: 16,
  },
  containerSave: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: (Dimensions.get('window').width - 60) * 3 / 5,
    backgroundColor: '#63b620',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 40,
    flexDirection: 'row'
  },
  save: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginRight: 10
  },
  disabled: {
    backgroundColor: '#AAAAAA',
  }
});

export default PerfilEditarEndereco;
