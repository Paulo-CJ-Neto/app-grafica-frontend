import 'react-native-gesture-handler';
import * as Font from 'expo-font';

import Navigator from "./src/routes/Navigator.js";
import ProductsProvider from './src/contexts/productsContext.js';
import ClientProvider from './src/contexts/clientContext.js';
import AdressProvider from './src/contexts/adressContext.js';
import ValidProvider from './src/contexts/validationContext.js';

import Teste from './src/Teste.js'

const fetchFonts = () => {
  return Font.loadAsync({
    'Poppins-Light': require('./assets/fonts/poppins/Poppins-Light.ttf'),
    'Poppins-Regular': require('./assets/fonts/poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/poppins/Poppins-Bold.ttf'),
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
