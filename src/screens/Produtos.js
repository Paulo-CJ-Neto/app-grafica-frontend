import React, { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl
} from "react-native";

import CardProtudo from './../components/CardProduto'
import { ProductsContext } from "../contexts/productsContext";
import { useFocusEffect } from "@react-navigation/native";

const Produtos = props => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    fetchProducts()
    setRefreshing(false)
  }

  const { productData, fetchProducts } = useContext(ProductsContext)

  const showIndividualProduct = (id) => {
    props.navigation.navigate('ProdutoFoco', { id })
  }

  useFocusEffect(
    useCallback(() => {
      onRefresh()
    }, [])
  )

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ minHeight: '100%' }}
      >
        <Text style={styles.title}>{props.route.params ? props.route.params.filter : 'Todos os produtos'}</Text>
        <View style={styles.containerProdutos}>
          {props.route.params
            ? productData.filter(product => product.subtipo === props.route.params.filter).map(product => <CardProtudo key={product.id} {...product} showIndividualProduct={showIndividualProduct} />)
            : productData.map(product => <CardProtudo key={product.id} {...product} showIndividualProduct={showIndividualProduct} />)
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  containerProdutos: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%'
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 16
  },
})

export default Produtos