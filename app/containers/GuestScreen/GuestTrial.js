import React, { Component } from 'react';
import {
  StyleSheet, Linking, View, ImageBackground, TouchableOpacity, Image, Text, ScrollView
} from 'react-native';
import { Card, } from 'react-native-paper';
import BaseComponent, { defaultStyle, getBaseUrl, EVENT_UPDATE_DIALOG } from './../BaseComponent'
import Events from '../../router/events';
import FastImage from 'react-native-fast-image';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';
import LinearGradient from 'react-native-linear-gradient';

var notification_count = 0

export default class GuestTrial extends BaseComponent {

  static navigationOptions = ({ navigation }) => {

    return {
      headerTitle: (
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          flex: 1,
        }}>
          {
            navigation.getParam('showHeader') === "True" ? <Text
              style={{
                fontFamily: 'Quicksand-Bold',
                fontSize: 16,
                color: 'black', letterSpacing: 5,
              }}>{'MACHAXI'}</Text> : <Text
                style={{
                  fontFamily: 'Quicksand-Bold',
                  fontSize: 16,
                  color: 'white', letterSpacing: 5,
                }}>{'MACHAXI'}</Text>
          }
        </View>
      ),
      headerStyle: {

      },
      headerTransparent:
        navigation.getParam('showHeader') === "True" ? false : true,
      headerTitleStyle: styles.headerStyle,
      headerLeft: (
        <View style={{
          flexDirection: 'row'
        }}>
          {navigation.getParam('show_back') ?
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ padding: 7 }}
              activeOpacity={.8}>
              <Image
                source={require('../../images/go_back_arrow.png')}
                style={{ width: 20, height: 16, marginLeft: 12 }}
              />
            </TouchableOpacity>
            : null}
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
            style={{ padding: 7 }}
            activeOpacity={.8}>
            {navigation.getParam('showHeader') === "True" ? <Image
              source={require('../../images/hamburger.png')}
              style={{ width: 20, height: 16, marginLeft: 12 }}
            /> : <Image
                source={require('../../images/hamburger_white.png')}
                style={{ width: 20, height: 16, marginLeft: 12 }}
              />}

          </TouchableOpacity>
        </View>

      ),
      headerRight: (
        navigation.getParam('show_bell') == undefined ?
          <View></View> :
          <TouchableOpacity
            style={{ marginRight: 8 }}
            onPress={() => {
              navigation.navigate('NotificationList')
            }}
            activeOpacity={.8} >
            <ImageBackground
              resizeMode="contain"
              source={require('../../images/bellicon.png')}
              style={{
                width: 22, height: 22, marginLeft: 12,
                marginRight: 12,
                alignItems: 'flex-end'
              }}>

              {navigation.getParam('notification_count', 0) > 0 ? <View style={{
                width: 16,
                height: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30 / 2,
                backgroundColor: '#ED2638'
              }}>
                <Text style={[defaultStyle.bold_text_10, { fontSize: 8, color: 'white' }]}>
                  {navigation.getParam('notification_count', '') > 99 ? '99+' : navigation.getParam('notification_count', '')}
                </Text>
              </View> : null}
            </ImageBackground>
          </TouchableOpacity>

      )
    };

  };


  constructor(props) {
    super(props)
    this.secondTextInputRef = React.createRef();
    this.setNavigation(this.props.navigation)
    this.state = {
      show_must_update_alert: false,

    }

    this.setNavigation(this.props.navigation)

    const { navigation } = this.props.navigation.setParams({ showHeader: "False" })
    //this.props.navigation.setParams({ switchPlayer: this.switchPlayer })

    //this.props.navigation.setParams({ handleSave: "Heloo" });
    //this.props.navigation.setParams({ showHeader: "False"})

  }


  componentDidMount() {

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.getNotifications()
      }
    );

    this.refreshEvent = Events.subscribe('NOTIFICATION_CALL', (msg) => {
      this.getNotifications()
    });


    this.checkNotification()

    this.refreshEvent = Events.subscribe('NOTIFICATION_CLICKED', (msg) => {
      this.checkNotification()
    });

    this.refreshEvent = Events.subscribe(EVENT_UPDATE_DIALOG, (must_update) => {
      // must_update = true
      console.log('must update', must_update);
      this.setState({
        show_must_update_alert: must_update,
      })
    });
  }

  checkNotification() {
    if (global.NOTIFICATION_DATA) {
      try {
        let notification_for = global.NOTIFICATION_DATA.notification_for
        this.notificationOpenScreen(notification_for)
        global.NOTIFICATION_DATA = null

      } catch (err) {
      }
    }
  }

  getNotifications() {
    this.getNotificationCount((count) => {
      this.props.navigation.setParams({ notification_count: count });
      notification_count = count
    })
  }

  handleClick() {
    let link = ''
    if (Platform.OS == 'ios') {
      link = 'itms-apps://itunes.apple.com/us/app/id${1484093762}?mt=8'
    } else {
      link = 'market://details?id=com.machaxi'
    }
    Linking.canOpenURL(link).then(supported => {
      supported && Linking.openURL(link);
    }, (err) => console.log(err));
  }

  handleScroll = (event) => {
    if (event.nativeEvent.contentOffset.y > 100) {
      this.props.navigation.setParams({ showHeader: "True" })
    }
    else {
      this.props.navigation.setParams({ showHeader: "False" })
    }
  }

  render() {

    return (
      <View style={styles.chartContainer}>






        <ScrollView onScroll={this.handleScroll}>



          <Image resizeMode='contain' style={{
            width: '100%'
          }}
            source={require('../../images/trial_banner.png')}
          />
          {/* <View style={{ height: 236, backgroundColor: 'grey' }}>
          </View> */}

          <TouchableOpacity onPress={() => {
            //alert('OnPress','Clicked on View');
            this.props.navigation.navigate('GuestTrialTerms')
          }} activeOpacity={1}>
            <LinearGradient locations={[0, 1]} colors={['#A1E0FF', '#FFFFFF']} useAngle angle={255} style={{
              marginHorizontal: 10, marginTop: -110, marginBottom: 16, padding: 22, borderRadius: 12, shadowColor: 'rgba(0, 0, 0, 0.12)', elevation: 4, shadowRadius: 18,
              shadowOpacity: 0.06, shadowOffset: { width: 0, height: 3 }
            }}>

              <Image resizeMode='contain' style={{
                position: 'absolute',
                top: 5,
                left: 245,
                right: 0,
                bottom: 0,
              }}
                source={require('../../images/small_dots.png')}
              ></Image>

              <View>
                <Text style={{ fontSize: 18, fontFamily: 'Nunito-SemiBold', color: '#3E3E3E' }}>Bored of routine workout?</Text>
                <Text>
                  <Text style={{ fontSize: 18, fontFamily: 'Nunito-SemiBold', color: '#3E3E3E' }}>
                    Stay fit -
                  </Text>
                  <Text style={{ fontSize: 18, fontFamily: 'Nunito-ExtraBold', color: '#000000' }}>
                    {" The Fitminton Style!"}
                  </Text>
                </Text>
              </View>

              <View style={{ width: '13%', height: 2, backgroundColor: '#67BAF5', marginTop: 5, marginBottom: 10 }}>
              </View>

              <View>
                <Text style={{ fontSize: 14, fontFamily: 'Nunito-Regular', color: '#3E3E3E' }}>
                  Fitminton sale is live.
              </Text>
                <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold', color: '#3E3E3E' }}>
                  Flat 50 % off
              </Text>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'flex-end' }} >
                <Image resizeMode="contain" style={{ width: 26, height: 26, marginRight: -10, marginTop: -7 }} source={require('../../images/vector.png')}></Image>

                <View>
                  <Text style={{ fontSize: 14, fontFamily: 'Nunito-Bold', color: '#000000' }}>Explore membership benefits</Text>
                </View>

                <Image resizeMode="contain" style={{ width: 12, height: 12, marginLeft: 5, marginTop: 5 }} source={require('../../images/right_arrow.png')}>
                </Image>

              </View>

            </LinearGradient>
          </TouchableOpacity>

          <View style={{ marginTop: 30, marginHorizontal: 40 }}>
            <View>
              <Text style={{ fontSize: 18, fontFamily: 'Nunito-Bold', color: '#000000' }}>
                Why train with us?
            </Text>
            </View>
            <View style={{ width: '13%', height: 2, backgroundColor: '#67BAF5', marginTop: 10, marginBottom: 40 }}>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>
              <Image resizeMode="contain" style={{ width: 60, height: 60, marginTop: -10 }} source={require('../../images/badminton.png')}>
              </Image>
              <View style={{ width: '75%', marginLeft: 25 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Nunito-SemiBold', color: '#3E3E3E' }}>
                  Learn badminton the easy and fun way
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>
              <Image resizeMode="contain" style={{ width: 60, height: 60, marginTop: -10 }} source={require('../../images/muscle.png')}>
              </Image>
              <View style={{ width: '75%', marginLeft: 25 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Nunito-SemiBold', color: '#3E3E3E' }}>
                  Stay fit and in shape with unique, fun workout patterns
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>
              <Image resizeMode="contain" style={{ width: 60, height: 60, marginTop: -10 }} source={require('../../images/sport_shoes.png')}>
              </Image>
              <View style={{ width: '75%', marginLeft: 25 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Nunito-SemiBold', color: '#3E3E3E' }}>
                  Energy packed non-repetitive sessions everyday for you
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>
              <Image resizeMode="contain" style={{ width: 60, height: 60, marginTop: -10 }} source={require('../../images/calendar.png')}>
              </Image>
              <View style={{ width: '75%', marginLeft: 25 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Nunito-SemiBold', color: '#3E3E3E' }}>
                  Pick your own preferred schedule
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>
              <Image resizeMode="contain" style={{ width: 60, height: 60, marginTop: -10 }} source={require('../../images/mobile.png')}>
              </Image>
              <View style={{ width: '75%', marginLeft: 25 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Nunito-SemiBold', color: '#3E3E3E' }}>
                  Track your performance and progress through Machaxi app
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>
              <Image resizeMode="contain" style={{ width: 60, height: 60, marginTop: -10 }} source={require('../../images/coach.png')}>
              </Image>
              <View style={{ width: '75%', marginLeft: 25 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Nunito-SemiBold', color: '#3E3E3E' }}>
                  Curated interactive sessions led by trained professionals
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 130 }}>
              <Image resizeMode="contain" style={{ width: 60, height: 60, marginTop: -10 }} source={require('../../images/tour_trophy.png')}>
              </Image>
              <View style={{ width: '75%', marginLeft: 25 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Nunito-SemiBold', color: '#3E3E3E' }}>
                  Free tournament participation every month
                </Text>
              </View>
            </View>

          </View>

        </ScrollView>

        <ImageBackground resizeMode='contain' style={{
          flexDirection: 'column',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -14, alignItems: 'center',
          justifyContent: 'center', alignSelf: 'center',
          height: 130,
          width: '100%'
        }}
          source={require('../../images/Rectangle.png')}
        >

          {/* <LinearGradient style={{
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, alignItems: 'center', paddingTop: 150, paddingBottom: 30, justifyContent: 'center',alignSelf: 'center'}} colors={['rgba(255, 255, 255, 0)', '#ffffff']}  locations={[0.28, 0.78]}> */}

          <LinearGradient colors={['#FF3A99', '#FF3A6A']} locations={[0, 1]} useAngle angle={255} style={{
            borderRadius: 24, shadowColor: 'rgba(0, 0, 0, 0.2)', elevation: 4, shadowRadius: 9,
            shadowOpacity: 0.08, shadowOffset: { width: 0, height: 3 }
          }}>

            <TouchableOpacity style={{
              width: 172,
              padding: 10,
              height: 40
            }}
              onPress={() => {
                this.props.navigation.navigate('SaveGuestTrial')
              }}>
              <Text style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Quicksand-Regular', fontSize: 14
              }}>Book trial session</Text>
            </TouchableOpacity>

          </LinearGradient>


          <View style={{ marginTop: 5, textAlign: 'center', }}>
            <Text style={{ fontFamily: 'Nunito-Bold', fontSize: 14, color: '#3E3E3E' }}>For all age groups</Text>
          </View>
          {/* </LinearGradient> */}
        </ImageBackground>



        {/* <View
          style={styles.trialOuter}>
          <View style={{ width: "100%" }}>
            <SkyFilledButton
              onPress={() => {
                this.props.navigation.navigate('GuestTrialTerms')
              }}
            >Book Machaxi Trial</SkyFilledButton>
          </View>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    //padding: 16
  },
  trialOuter: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    margin: 12,
  },
  bannerCardStyle: {
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 30,
    elevation: 2
  },
  bannerImage: {
    height: 150,
    width: "100%",
    borderRadius: 16
  },
  browseCard: {
    margin: 5,
    borderRadius: 10
  },
  browseInnerStyle: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  browseImgStyle: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  cardInner: {
    flex: 1,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightArrowStyle: {
    width: 19,
    height: 13,
    marginRight: 0,
  }
});

