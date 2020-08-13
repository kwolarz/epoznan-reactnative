import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const BigElement = props => {
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
    <TouchableOpacity style={[container, {backgroundColor: colors.background}]} onPress={onElementClick}>
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
    marginTop: 10,
    backgroundColor: 'white',
    width: width - 80,
    margin: 10,
    height: 270,
    borderRadius: 10,
    borderWidth: 0.1,
    borderColor: 'grey',

    padding: 10,

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
    height: '60%',
    //paddingBottom: 10,
  },

  imageStyle: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },

  bottomHalf: {
    height: '40%',
    paddingTop: 10,
  },

  title: {
    fontSize: 19,
    fontFamily: 'ProximaNova-Bold', //alt bold
    //maxHeight: 95,
  },
});

export default BigElement;
