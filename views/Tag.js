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
  Button,
  Share,
  TouchableOpacity,
} from 'react-native';
import BigElement from '../components/homeArticleElement.js';

const Tag = ({route}) => {
  const {tagName, tagID, navigation} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {title, container} = styles;
  var page = -1;

  useEffect(() => {
    fetch('http://epoznan.herokuapp.com/news/' + tagID + '/' + page)
      .then(response => response.json())
      .then(json => {
        console.log(tagName);
        setData(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={container}>
      <Text style={title}>{tagName}</Text>

      <FlatList
        data={data.articles}
        style={{}}
        keyExtractor={({id}, index) => id}
        columns={2}
        renderItem={({item}) => (
          <BigElement
            imgUrl={item.imgUrl}
            title={item.title}
            url={item.url}
            update={item.update}
            navigation={navigation}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 40,
    fontFamily: 'Proxima Nova Extrabold',
    paddingTop: 30,
    paddingLeft: 10,
  },
});

export default Tag;
