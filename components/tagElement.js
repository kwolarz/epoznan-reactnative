import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

const TagArticle = props => {
  const {container, topHalf, imageStyle, bottomHalf, title} = styles;
  const {colors} = useTheme();

  const onElementClick = () => {
    console.log(props.url);
    props.navigation.push('Article', {
      url: props.url,
      navigation: props.navigation,
    });
  };

  return (
    <TouchableOpacity
      style={[container, {backgroundColor: colors.background}]}
      onPress={onElementClick}>
      <View style={topHalf}>
        <Image style={imageStyle} source={{uri: props.imgUrl}} />
      </View>
      <View style={bottomHalf}>
        <Text style={[title, {color: colors.text}]} numberOfLines={4}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '95%',
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'grey',

    //padding: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },

  topHalf: {
    height: 165,
  },

  imageStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },

  bottomHalf: {
    padding: 10
  },

  title: {
    fontSize: 22,
    fontFamily: 'ProximaNova-Bold', //alt bold
    //maxHeight: 95,
  },
});

export default TagArticle;
