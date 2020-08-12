import 'react-native-gesture-handler';
import React, {setState, useState} from 'react';
import {SvgUri} from 'react-native-svg';
import {Platform, Image, Switch} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './views/Home.js';
import Article from './views/Article.js';
import Tag from './views/Tag.js';

const Stack = createStackNavigator();



const iosLogo = () => {
  return (
    <Image
      style={{width: 120, height: 19.2, resizeMode: 'cover'}}
      source={require('./assets/logoEpoznan2.png')}
    />
  );
};

const androidLogo = () => {
  return (
    <SvgUri
      width={120}
      height={19.2}
      uri="https://epoznan.pl/new_assets/img/logo.svg"
    />
  );
};

const LogoSelect = () =>
  Platform.select({
    ios: iosLogo,
    android: androidLogo,
  })();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    //background: 'black',
    text: 'blue',
  },
};

const App = () => {
  console.disableYellowBox = true;
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          //screenOptions={{headerShown: false}}
          // props => <LogoTitle {...props} />
          initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: <LogoSelect />,
              headerRight: () => (
                <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDarkMode}
                value={isDarkMode}
              />),
              headerShown: true,
            }}
          />
          <Stack.Screen name="Article" component={Article} />
          <Stack.Screen name="Tag" component={Tag}  />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;
