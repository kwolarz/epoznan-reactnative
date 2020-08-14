import 'react-native-gesture-handler';
import React, {setState, useState} from 'react';
import {SvgUri} from 'react-native-svg';
import {Platform, Image, Switch, Button, Share} from 'react-native';
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

const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    secondText: '#000000',
    titleText: '#004F8D',
    border: 'black',
  },
};

const Dark = {
  ...DarkTheme,
  //dark: true,
  colors: {
    ...DarkTheme.colors,
    background: '#15202B',
    //card: '#15201B',
    text: '#FFFFFF',
    secondText: '#8899A6',
    titleText: '#1B95E0',
    border: 'white',
  },
};

const onShare = async ({url}) => {
  try {
    const result = await Share.share({
      message: 'https://epoznan.pl/' + String(url),
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const App = () => {
  console.disableYellowBox = true;
  const scheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(
    scheme === 'dark' ? true : false,
  );
  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);
  const showAlert = ({route}) => alert(route.params.url);

  return (
    <AppearanceProvider>
      <NavigationContainer theme={isDarkMode ? Dark : Light}>
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
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  // thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleDarkMode}
                  value={isDarkMode}
                />
              ),
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Article"
            component={Article}
            options={({route}) => ({
              title: '',
              headerTransparent: false,
              headerRightContainerStyle: {
                paddingRight: 5,
                flexDirection: 'row',
              },
              headerRight: () =>
                // <TouchableOpacity onPress={() => alert(route.params.url)} >
                //   <Image title={'share'} source={require('./assets/share2.png')} />

                // </TouchableOpacity>
                [
                  <Button
                    title="Share"
                    onPress={() => onShare({url: route.params.url})}
                  />,
                ],
            })}
          />
          <Stack.Screen
            name="Tag"
            component={Tag}
            options={({route}) => ({title: route.params.tagName})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;
