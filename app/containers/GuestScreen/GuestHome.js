import React from 'react'
import roter from '../../router/router'
import {View,ImageBackground,Text,Card} from 'react-native'
import {  Button } from 'react-native-paper';
import BaseComponent from '../BaseComponent';

class  GuestHome extends BaseComponent {

    render() {
        return (
            < View style={{ flex: 1,backgroundColor:'#888888'  }}>

                <Text style={{marginTop:200}}>Guest Home Screen</Text>
                <Button
                    uppercase={false}
                    //PhoneAuth
                    color="#000000" onPress={()=> this.props.navigation.navigate('GuestDe')}>
                    Skip Login
                </Button>

            </View>
        );
    }
}
export default GuestHome;