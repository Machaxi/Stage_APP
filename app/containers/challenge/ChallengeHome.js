import React from 'react'

import { View, ImageBackground, Text } from 'react-native'
import { Button } from 'react-native-paper';
import BaseComponent from '../BaseComponent';
import firebase from "react-native-firebase";
import { onSignOut } from "../../components/auth";
//import firebase from 'react-native-firebase';

class ChallengeHome extends BaseComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (

            <View
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginBottom: 30,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <Text>Under Development</Text>

            </View>



        );
    }
}
export default ChallengeHome

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