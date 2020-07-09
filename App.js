import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './views/Home.js'
import Article from './views/Article.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home" >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Article" component={Article} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;