import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './views/Home.js';
import Article from './views/Article.js';
import Tag from './views/Tag.js';

const Stack = createStackNavigator();

const App = () => {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Article" component={Article} />
        <Stack.Screen name="Tag" component={Tag} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
