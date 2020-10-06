import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Article = props => {
  const {
    container,
    textContainer,
    articleImage,
    publishDateText,
    titleText,
    touchContainer,
  } = styles;

  const {colors} = useTheme();

  const onElementClick = () => {
    console.log(props.url);
    props.navigation.push('Article', {
      url: props.url,
      navigation: props.navigation,
    });
  };

  return (
    <View style={container}>
      <TouchableOpacity
        style={[touchContainer, {backgroundColor: colors.background}]}
        onPress={onElementClick}>
        {/* left side of component with title and publish date */}
        <View style={textContainer}>
          <Text style={[publishDateText, {color: colors.secondText}]}>
            {props.publishDate}
          </Text>
          <Text style={[titleText, {color: colors.text}]}>{props.title}</Text>
        </View>

        <Image style={articleImage} source={{uri: props.imgUrl}} />
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
    //backgroundColor: 'white',
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
  textContainer: {
    paddingRight: 10,
    fontSize: 14,
    textAlign: 'left',
    width: '72%',
  },
  titleText: {
    marginTop: 1,
    fontSize: 18,
    fontFamily: 'ProximaNova-Bold',
  },
  publishDateText: {
    alignSelf: 'flex-start',
    //paddingRight: 5,
    padding: 1,
    paddingBottom: 3,
    fontFamily: 'ProximaNova-Regular', //alt light
    fontSize: 14,
  },
  articleImage: {
    height: 100,
    width: 100,
    borderRadius: 11,
    alignSelf: 'center',
  },
});

export default Article;
