import React from 'react'

import { View, Image, Linking, Platform } from 'react-native'
import { getData, isSignedIn, onSignIn, storeData } from "../../components/auth";
import { COACH, GUEST, PARENT, PLAYER } from "../../components/Constants";
import BaseComponent from '../BaseComponent';

class Splash extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,
            deepUrl: ""
        };
    }

    componentDidMount() {

        this.props.navigation.navigate('Login')
        return
        var userData;
        // getData('userInfo', (value) => {
        //     console.log("value", value)
        // })
        isSignedIn()
            .then(res => {
                console.log(res);
                this.setState({ signedIn: res, checkedSignIn: true })
                BaseComponent.isUserLoggedIn = true
            })
            .catch(err => alert("An error occurred"));


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
                    console.log("SplashScreen=> ", userData);
                    if (userData.user['user_type'] == GUEST) {
                        this.props.navigation.navigate('GHome')
                    }
                    else if (userData.academy_id != null) {
                        console.log(userData);
                        if (userData.user['user_type'] == GUEST) {
                            this.props.navigation.navigate('GHome')
                        } else if (userData.user['user_type'] == PLAYER) {
                            this.props.navigation.navigate('UHome')

                        } else if (userData.user['user_type'] == COACH) {
                            this.props.navigation.navigate('CHome')

                        }
                        else if (userData.user['user_type'] == PARENT) {
                            this.props.navigation.navigate('PHome')

                        }
                    } else {
                        this.props.navigation.navigate('SwitchPlayer')
                    }

                });

            }

        }, 100)

        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
        }
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);

    }
    handleOpenURL(event) {
    }

    navigate = (url) => { // E
        this.state.deepUrl = url
        storeData('deepUrl', this.state.deepUrl)

    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                {/* <Image style={{ width: '100%', height: '100%' }}
                    source={require('../../images/login-back.png')}
                /> */}

            </View>
        );

    }

}
export default Splash;