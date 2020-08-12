import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  View,
  Button,
  Share,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

var yOffset = -30;

const TagElement = props => {
  const onElementClick = () => {
    console.log(props.tagName);
    props.navigation.setParams({otherParam: props.tagName})
    props.navigation.push('Tag', {
      tagName: props.tagName,
      tagID: props.tagID,
      navigation: props.navigation,
    });
  };

  return (
    <TouchableOpacity onPress={onElementClick}>
      <Text style={styles.tagText}>{props.tagName}</Text>
    </TouchableOpacity>
  );
};

const Article = ({route}) => {
  const {url, navigation} = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {
    topImageStyle,
    container,
    titleStyle,
    scrollContainer,
    dateStyle,
    dateContainer,
    descContainer,
    descStyle,
    textContainer,
    textStyle,
    postContainer,
    shareButton,
    shareIcon,
    tagText,
    tagList,
  } = styles;

  let JS =
    '<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>';
  let source =
    JS +
    '<blockquote class="twitter-tweet" data-lang="pl">&#13;\n\t<p dir="ltr" lang="pl">&#13;\n\t\tPoparcie w okręgach dla <a href="https://twitter.com/pisorgpl?ref_src=twsrc%5Etfw">@pisorgpl</a> na koniec lipca 2018 (zdecydowani wyborcy) <a href="https://t.co/tFRfi1pd95">pic.twitter.com/tFRfi1pd95</a></p>&#13;\n\t— Marcin Palade (@MarcinPalade) <a href="https://twitter.com/MarcinPalade/status/1026459290125651968?ref_src=twsrc%5Etfw">6 sierpnia 2018</a></blockquote>&#13;\n';
  const {screenWidth} = Dimensions.get('window').width;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://epoznan.pl/' + String(url),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetch('http://epoznan.herokuapp.com/article/' + url)
      .then(response => response.json())
      .then(json => {
        console.log(url);
        setData(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <View style={container}>
      {isLoading ? (
        <ActivityIndicator style={{padding: '50%'}} />
      ) : (
        <ScrollView
          style={scrollContainer}
          onScroll={event => {
            yOffset = event.nativeEvent.contentOffset.y;
          }}>
          <Image style={topImageStyle} source={{uri: data.topImageURL}} />
          <TouchableOpacity
            style={shareButton}
            onPress={onShare}
            title="Share"
            blurEffect={10}>
            <View style={{}}>
              <Image
                style={shareIcon}
                source={require('../assets/share1.png')}
                tintColor="black"
              />
            </View>
          </TouchableOpacity>
          <View style={postContainer}>
            <Text style={titleStyle}>{data.title}</Text>
            <View style={dateContainer}>
              <Text style={dateStyle}>
                {data.publishDate + ' | ' + data.author}
              </Text>
            </View>

            <View
              style={{
                borderBottomColor: 'grey',
                //itemsalign: 'center',
                marginLeft: '3%',
                opacity: 0.6,
                width: '90%',
                borderBottomWidth: 1,
                //paddingVertical: 5,
                marginBottom: 10,
                //padding: 10,
              }}
            />

            <View style={descContainer}>
              <Text style={descStyle}>{data.description}</Text>
            </View>

            <View style={textContainer}>
              <Text style={textStyle}>{data.text}</Text>
            </View>

            {/* <WebView style={{height: 700, width: screenWidth}} textZoom={150} source={{html: source}} javaScriptEnabled={true} /> */}
            {/* <AutoHeightWebView style={{width: screenWidth - 15, marginTop: 20}} source={{html: source}} customScript={JS} /> */}
            {/* <AutoHeightWebView
              style={{ width: Dimensions.get('window').width - 15, marginTop: 35 }}
              // customScript={`document.body.style.background = 'lightyellow';`}
              // customStyle={`
              //   * {
              //     font-family: 'Times New Roman';
              //   }
              //   p {
              //     font-size: 16px;
              //   }
              // `}
              onSizeUpdated={size =>(console.log(size.height))}
              files={[{
                  href: 'cssfileaddress',
                  type: 'text/css',
                  rel: 'stylesheet'
              }]}
              source={{ html: source}}
              scalesPageToFit={true}
              viewportContent={'width=device-width, user-scalable=no'}
            /> */}

            
            <FlatList
              data={data.imagesURL}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                <Image style={{width: '100%', height: 200, marginTop: 10,}} source={{uri: item.imgUrl}} />
              )}
            />

            <View
              style={{
                borderBottomColor: 'grey',
                //itemsalign: 'center',
                marginLeft: '3%',
                opacity: 0.6,
                width: '90%',
                //borderBottomWidth: 1,
                //paddingVertical: 5,
                marginTop: 18,
                //padding: 10,
              }}
            />

            <FlatList
              style={tagList}
              data={data.tags}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                <TagElement
                  tagName={item.tagName}
                  tagID={item.tagID}
                  navigation={navigation}
                />
              )}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topImageStyle: {
    width: '100%',
    height: 260,
  },

  container: {
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
  },

  titleStyle: {
    fontSize: 26,
    //padding: 10,
    fontFamily: 'ProximaNova-Extrabld',
  },

  dateContainer: {
    width: '100%',
    //paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 15,
  },

  descContainer: {
    paddingTop: 10,
  },

  descStyle: {
    fontSize: 20,
    fontFamily: 'ProximaNova-Bold', //alt bold
  },

  textContainer: {
    //padding: 10,
  },

  textStyle: {
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
  },

  postContainer: {
    backgroundColor: 'white',
    //position: 'absolute',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -30,
    padding: 15,
  },

  shareButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    //borderWidth: 1,
    padding: 10,
    height: 70,
    width: 70,
    // right: 10,
    // top: 10,
  },
  shareIcon: {
    height: 35,
    width: 35,
    elevation: 10,
    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 10,
    padding: 10,
  },

  tagText: {
    fontSize: 25,
    fontFamily: 'ProximaNova-Bold',
    paddingTop: 12,
    paddingRight: 7,
    color: '#004F8D',
  },

  tagList: {
    //padding: 10,
  },
});

export default Article;
