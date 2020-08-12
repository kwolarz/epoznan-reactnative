import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';

const Element = props => {
  const {
    container,
    textViewStyle,
    imageStyle,
    publishDateStyle,
    titleStyle,
    touchContainer,
  } = styles;

  const onElementClick = () => {
    console.log(props.url);
    props.navigation.push('Article', {
      url: props.url,
      navigation: props.navigation,
    });
  };

  return (
    <View style={container}>
      <TouchableOpacity style={touchContainer} onPress={onElementClick}>
        <View style={textViewStyle}>
          <Text style={publishDateStyle}>{props.publishDate}</Text>
          <Text style={titleStyle}>{props.title}</Text>
        </View>
        <Image style={imageStyle} source={{uri: props.imgUrl}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  touchContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
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
  textViewStyle: {
    paddingRight: 10,
    fontSize: 14,
    textAlign: 'left',
    width: '72%',
  },
  titleStyle: {
    marginTop: 1,
    fontSize: 18,
    fontFamily: 'ProximaNova-Bold',
  },
  publishDateStyle: {
    alignSelf: 'flex-start',
    //paddingRight: 5,
    padding: 1,
    paddingBottom: 3,
    fontFamily: 'ProximaNovaT-Thin', //alt light
    fontSize: 14,
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 11,
  },
});

export default Element;
