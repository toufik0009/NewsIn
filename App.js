import React from 'react';
import { Text, View } from 'react-native';
import AppNavigation from './src/appNavigation/AppNavigation';
import { ContextProvider } from './src/contextApi/ContextApi';
import 'react-native-gesture-handler'

export default function App() {
  return (
    <ContextProvider>
      <AppNavigation />
    </ContextProvider>
  );
}

