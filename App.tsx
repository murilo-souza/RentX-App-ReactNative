import React from 'react';
import "./ignoreWarnings"
import {useFonts, Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter'
import {Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold} from '@expo-google-fonts/archivo'
import AppLoading from 'expo-app-loading'
import {ThemeProvider} from 'styled-components'
import theme from './src/styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Routes } from './src/routes';
import { AppProvider } from './src/hooks';



export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if(!fontsLoaded) {
    return <AppLoading/>
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Routes/>
        </AppProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

