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

export const BASE_URL = 'http://13.233.182.217:8080/api/'
const client = axios.create({
    baseURL: BASE_URL,
    responseType: 'json'
});

const middleware = compose(applyMiddleware(logger, axiosMiddleware(client), thunk));

const store = createStore(reducer, middleware);


client.interceptors.response.use(response => {
    return response;
}, error => {

    try {
        let status = error.response.data.status
        let msg = error.response.data.error_message
        console.log('status=> ', status)
        if (status != 401 ) {
            console.log('error => ' + JSON.stringify(error.response))
            Events.publish('ShowDialog', msg);
        }
    }
    catch (error) {

    }
    return error;
});


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

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            is_show_alert: false,
            info_msg: ''
        }


        this.refreshEvent = Events.subscribe('ShowDialog', (msg) => {
            this.setState({
                is_show_alert: true,
                info_msg: msg
            })
        });
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

