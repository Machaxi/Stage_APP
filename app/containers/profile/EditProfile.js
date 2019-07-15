import React from 'react'

import { View, ImageBackground, Text, TextInput, Image, Alert } from 'react-native'
import BaseComponent, { defaultStyle, EVENT_EDIT_PROFILE } from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import PhotoUpload from 'react-native-photo-upload'
import { getData,storeData } from "../../components/auth";
import { saveUserStartupProfile } from "../../redux/reducers/ProfileReducer";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Events from '../../router/events';


class EditProfile extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            birthdate: "",
            txtname: '',
            txtphone: '',
            imageData: null,
        }

        getData('userInfo', (value) => {

            userData = (JSON.parse(value))
            console.warn('name => ', userData.user['name'])
            console.log("SplashScreen=> ", userData);
            this.state.birthdate = userData.user['dob']
            this.state.txtname = userData.user['name']
            this.state.txtphone = userData.user['mobile_number']
            this.setState({
                txtname: userData.user['name'],
                txtphone: userData.user['mobile_number'],
                birthdate: userData.user['dob']
            })
        });

    }
    saveUserProfile() {

        let txtname = this.state.txtname
        let phone_number = this.state.txtphone
        let birthdate = this.state.birthdate

        if (txtname == '') {
            alert('Name cannot be empty.')
        } else if (phone_number == '') {
            alert('Phone number can\'t be empty')
        } else {
            getData('header', (value) => {
                var formData = new FormData();
                var dataDic = {};
                // data.append('file', this.state.imageData);
                var dict = {};
                //dataDic['file'] = "storage/emulated/0/Pictures/test.jpg"//this.state.imageData
                //formData.append("file", "storage/emulated/0/Pictures/test.jpg");

                this.progress(true)
                dict['phone_number'] = phone_number;
                dict['name'] = txtname;
                dict['dob'] = birthdate;
                formData.append('post', JSON.stringify(dict));
                // console.log("header",value,batch_id);

                this.props.saveUserStartupProfile(value, formData).then(() => {
                    this.progress(false)
                    let data = this.props.data.profileData.data
                    console.log(' saveUserStartupProfile payload ' + JSON.stringify(this.props.data.profileData));
                    alert('Success.')
                    this.updatePrefData(JSON.stringify(data))
                }).catch((response) => {
                    console.log(response);
                    this.progress(false)
                    alert('Something went wrong.')
                })
            })
        }
    }

    updatePrefData(res) {

        getData('userInfo', (value) => {
            //console.log('old info => ', value)
            //console.log('new => ', res)
            let newObj = JSON.parse(value)
            newObj.user = JSON.parse(res).user
            storeData("userInfo", JSON.stringify(newObj))
            //console.log('result = > ', JSON.stringify(newObj))
            Events.publish(EVENT_EDIT_PROFILE);
        });
    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    render() {
        return (

            <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />

                <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                    <View
                        style={{
                            margin: 16,
                            flex: 1,
                            marginTop: 10,
                            // justifyContent: 'center',
                            alignItems: 'center'

                        }}
                    >
                        <PhotoUpload containerStyle={{ margin: 10 }}
                            onPhotoSelect={avatar => {
                                console.log('Image base64 string: ')
                                if (avatar) {
                                    this.setState({
                                        imageData: avatar
                                    })
                                    console.log('Image base64 string: ', avatar)
                                }
                            }}
                        >
                            <Image
                                style={{
                                    paddingVertical: 0,
                                    width: 180,
                                    height: 240,
                                    marginBottom: -40
                                    // borderRadius: 75
                                }}
                                //  resizeMode='cover'
                                source={require('../../images/edit_profile_holder.png')}
                            />
                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-end', marginBottom: 0,
                            }}>

                                <View style={{
                                    padding: 10,
                                    backgroundColor: '#67BAF5',
                                    height: 46,
                                    //borderWidth:1,
                                    //borderColor:'#67BAF5',

                                    borderRadius: 23,
                                    marginBottom: 0,
                                }} >
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#FFFFFF',
                                        textAlign: 'center',
                                        marginTop: 5
                                    }}  > Change Image</Text>
                                </View>
                            </View>
                        </PhotoUpload>
                        {/*<ImageBackground*/}
                        {/*style={{ width: 180, height: 240 }}*/}
                        {/*source={require('../../images/edit_profile_holder.png')}*/}
                        {/*>*/}

                        {/*<View style={{*/}
                        {/*flex: 1,*/}
                        {/*justifyContent: 'flex-end',marginBottom:-20,*/}
                        {/*}}>*/}

                        {/*<CustomeButtonB> Change Image</CustomeButtonB>*/}
                        {/*</View>*/}


                        {/*</ImageBackground>*/}

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
                        <View style={{ flex: 1, marginTop: -20, width: '80%' }}>
                            <SwitchButton onPress={() => this.props.navigation.navigate('SwitchPlayer')}> Skip </SwitchButton>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);


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