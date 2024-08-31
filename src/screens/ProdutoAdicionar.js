import React from "react";
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
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ProdutoAdicionar = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100} // Ajuste o offset conforme necessário
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.textMedium}>1° Escolha a foto:</Text>
          <TouchableOpacity style={styles.img}>
            <Image
              source={{ uri: 'https://placehold.co/300x300/png' }}
              style={{ width: 300, height: 300 }}
            />
          </TouchableOpacity>

          <Text style={styles.textMedium}>2° Informações do produto:</Text>

          <Text style={styles.label}>Título do produto:</Text>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor={"#AAA"}
              multiline={true}
              numberOfLines={2}
            />
          </View>
          <Text style={styles.label}>Subtítulo do produto:</Text>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Subtítulo"
              placeholderTextColor={"#AAA"}
              multiline={true}
              numberOfLines={2}
            />
          </View>
          <Text style={styles.label}>Descrição do produto:</Text>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              placeholderTextColor={"#AAA"}
              multiline={true}
              numberOfLines={2}
            />
          </View>
          <Text style={styles.label}>Preço do produto:</Text>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Preço"
              placeholderTextColor={"#AAA"}
              multiline={true}
              numberOfLines={2}
            />
          </View>

          <Text style={styles.textMedium}>3° Filtragem do produto:</Text>
          <Text style={styles.label}>Tipo do produto:</Text>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Tipo"
              placeholderTextColor={"#AAA"}
              multiline={true}
              numberOfLines={2}
            />
          </View>
          <Text style={styles.label}>Subtipo do produto:</Text>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Subtipo"
              placeholderTextColor={"#AAA"}
              multiline={true}
              numberOfLines={2}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Icon name="plus-circle" size={25} color="#000" />
            <Text style={styles.add}>Adicionar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

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
  }
});

export default ProdutoAdicionar;
