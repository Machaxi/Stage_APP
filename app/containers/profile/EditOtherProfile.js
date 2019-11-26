import React from 'react'

import { View, ImageBackground, Text, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import BaseComponent, { getBaseUrl,defaultStyle, EVENT_EDIT_PROFILE } from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { ScrollView } from 'react-native-gesture-handler';
import {Switch} from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import PhotoUpload from 'react-native-photo-upload'
import { getData } from "../../components/auth";
import { saveOtherUserProfile, getUserProfile } from "../../redux/reducers/ProfileReducer";
import { connect } from 'react-redux';
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';
import Events from '../../router/events';
import moment from 'moment'
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import FastImage from 'react-native-fast-image';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class EditOtherProfile extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            birthdate: "",
            txtname: '',
            txtphone: '',
            profile_pic: '',
            id: '',
            path: null,
            fileName: null,
            is_navigation_to_tournament: false,
            base64img: null,
            contentType: '',
            is_image_processed: false,
            hideUser: false,
        }

        let data = this.props.navigation.getParam('data')
        console.warn('date - ', data)
        let res = JSON.parse(data)
        if (res != undefined) {
            let name = res.name
            let dob = res.dob
            let phone_number = res.phone_number
            let hideUser = res.is_stats_hidden
            if(hideUser === null){
                hideUser = false
            }
            this.state.txtname = name
            this.state.txtphone = phone_number
            this.state.birthdate = dob
            this.state.hideUser = hideUser
            this.state.id = res.user_id
            this.state.profile_pic = res.profile_pic
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

    componentDidMount(){
        getData('header', (value)=>{
            this.props.getUserProfile(value, this.state.id).then(()=>{
                var userData = this.props.userProfile.profileData.data
                this.setState({
                    txtname: userData.user['name'],
                    txtphone: userData.user['phone_number'],
                    hideUser: userData.user['is_stats_hidden'],
                    birthdate: userData.user['dob'],
                    profile_pic: userData.user['profile_pic']
                })
            }).catch((response) =>{
                console.log(response);
            })
        })
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
        // else if (txtphone == '') {
        //     alert("Mobile number is empty.")
        // }
        else if (txtphone !== '' && txtphone !== null && !this.isValidMobileNumber(txtphone)) {
            alert('Invalid mobile number')
        }
        else {

            getData('header', (value) => {

                var dict = {};
                this.progress(true)
                dict['phone_number'] = txtphone;
                dict['name'] = txtname;
                dict['dob'] = dob;
                dict['user_id'] = this.state.id
                dict['is_stats_hidden'] = this.state.hideUser
                //formData.append('post', JSON.stringify(dict));

                let file = null
                let path = this.state.path
                console.log("path", path);
                if (Platform.OS == 'ios') {
                    if(path!=null){
                        path = path.replace('file:///', '/')
                        console.log("path", path);
                    }
                }

                let fileName = this.state.fileName
                let type = this.state.contentType
                if (path != null) {
                    file = {
                        name: 'file',
                        filename: fileName,
                        data: RNFetchBlob.wrap(path),
                        type: type
                    }
                }
                let param = []
                if (file != null) {
                    param.push(file)
                }
                console.warn('file => ', JSON.stringify(file))
                let post = { name: 'post', data: JSON.stringify(dict) }
                param.push(post)

                console.log('profile data=> ', JSON.stringify(dict))

                let url = getBaseUrl() + 'user/profile'

                RNFetchBlob.
                    config({ timeout: 1000 * 60 })
                    .fetch('POST', url, {
                        'Content-Type': 'multipart/form-data',
                        'x-authorization': value,
                    }, param).then((resp) => {
                        // this.progress(false)
                        // console.log(resp);
                        // alert('your image uploaded successfully');

                        this.progress(false)

                        let data = JSON.parse(resp.data)//JSON.parse(resp)
                        console.warn('suces => ', data.success)
                        console.log(' saveUserStartupProfile payload ' + JSON.stringify(data));

                        let success = data.success
                        if (success) {

                            // alert('Success.')
                            //this.updatePrefData(JSON.stringify(data.data))

                            this.props.navigation.goBack()
                            Events.publish('REFRESH_DASHBOARD');

                        } else {
                            let error_message = data.error_message
                            this.progress(false)
                            setTimeout(()=>{
                                alert(error_message)
                            },500)
                        }

                    }).catch((error) => {
                        console.log('error => ', error)
                        this.progress(false)
                    })
            })

            // getData('header', (value) => {
            //     var formData = new FormData();
            //     var dataDic = {};
            //     // data.append('file', this.state.imageData);
            //     var dict = {};
            //     //dataDic['file'] = "storage/emulated/0/Pictures/test.jpg"//this.state.imageData
            //     //formData.append("file", "storage/emulated/0/Pictures/test.jpg");
            //     this.progress(true)
            //     dict['phone_number'] = txtphone//user.phoneNumber;
            //     dict['name'] = txtname;
            //     dict['dob'] = dob;
            //     dict['user_id'] = this.state.id
            //     console.log('json => ', JSON.stringify(dict))
            //     formData.append('post', JSON.stringify(dict));
            //     console.log("header", JSON.stringify(formData));

            //     this.props.saveOtherUserProfile(value, formData).then(() => {
            //         this.progress(false)
            //         let data = this.props.data.profileData.data
            //         console.log(' saveOtherUserProfile payload ' + JSON.stringify(this.props.data));
            //         alert('Success.')
            //         Events.publish(EVENT_EDIT_PROFILE);

            //     }).catch((response) => {
            //         //handle form errors
            //         console.log(response);
            //         this.progress(false)
            //         alert('Something went wrong.')
            //     })

            // })
        }
    }

    pickImage() {

        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //const source = { uri: response.uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                let path = response.path
                if (Platform.OS == 'ios') {
                    path = response.uri
                }
                // let fileName = response.fileName
                // let base64 = 'data:image/jpeg;base64,' + response.data
                // let type = response.type
                // this.setState({
                //     path: path,
                // })

                this.resizeImage(path)

                //console.warn('path => ',this.state.path)
                //console.warn('fileName => ',this.state.fileName)
            }
        });

    }

    resizeImage(path) {


        ImageResizer.createResizedImage(path, 625, 400, 'PNG', 80)
            .then(({ uri }) => {

                var fileName = uri.replace(/^.*[\\\/]/, '')
                this.setState({
                    path: uri,
                    fileName: fileName,
                    contentType: 'image/png'
                })

            })
            .catch(err => {
                console.log(err);
                return Alert.alert('Unable to resize the photo', 'Check the console for full the error message');
            });
    }


    progress(status) {
        this.setState({
            spinner: status
        })
    }

    render() {

        const is_image_processed = false

        let placeHolder = null
        let profile_pic = this.state.profile_pic
        let base64img = this.state.path

        if (base64img != null) {
            placeHolder = { uri: base64img }
        }
        else if (profile_pic == null) {
            placeHolder = require('../../images/male_avatar_small.png')
        } else {
            placeHolder = { uri: profile_pic }
        }


        return (

            <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                <ScrollView style={{
                    flex: 1,
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
                            marginTop: 0,
                            justifyContent: 'center',
                            alignItems: 'center'

                        }}
                    >

                        <TouchableOpacity
                            onPress={() => {
                                if (is_image_processed != true)
                                    this.pickImage()
                            }}
                        >

                            <FastImage
                                resizeMode="contain"
                                style={{

                                    paddingVertical: 0,
                                    width: 180,
                                    height: 240,
                                    marginBottom: -40
                                    // borderRadius: 75
                                }}
                                //  resizeMode='cover'
                                source={placeHolder}
                            />
                            {is_image_processed != true ?
                                <View style={{
                                    justifyContent: 'flex-end', marginBottom: 0,
                                }}>

                                    <View style={{
                                        padding: 10,
                                        backgroundColor: '#67BAF5',
                                        height: 46,
                                        justifyContent: 'center',
                                        //borderWidth:1,
                                        //borderColor:'#67BAF5',
                                        alignItems: 'center',
                                        borderRadius: 23,
                                        marginBottom: 0,
                                    }} >
                                        <Text style={[defaultStyle.bold_text_14,
                                        {
                                            color: '#FFFFFF',
                                            textAlign: 'center',
                                        }]}> Change Image</Text>
                                    </View>
                                </View>
                                : null}

                        </TouchableOpacity>

                        <Text
                            onPress={() => {
                                this.props.navigation.navigate('ImageGuidelines')
                            }}
                            style={[defaultStyle.regular_text_10, { margin: 8, color: '#67BAF5' }]}>
                            Image Guidelines
                            </Text>


                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                        >
                            <Text style={style.text}>Name</Text>
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
                            <Text style={style.text}>Mobile Number</Text>
                            <TextInput
                                onChangeText={(text) =>{
                                    if(text.length === 1 && text !== '+'){
                                        text = '+91' + text
                                    }
                                    this.setState({ txtphone: text })
                                } }
                                value={this.state.txtphone}
                                style={style.textinput}
                                keyboardType={'phone-pad'}
                            />
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10
                            }}
                        >
                            <Text style={style.text}>Birth Date</Text>
                            <DatePicker
                                style={{ width: 200, borderWidth: 0 }}
                                date={this.state.birthdate}
                                mode="date"
                                placeholder="select date"
                                format="DD-MMM-YYYY"
                                minDate={moment('1920-01-01')}
                                maxDate={moment(Date.now())}
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

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                marginTop: 10
                            }}
                        >
                            <Text style={style.text}>Hide Stats</Text>
                            <Switch 
                                onValueChange={(value) => this.setState({hideUser: value})}
                                value={this.state.hideUser}
                                color='#67BAF5'
                                // trackColor={{false: '#DFDFDF', true: '#67BAF5'}}
                            />
                        </View>
                            
                        <View style={{ flex: 1, margin: 20, width: '80%' }}>
                            <CustomeButtonB onPress={() => this.saveUserProfile()}> Update </CustomeButtonB>
                        </View>
                        
                        {Platform.OS == 'ios' ?
                            <KeyboardSpacer />
                        : null}

                    </View>
                </ScrollView>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        data: state.ProfileReducer,
        userProfile: state.UserProfile,
    };
};
const mapDispatchToProps = {
    saveOtherUserProfile, getUserProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(EditOtherProfile);


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