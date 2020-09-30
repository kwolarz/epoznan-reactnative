import React from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Event = props => {
    const {colors} = useTheme();
    const {
        container,
        touchContainer,
        textViewStyle,
        titleStyle,
        publishDateStyle,
        imageStyle,
        descContainer,
        descIcon,
    } = styles;

    return (
        <View style={container}>
          <View style={[touchContainer, {backgroundColor: colors.background}]}>
            <Image style={imageStyle} source={{uri: props.imgUrl}} />
            <View style={textViewStyle}>
              <Text style={[titleStyle, {color: colors.text}]}>{props.title}</Text>
              {/* <Text style={[publishDateStyle, {color: colors.secondText}]}>{props.category}</Text> */}

              <View style={descContainer}>
                  <Image style={descIcon} tintColor={colors.secondText} source={{uri: 'https://www.iconfinder.com/data/icons/pittogrammi/142/10-512.png'}} />
                  <Text style={[publishDateStyle, {color: colors.secondText}]}>{props.date}</Text>
              </View>

              <View style={descContainer}>
                  <Image style={descIcon} tintColor={colors.secondText} source={{uri: 'https://static.thenounproject.com/png/11205-200.png'}} />
                  <Text style={[publishDateStyle, {color: colors.secondText}]}>{props.location}</Text>
              </View>

              <View style={descContainer}>
                  <Image style={descIcon} tintColor={colors.secondText} source={{uri: 'https://i.pinimg.com/originals/6c/28/c1/6c28c1644b26303b67cd2879355e8d0a.png'}} />
                  <Text style={[publishDateStyle, {color: colors.secondText}]}>{props.category}</Text>
              </View>
            </View>
          </View>
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
      paddingLeft: 10,
      paddingTop: 5,
      fontSize: 14,
      textAlign: 'left',
      width: '69%',
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
      fontFamily: 'ProximaNova-Regular', //alt light
      fontSize: 14,
    },
    imageStyle: {
      height: 100,
      width: 100,
      borderRadius: 50,
      alignSelf: 'center',
    },

    descContainer: {
        flexDirection: 'row',
        paddingTop: 2,
    },
    descIcon: {
        height: 15,
        width: 15,
        marginRight: 5,
    }
  });

export default Event;