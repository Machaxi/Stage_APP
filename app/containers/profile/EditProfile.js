import React from 'react'

import { View, ImageBackground, Text, TextInput, Image, Alert, Platform } from 'react-native'
import BaseComponent, {getBaseUrl, defaultStyle, EVENT_EDIT_PROFILE, TOURNAMENT_REGISTER } from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import PhotoUpload from 'react-native-photo-upload'
import { getData, storeData } from "../../components/auth";
import { saveUserStartupProfile } from "../../redux/reducers/ProfileReducer";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Events from '../../router/events';
import moment from 'moment'
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import FastImage from 'react-native-fast-image';

class EditProfile extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            birthdate: "",
            txtname: '',
            txtphone: '',
            imageData: null,
            profile_pic: null,
            path: null,
            fileName: null,
            is_navigation_to_tournament: false,
            base64img: null,
            contentType: '',
            is_image_processed: false
        }

        getData(TOURNAMENT_REGISTER, (value) => {

            if (value != '' && value)
                this.setState({
                    is_navigation_to_tournament: value
                })
        });

        getData('userInfo', (value) => {

            userData = (JSON.parse(value))
            //console.warn('name => ', userData.user['name'])
            console.log("SplashScreen=> ", userData);
            this.state.birthdate = userData.user['dob']
            this.state.txtname = userData.user['name']
            this.state.txtphone = userData.user['mobile_number']
            this.setState({
                txtname: userData.user['name'],
                txtphone: userData.user['mobile_number'],
                birthdate: userData.user['dob'],
                profile_pic: userData.user['profile_pic'],
                is_image_processed: false//userData.user['is_image_processed']
            })


            let date = userData.user['dob']
            //console.warn('date = >', date)
            if (date != '') {
                date = date.split('T')
                //console.warn('date = >', date[0])
                date = moment.utc(date[0]).local().format("DD-MMM-YYYY")
                //console.warn('m date ,', date)
                this.state.birthdate = date
                this.setState({
                    birthdate: date
                })
            }
        });


    }
    saveUserProfile() {

        let txtname = this.state.txtname
        let phone_number = this.state.txtphone
        let birthdate = this.state.birthdate
        console.warn('Birth ', birthdate)

        if (birthdate == null)
            birthdate = ''
        if (birthdate != '') {
            birthdate = moment.utc(birthdate).local().format("YYYY-MM-DD")
        }


        if (txtname == '' || txtname == null) {
            alert('Name cannot be empty.')
        } else if (phone_number == '') {
            alert('Mobile number can\'t be empty')
        }
        else if (!this.isValidMobileNumber(phone_number)) {
            alert('Invalid mobile number')
        }
        else {

            getData('header', (value) => {
               
                var dict = {};
                this.progress(true)
                dict['phone_number'] = phone_number;
                dict['name'] = txtname;
                dict['dob'] = birthdate;
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
                            this.updatePrefData(JSON.stringify(data.data))

                            if (this.state.is_navigation_to_tournament) {
                                storeData(TOURNAMENT_REGISTER, '')
                                this.props.navigation.navigate('RegistrationSteps')
                            } else {
                                this.props.navigation.goBack()
                                Events.publish('REFRESH_DASHBOARD');
                            }
                        } else {
                            let error_message = data.error_message
                            alert(error_message)
                        }

                    }).catch((error) => {
                        console.log('error => ', error)
                        this.progress(false)
                    })




                // this.props.saveUserStartupProfile(value, formData).then(() => {
                //     this.progress(false)
                //     let data = this.props.data.profileData.data
                //     console.log(' saveUserStartupProfile payload ' + JSON.stringify(this.props.data));
                //     // alert('Success.')
                //     this.updatePrefData(JSON.stringify(data))


                //     if (this.state.is_navigation_to_tournament) {
                //         storeData(TOURNAMENT_REGISTER, '')
                //         this.props.navigation.navigate('RegistrationSteps')
                //     } else {
                //         this.props.navigation.goBack()
                //     }

                // }).catch((response) => {
                //     console.log(response);
                //     this.progress(false)
                //     alert('Something went wrong.')
                // })
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

    render() {

        //console.log('base64img => ', base64img)
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

        const phone = this.state.phone
        const is_image_processed = this.state.is_image_processed

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
                                <Text style={{ color: 'red' }}>*</Text>Name
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
                                <Text style={{ color: 'red' }}>*</Text>Mobile Number
                    </Text>

                            <TextInput
                                value={this.state.txtphone}
                                style={style.textinput}
                                onChangeText={(txtphone) => {
                                    if (txtphone == '') {
                                        txtphone = '+91'
                                    }
                                    this.setState({ txtphone: txtphone })
                                }}>

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
                        <View style={{ flex: 1, margin: 20, width: '80%' }}>
                            <CustomeButtonB onPress={() => this.saveUserProfile()}> Save </CustomeButtonB>
                        </View>
                        {/* <View style={{ flex: 1, marginTop: -20, width: '80%' }}>
                            <SwitchButton onPress={() => this.props.navigation.navigate('SwitchPlayer')}> Skip </SwitchButton>
                        </View> */}

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