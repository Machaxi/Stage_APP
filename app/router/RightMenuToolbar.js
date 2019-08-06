import React from "react";
import { Platform, StatusBar, Image, View, Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import { getData, storeData } from '../components/auth';
import { GUEST, PLAYER, PARENT, COACH, ACADEMY } from '../components/Constants'

class RightMenuToolbar extends React.Component {

    //==================================================================
    //          showNotification = true/false (show/hide)
    //          showHome
    //==================================================================

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {

        //showNotification={false} showHome={true}
        let showNotification = false
        let showHome = false
        if (this.props.showNotification != undefined)
            showNotification = this.props.showNotification

        if (this.props.showHome != undefined)
            showHome = this.props.showHome



        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                {showNotification ? <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => { }}>

                    <Image
                        source={require('../images/ic_notifications.png')}
                        style={{ width: 20, height: 20, marginRight: 12 }}
                    />
                </TouchableOpacity> : null}


                {showHome ? <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => {

                        getData('userInfo', (value) => {
                            let userData = (JSON.parse(value))
                            // onSignIn()
                            let userType = userData.user['user_type']
                            console.log("SplashScreen=> ", JSON.stringify(userData));
                            console.warn('userType ', userType)

                            //console.warn('academy_id ', userData.academy_id)

                            if (userType == GUEST) {
                                this.props.navigation.navigate('GHome')
                            }
                            else {
                                console.log('data=> ', userData);
                                if (userType == GUEST) {
                                    this.props.navigation.navigate('GHome')
                                } else {

                                    if (userType == PLAYER) {
                                        //this.props.navigation.navigate('UHome')
                                        // if (!userData.has_multiple_acadmies) {
                                        //     this.props.navigation.navigate('UHome')

                                        // } else {
                                        //     this.props.navigation.navigate('SwitchPlayer', {
                                        //         userType: 'PLAYER'
                                        //     })
                                        // }
                                        this.props.navigation.navigate('UHome')

                                    } else if (userType == COACH || userType == ACADEMY) {
                                        //this.props.navigation.navigate('CHome')
                                       // storeData('multiple', userData.has_multiple_acadmies)
                                        // if (userData.has_multiple_acadmies == false) {
                                        //     this.props.navigation.navigate('CHome')
                                        // } else {
                                        //     this.props.navigation.navigate('SwitchPlayer', {
                                        //         userType: COACH
                                        //     })
                                        // }
                                        this.props.navigation.navigate('CHome')
                                    }
                                    else if (userType == PARENT) {
                                        //this.props.navigation.navigate('PHome')
                                        // if (userData.has_multiple_acadmies == false) {
                                        //     this.props.navigation.navigate('PHome')

                                        // } else {
                                        //     this.props.navigation.navigate('SwitchPlayer', {
                                        //         userType: PLAYER
                                        //     })
                                        // }
                                        this.props.navigation.navigate('PHome')
                                    }
                                }
                            }
                        });

                    }}>

                    <Image
                        source={require('../images/ic_home.png')}
                        style={{ width: 20, height: 20, marginRight: 12 }}
                    />
                </TouchableOpacity> : null}


            </View>
        );
    }
}
export default RightMenuToolbar;