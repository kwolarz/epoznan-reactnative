import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';

const Element = props => {
  const {
    container,
    textViewStyle,
    imageStyle,
    publishDateStyle,
    titleStyle,
  } = styles;

  const onElementClick = () => {
    console.log(props.url);
    props.navigation.navigate('Article', {
      url: props.url,
    });
  };

  return (
    <TouchableOpacity style={container} onPress={onElementClick}>
      <View style={textViewStyle}>
        <Text style={publishDateStyle}>{props.publishDate}</Text>
        <Text style={titleStyle}>{props.title}</Text>
      </View>
      <Image style={imageStyle} source={{uri: props.imgUrl}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    paddingTop: 22,
    flexDirection: 'row',
    // backgroundColor: 'ghostwhite',
    // borderRadius: 10,
    // borderWidth: 1,
    // width: '98%',
    // //paddingBottom: 5,
    // justifyContent: 'center',
  },
  textViewStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    textAlign: 'left',
    width: '72%',
  },
  titleStyle: {
    //paddingTop: 5,
    marginTop: 1,
    fontSize: 18,
    fontFamily: 'Proxima Nova Bold'
  },
  publishDateStyle: {
    //backgroundColor: 'lightyellow',
    alignSelf: 'flex-start',
    //paddingLeft: 7,
    paddingRight: 5,
    // borderWidth: 0.2,
    // borderColor: 'black',
    //marginTop: -5,
    //borderRadius: 5,
    padding: 1,
    //textAlign: 'right',
    fontFamily: 'Proxima Nova Alt Light',
    fontSize: 14,
  },
  imageStyle: {
    height: 100,
    width: 100,
    padding: 2,
    borderRadius: 11,
  },
});

export default Element;
