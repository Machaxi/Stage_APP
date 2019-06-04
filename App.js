/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
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
import { NativeEventEmitter, NativeModules } from 'react-native';

const client = axios.create({
    baseURL: 'http://www.dev.amydus.com/api/rest/mobile/',
    responseType: 'json'
});

const middleware = compose(applyMiddleware(logger, axiosMiddleware(client), thunk));

const store = createStore(reducer, middleware);


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const ModifiedDefaultTheme = {
    ...DefaultTheme,
    // fonts: {
    //     thin: 'Lato-Regular',
    //     light: 'Lato-Regular',
    //     regular: 'Lato-Regular',
    //     medium: 'Lato-Regular',
    // }
}

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <SafeAreaView style={{ flex: 1,marginTop:-10, backgroundColor: "#e6e6e6" }}>
            <PaperProvider theme={ModifiedDefaultTheme}>

                <Provider store={store}>
                    <AppMain />
                </Provider>
           </PaperProvider>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
