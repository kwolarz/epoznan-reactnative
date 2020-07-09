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
} from 'react-native';
import Element from '../components/articleElement.js';
import BigElement from '../components/homeArticleElement.js';

const {width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const {container, imageS} = styles;
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


  function getData () {
    fetch('http://epoznan.herokuapp.com/home')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
      console.log(data);
  };
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);

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
    marginLeft: width / 2 - 60,
  },
});

export default Home;
