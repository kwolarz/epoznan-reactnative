import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import Element from '../components/articleElement.js';

const {width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const {container, imageS, view} = styles;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState(['', '', '']);

  useEffect(() => {
    fetch('http://epoznan.herokuapp.com/home')
      .then(response => response.json())
      .then(json => {
        setData(json);
        setText(json.middlePosts);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <Image style={imageS} source={require('../assets/epoznan.png')} />
          <ScrollView
            ref={scrollView => {
              this.scrollView = scrollView;
            }}
            style={{}}
            horizontal={true}
            decelerationRate={'fast'}
            snapToInterval={width - 60}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30,
            }}>
            <Image style={view} source={{uri: text[0].imgUrl}} />
            <Image style={view} source={{uri: text[1].imgUrl}} />
            <Image style={view} source={{uri: text[2].imgUrl}} />
          </ScrollView>

          <FlatList
            data={data.leftPosts}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <Element
                title={item.title}
                publishDate={item.publishDate}
                imgUrl={item.imgUrl}
                url={item.url}
                navigation={navigation}
              />
            )}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'white',
  },
  imageS: {
    width: 120,
    height: 30,
    marginLeft: 20,
    
  },
  view: {
    marginTop: 10,
    backgroundColor: 'blue',
    width: width - 80,
    margin: 10,
    height: 200,
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'black',

    //paddingHorizontal : 30
  },
});

export default Home;
