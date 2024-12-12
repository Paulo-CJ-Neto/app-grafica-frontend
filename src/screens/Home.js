import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  ScrollView
} from 'react-native';
import { Icon } from "react-native-elements";

const backgroundHomeProducts = require('./../../assets/imgs/home/backgroundHomeProducts.png');

const Home = props => {
  const data = [
    {
      id: 1,
      img: require('./../../assets/imgs/copo1.jpg')
    },
    {
      id: 2,
      img: require('./../../assets/imgs/copo2.jpg')
    },
    {
      id: 3,
      img: require('./../../assets/imgs/copo3.jpg')
    },
    {
      id: 4,
      img: require('./../../assets/imgs/copo4.jpg')
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        
        <Text style={styles.title}>Alguns dos nossos produtos:</Text>

        <ImageBackground source={backgroundHomeProducts} style={styles.bgProducts}>
          <FlatList
            snapToInterval={Dimensions.get('window').width - Dimensions.get('window').width * 0.15}
            decelerationRate="fast"
            data={data}
            horizontal
            keyExtractor={i => i.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <Image source={item.img} style={styles.img} />
                </View>
              );
            }}
          />
        </ImageBackground>

        <Text style={styles.title}>Escolha o que deseja fazer!</Text>

        <View style={styles.container}>
          {/* Envolvendo todos os textos dentro de <Text> */}
          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ProdutosDrawer')}>
            <Icon
              name="shopping"
              type="material-community"
              size={30}
              color={"#FDFDFD"}
              style={styles.icon}
            />
            <Text style={styles.textButton}>Ver todos os produtos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Contato')}>
            <Icon
              name="phone"
              type="material-community"
              size={30}
              color={"#FDFDFD"}
              style={styles.icon}
            />
            <Text style={styles.textButton}>Contato</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Perfil')}>
            <Icon
              name="account"
              type="material-community"
              size={30}
              color={"#FDFDFD"}
              style={styles.icon}
            />
            <Text style={styles.textButton}>Visualizar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Carrinho')}>
            <Icon
              name="cart"
              type="material-community"
              size={30}
              color={"#FDFDFD"}
              style={styles.icon}
            />
            <Text style={styles.textButton}>Ver carrinho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  scrollViewContainer: {
    flexGrow: 1, // Faz o conteúdo crescer para ocupar todo o espaço disponível
    justifyContent: 'space-between',
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 270
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    margin: 16
  },
  bgProducts: {
    height: 360,
    width: '100%'
  },
  card: {
    marginHorizontal: 10,
    height: '90%',
    width: 350,
    alignSelf: 'center'
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  button: {
    width: 265,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#D4111C',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FDFDFD',
  },
  icon: {
    marginHorizontal: 15
  }
});

export default Home;
