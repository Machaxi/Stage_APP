import React, { Component } from 'react';
import {
  StyleSheet, Linking, View, ImageBackground, TouchableOpacity, Image, Text, ScrollView
} from 'react-native';
import { Card, } from 'react-native-paper';
import BaseComponent, { defaultStyle, getBaseUrl, EVENT_UPDATE_DIALOG } from './../BaseComponent'
import Events from '../../router/events';
import FastImage from 'react-native-fast-image';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';

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
          <Text
            style={{

              fontFamily: 'Quicksand-Medium',
              fontSize: 16,
              color: '#404040'
            }}>{navigation.getParam('title') == undefined ? 'Machaxi' :
              navigation.getParam('title')}</Text></View>
      ),
      headerStyle: {
        elevation: 2, shadowOpacity: 1, borderBottomWidth: 0,
      },
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
            <Image
              source={require('../../images/hamburger.png')}
              style={{ width: 20, height: 16, marginLeft: 12 }}
            />
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

  render() {

    return (
      <View style={styles.chartContainer}>
        <ScrollView>

          <Card
            style={styles.bannerCardStyle}>
            <View>
              <FastImage
                // resizeMode={FastImage.resizeMode.stretch}
                style={styles.bannerImage}
                source={require('../../images/academy_img.png')}
              />
            </View>
          </Card>

          <View>
            <Card style={styles.browseCard}>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('AcademyListing', { show_back: true })
              }}>
                <View style={styles.browseInnerStyle}>
                  <Image source={require('../../images/browse_academy.png')}
                    resizeMode="contain"
                    style={styles.browseImgStyle} />
                  <View style={{ flex: 1 }}>
                    <View style={styles.cardInner}>
                      <Text style={defaultStyle.bold_text_14}>Browse Academies</Text>
                      <Image
                        resizeMode="contain"
                        source={require('../../images/path.png')}
                        style={styles.rightArrowStyle} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          </View>

        </ScrollView>

        <View
          style={styles.trialOuter}>
          <View style={{ width: "100%" }}>
            <SkyFilledButton
              onPress={() => {
                this.props.navigation.navigate('GuestTrialTerms')
              }}
            >Book Machaxi Trial</SkyFilledButton>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 16
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

