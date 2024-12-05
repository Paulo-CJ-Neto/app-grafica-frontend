import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";

export const ProductsContext = createContext(null)

function ProductsProvider({ children }) {
  const API_URL = process.env.EXPO_PUBLIC_API_URL

  const [productData, setProductData] = useState(null)
  const [productTypes, setProductTypes] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (productData) {
      defineProductTypes()
    }
  }, [productData])


  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/produtos`)
      setProductData(response.data)
    } catch (err) {
      console.error(err.response || err.message);
      Alert.alert('Vish', 'Não foi possivel buscar os produtos')
    }
  }

  const defineProductTypes = () => {
    const result = productData.reduce((acc, produto) => {
      const existingGroup = acc.find(group => group.type === produto.tipo);

      if (existingGroup) {
        existingGroup.data.includes(produto.subtipo) ? null : existingGroup.data.push(produto.subtipo);
      } else {
        acc.push({
          type: produto.tipo,
          data: [produto.subtipo]
        });
      }

      return acc
    }, []);
    setProductTypes(result)
  }

  const addProductType = (newType, newData) => {
    setProductTypes(...productTypes, { type: newType, data: newData })
  }


  const addProductData = (newProduct) => {
    setProductData([...productData, newProduct])
  }

  return (
    <ProductsContext.Provider value={{ productTypes, addProductType, productData, addProductData, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider