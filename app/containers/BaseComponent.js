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
fontMedium="Quicksand-Medium"
fontBold="Quicksand-Bold"
fontRegular="Quicksand-Regular"

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
}