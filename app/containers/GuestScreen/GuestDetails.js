import React from 'react'

import {View,ImageBackground,Text} from 'react-native'
import BaseComponent from '../BaseComponent';

class  GuestDetails extends BaseComponent {

    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'#888888'  }}>
                <Text style={{marginTop:200}}>Guest GuestDetails Screen</Text>
            </View>
        );
    }
}
export default GuestDetails;