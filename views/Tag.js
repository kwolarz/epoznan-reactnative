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
import TagElement from '../components/tagElement.js';

const Tag = ({route}) => {
  var {tagName, tagID, navigation} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {title, container} = styles;
  var [page, setPage] = useState(-1);

  useEffect(() => {
    fetch('http://epoznan.herokuapp.com/news/' + tagID + '/' + page)
      .then(response => response.json())
      .then(json => {
        console.log(tagName);
        setData(json.articles);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleMore = () => {
    setPage(page += 1);
    
    fetch('http://epoznan.herokuapp.com/news/' + tagID + '/' + page)
    .then(response => response.json())
    .then(json => {
      //console.log(tagName);
      var newData = [...data, ...json.articles];
      setData(newData);
      console.log(data.length, page);
    })
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
  }

  return (
    <SafeAreaView style={container}>
      <Text style={title}>{tagName}</Text>

      <FlatList
        data={data}
        style={{}}
        keyExtractor={({id}, index) => id}
        columns={2}
        renderItem={({item}) => (
          <TagElement
            imgUrl={item.imgUrl}
            title={item.title}
            url={item.url}
            update={item.update}
            navigation={navigation}
          />
        )}

        onEndReached={handleMore}
        onEndReachedThreshold={0.9}
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
    fontFamily: 'ProximaNova-Extrabld',
    paddingTop: 30,
    paddingLeft: 10,
  },
});

export default Tag;
