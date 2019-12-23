import React from 'react'

import { View, ImageBackground, Text, TextInput, Image, Alert, Platform, StyleSheet } from 'react-native'
import BaseComponent, {getBaseUrl, defaultStyle, EVENT_EDIT_PROFILE, TOURNAMENT_REGISTER } from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Switch} from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import PhotoUpload from 'react-native-photo-upload'
import { getData, storeData } from "../../components/auth";
import { saveUserStartupProfile, getUserProfile } from "../../redux/reducers/ProfileReducer";
import {coachDetail} from '../../redux/reducers/AcademyReducer';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Events from '../../router/events';
import moment from 'moment'
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import FastImage from 'react-native-fast-image';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNPickerSelect from 'react-native-picker-select';
import InfoMessage from '../../components/custom/InfoMessage';


const month = [
    {label: '0', value: '0'},{label: '1', value: '1'},{label: '2', value: '2'},
    {label: '3', value: '3'},{label: '4', value: '4'},{label: '5', value: '5'},
    {label: '6', value: '6'},{label: '7', value: '7'},{label: '8', value: '8'},
    {label: '9', value: '9'},{label: '10', value: '10'},{label: '11', value: '11'},
]

const selectYear = {
    label: 'Year',
    value: null,
    color: '#9EA0A4',
};

