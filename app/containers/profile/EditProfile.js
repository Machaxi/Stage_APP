import React from 'react'

import { View, ImageBackground, Text, TextInput } from 'react-native'
import BaseComponent from '../BaseComponent';
import {CustomeButtonB, SwitchButton,} from '../../components/Home/SwitchButton'
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'

class EditProfile extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            birthdate:"2016-05-15",
            txtname:'Niranjan',
            txtphone:'8291088636',
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

                <ImageBackground
                    style={{ width: 180, height: 240 }}
                    source={require('../../images/edit_profile_holder.png')}
                >

                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',marginBottom:-20,
                    }}>

                        <CustomeButtonB> Change Image</CustomeButtonB>
                    </View>


                </ImageBackground>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}
                >
                    <Text style={style.text}>
                        Name
                    </Text>
                    <TextInput
                        style={style.textinput}
                        // mode='outlined'
                        label='name'

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
                        987654210
                    </TextInput>
                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10
                    }}
                >
                    <Text style={style.text}>
                        Birth Date
                    </Text>

                    <DatePicker
                        style={{width: 200,borderWidth:0}}
                        date={this.state.birthdate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MMM-YYYY"
                        minDate="2016-05-01"
                        maxDate = {Date.now()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{

                            dateInput: {
                                marginLeft: 36,
                                borderWidth:0
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(birthdate) => {this.setState({birthdate: birthdate})}}
                    />
                </View>
                <View style={{flex:1,margin:20,width:'80%'}}>
                 <CustomeButtonB onPress={() => this.props.navigation.navigate('SwitchPlayer')}> Update </CustomeButtonB>
                </View>
                <View style={{flex:1,marginTop:-20,width:'80%'}}>
                    <SwitchButton  onPress={() => this.props.navigation.navigate('SwitchPlayer')}> Skip </SwitchButton>
                </View>

            </View>
        );
    }

}
export default EditProfile

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