import React from "react";
import {
  Platform,
  Linking
} from 'react-native';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker'
const API_URL = process.env.EXPO_PUBLIC_API_URL

const pickImage = async (setPermissionDenied, setImagem, setDeleteHash) => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      setPermissionDenied(true);
      Alert.alert(
        'Permissão Necessária',
        'Precisamos da sua permissão para acessar a galeria.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Abrir Configurações', onPress: () => Linking.openSettings() }
        ]
      );
      return;
    } else {
      setPermissionDenied(false);
    }
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  })

  if (!result.canceled) {
    const formData = new FormData()
    formData.append('image', {
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      name: result.assets[0].fileName
    })

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setImagem(response.data.link)
      setDeleteHash(response.data.deleteHash)
    } catch (err) {
      console.error('Erro ao fazer upload: ', err)
    }
  }
}

export default pickImage