import React from 'react'

import { View, Image, Linking, Platform } from 'react-native'
import { getData, isSignedIn, onSignIn, storeData } from "../../components/auth";
import { COACH, GUEST, PARENT, PLAYER, ACADEMY } from "../../components/Constants";
import BaseComponent, { TOURNAMENT_REGISTER, GO_TO_HOME } from '../BaseComponent';
import Events from '../../router/events';
import firebase from "react-native-firebase";
import SplashScreen from 'react-native-splash-screen'

var is_deep_linking = false
var deep_data

class Splash extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,
            deepUrl: ""
        };


        this.refreshEvent = Events.subscribe('deep_linking', (data) => {
           is_deep_linking = true
           deep_data = data
        });

        //checking for tournamnet registraion, guest can skip, when they go to upcoming tournament
        // first they have to login then register for tournament
        // getData(TOURNAMENT_REGISTER, (value) => {

        //     console.warn('TOURNAMENT_REGISTER => ', value)
        //     if (value != '' && (value == true || value == "true")) {
        //         this.props.navigation.navigate('Login')
        //     } else {

        //     }
        // });
        
        // firebase.analytics().logEvent("APP_START", {})
        //firebase.analytics().logEvent("testing_dribble", {})
        firebase.analytics().logEvent("SplashScreen", {})
        // firebase.analytics().setCurrentScreen()
        // firebase.analytics().setUserId('testing')
        //firebase.crashlytics().log('Test Message!');


        //1a476280-04c6-40a5-b76e-6cc4da41669e
    }

    componentDidMount(){
        SplashScreen.hide();
        this.moveNext()
    }

    moveNext() {
        // this.props.navigation.navigate('ProgressExample', {
        //     match_id: '15'
        // })
        //  return
        // var userData;
        // getData('userInfo', (value) => {
        //     console.log("value", value)
        // })
        isSignedIn()
            .then(res => {
                console.log(res);
                this.setState({ signedIn: res, checkedSignIn: true })
                BaseComponent.isUserLoggedIn = true

                setTimeout(() => {

                    console.warn('is_deep_linking => ' + is_deep_linking, JSON.stringify(deep_data))
                    if (is_deep_linking) {
                        is_deep_linking = false
                        Events.publish(GO_TO_HOME, deep_data);
                        return
                    }


                    const { checkedSignIn, signedIn } = this.state;
                    console.log("signedIn", signedIn)
                    if (!checkedSignIn) {
                        this.props.navigation.navigate('IntroScreen')
                        return;
                    }
                    if (signedIn !== true) {

                        this.props.navigation.navigate('IntroScreen')//'SignedOut')


                    } else {
                        getData('userInfo', (value) => {
                            userData = (JSON.parse(value))
                            // onSignIn()
                            let userType = userData.user['user_type']
                            console.log("SplashScreen=> ", JSON.stringify(userData));
                            if (userType == GUEST) {
                                console.warn(userType)
                                this.props.navigation.navigate('GHome')
                            }
                            else if (userData.academy_id != null) {
                                console.log(userData);
                                if (userType == GUEST) {
                                    this.props.navigation.navigate('GHome')
                                } else if (userType == PLAYER) {
                                    this.props.navigation.navigate('UHome')

                                } else if (userType == COACH || userType == ACADEMY) {
                                    this.props.navigation.navigate('CHome')
                                }
                                else if (userType == PARENT) {
                                    this.props.navigation.navigate('PHome')
                                }

                            } else {
                                this.props.navigation.navigate('SwitchPlayer')
                            }

                        });

                    }

                }, 100)
            })
            .catch(err => alert("An error occurred"));


        // if (Platform.OS === 'android') {
        //     Linking.getInitialURL().then(url => {
        //         this.navigate(url);
        //     });
        // } else {
        //     Linking.addEventListener('url', this.handleOpenURL);
        // }
    }

    // componentWillUnmount() {
    //     Linking.removeEventListener('url', this.handleOpenURL);

    // }
    // handleOpenURL(event) {
    // }

    // navigate = (url) => { // E
    //     this.state.deepUrl = url
    //     storeData('deepUrl', this.state.deepUrl)

    // }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Image
                    resizeMode="contain"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: "20%",
                        width: "70%"
                    }}
                    source={require('../../images/dribble_logo.png')}
                />

            </View>
        );

    }

}
export default Splash;
