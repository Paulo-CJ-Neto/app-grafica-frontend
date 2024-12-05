import React from "react";
import {
  View,
} from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Icon } from 'react-native-elements';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";

import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import Home from "../screens/Home";
import Contato from "../screens/Contato";
import Perfil from "../screens/Perfil";
import Carrinho from "../screens/Carrinho";
import ProdutoFoco from "../screens/ProdutoFoco";
import ProdutoAdicionar from "../screens/ProdutoAdicionar";

import PerfilEditar from "../screens/PerfilEditar";
import PerfilEditarEndereco from "../screens/PerfilEditarEndereco";

const Stack = createStackNavigator()

const Navigator = () => {

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
            fontSize: 22,
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={(props) => ({
            headerLeft: () => {},
            headerRight: () => {},
            gestureEnabled: false
          })}
        />
        <Stack.Screen
          name="Contato"
          component={Contato}
        />
        <Stack.Screen
          name="ProdutosDrawer"
          component={DrawerNavigator}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ProdutoFoco"
          component={ProdutoFoco}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={ (props) => ({
              headerRight: () => (
                <Icon
                  name="square-edit-outline"
                  type="material-community"
                  size={30}
                  style={{ marginRight: 28 }}
                  onPress={() => props.navigation.navigate('PerfilEditar', )}
                />
              )
            })
          }
        />
        <Stack.Screen
          name="Carrinho"
          component={Carrinho}
        />
        <Stack.Screen
          name="PerfilEditar"
          component={PerfilEditar}
          options={{
            headerTitle: "Editar Perfil",
          }}
        />
        <Stack.Screen
          name="PerfilEditarEndereco"
          component={PerfilEditarEndereco}
          options={{
            headerTitle: "Editar Endereço",
          }}
        />
        <Stack.Screen
          name="ProdutoAdicionar"
          component={ProdutoAdicionar}
          options={{
            headerTitle: "Adicionar Produto",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator