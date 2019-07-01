import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';
import { doLogin, doFBLogin } from '../../redux/reducers/loginReducer';
import { connect } from 'react-redux';
import { getData, onSignOut, storeData, onSignIn } from '../../components/auth'

import firebase from 'react-native-firebase';
import { PARENT } from "../../components/Constants";
import { GUEST, PLAYER, COACH } from "../../components/Constants";

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

class PhoneAuth extends Component {
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

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    signIn = () => {
        const { phoneNumber } = this.state;
        this.setState({ message: 'Sending code ...' });

        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
            .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
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

        this.setState({
            isCall: false
        })
        var dataDic = {};
        var dict = {};
        dict['phone_number'] = "+918290188636"//user.phoneNumber;
        dict['firebase_token'] = token;
        dict['device_type'] = "IOS";
        dict['app_version'] = '1.1.0';
        dict['fcm_token'] = 'xyzabcdcc';
        dict['has_firebase_check'] = false;



        dataDic['data'] = dict;
        console.log("dicttttc ", dict)
        this.props.doLogin(dataDic).then(() => {
            //  console.log(' user response payload ' +  JSON.stringify(this.props.data));
            //console.log(' user response payload ' +  JSON.stringify( this.props.data.user));
            let user = JSON.stringify(this.props.data.user);
            console.log(' user response payload ' + user);
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
                    keyboardType={"phone-pad"}
                    onChangeText={value => this.setState({ phoneNumber: value })}
                    placeholder={'Enter Phone Number'}
                    value={phoneNumber}
                />
                {/* <Button title="Sign In" color="#67BAF5" style={{ borderRadius: 16 }}
                    onPress={this.signIn} /> */}
                <Text style={styles.rounded_button}
                    onPress={this.signIn}
                >Login</Text>

                <Text style={{
                    color: '#67BAF5',
                    marginTop: 50,
                    fontFamily: 'Quicksand-Regular'
                }}
                    onPress={() => {
                        this.props.navigation.navigate('AcademyListing')
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
            <View style={{ marginTop: 25, padding: 25 }}>
                <Text>Enter verification code below:</Text>
                <TextInput
                    autoFocus
                    style={{ height: 40, marginTop: 15, marginBottom: 15 }}
                    onChangeText={value => this.setState({ codeInput: value })}
                    placeholder={'Code ... '}
                    value={codeInput}
                    autoCorrect={false}
                    keyboardType='number-pad'
                />
                <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
            </View>
        );
    }

    render() {
        const { user1, confirmResult, token, isCall } = this.state;
        //console.warn('confirmResult ' + confirmResult + " User " + user1)
        console.log("User", JSON.stringify(user1))

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                {user1 == null && confirmResult == null && this.renderPhoneNumberInput()}

                {this.renderMessage()}

                {!user1 && confirmResult && this.renderVerificationCodeInput()}

                {user1 && isCall ? this.signIn11(user1, this.state.token) : null}
                {/*{user1 && (*/}
                {/*<View*/}
                {/*style={{*/}
                {/*padding: 15,*/}
                {/*justifyContent: 'center',*/}
                {/*alignItems: 'center',*/}
                {/*backgroundColor: '#77dd77',*/}
                {/*flex: 1,*/}
                {/*}}*/}
                {/*>*/}




                {/*<Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />*/}
                {/*<Text style={{ fontSize: 25 }}>Signed In!</Text>*/}
                {/*<Text>{JSON.stringify(user1)}</Text>*/}
                {/*<Button title="Sign Out" color="red" onPress={this.signOut} />*/}
                {/*</View>*/}
                {/*)}*/}





                {/*{ (user && isCall) ? firebase.auth().currentUser.getIdToken(true).then((token) => {*/}
                {/*console.log("token", token)*/}
                {/*this.setState({*/}
                {/*token:token,*/}

                {/*},this.signIn11(user,token))*/}

                {/*if (!token) {*/}
                {/*//Helpers.logout(false);*/}
                {/*}*/}
                {/*else {*/}
                {/*// init rest of app, send user to primary navigation component, etc...*/}
                {/*}*/}
                {/*}):null }*/}

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
    doLogin, doFBLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneAuth);