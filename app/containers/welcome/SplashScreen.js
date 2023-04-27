import React from 'react'

import { View, Image, Linking, Platform } from 'react-native'
import { getData, isSignedIn, onSignIn, storeData } from "../../components/auth";
import { COACH, GUEST, PARENT, PLAYER, ACADEMY } from "../../components/Constants";
import BaseComponent, { TOURNAMENT_REGISTER, GO_TO_HOME } from '../BaseComponent';
import Events from '../../router/events';
import SplashScreen from 'react-native-splash-screen'
import * as Analytics from "../../Analytics"

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
        Analytics.logEvent("Splash");
        getData('userInfo', (value) => {
            var userData = JSON.parse(value)
            if (userData.user) {
                var userid = userData.user['id']
                var username = userData.user['name']
                
                Analytics.logEvent("SplashScreen", { userid: userid, username: username })
            }
        })
    }

    componentDidMount() {

        SplashScreen.hide();
        this.moveNext()
    }

    moveNext() {
        // this.props.navigation.navigate('FixtureSelection',
        //     { match_id: 46,
        //         id:46,
        //     name:'Navdeep'})
        //  return;
        // this.props.navigation.navigate('ChooseTimeDate',
        //     { id: 20,
        //     name:'Navdeep'})
        // return
        // this.props.navigation.navigate('PaymentHistory')
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
                        //this.props.navigation.navigate('IntroScreen')
                        this.props.navigation.navigate('Login')
                        return;
                    }
                    if (signedIn !== true) {
                       // this.props.navigation.navigate('IntroScreen')//'SignedOut')
                        this.props.navigation.navigate('Login')//'SignedOut')


                    } else {
                        getData('userInfo', (value) => {
                            userData = (JSON.parse(value))
                            // onSignIn()
                            let userType = userData.user['user_type']
                            global.USER_TYPE = userType
                            console.log("SplashScreen=> ", JSON.stringify(userData));
                            if (userType == GUEST) {
                                console.warn(userType)
                                this.props.navigation.navigate('GuestBookHome')
                            }
                            else if (userData.academy_id != null) {
                                console.log(userData);
                                if (userType == GUEST) {
                                    this.props.navigation.navigate('GuestBookHome')
                                // } else if (userType == PLAYER) {
                                //     if (userData.can_book_court) {
                                //         this.props.navigation.navigate('UserBookHome');
                                //     } else {
                                //         this.props.navigation.navigate('UserHome');
                                //     }

                                } else if (userType == COACH) {
                                    if (userData.can_book_court) {
                                        this.props.navigation.navigate('CoachBookHome');
                                    } else {
                                        this.props.navigation.navigate('CoachHome');
                                    }
                                }
                                else if (userType == ACADEMY) {
                                    storeData('multiple', userData.has_multiple_acadmies)
                                    if (userData.has_multiple_acadmies == false) {
                                        if (userData.can_book_court) {
                                            this.props.navigation.navigate('CoachBookHome');
                                        } else {
                                            this.props.navigation.navigate('CoachHome');
                                        }
                                    } else {
                                        this.props.navigation.navigate('SwitchPlayer', {
                                            userType: COACH
                                        })
                                    }
                                }else {
                                    if (userData.is_learn_enabled) {
                                        this.props.navigation.navigate("LearnHomePage");
                                    }else if (userData.is_play_enabled) {
                                        this.props.navigation.navigate("Guestfirsted");
                                    } else {
                                        this.props.navigation.navigate("HomeDrawer");
                                    }                                
                                }
                                // else if (userType == PARENT) {
                                //     if (userData.can_book_court) {
                                //         this.props.navigation.navigate('ParentBookHome');
                                //     } else {
                                //         this.props.navigation.navigate('ParentHome');
                                //     }
                                // }

                            } else {
                                if (userData.is_learn_enabled) {
                                    this.props.navigation.navigate("LearnHomePage");
                                }else if (userData.is_play_enabled) {
                                    this.props.navigation.navigate("Guestfirsted");
                                } else {
                                    this.props.navigation.navigate("HomeDrawer");
                                }                                
                            // this.props.navigation.navigate('SwitchPlayer')
                            }

                        });

                    }

                }, 1000)
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
                        height: 200,
                        width: 290
                    }}
                    source={require('../../images/new_splash_logo.png')}
                />

            </View>
        );

    }

}
export default Splash;
