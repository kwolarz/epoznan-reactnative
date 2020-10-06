import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';

const MovieElement = props => {
  const {container, imageStyle, touchContainer} = styles;
  
  const onElementClick = () => {
    console.log(props.url);
    props.navigation.push('Movie', {
      url: props.url,
      navigation: props.navigation,
    });
  };

  return (
    <TouchableOpacity style={container} onPress={onElementClick}>
      <View style={touchContainer}>
        <Image style={imageStyle} source={{uri: props.imgUrl}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.1,
    borderColor: 'grey',
    borderRadius: 10,
    //padding: 10,
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
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  imageStyle: {
    height: 150,
    width: 105,
    borderRadius: 11,
  },
});

export default MovieElement;
