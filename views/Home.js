import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Element from '../components/articleElement.js';
import BigElement from '../components/homeArticleElement.js';
import WeatherElement from '../components/weatherElement.js';
import MovieElement from '../components/movieElement.js';


const {width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const {
    container,
    imageS,
    moreArticles,
    sectionTitle,
    moreArticlesButton,
  } = styles;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetch('http://epoznan.herokuapp.com/home')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function getData() {
    fetch('http://epoznan.herokuapp.com/home')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
    console.log(data);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
    console.log(data.weatherIcon);
  }, []);

  const onMoreArticlesButtonClick = () => {
    navigation.push('Tag', {
      tagName: 'wiadomości',
      tagID: '0',
      navigation: navigation,
    });
  };

  return (
    <SafeAreaView style={container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Image style={imageS} source={require('../assets/epoznan.png')} />
          <ScrollView
            // ref={scrollView2 => {
            //   this.scrollView = scrollView2;
            // }}
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
            <BigElement
              imgUrl={data.middlePosts[0].imgUrl}
              title={data.middlePosts[0].title}
              url={data.middlePosts[0].url}
              update={data.middlePosts[0].update}
              navigation={navigation}
            />
            <BigElement
              imgUrl={data.middlePosts[1].imgUrl}
              title={data.middlePosts[1].title}
              url={data.middlePosts[1].url}
              update={data.middlePosts[1].update}
              navigation={navigation}
            />
            <BigElement
              imgUrl={data.middlePosts[2].imgUrl}
              title={data.middlePosts[2].title}
              url={data.middlePosts[2].url}
              update={data.middlePosts[2].update}
              navigation={navigation}
            />
          </ScrollView>

          <Text style={sectionTitle}>Dziś w Poznaniu</Text>
          <WeatherElement
            temperatureIcon={data.temperatureIcon}
            temperatureCurrent={data.temperatureCurrent}
            temperatureMin={data.temperatureMin}
            rain={data.rain}
            wind={data.wind}
            airIcon={data.airIcon}
            airQuality={data.airQuality}
            airState={data.airState}
          />

          <Text style={sectionTitle}>Najnowsze</Text>

          <FlatList
            data={data.today}
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
          <TouchableOpacity
            style={moreArticlesButton}
            onPress={onMoreArticlesButtonClick}>
            <View style={moreArticles}>
              <Text style={{color: '#004F8D'}}>Więcej wiadomości</Text>
            </View>
          </TouchableOpacity>

          <Text style={sectionTitle}>W kinie</Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data.inCinema}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              < MovieElement imgUrl={item.imgUrl} />
            )}
          />

          <Text style={sectionTitle}>Kalendarium</Text>
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
    marginLeft: width / 2 - 60,
  },

  moreArticles: {
    borderWidth: 0.5,
    borderColor: '#004F8D',
    borderRadius: 15,
    padding: 7,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },

  moreArticlesButton: {
    paddingHorizontal: 10,
    //paddingBottom: 10,
    width: '40%',
    alignSelf: 'flex-end',
  },

  sectionTitle: {
    fontSize: 27,
    fontFamily: 'ProximaNova-Bold',
    paddingLeft: 20,
    padding: 7,
    color: '#004F8D',
  },
});

export default Home;
