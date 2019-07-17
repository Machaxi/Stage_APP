import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, Platform } from 'react-native';
import { doLogin, doFBLogin, doLoginTest } from '../../redux/reducers/loginReducer';
import { connect } from 'react-redux';
import { getData, onSignOut, storeData, onSignIn } from '../../components/auth'

import firebase from 'react-native-firebase';
import { PARENT, ACADEMY } from "../../components/Constants";
import { GUEST, PLAYER, COACH } from "../../components/Constants";
import CodeInput from 'react-native-confirmation-code-input';
import BaseComponent, { defaultStyle } from '../BaseComponent';
import Spinner from 'react-native-loading-spinner-overlay';


const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

class PhoneAuth extends BaseComponent {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user1: null,
            message: '',
            codeInput: '',
            phoneNumber: '+91',
            confirmResult: null,
            isCall: true,
            spinner: false
        };
    }

    componentDidMount() {
        // this.signOut()
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user1: user.toJSON() });

            } else {
                // User has been signed out, reset the state
                this.setState({
                    user1: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '+91',
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
        this.setState({
            spinner: status
        })
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    signIn = () => {

        const { phoneNumber } = this.state;
        this.setState({ message: 'Sending code ...' });
        this.progress(true)

        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                this.progress(false)
                this.setState({ confirmResult, message: 'Code has been sent!' })
            })
            .catch(error => {
                this.progress(false)
            });
    };

    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user1) => {
                    console.log(user1)
                    this.setState({ message: 'Code Confirmed!' });
                    firebase.auth().currentUser.getIdToken(true).then((token) => {
                        console.log("token", token)
                        this.setState({
                            token: token,

                        }, this.signIn11(this.state.user1, token))

                        if (!token) {
                            //Helpers.logout(false);
                        }
                        else {
                            // init rest of app, send user to primary navigation component, etc...
                        }
                    })
                })
                .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
        }
    };

    signOut = () => {
        firebase.auth().signOut();
        onSignOut()
        // removeItem()

    }

    signIn11 = (user1, token) => {

        let os = "IOS"
        if (Platform.OS === 'android') {
            os = "android";
        }

        this.setState({
            isCall: false
        })
        var dataDic = {};
        var dict = {};
        dict['phone_number'] = user1.phoneNumber;//"+919214088636"//
        dict['firebase_token'] = token;
        dict['device_type'] = os;
        dict['app_version'] = '1.1.0';
        dict['fcm_token'] = 'xyzabcdcc';
        dict['has_firebase_check'] = false;


        dataDic['data'] = dict;
        console.log("dicttttc ", JSON.stringify(dict))
        this.props.doLogin(dataDic).then(() => {
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
                if (userData.is_existing_user == true) {
                    if (userInfoData.user_type == GUEST) {

                        this.props.navigation.navigate('AcademyListing')

                    } else if (userInfoData.user_type == PLAYER) {
                        if (!userData.has_multiple_acadmies) {
                            this.props.navigation.navigate('UHome')

                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: 'PLAYER'
                            })
                        }

                    } else if (userInfoData.user_type == PARENT) {
                        if (userData.has_multiple_acadmies == false) {
                            this.props.navigation.navigate('PHome')

                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: PLAYER
                            })
                        }

                    }
                    else if (userInfoData.user_type == COACH) {
                        storeData('multiple',userData.has_multiple_acadmies)
                        if (userData.has_multiple_acadmies == false) {
                            this.props.navigation.navigate('CHome')
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
                        this.props.navigation.navigate('CHome')

                    }



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
                alert('Invalid credentials')
            }


        }).catch((response) => {
            //handle form errors
            console.log(response);
        })

    }

    signInByName = (user1, token) => {
        this.progress(true)
        let os = "IOS"
        if (Platform.OS === 'android') {
            os = "android";
        }

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
        dict['fcm_token'] = 'xyzabcdcc';
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
                if (userData.is_existing_user == true) {
                    if (userInfoData.user_type == GUEST) {

                        this.props.navigation.navigate('AcademyListing')

                    } else if (userInfoData.user_type == PLAYER) {
                        if (!userData.has_multiple_acadmies) {
                            this.props.navigation.navigate('UHome')

                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: 'PLAYER'
                            })
                        }

                    } else if (userInfoData.user_type == PARENT) {
                        if (userData.has_multiple_acadmies == false) {
                            this.props.navigation.navigate('PHome')

                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: PLAYER
                            })
                        }

                    }
                    else if (userInfoData.user_type == COACH) {
                        if (userData.has_multiple_acadmies == false) {
                            this.props.navigation.navigate('CHome')
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
                        this.props.navigation.navigate('CHome')

                    }



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
                <Image
                    style={{ width: 200, height: 60 }}
                    source={require('../../images/dribble_logo.png')}
                />
                <TextInput
                    autoFocus
                    style={{
                        width: 150,
                        fontFamily: 'Quicksand-Regular',
                        height: 40, borderBottomColor: '#BDBDBD',
                        borderBottomWidth: 1,
                        marginTop: 100, marginBottom: 15
                    }}
                    //keyboardType={"phone-pad"}
                    onChangeText={value => this.setState({ phoneNumber: value })}
                    placeholder={'Enter Phone Number'}
                    value={phoneNumber}
                />

                <Text style={styles.rounded_button}
                    onPress={() => {
                        this.signIn()
                    }}>Login</Text>

                <Text style={[styles.rounded_button, { marginTop: 16 }]}
                    onPress={() => {
                        this.signInByName(null, null)
                    }}>Login by name</Text>

                <Text style={{
                    color: '#67BAF5',
                    marginTop: 50,
                    fontFamily: 'Quicksand-Regular'
                }}
                    onPress={() => {
                        this.props.navigation.navigate('GHome')
                    }}
                >SKIP</Text>

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
                    style={{ width: 200, height: 60, }}
                    source={require('../../images/dribble_logo.png')}
                />

                <Text style={[defaultStyle.bold_text_14,
                { color: "#A3A5AE", marginTop: 20, marginBottom: 10 }]}>
                    An OTP has been sent to your number
                </Text>

                <Text style={{
                    color: "#000000",
                    marginTop: 20,
                    fontFamily: 'Quicksand-Bold',
                    marginBottom: 10, fontSize: 18
                }}>
                    {this.state.phoneNumber}
                </Text>



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


                <Text style={[defaultStyle.bold_text_14,
                { color: "#A3A5AE", marginTop: 0, marginBottom: 10 }]}>
                    Didn’t receive the OTP?
                    <Text style={{
                        color: "#67BAF5", paddingLeft: 4,
                        fontFamily: 'Quicksand-Medium',
                    }}> RESEND</Text>
                </Text>

                <Text style={styles.rounded_button}
                    onPress={this.confirmCode}>Confirm</Text>
            </View>



        );
    }

    render() {
        const { user1, confirmResult, token, isCall } = this.state;
        //console.warn('confirmResult ' + confirmResult + " User " + user1)
        console.log("User", JSON.stringify(user1))
        console.log("isCall ", isCall)
        console.log("ConfirmResult ", confirmResult)
        console.log("Token ", this.state.token)

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />

                {user1 == null && confirmResult == null && this.renderPhoneNumberInput()}

                {/* {this.renderMessage()} */}

                {!user1 && confirmResult && this.renderVerificationCodeInput()}

                {user1 && isCall ? this.signIn11(user1, this.state.token) : null}

            </View>

        );
    }
}
const styles = StyleSheet.create({
    rounded_button: {
        width: 150,
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