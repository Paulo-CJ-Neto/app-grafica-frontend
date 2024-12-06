import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { EXPO_PUBLIC_API_URL as API_URL } from '@env'

export const ClientContext = createContext()

function ClientProvider({ children }) {

  const [client, setClient] = useState(null)
  const [clientCart, setClientCart] = useState([])

  const addProductToClientCart = async (newProduct) => {
    try {
      const result = await axios.post(`${API_URL}/api/carrinho`, newProduct)
      setClientCart([...clientCart, result.data])
    } catch (err) {
      console.error('nao foi possivel adicionar produto ao carrinho', err)
    }
  }

  const deleteProductFromClientCart = async (deletedProduct) => {
    try {
      await axios.delete(`${API_URL}/api/carrinho/${deletedProduct.id}`)
      const newCart = clientCart.filter((cartItem) => cartItem.id !== deletedProduct.id)
      setClientCart(newCart)
    } catch (err) {
      console.error(`Não foi possível deletar o item do carrinho de id ${deletedProduct.id}`, err)
    }
  }

  useEffect(() => {
    onRefreshCartItems()
  }, [client])

  const onRefreshCartItems = async () => {
    if (client) {
      try {
        const result = await axios.get(`${API_URL}/api/carrinho/${client.id}`)
        setClientCart(result.data)
      } catch (err) {
        console.error(err);
      }
    }
  }



  return (
    <ClientContext.Provider value={{ client, setClient, clientCart, addProductToClientCart, deleteProductFromClientCart, onRefreshCartItems }}>
      {children}
    </ClientContext.Provider>
  )
}

export default ClientProvider