import 'react-native-gesture-handler';
import * as Font from 'expo-font';

import Navigator from "./routes/Navigator";
import ProductsProvider from './contexts/productsContext';
import ClientProvider from './contexts/clientContext.js';
import AdressProvider from './contexts/adressContext.js';
import ValidProvider from './contexts/validationContext.js';

import Teste from './Teste.js'

const fetchFonts = () => {
  return Font.loadAsync({
    'Poppins-Light': require('../assets/fonts/poppins/Poppins-Light.ttf'),
    'Poppins-Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
  });
};

export default function App() {
  fetchFonts()

  return (
    // <Teste/>
    <ValidProvider>
      <ClientProvider>
        <AdressProvider>
          <ProductsProvider>
            <Navigator />
          </ProductsProvider>
        </AdressProvider>
      </ClientProvider >
    </ValidProvider>
  );
}