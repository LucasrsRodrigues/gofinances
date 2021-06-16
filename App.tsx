import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

import {  
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { AppRouter } from './src/routes/app.routes';

import theme from './src/global/styles/theme';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />;
  }

  return(
    <ThemeProvider theme={theme}>
      <StatusBar 
        animated={true}
        backgroundColor={theme.colors.primary}
      />
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </ThemeProvider>
  );
}

