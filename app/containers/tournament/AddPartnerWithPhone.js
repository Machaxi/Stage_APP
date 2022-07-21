import React from 'react'

import { View, ImageBackground, Text, TextInput } from 'react-native'
import BaseComponent, { EVENT_SELECT_PLAYER_ADD_NUMBER } from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import Events from '../../router/events';

export default class AddPartnerWithPhone extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            txtname: '',
            txtphone: '',
            id: ''
        }
        this.state.id = this.props.navigation.getParam('id', '')

    }

    save() {
        let id = this.state.id
        let txtname = this.state.txtname
        let txtphone = this.state.txtphone
        if (txtname == '') {
            alert('Name can\'t be empty')
        }
        else if (txtphone == '') {
            alert('Mobile number can\'t be empty')
        }
        else if (!this.isValidMobileNumberWithoutPrefix(txtphone)) {
            alert('Please enter valid mobile number.')
        }
        else {
            this.props.navigation.goBack()
            Events.publish('AddPartner',
                { name: txtname, phone: txtphone, id: id });
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
                        Mobile Number
                    </Text>

                    <TextInput
                        style={style.textinput}
                        keyboardType={'number-pad'}
                        value={this.state.txtphone}
                        onChangeText={(txtphone) => this.setState({ txtphone: txtphone })}
                    />
                </View>


                <View style={{ flex: 1, margin: 40, width: '80%' }}>
                    <CustomeButtonB
                        onPress={() => {
                            this.save()
                        }}
                    > Submit </CustomeButtonB>
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
        //borderWidth: 1,
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