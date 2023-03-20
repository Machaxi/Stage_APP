import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, BackHandler, Linking, Platform } from 'react-native';
import { doLogin, doFBLogin, doLoginTest } from '../../redux/reducers/loginReducer';
import { connect } from 'react-redux';
import { getData, onSignOut, storeData, onSignIn } from '../../components/auth'

import auth from '@react-native-firebase/auth';
import { PARENT, ACADEMY } from "../../components/Constants";
import { GUEST, PLAYER, COACH } from "../../components/Constants";
import CodeInput from 'react-native-confirmation-code-input';
import BaseComponent, { defaultStyle, getFirebaseCheck, getShowLoginByName, TOURNAMENT_REGISTER, PUSH_TOKEN, ONE_SIGNAL_USERID } from '../BaseComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';
import Events from '../../router/events';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import OTPInputView from '@twotalltotems/react-native-otp-input'

class PhoneAuth extends BaseComponent {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user1: null,
            message: '',
            codeInput: '',
            phoneNumber: '',
            confirmResult: null,
            isCall: true,
            spinner: false,
            is_navigation_to_tournament: false,
            firebase_token: '',
            one_signal_device_id: '',
        };

        getData(TOURNAMENT_REGISTER, (value) => {

            if (value != '' && value)
                this.setState({
                    is_navigation_to_tournament: value
                })
        });
        getData(PUSH_TOKEN, (value) => {

            this.setState({
                firebase_token: value
            })
        });
        getData(ONE_SIGNAL_USERID, (value) => {

            this.setState({
                ONE_SIGNAL_USERID: value
            })
        });

    }



    handleBackButtonClick() {
        this.setState({
            user1: null,
            confirmResult: null
        })
    }



    componentDidMount() {
        this.signOut()
        this.unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user1: user.toJSON() });
                console.log('componentDidMount=>', JSON.stringify(user))
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user1: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '',
                    confirmResult: null,
                    token: '',
                });
            }
        });


        // firebase.auth().currentUser.getIdToken(true).then((token) => {
        //     // this.setState({
        //     //     token:token,
        //     // },
        //     // console.log("token", token))
        //     this.signIn11(this.state.user1, token)
        // })


    }



    progress(status) {
        this.state.spinner = status
        this.setState({
            spinner: status
        })
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    signIn = () => {


        let { phoneNumber } = this.state;
        phoneNumber = '+91' + phoneNumber
        if (phoneNumber == '') {
            alert('Mobile number is empty.')
            return
        }
        else if (!this.isValidMobileNumber(phoneNumber)) {
            alert('Invalid phone number.')
            return
        }
        this.setState({ message: 'Sending code ...' });
        this.progress(true)

        auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                this.progress(false)
                this.setState({ confirmResult, message: 'Code has been sent!' })

                console.log('Firebase ', this.state.message)
            })
            .catch(error => {
                // firebase.crashlytics().log('Firebase Login Error ' + error);
                // console.log('Firebase error ', error)
                this.progress(false)
            });
    };

    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;
        this.progress(true)

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user1) => {
                    this.progress(false)
                    console.log('user1----' + JSON.stringify(user1))
                    this.setState(user1);
                    //this.state.user1 = user1
                    this.setState({ message: 'Code Confirmed!' });
                    auth().currentUser.getIdToken(true).then((token) => {
                        console.log("token===", token)
                        this.setState({
                            token: token,

                        })
                        this.signIn11(user1, token)

                        if (!token) {
                            //Helpers.logout(false);
                        }
                        else {
                            // init rest of app, send user to primary navigation component, etc...
                        }
                    })
                })
                .catch(error => {
                    this.progress(false)
                    setTimeout(() => {
                        alert(`Code Confirm Error: ${error.message}`)

                    }, 500)
                    this.setState({ message: `Code Confirm Error: ${error.message}` })
                }
                );
        }
    };

    signOut = () => {
       auth().signOut();
        onSignOut()
        // removeItem()

    }


    getToken() {
        // console.warn('getToken')
            auth()
            .currentUser.getIdToken(true)
            .then(token => {
                console.log("token", token);
                this.setState(
                    {
                        token: token
                    },
                    this.signIn11(this.state.user1, token)
                );

                if (!token) {
                    //Helpers.logout(false);
                } else {
                    // init rest of app, send user to primary navigation component, etc...
                }
            });
    }

    signIn11 = (user1, token) => {

        // if (token == null || token == '')
        //     return

        if (this.state.isCall) {

            this.setState({
                isCall: false
            }, () => {
               
                let os = "IOS"
                if (Platform.OS === 'android') {
                    os = "android";
                }
                let fcm_token = this.state.firebase_token
                let ONE_SIGNAL_USERID = this.state.ONE_SIGNAL_USERID

                var dataDic = {};
                var dict = {};
                dict['phone_number'] = user1.phoneNumber;//"+919214088636"//
                dict['firebase_token'] = token;
                dict['device_type'] = os;
                dict['app_version'] = '1.1.0';
                dict['fcm_token'] = fcm_token;
                dict['ONE_SIGNAL_USERID'] = ONE_SIGNAL_USERID;
                dict['one_signal_device_id'] = ONE_SIGNAL_USERID;
                dict['has_firebase_check'] = getFirebaseCheck();


                dataDic['data'] = dict;
                console.log("dicttttc ", JSON.stringify(dict))

                this.progress(true)
                this.props.doLogin(dataDic).then(() => {
                    this.progress(false)
                    //  console.log(' user response payload ' +  JSON.stringify(this.props.data));
                    //console.log(' user response payload ' +  JSON.stringify( this.props.data.user));
                    let user = JSON.stringify(this.props.data.user);
                    console.log('doLogin-payload ' + JSON.stringify(user));
                    let user1 = JSON.parse(user)

                    if (user1.success == true) {
                        console.log(' user response  ' + user1.success_message);

                        var userData = user1['data'];
                        var userInfoData = userData['user'];
                        storeData("userInfo", JSON.stringify(userData))
                        onSignIn()

                        let is_navigation_to_tournament = this.state.is_navigation_to_tournament
                        //Registarion for tournament
                        // if (is_navigation_to_tournament) {

                        //     if (userData.is_existing_user == true)
                        //         this.props.navigation.navigate('RegistrationSteps')
                        //     else
                        //         this.props.navigation.navigate('EditProfile')

                        //     storeData(TOURNAMENT_REGISTER, false)
                        // } else {


                        if (userData.is_existing_user == true) {
                            if (userInfoData.user_type == GUEST) {
                                this.props.navigation.navigate('GuestBookHome');
                            } else if (userInfoData.user_type == PLAYER) {
                                storeData('multiple', userData.has_multiple_acadmies)
                                if (!userData.has_multiple_acadmies && userData.academy_id != null) {
                                    if (userData.can_book_court) {
                                        this.props.navigation.navigate('UserBookHome');
                                    } else {
                                        this.props.navigation.navigate('UserHome');
                                    }
                                } else {
                                    this.props.navigation.navigate('SwitchPlayer', {
                                        userType: 'PLAYER'
                                    })
                                }

                            } else if (userInfoData.user_type == PARENT) {
                                storeData('multiple', userData.has_multiple_acadmies)
                                if (userData.has_multiple_acadmies == false && userData.academy_id != null) {
                                    if (userData.can_book_court) {
                                        this.props.navigation.navigate('ParentBookHome');
                                    } else {
                                        this.props.navigation.navigate('ParentHome');
                                    }

                                } else {
                                    this.props.navigation.navigate('SwitchPlayer', {
                                        userType: PLAYER
                                    })
                                }

                            }
                            else if (userInfoData.user_type == COACH) {
                                storeData('multiple', userData.has_multiple_acadmies)
                                if (userData.has_multiple_acadmies == false && userData.academy_id != null) {
                                    if (userData.can_book_court) {
                                        this.props.navigation.navigate('CoachBookHome')
                                    } else {
                                        this.props.navigation.navigate('CoachHome');
                                    }
                                } else {
                                    this.props.navigation.navigate('SwitchPlayer', {
                                        userType: COACH
                                    })
                                }

                            }
                            else if (userInfoData.user_type == ACADEMY) {
                                //==================== NOTE ==========================
                                //      Forcefully adding coach_id = '', to run coach section as academy
                                //      academy section does not require coach_id
                                //=====================================================
                                userData['coach_id'] = ''
                                storeData("userInfo", JSON.stringify(userData))
                                storeData('academy_name', userData.user.name)
                                console.log('coach userData => ', JSON.stringify(userData))
                                storeData('multiple', userData.has_multiple_acadmies)
                                if (userData.has_multiple_acadmies == false && userData.academy_id != null) {
                                    if (userData.can_book_court) {
                                        this.props.navigation.navigate('CoachBookHome');
                                    } else {
                                        this.props.navigation.navigate('CoachHome');
                                    }
                                } else {
                                    this.props.navigation.navigate('SwitchPlayer', {
                                        userType: COACH
                                    })
                                }


                                // }

                                //
                                // if(otherParam == true){
                                //     this.props.navigation.navigate('DrawerNavigator')
                                // }
                                // else
                                // {
                                //     this.props.navigation.goBack();

                            }
                            else {
                                this.props.navigation.navigate('EditProfile')
                            }
                        } else {
                            this.props.navigation.navigate('GuestBookHome');
                            setTimeout(() => {
                                Events.publish('OPEN_PROFILE')
                            }, 500)
                        }
                    } else {
                        alert('Invalid credentials')
                    }




                }).catch((response) => {
                    this.progress(false)
                    //handle form errors
                    console.log(response);
                })
            }
            )
        }
    }

    signInByName = (user1, token) => {
        this.progress(true)
        let os = "IOS"
        if (Platform.OS === 'android') {
            os = "android";
        }

        let fcm_token = this.state.firebase_token
        let ONE_SIGNAL_USERID = this.state.ONE_SIGNAL_USERID


        this.setState({
            isCall: false
        })
        var dataDic = {};
        var dict = {};
        dict['phone_number'] = this.state.phoneNumber//user1.phoneNumber;//"+919214088636"//
        dict['name'] = this.state.phoneNumber
        dict['firebase_token'] = "token";
        dict['device_type'] = os;
        dict['app_version'] = '1.1.0';
        dict['fcm_token'] = fcm_token;
        dict['ONE_SIGNAL_USERID'] = ONE_SIGNAL_USERID;
        dict['one_signal_device_id'] = ONE_SIGNAL_USERID;
        dict['has_firebase_check'] = false;


        dataDic['data'] = dict;
        console.log("dicttttc ", JSON.stringify(dict))
        this.props.doLoginTest(dataDic).then(() => {
            this.progress(false)
            //  console.log(' user response payload ' +  JSON.stringify(this.props.data));
            //console.log(' user response payload ' +  JSON.stringify( this.props.data.user));
            let user = JSON.stringify(this.props.data.user);
            console.log(' doLoginTest payload ' + user);
            let user1 = JSON.parse(user)

            if (user1.success == true) {
                console.log(' user response  ' + user1.success_message);

                var userData = user1['data'];
                var userInfoData = userData['user'];
                storeData("userInfo", JSON.stringify(userData))
                onSignIn()
                //this.props.navigation.navigate('EditProfile')
                //return

                // let is_navigation_to_tournament = this.state.is_navigation_to_tournament
                // if (is_navigation_to_tournament) {

                //     //this.props.navigation.navigate('EditProfile')
                //     if (userData.is_existing_user == true)
                //         this.props.navigation.navigate('RegistrationSteps')
                //     else
                //         this.props.navigation.navigate('EditProfile')
                //     storeData(TOURNAMENT_REGISTER, false)
                // } else {

                if (userData.is_existing_user == true) {
                    if (userInfoData.user_type == GUEST) {
                        this.props.navigation.navigate('GuestBookHome');
                    } else if (userInfoData.user_type == PLAYER) {
                        storeData('multiple', userData.has_multiple_acadmies)
                        if (!userData.has_multiple_acadmies && userData.academy_id != null) {
                            if (userData.can_book_court) {
                                this.props.navigation.navigate('UserBookHome');
                            } else {
                                this.props.navigation.navigate('UserHome');
                            }

                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: 'PLAYER'
                            })
                        }

                    } else if (userInfoData.user_type == PARENT) {
                        storeData('multiple', userData.has_multiple_acadmies)
                        if (userData.has_multiple_acadmies == false && userData.academy_id != null) {
                            if (userData.can_book_court) {
                                this.props.navigation.navigate('ParentBookHome');
                            } else {
                                this.props.navigation.navigate('ParentHome');
                            }

                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: PLAYER
                            })
                        }

                    }
                    else if (userInfoData.user_type == COACH) {
                        storeData('multiple', userData.has_multiple_acadmies)
                        if (userData.has_multiple_acadmies == false && userData.academy_id != null) {
                            if (userData.can_book_court) {
                                this.props.navigation.navigate('CoachBookHome');
                            } else {
                                this.props.navigation.navigate('CoachHome');
                            }
                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: COACH
                            })
                        }

                    }
                    else if (userInfoData.user_type == ACADEMY) {
                        //==================== NOTE ==========================
                        //      Forcefully adding coach_id = '', to run coach section as academy
                        //      academy section does not require coach_id
                        //=====================================================
                        userData['coach_id'] = ''
                        storeData("userInfo", JSON.stringify(userData))
                        storeData('academy_name', userData.user.name)
                        console.log('coach userData => ', JSON.stringify(userData))
                        if (userData.has_multiple_acadmies == false && userData.academy_id != null) {
                            if (userData.can_book_court) {
                                this.props.navigation.navigate('CoachBookHome');
                            } else {
                                this.props.navigation.navigate('CoachHome');
                            }
                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: COACH
                            })
                        }

                    }



                    //
                    // if(otherParam == true){
                    //     this.props.navigation.navigate('DrawerNavigator')
                    // }
                    // else
                    // {
                    //     this.props.navigation.goBack();

                    //}
                    else {
                        this.props.navigation.navigate('EditProfile')
                    }
                } else {
                    this.props.navigation.navigate('GuestBookHome');
                    setTimeout(() => {
                        Events.publish('OPEN_PROFILE')
                    }, 500)
                }
            } else {
                alert('Invalid credentials')
            }


        }).catch((response) => {
            //handle form errors
            console.log(response);
            this.progress(false)
        })

    }
    verify(code) {
        this.setState({ codeInput: code })
    }

    renderPhoneNumberInput() {
        const { phoneNumber } = this.state;

        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                {/* <Image
                    resizeMode="contain"
                    style={{ width: 24, height: 24 }}
                    source={require('../../images/help_icon.png')}
                /> */}

                <Image
                    resizeMode="contain"
                    style={{ width: 270, height: 80 }}
                    source={require('../../images/dribble_logo.png')}
                />

                <View style={{
                    marginTop: 50,
                    marginBottom: 15,
                }}>

                    <View style={{
                        flexDirection: 'row',
                        height: 40,
                        width: 150,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Text style={{
                            fontFamily: 'Quicksand-Regular',
                            //height: 40,
                            //width:30,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>+91</Text>

                        <TextInput
                            autoFocus
                            style={{
                                width: 110,
                                fontFamily: 'Quicksand-Regular',
                                height: 40,
                                //borderBottomColor: '#BDBDBD',
                                //borderBottomWidth: 1,

                            }}
                            keyboardType={getShowLoginByName() ? "default" : "phone-pad"}
                            onChangeText={value => {
                                // if (value == '' && getShowLoginByName() == false) {
                                //     value = '+91'
                                // }
                                this.setState({ phoneNumber: value })
                            }}
                            placeholder={''}
                            value={phoneNumber}
                        />

                    </View>

                    <View style={{
                        borderBottomColor: '#BDBDBD',
                        borderBottomWidth: 1,
                        width: 150,
                        height: 1
                    }}></View>
                </View>


                {/* <Text style={styles.rounded_button}
                    onPress={() => {
                        this.signIn()
                    }}>Login</Text> */}

                {/* <View
                    style={{ width:"50%",marginTop:16,}}
                    >
                    <SkyFilledButton onPress={()=>{
                        console.warn('test')
                    }}>Login</SkyFilledButton>
                    </View> */}

                <TouchableOpacity activeOpacity={.8}
                    style={[defaultStyle.rounded_button,
                    {
                        marginTop: 16,
                        width: 150
                    }]}
                    onPress={() => {
                        this.signIn()
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontFamily: 'Quicksand-Medium'
                        }}>
                        Login</Text>
                </TouchableOpacity>

                {/* <Text style={[styles.rounded_button, { marginTop: 16 }]}
                    onPress={() => {
                        this.signInByName(null, null)
                    }}>Login by name</Text> */}

                {getShowLoginByName() ?
                    <TouchableOpacity activeOpacity={.8}
                        style={[defaultStyle.rounded_button,
                        {
                            marginTop: 16,
                            width: 150
                        }]}
                        onPress={() => {
                            this.signInByName(null, null)
                        }}>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontFamily: 'Quicksand-Medium'
                            }}>
                            Login by name</Text>
                    </TouchableOpacity>
                    : null}
                    <TouchableOpacity activeOpacity={.8}
                        style={[defaultStyle.rounded_button,{ marginTop: 10, width: 150 }]}
                        onPress={() => { this.props.navigation.navigate('HomeScreen'); }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Quicksand-Medium'}}>
                            Skip Sign In </Text>
                    </TouchableOpacity>
                {/* <TouchableOpacity
                    style={{
                        height: 30,
                        width: 60,
                        marginTop: 50,
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        this.props.navigation.navigate('GuestBookHome')
                    }}>

                    <Text style={{
                        color: '#67BAF5',

                        fontFamily: 'Quicksand-Regular'
                    }}
                    >SKIP</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                    style={{
                        marginTop: 10,
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        Linking.canOpenURL('https://www.machaxi.com').then(supported => {
                            if (supported) {
                                Linking.openURL('https://www.machaxi.com');
                            } else {
                                console.log("Don't know how to open URI: " + this.props.url);
                            }
                        });
                        //this.props.navigation.navigate('GHome')
                    }}>

                    <Text style={{
                        color: '#808080',
                        fontSize: 12,
                        fontFamily: 'Quicksand-Regular'
                    }}
                    >Need Help?</Text>
                </TouchableOpacity>

            </View>
        );
    }

    renderMessage() {
        const { message } = this.state;
        //console.warn("message", message)
        if (!message.length) return null;

        return (
            <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
        );
    }

    renderVerificationCodeInput() {
        const { codeInput } = this.state;

        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>

                <Image
                    resizeMode="contain"
                    style={{ width: 270, height: 80 }}
                    source={require('../../images/dribble_logo.png')}
                />

                <Text style={[defaultStyle.bold_text_14,
                { color: "#A3A5AE", marginTop: 20, marginBottom: 10 }]}>
                    An OTP has been sent to your number
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        this.handleBackButtonClick()
                    }}
                >

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 10,

                    }}>


                        <Image
                            resizeMode="contain"
                            style={{
                                width: 12,
                                height: 12,
                                marginRight: 8
                            }}
                            source={require('../../images/edit_profile.png')}
                        ></Image>

                        <Text style={{
                            color: "#000000",
                            fontFamily: 'Quicksand-Bold',
                            fontSize: 18
                        }}>
                            +91{this.state.phoneNumber}
                        </Text>


                    </View>

                </TouchableOpacity>

                {
                    Platform.OS == 'ios' ?
                        <OTPInputView
                            style={{ width: '80%', height: 200 }}
                            pinCount={6}
                            // autoFocusOnLoad
                            codeInputFieldStyle={{
                                fontSize: 18,
                                width: 30,
                                height: 45,
                                borderWidth: 0,
                                borderBottomWidth: 1,
                            }}
                            codeInputHighlightStyle={{ borderColor: "#03DAC6", }}
                            onCodeFilled={(code) => this.verify(code)}
                        /> :
                        <CodeInput
                            ref="codeinput"
                            className="border-b"
                            keyboardType="numeric"
                            activeColor="#C4C4C4"
                            inactiveColor="#C4C4C4"
                            inputPosition='left'

                            cellBorderWidth={1}
                            space={10}
                            autoFocus={true}
                            codeLength={6}
                            size={40}
                            onFulfill={(code) => this.verify(code)}
                            containerStyle={{ marginTop: 50, height: 60, flex: 0 }}
                            codeInputStyle={{ color: "#404040", fontSize: 32, }}
                        />
                }



                <View style={{
                    flexDirection: 'row',
                    marginTop: 0,
                    marginBottom: 10
                }}>

                    <Text style={[defaultStyle.bold_text_14,
                    { color: "#A3A5AE", }]}>
                        Didn't receive the OTP?
                            </Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.signIn()
                        }}>
                        <Text style={{
                            color: "#67BAF5", paddingLeft: 4,
                            fontFamily: 'Quicksand-Medium',
                        }}>RESEND</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity activeOpacity={.8}
                    style={[defaultStyle.rounded_button,
                    {
                        marginTop: 16,
                        width: 150
                    }]}
                    onPress={this.confirmCode}>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontFamily: 'Quicksand-Medium'
                        }}>Confirm</Text>
                </TouchableOpacity>
                {/* <Text style={styles.rounded_button}
                    onPress={this.confirmCode}>Confirm</Text> */}
            </View>



        );
    }

    render() {
        const { user1, confirmResult, token, isCall } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />

                {user1 == null && confirmResult == null && this.renderPhoneNumberInput()}

                {/* {this.renderMessage()} */}


                {/* {user1 && isCall ? this.getToken() : null} */}

                {!user1 && confirmResult && this.renderVerificationCodeInput()}

                {user1 && isCall && this.state.token
                    ? this.signIn11(user1, this.state.token)
                    : null}
                {user1 && isCall ? this.getToken() : null}

                {Platform.OS == 'ios' ?
                    <KeyboardSpacer />
                    : null}
            </View>

        );
    }
}
const styles = StyleSheet.create({
    rounded_button: {
        width: 150,
        padding: 10,
        borderRadius: 23,
        //borderWidth: 1,
        height: 44,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
});


const mapStateToProps = state => {
    return {
        data: state.LoginReducer,
    };
};
const mapDispatchToProps = {
    doLogin, doFBLogin, doLoginTest
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneAuth);