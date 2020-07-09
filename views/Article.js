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
  View,
} from 'react-native';

const Article = ({route}) => {
  const {url} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {
    topImageStyle,
    container,
    titleStyle,
    scrollContainer,
    dateShareContainer,
    dateStyle,
    shareStyle,
    dateContainer,
    shareContainer,
    descContainer,
    descStyle,
    textContainer,
    textStyle,
  } = styles;

  useEffect(() => {
    fetch('http://epoznan.herokuapp.com/article/' + url)
      .then(response => response.json())
      .then(json => {
        console.log(url);
        setData(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={container}>
      {isLoading ? (
        <ActivityIndicator style={{ padding: '50%'}}/>
      ) : (
        <ScrollView style={scrollContainer}>
          <Image style={topImageStyle} source={{uri: data.topImageURL}} />
          <Text style={titleStyle}>{data.title}</Text>
          <View style={dateShareContainer}>
            <View style={dateContainer}>
              <Text style={dateStyle}>
                {data.publishDate + ' | ' + data.author}
              </Text>
            </View>
            <View style={shareContainer}>
              {/* <Image
                style={shareStyle}
                source={require('../assets/share1.png')}
              /> */}
            </View>
          </View>

          <View style={descContainer}>
            <Text style={descStyle}>{data.description}</Text>
          </View>

          <View style={textContainer}>
            <Text style={textStyle}>{data.text}</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topImageStyle: {
    width: '100%',
    height: 250,
  },

  container: {
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
  },

  titleStyle: {
    fontSize: 26,
    padding: 10,
    //fontWeight: 'bold',
    fontFamily: 'Proxima Nova Extrabold',
  },

  dateShareContainer: {
    paddingHorizontal: '10%',
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shareStyle: {
    width: 32,
    height: 32,
    alignItems: 'center',
  },

  dateContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '65%',
  },

  shareContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '65%',
    paddingBottom: 2,
  },

  descContainer: {
    padding: 10,
    //paddingRight: 5,
  },

  descStyle: {
    fontSize: 20,
    //fontWeight: 'bold',
    fontFamily: 'Proxima Nova Alt Bold',
  },

  textContainer: {
    padding: 10,
  },

  textStyle: {
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
  },
});

export default Article;
