import React from 'react'

import { View, ImageBackground } from 'react-native'
import { Button } from 'react-native-paper';
import BaseComponent from '../BaseComponent';
import firebase from "react-native-firebase";
import {onSignOut} from "../../components/auth";
//import firebase from 'react-native-firebase';
class welcome extends BaseComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ImageBackground
                source={require('../../images/login-back.png')}
                style={{
                    width: '100%',
                    height: '100%',
                }}>


                <View
                    style={{
                        marginLeft: 16,
                        marginRight: 16,
                        marginBottom: 30,
                        flex: 1, flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}
                >

                    <Button
                        uppercase={false}
                        theme={{ fonts: { regular: 'Lato-Regular' } }}
                        titleStyle={{ fontFamily: 'Lato-Regular', fontWeight: 400 }}
                        style={style.buttonStyle} color="#ffffff" onPress={() => this.props.navigation.navigate('CHome')}>
                        Register </Button>
                    <Button
                        uppercase={false}
                        style={style.buttonStyleLogin} color="#ffffff" onPress={() => {

                            // firebase.auth().signOut();
                            // onSignOut()
                            // removeItem()
                            this.props.navigation.navigate('Login', {
                            isNormalFlow: true
                        })
                    }}>
                        Login
                    </Button>

                </View>
                <Button
                    uppercase={false}
                    //PhoneAuth
                    color="#ffffff" onPress={() => this.props.navigation.navigate('AcademyListing')}>
                    Skip Login
                </Button>

            </ImageBackground>
        );
    }

}
export default welcome

const style = {
    buttonStyle: {

        backgroundColor: '#FF7860',
        borderRadius: 5,
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Lato-Regular',

    },
    buttonStyleLogin: {

        backgroundColor: '#00B4C4',
        borderRadius: 5,
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Lato-Regular',

    },
    textStyle: {
        alignSelf: 'center',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 10,
        paddingTop: 10

    }
}