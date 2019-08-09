import React from 'react'

import { View, ImageBackground, Text, TextInput, Platform, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native'
import BaseComponent, { defaultStyle, TEMP_USER_INFO, GO_TO_HOME } from '../BaseComponent';
import { CustomeButtonB, SwitchButton, } from '../../components/Home/SwitchButton'
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import AbortDialog from './AbortDialog'
import { GUEST, PLAYER, PARENT, COACH, ACADEMY } from '../../components/Constants'
import { getData, storeData, isSignedIn } from '../../components/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { tournamentLogin } from "../../redux/reducers/TournamentRegReducer";
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select'
import moment from 'moment'
import { Card, ActivityIndicator, } from 'react-native-paper';
import Events from './../../router/events';


const placeholder = {
    label: 'Gender ',
    value: null,
    color: '#A3A5AE',
};

class Registration extends BaseComponent {


    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'Tournament Registration',
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.getParam('showConfirmAlert')();
                    }}
                    activeOpacity={.8}>
                    <Image
                        resizeMode="contain"
                        source={require('../../images/go_back_arrow.png')}
                        style={{ padding: 8, width: 20, height: 16, marginLeft: 12, }}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.getParam('showConfirmAlert')();
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            padding: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 10,
                            color: '#FF7373'
                        }}
                    >Abort</Text>
                </TouchableOpacity>

            )
        };

    };

    constructor(props) {
        super(props)


        this.inputRefs = {
            country: null
        };

        this.state = {
            progress: true,
            birthdate: "",
            txtname: '',
            txtphone: '+91',
            show_alert: false,
            alert_msg: '',
            spinner: false,
            selected_gender: '',
            gender: [
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' }
            ]
        }

        //If user is already registered then we will not show him/her registration
        //flow we will take them to select category flow

        isSignedIn()
            .then(res => {
                console.log('isSignedIn => ', res);
                let signedIn = res
                if (signedIn) {
                    this.props.navigation.navigate('RegistrationSteps', {
                        temp_user: false
                    })
                } else {
                    this.setState({
                        progress: false
                    })
                }
            })
            .catch(err => alert("An error occurred"));



        const { navigation } = this.props
        navigation.setParams({
            showConfirmAlert: this.showConfirmAlert,
        })

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);


    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.setState({
            show_alert: true
        })
        return true;
    }


    showConfirmAlert = () => {
        this.setState({
            show_alert: true
        })
    }

    register() {

        let alert_msg = ''

        let { birthdate, txtname, txtphone, selected_gender } = this.state


        if (txtname == '') {
            alert_msg = 'Name can\'t be blank'
            this.setState({
                alert_msg: alert_msg
            })
        }
        else if (birthdate == '') {
            alert_msg = 'Please select birth date'
            this.setState({
                alert_msg: alert_msg
            })
        }
        else if (txtphone == '') {
            alert_msg = 'Phone number can\'t be blank'
            this.setState({
                alert_msg: alert_msg
            })
        }
        else if (selected_gender == '') {
            alert_msg = 'Please select gender'
            this.setState({
                alert_msg: alert_msg
            })
        }
        else {

            birthdate = moment.utc(birthdate).local().format("YYYY-MM-DD")

            alert_msg = ''
            this.setState({
                alert_msg: alert_msg
            })

            let os = "IOS"
            if (Platform.OS === 'android') {
                os = "android";
            }

            var dataDic = {};
            var dict = {};
            dict['name'] = txtname
            dict['dob'] = birthdate
            dict['gender'] = selected_gender
            dict['phone_number'] = txtphone
            dict['firebase_token'] = 'testerwrer';
            dict['device_type'] = os;
            dict['app_version'] = '1.1.0';
            dict['fcm_token'] = 'xyzabcdcc';
            dict['has_firebase_check'] = false;
            dataDic['data'] = dict;
            this.progress(true)

            this.props.tournamentLogin(dataDic).then(() => {
                this.progress(false)
                let data = JSON.stringify(this.props.data.data);
                console.log(' tournamentLogin 1' + JSON.stringify(data));
                let user1 = JSON.parse(data)

                if (user1.success == true) {
                    console.log(' user response  ' + user1.success_message);

                    var userData = user1['data'];
                    var userInfoData = userData['user'];
                    storeData(TEMP_USER_INFO, JSON.stringify(userData))
                    setTimeout(() => {
                        this.props.navigation.navigate('RegistrationSteps', {
                            temp_user: true
                        })
                    }, 100)

                }

            }).catch((response) => {
                this.progress(false)
                //handle form errors
                console.log(response);
            })

        }
    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    render() {

        let alert_msg = this.state.alert_msg
        let progress = this.state.progress

        if (progress) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        return (

            <View
                style={{
                    margin: 16,
                    flex: 1,
                    marginTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

                <AbortDialog
                    onYesPress={() => {
                        this.setState({
                            show_alert: false
                        })
                        setTimeout(() => {

                            Events.publish(GO_TO_HOME, msg);

                        }, 100)

                    }}
                    onNoPress={() => {
                        this.setState({
                            show_alert: false
                        })
                    }}
                    visible={this.state.show_alert} />

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}
                >

                    <Text style={defaultStyle.bold_text_14}>
                        Booking Details
                    </Text>

                    {/* <Text style={style.text}>
                        Name
                    </Text> */}
                    <TextInput
                        style={style.textinput}
                        // mode='outlined'
                        placeholder='name'
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
                    {/* <Text style={style.text}>
                        Phone Number
                    </Text> */}

                    {/* <TextInput
                        placeholder='Birth Date'
                        style={style.textinput}>

                    </TextInput> */}

                    <DatePicker
                        showIcon={false}
                        style={{ width: 150, borderWidth: 0 }}
                        date={this.state.birthdate}
                        mode="date"
                        placeholder="Birth Date"
                        format="DD-MMM-YYYY"
                        minDate="2016-05-01"
                        maxDate={Date.now()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{

                            dateInput: {
                                borderWidth: 0,
                                fontFamily: 'Quicksand-Regular',
                                borderBottomColor: '#DFDFDF',
                                borderBottomWidth: 1,
                                fontSize: 14,
                            }
                        }}
                        onDateChange={(birthdate) => { this.setState({ birthdate: birthdate }) }}
                    />


                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                >

                    <RNPickerSelect
                        placeholder={placeholder}
                        items={this.state.gender}
                        onValueChange={(value) => {
                            //console.warn(value)
                            if (value != null) {
                                this.setState({
                                    selected_gender: value,
                                });
                            }
                        }}
                        style={pickerSelectStyles}
                        value={this.state.selected_gender}
                        useNativeAndroidPickerStyle={false}
                        ref={(el) => {
                            this.inputRefs.country = el;
                        }}
                    />

                </View>

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10
                    }}
                >

                    <TextInput
                        keyboardType="number-pad"
                        placeholder='Phone Number'
                        style={style.textinput}
                        value={this.state.txtphone}
                        onChangeText={(txtphone) => this.setState({ txtphone: txtphone })}
                    >

                    </TextInput>

                </View>

                <Text style={[defaultStyle.regular_text_14,
                {
                    marginTop: 20,
                    color: 'red'
                }]}>{alert_msg}</Text>

                <View style={{ flex: 1, margin: 30, width: '50%' }}>
                    <CustomeButtonB onPress={() => {
                        this.register()

                    }}> Next </CustomeButtonB>
                </View>
            </View>
        );
    }

}
const mapStateToProps = state => {
    return {
        data: state.TournamentRegReducer,
    };
};
const mapDispatchToProps = {
    tournamentLogin,
};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 18,
        //paddingHorizontal: 10,
        borderBottomColor: '#DFDFDF',
        borderRadius: 8,
        color: '#404040',
        marginBottom: 4,
        width: 150,
        alignSelf: 'center',
        borderBottomWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular',
    },
    inputAndroid: {
        marginTop: 12,
        fontSize: 14,
        textAlign: 'center',
        width: 150,
        fontFamily: 'Quicksand-Regular',
        borderBottomColor: '#DFDFDF',
        borderRadius: 8,
        borderBottomWidth: 1,
        color: '#404040',
    },
});

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
        marginTop: 12,
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