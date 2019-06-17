import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import { doLogin,doFBLogin } from '../../redux/reducers/loginReducer';
import { connect } from 'react-redux';
import {getData,storeData} from '../../components/auth'

import firebase from 'react-native-firebase';
import {PARENT} from "../../components/Constants";
import {GUEST,PLAYER } from "../../components/Constants";

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

 class PhoneAuth extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+91',
            confirmResult: null,
            isCall:true,
        };
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON()});

            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '+91',
                    confirmResult: null,
                    token:'',
                });
            }
        });
        firebase.auth().currentUser.getIdToken(true).then((token) => {
            this.setState({
                token:token,
            },
                console.log("token", token))
           // this.signIn11(this.state.user)
        })


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
                .then((user) => {
                    console.log(user)
                   // this.setState({ message: 'Code Confirmed!' });
                    firebase.auth().currentUser.getIdToken(true).then((token) => {
                        console.log("token", token)
                        this.setState({
                            token:token,

                        },this.signIn11(this.state.user))

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
    }

     signIn11 = (user) => {

this.setState({
    isCall:false
})
         var dataDic ={};
         var dict = {};
         dict['phone_number'] = user.phoneNumber;
         dict['firebase_token'] = this.state.token;
         dict['device_type'] = "IOS";
         dict['app_version'] = '1.1.0';
         dict['fcm_token'] = 'xyzabcdcc';

         dataDic['data']= dict;
         console.log("dicttttc ",dict)
             this.props.doLogin(dataDic).then(() => {
                 let user = JSON.stringify(this.props.data.user);
                 console.log(' user response payload ' + user);
                 let user1 = JSON.parse(user)

                 if (user1.success == true) {
                     console.log(' user response  ' + user1.success_message);

                      var userData = user1['data'];
                      var userInfoData = userData['user'];
                      storeData("userInfo", JSON.stringify(userData))
                       if(userInfoData.user_type == GUEST){

                           this.props.navigation.navigate('AcademyListing')

                       }else if(userInfoData.user_type == PLAYER)
                       {
                         if( userData.has_multiple_acadmies )
                         {
                             this.props.navigation.navigate('UHome')

                         }else
                         {
                             this.props.navigation.navigate('SwitchPlayer',{
                                 userType:'PLAYER'
                             })
                         }

                     }else if(userInfoData.user_type == PARENT)
                     {
                         if(userData.has_multiple_acadmies == false)
                         {
                             this.props.navigation.navigate('PHome')

                         }else
                         {
                             this.props.navigation.navigate('SwitchPlayer',{
                                 userType:PLAYER
                             })
                         }

                     }
                       else if(userInfoData.user_type == COACH)
                       {
                           if(userData.has_multiple_acadmies == false)
                           {
                               this.props.navigation.navigate('CHome')
                           }else
                           {
                               this.props.navigation.navigate('SwitchPlayer',{
                                   userType:COACH
                               })
                           }

                       }

                     onSignIn()

                     //
                     // if(otherParam == true){
                     //     this.props.navigation.navigate('DrawerNavigator')
                     // }
                     // else
                     // {
                     //     this.props.navigation.goBack();
                     // }
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
            <View style={{ padding: 25 }}>
                <Text>Enter Phone number:</Text>
                <TextInput
                    autoFocus
                    style={{ height: 40, marginTop: 15, marginBottom: 15 }}
                    onChangeText={value => this.setState({ phoneNumber: value })}
                    placeholder={'Phone number ... '}
                    value={phoneNumber}
                />
                <Button title="Sign In" color="green" onPress={this.signIn} />
            </View>
        );
    }

    renderMessage() {
        const { message } = this.state;

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
        const { user, confirmResult,token,isCall } = this.state;
        return (
            <View style={{ flex: 1 }}>

                {!user && !confirmResult && this.renderPhoneNumberInput()}

                {this.renderMessage()}

                {!user && confirmResult && this.renderVerificationCodeInput()}

                {/*{user && (*/}
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
                        {/*<Text>{JSON.stringify(user)}</Text>*/}
                        {/*<Button title="Sign Out" color="red" onPress={this.signOut} />*/}
                    {/*</View>*/}
                {/*)}*/}





                { (user  && token && isCall) ? this.signIn11(this.state.user):null }

            </View>




        );
    }
}




const mapStateToProps = state => {
    return {
        data: state.LoginReducer,
    };
};
const mapDispatchToProps = {
    doLogin,doFBLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneAuth);