import React, {useEffect, useState, BackHandler} from 'react';
import {ActivityIndicator, SafeAreaView, Text, StyleSheet, FlatList, Image, ScrollView, Dimensions} from 'react-native';
import Element from './components/articleElement.js';

const { width } = Dimensions.get('window');

const App = () => {
  const {container, imageS, view} = styles;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [text, setText] = useState((['', '', '']))

  // componentDidMount() {
	// 	setTimeout(() => {this.scrollView.scrollTo({x: -30}) }, 1); // scroll view position fix
	// }

  useEffect(() => {
    fetch('http://192.168.0.108:5000/home')
    .then((response) => response.json())
    .then((json) => {console.log('################################'); (setData(json)); setText(json.middlePosts)})
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style = {container}>
      <ScrollView>
        {/* <Text>{}</Text> */}
        <Image 
          style = {imageS}
          source = {require('./assets/epoznan.png')}
        />
        <ScrollView
          ref = {(scrollView) => {this.scrollView = scrollView; }}
          style = {{}}
          horizontal = {true}
          decelerationRate = {0}
          snapToInterval={width - 60}
          snapToAlignment={"center"}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}>
            <Image
              style = {view}
              source = {{uri: text[0].imgUrl}}/>
            <Image
              style = {view}
              source = {{uri: text[1].imgUrl}}/>
            <Image
              style = {view}
              source = {{uri: text[2].imgUrl}}/>
          </ScrollView>


        {isLoading ? <ActivityIndicator/> : (
            <FlatList 
              data = {data.leftPosts}
              keyExtractor = {({id}, index) => id}
              renderItem = {({item}) => (
                <Element 
                  title = {item.title + '\n' + item.publishDate}
                  imgUrl = {item.imgUrl}
                />
              )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
  },
  imageS: {
    width: 120,
    height: 30,
    marginLeft:20,
  },
  view: {
    marginTop: 10,
    backgroundColor: 'blue',
    width: width - 80,
    margin: 10,
    height: 200,
    borderRadius: 10,
    //paddingHorizontal : 30
  }
})


export default App;