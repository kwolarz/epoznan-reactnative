import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import SvgUri from 'react-native-svg-uri';

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

  return (
    <View style={container}>
      <View style={weatherContainer}>
        <View style={temperatureContainer}>
          <SvgUri
            width="50"
            height="50"
            style={weatherIcon}
            source={{uri: props.imgUrl}}
          />
          <View style={temperatureData}>
            <View style={temperature}>
              <Text style={currentTemperatureText}>{props.title}</Text>
              <Text style={currentTemperatureText}>14℃</Text>
            </View>

            <View style={temperature}>
              <Text style={{fontSize: 11}}>Opady: </Text>
              <Text style={{fontSize: 11}}>0 mm</Text>
            </View>

            <View style={temperature}>
              <Text style={{fontSize: 11}}>Wiatr do: </Text>
              <Text style={{fontSize: 11}}>{'12 km/h'}</Text>
            </View>
          </View>
        </View>

        {/* ADD here a vertical separator */}
        <View
          style={{
            borderBottomColor: 'grey',
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
          <SvgUri
            width="50"
            height="50"
            style={weatherIcon}
            source={{uri: 'https://epoznan.pl/new_assets/img/air-condition/5.svg'}}
          />

          <View style={temperatureData}>
            <View style={temperature}>
              <Text style={currentTemperatureText}>Stan powietrza</Text>
            </View>

            <View style={temperature}>
              <Text style={{fontSize: 11}}>PM2.5  </Text>
              <Text style={{fontSize: 11}}>8.58 μg/m3</Text>
            </View>

            <View style={temperature}>
              <Text style={{fontSize: 11}}>Bardzo dobry</Text>
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
    paddingRight: 7,
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
