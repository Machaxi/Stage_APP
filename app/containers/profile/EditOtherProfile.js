import React from 'react'

import { View, ImageBackground, Text, TextInput, Image, Alert } from 'react-native'
import BaseComponent from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import PhotoUpload from 'react-native-photo-upload'
import { getData } from "../../components/auth";
import { saveUserStartupProfile } from "../../redux/reducers/ProfileReducer";
import { connect } from 'react-redux';
class EditOtherProfile extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            birthdate: "",
            txtname: '',
            txtphone: '',
            profile_pic: ''
        }

        let data = this.props.navigation.getParam('data')
        if (data != undefined) {
            this.setState({
                birthdate: data.dob,
                txtname: data.name,
                txtphone: data.phone_number
            })
        }
        console.warn('other profiel data ',data)
    }

    render() {

        let profile_pic = this.state.profile_pic
        if (profile_pic == '') {
            profile_pic = 'https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg'
        }

        return (

            <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                <ScrollView style={{
                    flex: 1, marginTop: 20,
                    backgroundColor: '#F7F7F7'
                }}>
                    <View
                        style={{
                            margin: 16,
                            flex: 1,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center'

                        }}
                    >

                        <Image
                            style={{ height: 100, width: 100 }}
                            source={{ uri: profile_pic }} />


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
                                value={this.state.txtname}
                                style={style.textinput}>

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
                                style={{ width: 200, borderWidth: 0 }}
                                date={this.state.birthdate}
                                mode="date"
                                placeholder="select date"
                                format="DD-MMM-YYYY"
                                minDate="2016-05-01"
                                maxDate={Date.now()}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{

                                    dateInput: {
                                        marginLeft: 36,
                                        borderWidth: 0
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(birthdate) => { this.setState({ birthdate: birthdate }) }}
                            />
                        </View>
                        <View style={{ flex: 1, margin: 20, width: '80%' }}>
                            <CustomeButtonB onPress={() => this.saveUserProfile()}> Update </CustomeButtonB>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        data: state.ProfileReducer,
    };
};
const mapDispatchToProps = {
    saveUserStartupProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(EditOtherProfile);


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