/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
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
import Events from './app/router/events';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import RNFirebase from 'react-native-firebase';
import BaseComponent, { PUSH_TOKEN, ONE_SIGNAL_USERID, GO_TO_HOME } from './app/containers/BaseComponent';
import { storeData } from "./app/components/auth";
import branch, { BranchEvent } from 'react-native-branch'

export const BASE_URL = 'http://13.233.182.217:8080/api/'
const client = axios.create({
    baseURL: BASE_URL,
    responseType: 'json'
});

const middleware = compose(applyMiddleware(logger, axiosMiddleware(client), thunk));

const store = createStore(reducer, middleware);

//This code is used to add addtional header while sending request, we initially
//added only header but now we have to send more default params, so using this block
client.interceptors.request.use(
    config => {
        config.headers.app_version = '1.0.0';
        config.headers.os = Platform.OS;
        return config;
    },
    error => Promise.reject(error)
);
//==============END=========================================================

///Check for error, there is no handling of response in error case, so we are using 
//these code
client.interceptors.response.use(response => {
    //console.warn('Response ',JSON.stringify(response))
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
    const tournament_id = params.tournament_id
    console.log('Branchtit=>', JSON.stringify(params))
    console.log('Branchtit=>', tournament_id)
    if (tournament_id) {
        //alert('test')
       // storeData('deep_linking', true)
       // Events.publish('deep_linking', tournament_id);

    }
})


export default class App extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            is_show_alert: false,
            info_msg: ''

        }


        firebase.messaging().getToken().then((token) => {
            //alert('Token ',token)
            console.log('firebase token ', token)
        });

        firebase.messaging().onTokenRefresh((token) => {
            //alert('Token ',token)
            console.log('firebase token ', token)
        });

        this.refreshEvent = Events.subscribe('ShowDialog', (msg) => {
            this.setState({
                is_show_alert: true,
                info_msg: msg
            })
        });

        OneSignal.init("0afba88e-fe31-4da9-9540-412faf6b856b");
        //OneSignal.setLogLevel(0, 6)

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        OneSignal.configure(); 	// triggers the ids event

    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        //console.log('Message: ', openResult.notification.payload.body);
        //  console.log('Data: ', openResult.notification.payload.additionalData);
        // console.log('isActive: ', openResult.notification.isAppInFocus);
        //  console.log('openResult: ', openResult);
    }

    componentDidMount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);

    }



    onIds(device) {
        storeData(PUSH_TOKEN, device.pushToken)
        storeData(ONE_SIGNAL_USERID, device.userId)
        //alert('onIds ',  device)
        console.log('Device info: ', device)
    }

    render() {
        let is_show_alert = this.state.is_show_alert
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

                    <AppMain />
                </Provider>
            </PaperProvider>
            // </SafeAreaView>
        );
    }
}

