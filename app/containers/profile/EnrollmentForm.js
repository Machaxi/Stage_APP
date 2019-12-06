import React from 'react'

import { View, ImageBackground, Text, TextInput, Image, Alert, CheckBox } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Switch } from 'react-native-paper';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
import BaseComponent, { defaultStyle, getBaseUrl } from '../BaseComponent';
import { getData, storeData } from "../../components/auth";
import { saveOtherUserProfile, getEnrollmentFormData } from "../../redux/reducers/EnrollmentFormReducer";
import { CustomeButtonB } from '../../components/Home/SwitchButton'
import UploadImageModel from '../../components/custom/UploadImageModel'
import { getDeviceType } from 'react-native-device-info';


class EnrollmentForm extends BaseComponent {

    constructor(props) {
        super(props)
        this.user_id = ''
        this.academy_id = ''
        this.state = {
            spinner: false,
            joinDate: '',
            email: '',
            houseNumber: '',
            areaName: '',
            area: '',
            schoolName: '',
            schoolAddress: '',
            otherSport: '',
            otherInterest: '',
            haveEquipment: false,
            medicalHistory: '',
            uploadImage: false,
            // imageData: [{},{}, {}]
            govt_id_pic: null,
            showDisclaimer: false,
            disclaimer: '',
            path: null,
            fileName: null,
            contentType: '',
            base64img: null,
        }
    }

