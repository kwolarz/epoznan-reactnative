import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  SectionList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Movie = ({route}) => {
  var {title, url, navigation} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {colors} = useTheme();
  const [isDescription, setDescription] = useState(true);
  const [date, setDate] = useState('1');
  const {
    container,
    poster,
    titleText,
    tab,
    tabText,
    tabContainer,
    separator,
    descContainer,
    descText,
    castText,
    repContainer,
    datesContainer,
    dateText,
    dateContainer,
    cinemaText,
    hourContainer,
    hourText,
  } = styles;

  useEffect(() => {
    fetch('http://epoznan.herokuapp.com/movie/' + url)
      .then(response => response.json())
      .then(json => {
        console.log(url);
        setData(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={container}>
        {/* poster and title */}
        <Image style={poster} source={{uri: data.poster}} />
        <Text style={[titleText, {color: colors.text}]}>{data.title}</Text>

        {/* descritption and repertiore tab buttons */}
        <View style={tabContainer}>
          {/* descritption */}
          <TouchableOpacity
            style={tab}
            onPress={() => setDescription(true)}
            activeOpacity={0.5}>
            <Text
              style={[
                {color: colors.text, opacity: isDescription ? 1 : 0.6},
                tabText,
              ]}>
              Opis
            </Text>
            {/*! separator */}
            <View
              style={[
                {
                  borderBottomColor: isDescription
                    ? colors.titleText
                    : colors.border,
                  borderBottomWidth: isDescription ? 4 : 1,
                  opacity: isDescription ? 1 : 0.6,
                },
                separator,
              ]}
            />
          </TouchableOpacity>

          {/* repertiore */}
          <TouchableOpacity
            style={tab}
            onPress={() => setDescription(false)}
            activeOpacity={0.5}>
            <Text
              style={[
                {color: colors.text, opacity: isDescription ? 0.6 : 1},
                tabText,
              ]}>
              Repertuar
            </Text>
            {/*! separator */}
            <View
              style={[
                {
                  borderBottomColor: isDescription
                    ? colors.border
                    : colors.titleText,
                  borderBottomWidth: isDescription ? 1 : 4,
                  opacity: isDescription ? 0.6 : 1,
                },
                separator,
              ]}
            />
          </TouchableOpacity>
        </View>

        {/* tab view */}
        <View>
          {isDescription ? (
            // description tab
            <View style={descContainer}>
              <View style={{paddingBottom: 10}}>
                <Text style={[{color: colors.text}, descText]}>
                  {data.description}
                </Text>
              </View>

              <View>
                <Text style={[{color: colors.text}, castText]}>
                  {data.cast}
                </Text>
              </View>
            </View>
          ) : (
            // repertiore tab
            <View style={repContainer}>
              {/* date selection buttons */}
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={datesContainer}
                data={data.dates}
                keyExtractor={({id}, index) => id}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={[
                      dateContainer,
                      {
                        borderColor:
                          date == (index + 1).toString()
                            ? colors.titleText
                            : colors.item,
                      },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setDate((index + 1).toString())}>
                    <Text
                      style={[
                        dateText,
                        {
                          color:
                            date == (index + 1).toString()
                              ? colors.text
                              : colors.item,
                        },
                      ]}>
                      {item[(index + 1).toString()]}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              {/*! separator */}
              <View
                style={[
                  {
                    borderBottomColor: colors.border,
                    borderBottomWidth: 1,
                  },
                  separator,
                ]}
              />

              {/* repertoire */}
              <FlatList
                data={data.repertoire[date]}
                keyExtractor={({id}, index) => id}
                renderItem={({item}) => (
                  <View>
                    {/* cinema name */}
                    <View>
                      <Text style={[cinemaText, {color: colors.text}]}>
                        {item.place}
                      </Text>
                    </View>

                    {/* movie play hours */}
                    <FlatList
                      style={{flexDirection: 'column', marginBottom: 8}}
                      key={5}
                      numColumns={5}
                      showsHorizontalScrollIndicator={false}
                      data={item.hours}
                      keyExtractor={({insideItem}, i) => insideItem}
                      listKey={({insideItem}, insideIndex) => insideItem}
                      renderItem={({item}) => (
                        <View
                          style={[
                            hourContainer,
                            {backgroundColor: colors.titleText},
                          ]}>
                          <Text style={[hourText, {color: colors.background}]}>
                            {item}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //main container
  container: {
    padding: 15,
  },

  //main info
  poster: {
    width: 164,
    height: 234,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },

  titleText: {
    marginTop: 15,
    marginLeft: 0,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 28,
    fontFamily: 'ProximaNova-Bold',
  },

  //tabs
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 25,
    paddingBottom: 5,
  },

  tab: {
    width: '50%',
    alignItems: 'center',
  },

  tabText: {
    fontFamily: 'ProximaNova-Bold',
    fontSize: 20,
    paddingBottom: 5,
  },

  separator: {
    //itemsalign: 'center',
    //marginLeft: '5%',
    // opacity: 0.6,
    width: '100%',
    //paddingVertical: 5,
    marginBottom: 10,
    //padding: 10,
    borderRadius: 1,
  },

  //descritption
  descContainer: {
    //padding: 3,
    paddingHorizontal: 5,
    paddingBottom: 30,
  },
  descText: {
    fontSize: 15,
    fontFamily: 'ProximaNova-Regular',
  },
  castText: {
    fontSize: 17,
    fontFamily: 'ProximaNova-Bold',
  },

  //repertoireTab
  repContainer: {
    //padding: 3,
    paddingHorizontal: 5,
    paddingBottom: 30,
  },

  datesContainer: {paddingBottom: 15},

  dateContainer: {
    borderRadius: 10,
    marginRight: 8,
    padding: 6,
    width: 125,
    borderWidth: 3,
  },

  dateText: {textAlign: 'center', fontFamily: 'ProximaNova-Regular'},

  cinemaText: {fontSize: 22, fontFamily: 'ProximaNova-Bold'},

  hourContainer: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 5,
  },

  hourText: {fontSize: 18},
});

export default Movie;
