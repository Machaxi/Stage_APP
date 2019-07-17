import React from 'react'
import { StatusBar, NetInfo } from 'react-native';

msg = "GUEST"

colors = {
    BLACK_TEXT: '#404040',
    GRAY: '#A3A5AE',
    SKY: '#67BAF5',
    PURPLE: '#667DDB'
}

ACADEMY_LISTING = "AcademyListing"
var connected = false
fontMedium = "Quicksand-Medium"
fontBold = "Quicksand-Bold"
fontRegular = "Quicksand-Regular"

export const EVENT_REFRESH_DASHBOARD = 'EVENT_REFRESH_DASHBOARD'
export const EVENT_EDIT_PROFILE = 'EVENT_EDIT_PROFILE'

export default class BaseComponent extends React.Component {


    static isUserLoggedIn = false

    constructor(props) {
        super(props)

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this._handleConnectivityChange

        );
        NetInfo.isConnected.fetch().done((isConnected) => {
            connected = isConnected
        });

        //StatusBar.setBackgroundColor("#ffffff")
        //StatusBar.setBarStyle('dark-content', true)

    }

    static isUserLoggedIn() {
        return this.isUserLoggedIn;
    }

    getNetworkStatus() {
        if (!connected) {
            alert("Oops!! No Internet Connection Available");
        }
        return connected
    }
    navigate(screen, param) {
        this.props.navigation.navigate(screen, param)
    }

    _handleConnectivityChange = (isConnected) => {

        connected = isConnected
    };

    componentWillUnmount() {

        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );
    }
    render() {
        return (<StatusBar
            backgroundColor="blue"
            barStyle="light-content"
        />)
    }


}
export function getFormattedLevel(level) {

    switch (level) {
        case "DISTRICT_LEVEL":
            return "District Level"

        case "STATE_LEVEL":
            return "State Level"

        case "DISTRICT_LEVEL":
            return "District Level"

        case "NATIONAL_LEVEL":
            return "National Level"
    }
    return level
}


export const defaultStyle = {
    spinnerTextStyle: {
        color: '#FFF'
    },
    bold_text_14: {
        fontSize: 14,
        color: '#404040',
        fontFamily: 'Quicksand-Medium'
    },
    bold_text_16: {
        fontSize: 16,
        color: '#404040',
        fontFamily: 'Quicksand-Medium'
    },
    heavy_bold_text_14: {
        fontSize: 14,
        color: '#404040',
        fontFamily: 'Quicksand-Bold'
    },
    bold_text_12: {
        fontSize: 12,
        color: '#404040',
        fontFamily: 'Quicksand-Medium'
    },
    bold_text_10: {
        fontSize: 10,
        color: '#404040',
        fontFamily: 'Quicksand-Medium'
    },
    regular_text_14: {
        fontSize: 14,
        color: '#404040',
        fontFamily: 'Quicksand-Regular'
    },
    regular_text_10: {
        fontSize: 10,
        color: '#404040',
        fontFamily: 'Quicksand-Regular'
    },
    regular_text_12: {
        fontSize: 12,
        color: '#404040',
        fontFamily: 'Quicksand-Regular'
    },
    regular_text_blue_10: {
        fontSize: 10,
        color: '#667DDB',
        fontFamily: 'Quicksand-Regular'
    },
    blue_rounded_4: {
        backgroundColor: '#667DDB',
        textAlign: 'center',
        fontSize: 12,
        marginLeft: 8,
        color: 'white',
        borderRadius: 4,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2,
        fontWeight: '100',
        fontFamily: 'Quicksand-Medium'
    },
    line_style: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#DFDFDF',
        height: 1
    },
    rounded_button_150: {
        flex: 1,
        width: 150,
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    },
    rounded_button: {
        width: '48%',
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
    headerStyle: {
        color: '#191919',
        fontFamily: 'Quicksand-Medium',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 16,
        flexGrow: 1,
        alignSelf: 'center',
    },
    line_style: {
        height: 1,
        backgroundColor: '#DFDFDF',
        marginTop: 8,
        marginBottom: 8

    }
}