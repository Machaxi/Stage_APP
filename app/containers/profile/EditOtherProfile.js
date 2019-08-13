import React from 'react'

import { View, ImageBackground, Text, TextInput, Image, Alert } from 'react-native'
import BaseComponent, { defaultStyle, EVENT_EDIT_PROFILE } from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import PhotoUpload from 'react-native-photo-upload'
import { getData } from "../../components/auth";
import { saveOtherUserProfile } from "../../redux/reducers/ProfileReducer";
import { connect } from 'react-redux';
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';
import Events from '../../router/events';
import moment from 'moment'


class EditOtherProfile extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            birthdate: "",
            txtname: '',
            txtphone: '',
            profile_pic: '',
            id: ''
        }

        let data = this.props.navigation.getParam('data')
        console.warn('date - ', data)
        let res = JSON.parse(data)
        if (res != undefined) {
            let name = res.name
            let dob = res.dob
            let phone_number = res.phone_number
            this.state.txtname = name
            this.state.txtphone = phone_number
            this.state.birthdate = dob
            this.state.id = res.user_id
        }

        let date = this.state.birthdate
        //console.warn('date = >', date)
        if (date != null && date != '') {
            date = date.split('T')
            //console.warn('date = >', date[0])
            date = moment.utc(date[0]).local().format("DD-MMM-YYYY")
            //console.warn('m date ,', date)
            this.state.birthdate = date
            this.setState({
                birthdate: date
            })
        }

        // getData('userInfo', (value) => {
        //     let res = JSON.parse(value)
        //     this.state.id = res.user['id']
        // })
    }

    saveUserProfile() {

        let txtname = this.state.txtname;
        let txtphone = this.state.txtphone;
        let dob = this.state.birthdate;
        if (dob == null)
            dob = ''

        if (dob != '') {
            dob = moment.utc(dob).local().format("YYYY-MM-DD")
        }

        if (txtname == '') {
            alert("Name is empty")
        }
        else if (txtphone == '') {
            alert("Phone number is empty.")
        } else {

            getData('header', (value) => {
                var formData = new FormData();
                var dataDic = {};
                // data.append('file', this.state.imageData);
                var dict = {};
                //dataDic['file'] = "storage/emulated/0/Pictures/test.jpg"//this.state.imageData
                //formData.append("file", "storage/emulated/0/Pictures/test.jpg");
                this.progress(true)
                dict['phone_number'] = txtphone//user.phoneNumber;
                dict['name'] = txtname;
                dict['dob'] = dob;
                dict['user_id'] = this.state.id
                console.log('json => ', JSON.stringify(dict))
                formData.append('post', JSON.stringify(dict));
                console.log("header", JSON.stringify(formData));

                this.props.saveOtherUserProfile(value, formData).then(() => {
                    this.progress(false)
                    let data = this.props.data.profileData.data
                    console.log(' saveOtherUserProfile payload ' + JSON.stringify(this.props.data));
                    alert('Success.')
                    Events.publish(EVENT_EDIT_PROFILE);

                }).catch((response) => {
                    //handle form errors
                    console.log(response);
                    this.progress(false)
                    alert('Something went wrong.')
                })

            })
        }
    }

    progress(status) {
        this.setState({
            spinner: status
        })
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

                    <Spinner
                        visible={this.state.spinner}
                        textStyle={defaultStyle.spinnerTextStyle}
                    />
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
                                onChangeText={(text) => this.setState({ txtphone: text })}
                                value={this.state.txtphone}
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
                                minDate="1950-05-01"
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
    saveOtherUserProfile
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