/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, BackHandler, Linking } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import reducer from './app/redux/reducers/index';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from "redux-thunk";
import AppMain from './app/router/router';
import { SafeAreaView } from 'react-navigation'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NativeEventEmitter, NativeModules, StatusBar } from 'react-native';
import InfoDialog from './app/components/custom/InfoDialog'
import UpdateAppDialog from './app/components/custom/UpdateAppDialog'
import Events from './app/router/events';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import RNFirebase from 'react-native-firebase';
import BaseComponent, { PUSH_TOKEN, ONE_SIGNAL_USERID, EVENT_UPDATE_DIALOG } from './app/containers/BaseComponent';
import { storeData } from "./app/components/auth";
import branch, { BranchEvent } from 'react-native-branch'
import DropdownAlert from 'react-native-dropdownalert';

export const BASE_URL = 'http://13.233.182.217:8080/api/'
//export const BASE_URL = 'http://192.168.3.145:8089/api/'

export const client = axios.create({
    baseURL: BASE_URL,
    responseType: 'json'
});

const middleware = compose(applyMiddleware(logger, axiosMiddleware(client), thunk));

const store = createStore(reducer, middleware);

//This code is used to add addtional header while sending request, we initially
//added only header but now we have to send more default params, so using this block
client.interceptors.request.use(
    config => {
        config.headers.app_version = '1';
        config.headers.device_type = Platform.OS;
        //config.headers.fcm_token = FCM_TOKEN
        return config;
    },
    error => Promise.reject(error)
);
//==============END=========================================================

///Check for error, there is no handling of response in error case, so we are using 
//these code
client.interceptors.response.use(response => {
    console.info('interceptors ', JSON.stringify(response.request._url))
    return response;
}, error => {

    try {
        let status = error.response.data.status
        let msg = error.response.data.error_message
        console.log('status=> ', status)
        if (status != 401) {
            console.log('error => ' + JSON.stringify(error.response))
            Events.publish('ShowDialog', msg);
        }
    }
    catch (error) {

    }
    return error;
});
//================END====================================================


const ModifiedDefaultTheme = {
    ...DefaultTheme,
    fonts: {
        thin: 'Quicksand-Regular',
        light: 'Quicksand-Regular',
        regular: 'Quicksand-Regular',
        medium: 'Quicksand-Regular',
        bold: 'Quicksand-Bold'
    }
}
const configurationOptions = {
    debug: true,
    promptOnMissingPlayServices: true
}
const firebase = RNFirebase.initializeApp(configurationOptions)


branch.subscribe(({ error, params }) => {
    if (error) {
        console.error('Error from Branch: ' + error)
        return
    }

    const clicked_branch_link = params['+clicked_branch_link']
    //alert(clicked_branch_link)
    if (clicked_branch_link) {
        let feature = params['~feature']
        if (feature) {
            let id = params['id']
            let obj = {
                tournament_id: id,
                feature: feature
            }
            Events.publish('deep_linking', obj);
            //payment_details
            //  razorpay_payment_id
        }
    }

    //alert(JSON.stringify(params))
    // let lastParams =  branch.getLatestReferringParams() // params from last open
    // let installParams =  branch.getFirstReferringParams() // params from original install
    //console.log('lastParams=> ', JSON.stringify(branch))
    // console.log('installParams=> ', JSON.stringify(installParams))

    // console.log('Branch=> ',JSON.stringify(branch))

    // if (params['+non_branch_link']) {
    //     const nonBranchUrl = params['+non_branch_link']
    //     console.log('Branch=>', nonBranchUrl)
    //     let lastParams = branch.getLatestReferringParams() // params from last open
    //     console.log('lastParams ' + JSON.stringify(lastParams))
    //     // Route non-Branch URL if appropriate.
    //     return
    // }
    //const tournament_id = params.tournament_id
    console.log('Branchtit=>', JSON.stringify(params))
    // console.log('Branchtit=>', tournament_id)
    // if (tournament_id) {
    //     //alert('test')
    //     // storeData('deep_linking', true)
    //     // Events.publish('deep_linking', tournament_id);

    // }

})


export default class App extends BaseComponent {

    //static FCM_TOKEN = ''

    constructor(props) {
        super(props)
        this.state = {
            is_show_alert: false,
            info_msg: '',
            show_must_update_alert: false,
            navigation: null
        }
        console.disableYellowBox = true;


        firebase.messaging().getToken().then((token) => {
            //alert('Token ',token)
            console.log('firebase token ', token)
        });

        firebase.messaging().onTokenRefresh((token) => {
            //alert('Token ',token)
            console.log('firebase token ', token)
        });

        this.refreshEvent = Events.subscribe('ShowDialog', (msg) => {
            //this.dropDownAlertRef.alertWithType('error', 'Error', msg);
            this.setState({
                is_show_alert: true,
                info_msg: msg
            })
        });

        this.refreshEvent = Events.subscribe(EVENT_UPDATE_DIALOG, () => {
            this.setState({
                show_must_update_alert: true,
            })
        });


        OneSignal.init("0afba88e-fe31-4da9-9540-412faf6b856b");
        //OneSignal.setLogLevel(0, 6)

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        //OneSignal.configure();
        OneSignal.enableVibrate(true);
        OneSignal.inFocusDisplaying(2)
    }

    onReceived(notification) {
        //alert('test===')
        Events.publish('NOTIFICATION_CALL');
        //console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        //console.log('Message: ', openResult.notification.payload.body);
        //  console.log('Data: ', openResult.notification.payload.additionalData);
        // console.log('isActive: ', openResult.notification.isAppInFocus);
        //  console.log('openResult: ', openResult);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }




    onIds(device) {
        //alert(JSON.stringify(device))
        storeData(PUSH_TOKEN, device.pushToken)
        storeData(ONE_SIGNAL_USERID, device.userId)
        //alert('onIds ',  device)
        console.log('Device info: ', device)
    }

    getActiveRouteName(navigationState) {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        // dive into nested navigators
        if (route.routes) {
            return this.getActiveRouteName(route);
        }
        return route.routeName;
    }

    render() {
        let is_show_alert = this.state.is_show_alert
        let show_must_update_alert = this.state.show_must_update_alert
        let info_msg = this.state.info_msg
        return (

            //  <SafeAreaView forceInset={{ top: 'always', }} style={{ flex: 1, backgroundColor: "#e6e6e6", marginTop: 0, marginBottom: 0 }}>


            <PaperProvider theme={ModifiedDefaultTheme}>

                <Provider store={store}>
                    <InfoDialog
                        touchOutside={() => {
                            this.setState({
                                is_show_alert: false,
                                info_msg: ''
                            })
                        }}
                        message={info_msg}
                        visible={is_show_alert} />

                    <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

                    <UpdateAppDialog
                        navigation={this.state.navigation}
                        exitPressed={() => {
                            this.setState({
                                show_must_update_alert: false,
                            })
                            BackHandler.exitApp()
                            //this.props.navigation.goBack(null)
                        }}
                        updatePressed={() => {
                            this.setState({
                                show_must_update_alert: false,
                            })
                            this.handleClick()
                        }}
                        visible={show_must_update_alert} />

                    <AppMain
                        onNavigationStateChange={(prevState, currentState, action) => {
                            const currentScreen = this.getActiveRouteName(currentState);
                            const prevScreen = this.getActiveRouteName(prevState);

                            if (Platform.OS == 'android') {

                                if (prevScreen !== currentScreen) {
                                    if (currentScreen == 'UserHome' || currentScreen == 'ParentHome') {
                                        StatusBar.setBackgroundColor("#332B70")
                                        StatusBar.setBarStyle('light-content', true)
                                    } else {
                                        StatusBar.setBackgroundColor("#ffffff")
                                        StatusBar.setBarStyle('dark-content', true)
                                    }
                                }
                            }
                        }}
                    />
                </Provider>
            </PaperProvider>
            // </SafeAreaView>
        );
    }
    handleClick() {

        let link = ''
        if (Platform.OS == 'ios') {
            link = 'itms-apps://itunes.apple.com/us/app/id${APP_STORE_LINK_ID}?mt=8'
        } else {
            link = 'market://details?id=com.whatsapp'
        }
        Linking.canOpenURL(link).then(supported => {
            supported && Linking.openURL(link);
        }, (err) => console.log(err));
    }
}

