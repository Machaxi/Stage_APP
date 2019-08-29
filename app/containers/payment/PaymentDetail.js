import React from 'react'

import { View, Text,Image, Linking, Platform } from 'react-native'
import { getData, isSignedIn, onSignIn, storeData } from "../../components/auth";
import BaseComponent, { TOURNAMENT_REGISTER, GO_TO_HOME } from '../BaseComponent';

export default class PaymentDetail extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,
            deepUrl: ""
        };
    }




    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Text>
                    Under Development
                </Text>
            </View>
        );

    }

}
