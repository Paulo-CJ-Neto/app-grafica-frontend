import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Icon } from "react-native-elements";
import { ClientContext } from "../contexts/clientContext";
import InputPerfilEditar from "../components/InputPerfilEditar";
import axios from "axios";
import { ValidContext } from "../contexts/validationContext";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const fotoPerfil = require('./../../assets/imgs/perfil/eu_na_bis.jpg');

const PerfilEditar = (props) => {
  const [isSaving, setIsSaving] = useState(false);
  const { client } = useContext(ClientContext);
  const { valid, setValid } = useContext(ValidContext);

  useFocusEffect(
    useCallback(() => {
      setValid(true)
    }, [])
  )

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('beforeRemove', (e) => {
      if (isSaving) {
        return;
      }

      e.preventDefault();

      Alert.alert(
        'Descartar alterações?',
        'Você tem alterações não salvas. Deseja descartá-las e sair?',
        [
          { text: "Não", style: 'cancel', onPress: () => { } },
          {
            text: "Sim",
            style: 'destructive',
            onPress: () => {
              props.navigation.dispatch(e.data.action);
            },
          },
        ]
      );
    });

    // Limpar o listener quando o componente é desmontado
    return unsubscribe;
  }, [props.navigation, valid, isSaving]);

  const save = async () => {
    if (valid) {
      setIsSaving(true); // Definir isSaving para true ao iniciar o salvamento
      try {
        await saveUpdatedClient();
        props.navigation.navigate('Perfil');
      } catch (err) {
        console.error("Erro ao salvar cliente: ", err.response?.data || err.message);
      } finally {
        setIsSaving(false); // Resetar o estado após salvar
      }
    }
  };

  const saveUpdatedClient = async () => {
    try {
      await axios.put(`${API_URL}/api/clientes/${client.id}`, client);
    } catch (err) {
      console.error("Erro ao atualizar cliente: ", err.response?.data || err.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <View style={styles.container}>
          <View style={styles.containerImg}>
            <Image source={fotoPerfil} style={styles.img} />
            <TouchableOpacity style={styles.editImage}>
              <Icon name="image-edit" type="material-community" size={30} />
            </TouchableOpacity>
          </View>
          <InputPerfilEditar label="Nome:" field="nome" />
          <InputPerfilEditar label="Telefone:" field="telefone" />
          <InputPerfilEditar label="CPF:" field="cpf" setValid={setValid} valid={valid} />
          <TouchableOpacity
            disabled={!valid}
            onPress={() => {
              props.navigation.navigate('PerfilEditarEndereco', { enderecoId: client.enderecoId, clientId: client.id });
            }}
          >
            <View style={styles.viewField}>
              <Text style={styles.textBold}>{client.enderecoId ? "Alterar" : "Adicionar"} endereço </Text>
              <Icon name="add-circle" color={'green'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!valid}
            style={valid ? styles.containerSave : [styles.containerSave, styles.disabled]}
            onPress={save}
          >
            <Text style={styles.save}>Salvar</Text>
            <Icon name="done" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  containerImg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerSave: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: (Dimensions.get('window').width - 60) / 2,
    backgroundColor: '#63b620',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row'
  },
  save: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginRight: 10
  },
  editImage: {
    marginLeft: 20
  },
  scrollStyle: {
    flexGrow: 1
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBold: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: '#AAAAAA',
  }
});

export default PerfilEditar;