const selectMonth = {
    label: 'Month',
    value: null,
    color: '#9EA0A4',
};

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
            is_image_processed: false,
            hideUser: false,
            user_type: '',
            totalYear: '',
            totalMonth: '',
            review: '',
            totalExperience: '',
            coach_id: '',
            showMessage: false
        }
        this.year = []
        for(var i=0; i<50; i++){
            this.year.push({label: i.toString(), value: i.toString()})
        }

        console.log('year is', this.year)
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
            // this.state.birthdate = userData.user['dob']
            // this.state.txtname = userData.user['name']
            // this.state.txtphone = userData.user['mobile_number']
            this.setState({
                // txtname: userData.user['name'],
                // txtphone: userData.user['mobile_number'],
                // birthdate: userData.user['dob'],
                // profile_pic: userData.user['profile_pic'],
                user_type: userData.user['user_type'],
                // hideUser: userData.user['is_stats_hidden'],
                // is_image_processed: false//userData.user['is_image_processed']
            })


            // let date = userData.user['dob']
            // //console.warn('date = >', date)
            // if (date != '') {
            //     date = date.split('T')
            //     //console.warn('date = >', date[0])
            //     date = moment.utc(date[0]).local().format("DD-MMM-YYYY")
            //     //console.warn('m date ,', date)
            //     this.state.birthdate = date
            //     this.setState({
            //         birthdate: date
            //     })
            // }
        });


    }

    componentDidMount(){
        getData('header', (value)=>{
            this.props.getUserProfile(value).then(()=>{
                var userData = this.props.userProfile.profileData.data
                let date = userData.user['dob']
                if (date != '' && date !== null) {
                    date = date.split('T')
                    date = moment.utc(date[0]).local().format("DD-MMM-YYYY")
                    //console.warn('m date ,', date)
                    this.state.birthdate = date
                }
                this.setState({
                    txtname: userData.user['name'],
                    txtphone: userData.user['phone_number'],
                    hideUser: userData.user['is_stats_hidden'],
                    birthdate: date,
                    profile_pic: userData.user['profile_pic'],
                    totalExperience: userData.user['experience'],
                    review: userData.user['about'],
                    // user_type: userData.user['user_type'],
                    is_image_processed: false//userData.user['is_image_processed']
                }, () => this.getYearMonth())
            }).catch((response) =>{
                console.log(response);
            })
        })

        // getData('header', (value) => {
        //     getData('userInfo', (innerValue) => {
        //         let userData = JSON.parse(innerValue)
        //         if(userData.user['user_type'] === 'COACH'){
        //             this.setState({ coach_id: userData['coach_id'] })
        //             this.props.coachDetail(value, userData['coach_id'], '').then(() =>{
        //                 var coachData = this.props.coachExperience.res.data
        //                 this.setState({
        //                     review: coachData['coach']['about'],
        //                     totalExperience: coachData['coach']['experience']
        //                 }, () => this.getYearMonth());
        //             }).catch(response => {
        //             })
        //         }
        //     })
        // })
    }

    getYearMonth(){
        var totalYear = null
        var totalMonth = null
        if(this.state.totalExperience !== '' && this.state.totalExperience !== null){
            totalYear = Math.floor(this.state.totalExperience/12)
            totalYear = this.year[totalYear].value
            totalMonth = this.state.totalExperience%12
            totalMonth = month[totalMonth].value
        }
        this.setState({ totalYear, totalMonth })
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
        } 
        // else if (phone_number == '') {
        //     alert('Mobile number can\'t be empty')
        // }
        else if (phone_number !== '' && phone_number !== null && !this.isValidMobileNumber(phone_number)) {
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
                if(this.state.user_type === 'PLAYER'){
                    dict['is_stats_hidden'] = this.state.hideUser
                } else if(this.state.user_type === 'COACH'){
                    const {totalYear, totalMonth, review} = this.state;
                    var months = parseInt(totalYear)*12 + parseInt(totalMonth)
                    dict['about'] = review
                    dict['experience'] = months
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
                            this.progress(false)
                            setTimeout(()=>{
                                alert(error_message)
                            },500)
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

    showMessage(){
        this.setState({showMessage: true})
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
                                keyboardType={'phone-pad'}
                                style={style.textinput}
                                onChangeText={(txtphone) => {
                                    if (txtphone.length === 1 && txtphone !== '+') {
                                        txtphone = '+91' + txtphone
                                    }
                                    this.setState({ txtphone: txtphone })
                                }}
                            />
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10,
                                marginBottom: -5
                            }}
                        >
                            <Text style={style.text}>Birth Date</Text>

                            <DatePicker
                                style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}
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
                                        marginLeft: 0,
                                        borderWidth: 0
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(birthdate) => { this.setState({ birthdate: birthdate }) }}
                            />
                        </View>
                        {
                            this.state.user_type === "PLAYER" &&
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    marginTop: 10
                                }}
                            >
                                <Text style={[style.text, {marginRight:5}]}>Hide Stats</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.showMessage()
                                    }}
                                >
                                    <Image 
                                        resizeMode="contain"
                                        style={{
                                            width: 15,
                                            height: 15,
                                        }}
                                        source={require('../../images/information.png')}
                                    />
                                </TouchableOpacity>
                                <Switch 
                                    onValueChange={(value) => this.setState({hideUser: value})}
                                    value={this.state.hideUser}
                                    color='#67BAF5'
                                    style={{marginLeft: 20}}
                                    // trackColor={{false: '#DFDFDF', true: '#67BAF5'}}
                                />
                                
                            </View>
                        }
                        {
                            this.state.user_type === "COACH" &&
                            <View style={{width: '75%', alignItems: 'center'}}>
                                <Text style={[style.text, {marginTop: 10}]}>Experience</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    justifyContent: 'space-around'
                                }}>
                                    <Text style={[style.text, {width: '25%'}]}>Years</Text>
                                    <Text style={[style.text, {width: '25%'}]}>Months</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>
                                    <View style={{width: '25%',}}>
                                        <RNPickerSelect
                                            placeholder={{}}
                                            items={this.year}
                                            onValueChange={(value) => this.setState({totalYear: value})}
                                            style={pickerSelectStyles}
                                            value={this.state.totalYear}
                                            useNativeAndroidPickerStyle={false}
                                            // ref={(el) => {
                                            //   this.inputRefs.proficiencyValue = el;
                                            // }}
                                        />
                                        <View style={{
                                            width: "80%",
                                            backgroundColor: '#C7C7CD',
                                            height: 1,
                                            marginTop: 2
                                        }}></View>
                                    </View>

                                    <View style={{width: '25%'}}>
                                        <RNPickerSelect
                                            placeholder={{}}
                                            items={month}
                                            onValueChange={(value) => this.setState({totalMonth: value})}
                                            style={pickerSelectStyles}
                                            value={this.state.totalMonth}
                                            useNativeAndroidPickerStyle={false}
                                            // ref={(el) => {
                                            //   this.inputRefs.proficiencyValue = el;
                                            // }}
                                        />
                                        <View style={{
                                            width: "80%",
                                            backgroundColor: '#C7C7CD',
                                            height: 1,
                                            marginTop: 2
                                        }}></View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 12,
                                    }}
                                >
                                    <Text style={style.text}>Certification / About me</Text>
                                    <TextInput
                                        numberOfLines={3}
                                        style={styles.aboutCoach}
                                        onChangeText={(review) => this.setState({ review })}
                                        value={this.state.review}
                                        multiline={true}
                                        // placeholder={"About You"}
                                    />
                                </View>
                            </View>
                        }
                        {/* {
                            this.state.user_type === "PLAYER" &&
                            <View style={{ flex: 1, margin: 20, width: '50%' }}>
                                <CustomeButtonB onPress={() => this.props.navigation.navigate('EnrollmentForm')}> Enrollment Form</CustomeButtonB>
                            </View>
                        } */}
                        <View style={{ flex: 1, margin: 20, width: '50%' }}>
                            <CustomeButtonB onPress={() => this.saveUserProfile()}> Save </CustomeButtonB>
                        </View>
                        {/* <View style={{ flex: 1, marginTop: -20, width: '80%' }}>
                            <SwitchButton onPress={() => this.props.navigation.navigate('SwitchPlayer')}> Skip </SwitchButton>
                        </View> */}

                        {
                            
                            <InfoMessage 
                                visible={this.state.showMessage}
                                message="Please note that if you choose to hide your stats, you won’t be able to see other player stats as well."
                                touchOutside={()=>{
                                    this.setState({showMessage: false})
                                }}
                            />
                        }

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
        coachExperience: state.AcademyReducer,
        userProfile: state.UserProfile,
    };
};
const mapDispatchToProps = {
    saveUserStartupProfile, coachDetail, getUserProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      //paddingVertical: 12,
      //paddingHorizontal: 10,
      borderColor: '#D3D3D3',
      borderRadius: 4,
      color: 'black',
      width: 200,
      height: 40,
      marginBottom: 4,
      fontFamily: 'Quicksand-Regular',
      // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 0,
      paddingVertical: 6,
      fontFamily: 'Quicksand-Regular',
      borderColor: '#614051',
      borderRadius: 8,
      color: 'black',
    },
});

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

const styles = StyleSheet.create({
    aboutCoach: {
        borderColor: "#CECECE",
        borderWidth: 1,
        height: 100,
        width: "100%",
        marginTop: 16,
        marginBottom: 16,
        fontSize: 14,
        padding: 4,
        justifyContent: 'center',
        borderRadius: 8,
        fontFamily: 'Quicksand-Regular',
        textAlignVertical: 'top'
    }
})