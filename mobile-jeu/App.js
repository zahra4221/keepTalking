import * as React from 'react';
import { View, Text,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen de Zahra</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen de zahra</Text>
    </View>
  );
}

const Stack = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={HomeScreen} />
        <Stack.Screen name="SettingTabs" component={SettingsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
