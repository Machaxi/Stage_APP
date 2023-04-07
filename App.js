/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, BackHandler, Linking, AppState } from 'react-native';
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
import BaseComponent, {
    DEBUG_APP, getBaseUrl, ONE_SIGNAL_ID, REFRESH_SCREEN_CALLBACK, PUSH_TOKEN,
    ONE_SIGNAL_USERID, EVENT_UPDATE_DIALOG, GO_TO_HOME, GO_TO_SWITCHER, refreshUserProfile
} from './app/containers/BaseComponent';
import { getData, storeData, } from "./app/components/auth";
import branch, { BranchEvent } from 'react-native-branch'
import DropdownAlert from 'react-native-dropdownalert';
import moment from 'moment'
import DeviceInfo from 'react-native-device-info';
import codePush from "react-native-code-push";
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import { darkBlueVariant } from './app/containers/util/colors';
import { deviceHeight, deviceWidth } from './app/containers/util/dimens';

export const client = axios.create({
    baseURL: getBaseUrl(),
    responseType: 'json'
});

const middleware = compose(applyMiddleware(logger, axiosMiddleware(client), thunk));

const store = createStore(reducer, middleware);

//This code is used to add addtional header while sending request, we initially
//added only header but now we have to send more default params, so using this block
client.interceptors.request.use(
    config => {
        config.headers.app_version = '1'//DeviceInfo.getBuildNumber();
        config.headers.app_version_code = DeviceInfo.getVersion();
        config.headers.device_type = Platform.OS.toLowerCase();
        config.headers.device_id = global.FCM_DEVICE_ID;
        config.headers.one_signal_device_id = global.ONE_SIGNAL_USERID
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
        let error_code = -1
        try {
            error_code = error.response.data.error_code
        } catch (err) {

        }

        console.log('status=> ', status)
        if (error_code == 1010) {

            //auto logout and sending navigation to switcher
            console.log('error => ' + JSON.stringify(error.response))

            getData('userInfo', (value) => {
                userData = JSON.parse(value)
                userData['academy_name'] = null
                userData['academy_id'] = null
                userData['academy_user_id'] = null
                storeData("userInfo", JSON.stringify(userData))
                setTimeout(() => {
                    Events.publish(GO_TO_SWITCHER);
                }, 100)
            });
        }
        else if (error_code == '1020') {

            // //auto logout user
            // console.log('error => ' + JSON.stringify(error.response))
            // setTimeout(() => {
            //     Events.publish('LOGOUT');
            // }, 100)
        }
        else if (error_code == '1030') {
            //do nothing
            // in this case we will not show any popup
        }
        else if (status != 401) {



            crashlytics().log('Api Error ' + error.response);
            console.log('error => ' + JSON.stringify(error.response))
            Events.publish('ShowDialog', msg);

            try {

                let err_data = error.response.data
                let url = error.response.config.url
                let data = error.response.config.data
                let logs_data = {
                    url: url,
                    data: data,
                    response: err_data
                }
                if (Platform.OS === 'ios') {
                    // object literal will crash on iOS, so transform to string
                    logs_data = JSON.stringify(logs_data, null, 2);
                }

                console.log('Crash Object -> ', JSON.stringify(logs_data))

                if (Platform.OS === 'android') {
                    crashlytics().recordCustomError(
                        'Custom Error',
                        'Oh No!',
                        [{
                            className: 'Api Error',
                            fileName: 'Api',
                            functionName: 'render',
                            lineNumber: 81,
                            additional: logs_data
                        }]
                    );
                } else {
                    crashlytics().recordCustomError(
                        'Custom Error',
                        'Oh No!',
                        {
                            className: 'Api Error',
                            fileName: 'Api',
                            functionName: 'render',
                            lineNumber: 81,
                            additional: logs_data
                        }
                    );
                }
            } catch (err) {
                console.log('Error in sending data.', err)
            }


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

branch.subscribe(({ error, params }) => {
    if (error) {
        //console.error('Error from Branch: ' + error)
        return
    }

    const clicked_branch_link = params['+clicked_branch_link']
    const rn_cached_initial_event = params['+rn_cached_initial_event']

    //alert(clicked_branch_link)
    if (clicked_branch_link) {
        let feature = params['~feature']
        if (feature) {
            let type = params['type']
            let id = params['id']
            let player_id = params['player_id']
            let academy_id = params['academy_id']
            if (id) {
                let obj = {
                    tournament_id: id,
                    feature: feature
                }
                console.log('Branchtit=>', feature)
                Events.publish('deep_linking', obj);
            }else if(type==='profile'){
                let obj = {
                    player_id: player_id, 
                    type: type,
                    academy_id: academy_id
                }
                Events.publish('deep_linking', obj);
            }
            //console.log('Branchtit=>', feature)
            //Events.publish('deep_linking', obj);
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
    //alert(DeviceInfo.getVersion())
})



class App extends BaseComponent {

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
        console.reportErrorsAsExceptions = false;

        messaging().getToken().then((token) => {
            //alert('Token ',token)
            console.log('firebase token ', token)
        });

        messaging().onTokenRefresh((token) => {
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

        this.refreshEvent = Events.subscribe(EVENT_UPDATE_DIALOG, (must_update) => {
            // must_update = true
            console.log('must update', must_update);
            this.setState({
                show_must_update_alert: must_update,
            })
        });

        OneSignal.init(ONE_SIGNAL_ID, { kOSSettingsKeyAutoPrompt: true });
        //OneSignal.setLogLevel(0, 6)

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        //OneSignal.configure();
        OneSignal.enableVibrate(true);
        OneSignal.inFocusDisplaying(2)

        if (DEBUG_APP){
            //alert('You are running debug app.')
        }
            
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        if (Platform.OS === "android" && DeviceInfo.hasNotch()) {
          SafeAreaView
            .setStatusBarHeight
            (57);
        }
    }

    componentWillMount() {
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            this.checkForceUpdateAPI();
        }
        console.log('nextAppState', nextAppState);
    };

    checkForceUpdateAPI = () => {
        this.getNotificationCount((count) => {
            console.log('notificatio_count', count);
        })
    }

    onReceived(notification) {
        //alert('test===')
        
        console.log("Notification received: ", notification);
        console.log("Notificatin for:" + notification.payload.additionalData.notification_for);
        //notification type->player_added_to_batch
        //user-> is a guest
        try{
            if(notification.payload.additionalData.notification_for=="player_added_to_batch"){
                console.log("CALLING REFRESH EVENT");
                Events.publish('PROFILE_REFRESH');

            }else{
                Events.publish('NOTIFICATION_CALL');
                console.log(notification.payload.additionalData.notification_for);
            }
        }catch(ex){
            console.log(ex);
        }
    }

    onOpened(openResult) {

        global.NOTIFICATION_DATA = openResult.notification.payload.additionalData

        //alert(JSON.stringify(openResult))
        //console.log('Message: ', openResult.notification.payload.body);
        //  console.log('Data: ', openResult.notification.payload.additionalData);
        // console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', JSON.stringify(openResult));
        setTimeout(() => {
            Events.publish('NOTIFICATION_CLICKED');
        }, 100)
    }

    componentWillUnmount() {
        // AppState.removeEventListener('change', this._handleAppStateChange);
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }


    onIds(device) {
        storeData(PUSH_TOKEN, device.pushToken)
        storeData(ONE_SIGNAL_USERID, device.userId)
        global.FCM_DEVICE_ID = device.pushToken
        global.ONE_SIGNAL_USERID = device.userId
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
                                    if (
                                      currentScreen ==
                                        "UserHome" ||
                                      currentScreen ==
                                        "ParentHome"
                                      
                                    ) {
                                      StatusBar.setBackgroundColor(
                                        "#332B70"
                                      );
                                      StatusBar.setBarStyle(
                                        "light-content",
                                        true
                                      );
                                    } 
                                    else if (
                                           currentScreen ==
                                             "MyRequestsScreen" ||
                                           currentScreen ==
                                             "MyBookingsScreen"
                                         ) {
                                           StatusBar.setBackgroundColor(
                                             darkBlueVariant
                                           );
                                           StatusBar.setBarStyle(
                                             "light-content",
                                             true
                                           );
                                         } else {
                                           StatusBar.setBackgroundColor(
                                             "#ffffff"
                                           );
                                           StatusBar.setBarStyle(
                                             "dark-content",
                                             true
                                           );
                                         }

                                    //this.refreshScreenCallback(currentScreen)
                                }
                            } else {
                                StatusBar.setBarStyle('dark-content', true)
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
            link = 'itms-apps://itunes.apple.com/us/app/id${1484093762}?mt=8'
        } else {
            link = 'market://details?id=com.machaxi'
        }
        Linking.canOpenURL(link).then(supported => {
            supported && Linking.openURL(link);
        }, (err) => console.log(err));
    }

    refreshScreenCallback(currentScreen) {
        console.log('screen_state', currentScreen)

        getData('screen_state', (value) => {
            console.log('screen_state1', value)
            let obj = {}
            if (value != '') {
                console.log('screen_state1', value)
                obj = JSON.parse(value)
            }
            if (obj[currentScreen] == undefined) {
                console.log('screen_state2 = ', obj[currentScreen])
                obj[currentScreen] = +moment();
                console.log('screen_state3 = ', obj[currentScreen])

            } else {
                let currentMilli = +moment()
                let lastMilli = obj[currentScreen]
                let diffMilli = (currentMilli - lastMilli) / (1000)
                let diffMin = +(diffMilli / 60)
                console.log('screen_state- = ', lastMilli + "==" + diffMilli)
                console.log('screen_state4 = ', obj[currentScreen])
                console.log('screen_state5 = ', diffMin)
                if (diffMin >= 1) {
                    Events.publish(REFRESH_SCREEN_CALLBACK);
                    obj[currentScreen] = +moment();
                }
            }
            storeData('screen_state', JSON.stringify(obj))
        })
    }
}

// export default App
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_APP_RESUME };
export default codePush(codePushOptions)(App);

