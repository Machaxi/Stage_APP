import React from 'react'

import { View, ImageBackground, Text, TextInput } from 'react-native'
import BaseComponent from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'

export default class AddPartnerWithPhone extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            txtname: '',
            txtphone: '',
        }
    }

    render() {
        return (


            <View
                style={{
                    margin: 16,
                    flex: 1,
                    marginTop: 30,
                    // justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <Text style={{
                    marginTop: 12, fontSize: 14,
                    color: '#404040',
                    fontFamily: 'Quicksand-Regular'
                }}>
                    Add via Phone number
                    </Text>


                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30
                    }}
                >
                    <Text style={style.text}>
                    Enter Name
                    </Text>
                    <TextInput
                        style={style.textinput}
                        // mode='outlined'
                        label='Enter Name'

                        // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                        value={this.state.txtname}
                        onChangeText={(txtname) => this.setState({ txtname: txtname })}
                    />

                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10
                    }}
                >
                    <Text style={style.text}>
                        Phone Number
                    </Text>

                    <TextInput
                        style={style.textinput}>
                        
                    </TextInput>
                </View>


                <View style={{ flex: 1, margin: 40, width: '80%' }}>
                    <CustomeButtonB > Submit </CustomeButtonB>
                </View>

            </View>
        );
    }

}

const style = {
    rounded_button: {
        width: '100%',
        height: 40,
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
    textinput: {
        textAlign: 'center',
        height: 36,
        color: '#404040',
        width: 150, borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1,
        fontFamily: 'Quicksand-Regular'
    },
    text: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 10,
        color: '#A3A5AE'
    }
}