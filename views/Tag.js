import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import TagElement from '../components/tagElement.js';
import {useTheme} from '@react-navigation/native';

const Tag = ({route}) => {
  var {tagName, tagID, navigation} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {title, container} = styles;
  const {colors} = useTheme();
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
    setPage((page += 1));

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
  };

  return (
    <View style={[container, {backgroundColor: colors.background}]}>
      {/* <Text style={title}>{tagName}</Text> */}

      <FlatList
        data={data}
        style={{backgroundColor: colors.background}}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 40,
    fontFamily: 'ProximaNova-Extrabld',
    //paddingTop: 30,
    paddingLeft: 10,
  },
});

export default Tag;
