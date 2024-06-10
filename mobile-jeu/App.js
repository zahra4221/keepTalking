import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomePage from './components/HomePage';
import Filpage from './components/FilPage';
import SymbolPage from './components/SymbolPage';
import MemoryPage from './components/MemoryPage';


const Stack = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomePage" component={HomePage} />
           <Stack.Screen name="FilPage" component={Filpage} />
          <Stack.Screen name="SymbolPage" component={SymbolPage} />
          <Stack.Screen name="MemoryPage" component={MemoryPage} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
