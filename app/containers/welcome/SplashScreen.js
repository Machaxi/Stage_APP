import React from 'react'

import { View, Image, Linking, Platform } from 'react-native'
import { getData, isSignedIn, onSignIn, storeData } from "../../components/auth";
import { COACH, GUEST, PARENT, PLAYER, ACADEMY } from "../../components/Constants";
import BaseComponent, { TOURNAMENT_REGISTER } from '../BaseComponent';

class Splash extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,
            deepUrl: ""
        };

        //checking for tournamnet registraion, guest can skip, when they go to upcoming tournament
        // first they have to login then register for tournament
        // getData(TOURNAMENT_REGISTER, (value) => {

        //     console.warn('TOURNAMENT_REGISTER => ', value)
        //     if (value != '' && (value == true || value == "true")) {
        //         this.props.navigation.navigate('Login')
        //     } else {

        //     }
        // });
        this.moveNext()
    }

    moveNext() {
        //this.props.navigation.navigate('TournamentScorer')
        //return
        var userData;
        // getData('userInfo', (value) => {
        //     console.log("value", value)
        // })
        isSignedIn()
            .then(res => {
                console.log(res);
                this.setState({ signedIn: res, checkedSignIn: true })
                BaseComponent.isUserLoggedIn = true

                setTimeout(() => {

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

                }, 10)
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

    componentDidMount() {


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
            <View style={{ flex: 1 }}>


            </View>
        );

    }

}
export default Splash;