    componentDidMount() {
        this.setState({spinner: true})
        getData('header', value => {
            getData('userInfo', innerValue => {
                innerValue = JSON.parse(innerValue)
                this.academy_id = innerValue.academy_id
                this.user_id = innerValue.user.id
                console.log('user_id', this.user_id)
                this.props.getEnrollmentFormData(value, this.user_id, this.academy_id).then(() => {
                    this.setState({spinner: false})
                    var enrollData = this.props.data.enrollmentData;
                    if (enrollData.success) {
                        let enrollment = enrollData.data.enrollment
                        let joinDate = enrollment.joining_date
                        let email = enrollment.email_address
                        let houseNumber = enrollment.house_number
                        let areaName = enrollment.apartment_name
                        let area = enrollment.area
                        let schoolName = enrollment.school_or_company_name
                        let schoolAddress = enrollment.school_or_company_address
                        let otherInterest = enrollment.other_interest
                        let sportPlayed = enrollment.sport_played
                        let disclaimer = enrollment.disclaimer
                        let haveEquipment = enrollment.sport_equipment
                        let govt_id_pic = enrollment.govt_id_name
                        var temp = govt_id_pic.split(' ')
                        if(temp[1] === 'null'){
                            govt_id_pic = null
                        } else{
                            govt_id_pic = temp[1]
                        }
                        if (joinDate != '' && joinDate !== null) {
                            joinDate = joinDate.split('T')
                            joinDate = moment.utc(joinDate[0]).local().format("DD-MMM-YYYY")
                        }
                        this.setState({
                            email, schoolName, schoolAddress, otherInterest, sportPlayed, disclaimer,
                            haveEquipment, govt_id_pic, joinDate, houseNumber, areaName, area
                        })
                    }
                    console.log('enrollData', enrollData)

                }).catch(response => {
                    console.log('error is', response);
                    this.setState({spinner: false})
                })
            })
        })
    }
    uploadImage() {
        this.setState({ uploadImage: true });
    }
    touchOutside() {
        console.log('in touch outside')
        this.setState({ uploadImage: false }, () => console.log('upload image', this.state.uploadImage));

    }
    pickImage(id) {
        console.log('id is', id);
        this.touchOutside();
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
                let path = response.path
                if (Platform.OS == 'ios') {
                    path = response.uri
                }

                this.resizeImage(path, id)
            }
        });
    }

    resizeImage(path, id) {
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

    showDisclaimer() {
        this.setState({ showDisclaimer: true })
    }

    saveEnrollmentData() {
        let { joinDate, email, houseNumber, areaName, area, schoolName, schoolAddress,
            otherSport, otherInterest, haveEquipment, medicalHistory, govt_id_pic
        } = this.state

        if (joinDate == null)
            joinDate = ''
        else if (joinDate != '') {
            joinDate = moment.utc(joinDate).local().format("YYYY-MM-DD")
        }
        getData('header', value => {
            var dict = {};
            this.setState({ spinner: true })
            dict['user_id'] = this.user_id;
            dict['academy_id'] = this.academy_id;
            dict['email_address'] = email;
            dict['house_number'] = houseNumber;
            dict['apartment_name'] = areaName;
            dict['area'] = area;
            dict['school_or_company_name'] = schoolName;
            dict['school_or_company_address'] = schoolAddress;
            dict['other_interest'] = otherInterest;
            dict['sport_played'] = otherSport;
            dict['sport_equipment'] = haveEquipment;
            dict['medical_history'] = medicalHistory;
            

            let file = null
            let path = this.state.path
            console.log("path", path);
            if (Platform.OS == 'ios') {
                if (path != null) {
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
            dict['govt_id_name'] = fileName;
            let param = []
            if (file != null) {
                param.push(file)
            }
            console.warn('file => ', JSON.stringify(file))
            let post = { name: 'post', data: JSON.stringify(dict) }
            param.push(post)

            console.log('profile data=> ', JSON.stringify(dict))

            let url = getBaseUrl() + 'player/player-enrollment-save'

            RNFetchBlob.
                config({ timeout: 1000 * 60 })
                .fetch('POST', url, {
                    'Content-Type': 'multipart/form-data',
                    'x-authorization': value,
                }, param).then((resp) => {
                    // this.progress(false)
                    // console.log(resp);
                    // alert('your image uploaded successfully');

                    this.setState({ spinner: false })

                    let data = JSON.parse(resp.data)//JSON.parse(resp)
                    console.warn('suces => ', data.success)
                    console.log(' saveEnrollmentForm payload ' + JSON.stringify(data));

                    let success = data.success
                    if (success) {
                        this.props.navigation.goBack()
                    } else {
                        let error_message = data.error_message
                        setTimeout(() => {
                            alert(error_message)
                        }, 500)
                    }
                }).catch((error) => {
                    console.log('error => ', error)
                    this.setState({spinner: false})
                })
        })
    }

    render() {
        console.log('state is', this.state)
        let placeHolder = null
        let govt_id_pic = this.state.govt_id_pic
        let base64img = this.state.path

        if (base64img != null) {
            placeHolder = { uri: base64img }
        }
        else {
            placeHolder = { uri: govt_id_pic }
        }
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
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                        >
                            <Text style={[defaultStyle.bold_text_14, { marginBottom: 3 }]}>Date of Joining</Text>
                            <DatePicker
                                style={{ borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}
                                date={this.state.joinDate}
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
                                onDateChange={(joinDate) => { this.setState({ joinDate: joinDate }) }}
                            />
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                        >
                            <Text style={[defaultStyle.bold_text_14, { marginBottom: 3 }]}>Email Address</Text>
                            <TextInput
                                style={style.textinput}
                                // mode='outlined'
                                label='name'
                                // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                                value={this.state.email}
                                onChangeText={(email) => this.setState({ email: email })}
                            />
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                        >
                            <Text style={[defaultStyle.bold_text_14, { marginBottom: 3 }]}>Home Address</Text>
                            <Text style={style.text}>Flat/House number</Text>
                            <TextInput
                                style={style.textinput}
                                // mode='outlined'
                                label='Flat/House number'
                                // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                                value={this.state.houseNumber}
                                onChangeText={(houseNumber) => this.setState({ houseNumber: houseNumber })}
                            />
                            <Text style={style.text}>Apartment Name / Area Name</Text>
                            <TextInput
                                style={style.textinput}
                                // mode='outlined'
                                label='Apartment Name / Area Name'
                                // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                                value={this.state.areaName}
                                onChangeText={(areaName) => this.setState({ areaName: areaName })}
                            />
                            <Text style={style.text}>Area</Text>
                            <TextInput
                                style={style.textinput}
                                // mode='outlined'
                                label='Area'
                                // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                                value={this.state.area}
                                onChangeText={(area) => this.setState({ area: area })}
                            />
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                        >
                            <Text style={[defaultStyle.bold_text_14, { marginBottom: 3 }]}>School/Company Details</Text>
                            <Text style={style.text}>School/Company Name</Text>
                            <TextInput
                                style={style.textinput}
                                // mode='outlined'
                                label='School/Company Name'
                                // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                                value={this.state.schoolName}
                                onChangeText={(schoolName) => this.setState({ schoolName: schoolName })}
                            />
                            <Text style={style.text}>School/Company Address</Text>
                            <TextInput
                                style={style.textinput}
                                // mode='outlined'
                                label='Address'
                                // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                                value={this.state.schoolAddress}
                                onChangeText={(schoolAddress) => this.setState({ schoolAddress: schoolAddress })}
                            />
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                        >
                            <Text style={[defaultStyle.bold_text_14, { marginBottom: 3 }]}>Other Sports Played</Text>
                            <TextInput
                                style={style.textinput}
                                // mode='outlined'
                                label='Other Sports Played'
                                // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                                value={this.state.otherSport}
                                onChangeText={(otherSport) => this.setState({ otherSport: otherSport })}
                            />
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                        >
                            <Text style={[defaultStyle.bold_text_14, { marginBottom: 3 }]}>Other interests</Text>
                            <TextInput
                                style={style.textinput}
                                // mode='outlined'
                                label='Other interests'
                                // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                                value={this.state.otherInterest}
                                onChangeText={(otherInterest) => this.setState({ otherInterest: otherInterest })}
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
                            <Text style={[style.text, { marginRight: 5 }]}>Do you have Badminton Equipment?</Text>
                            <Switch
                                onValueChange={(haveEquipment) => this.setState({ haveEquipment: haveEquipment })}
                                value={this.state.haveEquipment}
                                color='#67BAF5'
                                style={{ marginLeft: 20 }}
                            // trackColor={{false: '#DFDFDF', true: '#67BAF5'}}
                            />
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                        >
                            <Text style={[defaultStyle.bold_text_14, { marginBottom: 3 }]}>Medical History, if any</Text>
                            <TextInput
                                style={style.textinput}
                                label='Medical History, if any'
                                value={this.state.medicalHistory}
                                onChangeText={(medicalHistory) => this.setState({ medicalHistory: medicalHistory })}
                            />
                        </View>

                        <View style={{ flex: 1, marginHoriZontal: 20, width: '50%', marginTop: 10, marginBottom: -5 }}>
                            <CustomeButtonB onPress={() => this.uploadImage()}>
                                Upload Document
                            </CustomeButtonB>
                        </View>
                        {
                            (this.state.path !== null || this.state.govt_id_pic !== null) &&
                            <FastImage
                                resizeMode="contain"
                                style={{
                                    paddingVertical: 0,
                                    width: 180,
                                    height: 240,
                                }}
                                source={placeHolder}
                            />
                        }
                        <View style={{ flex: 1, margin: 20, width: '50%', marginBottom: 0 }}>
                            <CustomeButtonB onPress={() => this.showDisclaimer()}>
                                Next
                            </CustomeButtonB>
                        </View>
                        {
                            this.state.showDisclaimer &&
                            <View style={{ flex: 1, margin: 10, width: '90%', alignItems: 'center' }}>
                                <Text style={style.text}>Disclaimer</Text>
                                <TextInput
                                    numberOfLines={4}
                                    editable={false}
                                    style={style.disclaimer}
                                    value={this.state.disclaimer}
                                    multiline={true}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[style.text, { marginTop: 5, marginRight: 5 }]}>I agree</Text>
                                    <CheckBox
                                        style={{ marginLeft: 5 }}
                                        onValueChange={(value) => this.setState({ agreeDisclaimer: value })}
                                        value={this.state.agreeDisclaimer}
                                    />
                                </View>
                            </View>
                        }
                        <View style={{ flex: 1, margin: 20, width: '50%' }}>
                            <CustomeButtonB onPress={() => this.state.agreeDisclaimer ? this.saveEnrollmentData() : this.showSnackBar('please click on I agree')}>
                                Save
                            </CustomeButtonB>
                        </View>
                    </View>

                    <UploadImageModel
                        touchOutside={() => this.touchOutside()}
                        visible={this.state.uploadImage}
                        pickImage={(id) => this.pickImage(id)}
                    />

                </ScrollView>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        data: state.EnrollmentFormReducer,
        userProfile: state.UserProfile,
    };
};
const mapDispatchToProps = {
    getEnrollmentFormData
};
export default connect(mapStateToProps, mapDispatchToProps)(EnrollmentForm);


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
    },
    contentContainer: {
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'stretch',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 0,
        margin: 0,
    },
    disclaimer: {
        borderColor: "#CECECE",
        borderWidth: 1,
        // height: 200,
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
}