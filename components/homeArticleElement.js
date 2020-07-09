import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const BigElement = props => {
    const {container, topHalf, imageStyle, bottomHalf, title} = styles;

    const onElementClick = () => {
        console.log(props.url);
        props.navigation.navigate('Article', {
          url: props.url,
        });
      };

    return (
        <TouchableOpacity style={container} onPress={onElementClick}>
            <View style={topHalf}>
                <Image style={imageStyle} source={{uri: props.imgUrl}} />
            </View>
            <View style={bottomHalf}>
                <Text style={title}>{props.title}</Text>
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
        height: 300,
        borderRadius: 10,
        borderWidth: 0.1,
        borderColor: 'grey',
    

        padding: 10,
        
        shadowColor: "#000",
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
        fontSize: 20,
        fontFamily: 'Proxima Nova Alt Bold',
    },

})


export default BigElement;