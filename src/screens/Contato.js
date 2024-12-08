import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const bgMapa = require('./../../assets/imgs/contato/bgMapa.png');
const buttonInstagram = require('./../../assets/imgs/contato/buttonInstagram.png');
const buttonWpp = require('./../../assets/imgs/contato/buttonWpp.png');
const buttonFB = require('./../../assets/imgs/contato/buttonFB.png');
const buttonSite = require('./../../assets/imgs/contato/buttonSite.png');

const stringWpp = "https://wa.me/5521988808161?text=Vim pelo aplicativo da gráfica, posso falar com a atendente?";
const stringInsta = "https://www.instagram.com/agraficadoseventos/";
const stringFB = "https://www.facebook.com/agraficadoseventos1?locale=pt_BR";
const stringSite = "https://agraficadoseventos.com.br/";
const latitude = -22.911433820206216;
const longitude = -43.54594598554233;

const openWaze = async () => {
  const url = `waze://?ll=${latitude},${longitude}&navigate=yes`;

  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Waze não está instalado no seu dispositivo.');
  }
};

const OpenURLButton = ({ url, imgSource }) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Não foi possível abrir a URL: ${url}`);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
    >
      <Image source={imgSource} />
    </TouchableOpacity>
  );
};

const Contato = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.title}>Endereço:</Text>
        <View style={styles.containerEndereço}>
          <Text style={styles.subtitle} selectable>
            R. Mora, 1277 - Campo Grande, Rio de Janeiro - RJ, 23052-510
            <TouchableOpacity onPress={openWaze}>
              <Text style={styles.wazeText}>Abrir no Waze?</Text>
            </TouchableOpacity>
          </Text>
        </View>

        <ImageBackground style={styles.bgMapa} source={bgMapa} >
          <View style={styles.mapContainer}>
            <MapView
              zoomEnabled
              style={styles.map}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{ latitude: latitude, longitude: longitude }}
                title="Endereço da Gráfica"
              />
            </MapView>
          </View>
        </ImageBackground>

        <Text style={styles.title}>Contatos:</Text>
        <View style={styles.containerContatos}>
          <OpenURLButton
            imgSource={buttonWpp}
            url={stringWpp}
          />
          <OpenURLButton
            imgSource={buttonInstagram}
            url={stringInsta}
          />
          <OpenURLButton
            imgSource={buttonFB}
            url={stringFB}
          />
          <OpenURLButton
            imgSource={buttonSite}
            url={stringSite}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 16,
    fontFamily: 'Poppins-Medium',
    fontSize: 20
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    alignSelf: 'center',
    marginHorizontal: 25,
    marginBottom: 10
  },
  bgMapa: {
    justifyContent: 'center',
    height: 320
  },
  containerContatos: {
    marginHorizontal: 80,
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    width: '45%',
    marginBottom: 10
  },
  mapContainer: {
    height: 300,
    marginHorizontal: 20,
    marginVertical: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  wazeText: {
    textDecorationLine: "underline",
    fontFamily: 'Poppins-Medium',
    color: 'blue',
    marginLeft: 20
  },
  containerEndereço: {
    justifyContent: 'center'
  }
});

export default Contato;
