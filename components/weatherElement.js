import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import {SvgCssUri} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';

const WeatherElement = props => {
  const {
    container,
    temperatureContainer,
    weatherIcon,
    currentTemperatureText,
    weatherContainer,
    temperature,
    temperatureData,
    airQualityContainer,
  } = styles;

  const {colors} = useTheme();

  return (
    <View style={container}>
      <View style={[weatherContainer, {backgroundColor: colors.background}]}>
        <View style={temperatureContainer}>
          <SvgCssUri
            width={50}
            height={50}
            style={weatherIcon}
            uri={props.temperatureIcon}
          />

          <View style={temperatureData}>
            <View style={temperature}>
              <Text style={[currentTemperatureText, {color: colors.text}]}>
                {props.temperatureCurrent}
              </Text>
              <Text style={[currentTemperatureText, {color: colors.text}]}>
                {props.temperatureMin}
              </Text>
            </View>

            <View style={temperature}>
              <Text style={{fontSize: 11, color: colors.text}}>Opady: </Text>
              <Text style={{fontSize: 11, color: colors.text}}>
                {props.rain}
              </Text>
            </View>

            <View style={temperature}>
              <Text style={{fontSize: 11, color: colors.text}}>Wiatr do: </Text>
              <Text style={{fontSize: 11, color: colors.text}}>
                {props.wind}
              </Text>
            </View>
          </View>
        </View>

        {/* ADD here a vertical separator */}
        <View
          style={{
            borderLeftColor: colors.border,
            opacity: 0.2,
            marginTop: '2%',
            height: '80%',
            borderLeftWidth: 1,
            //borderRightWidth: 1,
            //marginRight: 10,
            left: -10,
          }}
        />

        <View style={airQualityContainer}>
          <SvgCssUri
            width={50}
            height={50}
            style={weatherIcon}
            uri={props.airIcon}
            // source={{uri: props.airIcon}}
          />

          <View style={temperatureData}>
            <View style={temperature}>
              <Text style={[currentTemperatureText, {color: colors.text}]}>
                Stan powietrza
              </Text>
            </View>

            <View style={temperature}>
              <Text style={{fontSize: 11, color: colors.text}}>PM2.5 </Text>
              <Text style={{fontSize: 11, color: colors.text}}>
                {props.airQuality}
              </Text>
            </View>

            <View style={temperature}>
              <Text style={{fontSize: 11, color: colors.text}}>
                {props.airState}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
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

  temperatureContainer: {
    paddingRight: 10,
    flexDirection: 'row',
    textAlign: 'left',
    width: '50%',
  },

  weatherIcon: {
    marginRight: 7,
    justifyContent: 'center',
  },

  temperature: {
    flexDirection: 'row',
  },

  currentTemperatureText: {
    marginTop: 1,
    fontSize: 17,
    fontFamily: 'ProximaNova-Bold',
    paddingBottom: 5,
    paddingRight: 5,
  },

  temperatureData: {},

  airQualityContainer: {
    //paddingRight: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    textAlign: 'left',
    width: '50%',
  },
});

export default WeatherElement;
