import React, { createContext, useEffect, useState, useContext } from "react";
import { ClientContext } from "./clientContext";
import axios from "axios";
import { EXPO_PUBLIC_API_URL as API_URL } from '@env'

export const AdressContext = createContext()

function AdressProvider({ children }) {
  const client = useContext(ClientContext).client

  const [adress, setAdress] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const fetchAdress = async () => {
    if (client && client.enderecoId) {
      try {
        const endereco = (await axios.get(`${API_URL}/api/endereco/${client.enderecoId}`)).data
        setAdress(endereco)
      } catch (err) {
        console.error('adressContext', err);
      }
    }
  }

  useEffect(() => {
    client ? fetchAdress() : null
  }, [isLoggedIn])

  return (
    <AdressContext.Provider value={{ adress, setAdress, setIsLoggedIn }}>
      {children}
    </AdressContext.Provider>
  )
}

export default AdressProvider