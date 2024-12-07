import React from "react"
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native'

const logo = require('./../../assets/imgs/logo.png')

const AppLoading = ({ isLoading }) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return null; // Retorna null se não estiver carregando, já que não é necessário renderizar nada aqui
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 20,
    color: '#333',
  },
});

export default AppLoading;
