import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

const onElementClick = () => {
    console.log('element clicked');
};

const Element = props => {
    const {container, itemS, imageS} = styles;

    return (
        <TouchableOpacity style={container} onPress={onElementClick}>
            <Text style = {itemS}>{props.title}</Text>
            <Image 
                style = {imageS}
                source = {{uri: props.imgUrl}}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
     flex: 1/3,
     paddingTop: 22,
     flexDirection: 'row',
    },
    itemS: {
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 18,
      //height: 44,
      textAlign: 'left',
      width: '70%',
    },
    imageS: {
        height: 100,
        width: 100,
        padding: 2,
        borderRadius: 11
        
    },
  })
  

export default Element;