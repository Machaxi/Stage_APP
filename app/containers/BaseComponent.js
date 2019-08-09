import React from 'react'
import { StatusBar, NetInfo } from 'react-native';
import { getData } from '../components/auth';
import { GUEST, PLAYER, PARENT, COACH, ACADEMY } from '../components/Constants'
import Events from '../router/events';

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
export const EVENT_SELECT_PLAYER_TOURNAMENT = 'EVENT_SELECT_PLAYER_TOURNAMENT'
export const EVENT_SELECT_PLAYER_ADD_NUMBER = 'EVENT_SELECT_PLAYER_ADD_NUMBER'

//to refresh challenge dashboard
export const EVENT_REFRESH_CHALLENGE = 'EVENT_REFRESH_CHALLENGE'

//STORE KEYS
export const TOURNAMENT_REGISTER = 'TOURNAMENT_REGISTER'
export const TEMP_USER_INFO = "TEMP_USER_INFO"
export const GO_TO_HOME = "GO_TO_HOME"
export const TOURNAMENT_FITLER = 'TOURNAMENT_FITLER'
//


export const SESSION_DATE_FORMAT = "ddd, DD MMM'YY"

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

        this.refreshEvent = Events.subscribe(GO_TO_HOME, () => {
            this.goToHome()
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
    render() {
        return (<StatusBar
            backgroundColor="blue"
            barStyle="light-content"
        />)
    }

    //This function is used when we go for tournament registration and  go back to home 
    //in that case we have to use this, we are using tournaments in new stack, we cannot
    // go back on back press.
    goToHome() {

        getData('userInfo', (value) => {

            if (value != '') {
                let userData = (JSON.parse(value))
                // onSignIn()
                let userType = userData.user['user_type']
                console.log("SplashScreen1=> ", JSON.stringify(userData));
                console.warn('userType ', userType)
                let academy_id = userData.academy_id
                //console.warn('academy_id ', userData.academy_id)

                if (userType == GUEST) {
                    this.props.navigation.navigate('GHome')
                }
                else if (academy_id != null) {

                    if (userType == PLAYER) {
                        this.props.navigation.navigate('UHome')

                    } else if (userType == COACH || userType == ACADEMY) {
                        this.props.navigation.navigate('CHome')
                    }
                    else if (userType == PARENT) {
                        this.props.navigation.navigate('PHome')
                    }
                }
                else {
                    if (userType == PLAYER) {
                        //this.props.navigation.navigate('UHome')
                        if (!userData.has_multiple_acadmies) {
                            this.props.navigation.navigate('UHome')

                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: 'PLAYER'
                            })
                        }
                    } else if (userType == COACH || userType == ACADEMY) {
                        //this.props.navigation.navigate('CHome')
                        storeData('multiple', userData.has_multiple_acadmies)
                        if (userData.has_multiple_acadmies == false) {
                            this.props.navigation.navigate('CHome')
                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: COACH
                            })
                        }
                    }
                    else if (userType == PARENT) {
                        //this.props.navigation.navigate('PHome')
                        if (userData.has_multiple_acadmies == false) {
                            this.props.navigation.navigate('PHome')

                        } else {
                            this.props.navigation.navigate('SwitchPlayer', {
                                userType: PLAYER
                            })
                        }
                    }
                }
            } else {
                this.props.navigation.navigate('GHome')
            }
        });

    }
}




export function formattedName(name) {

    let array = name.split(' ')
    let newName = ''
    if (array.length > 1) {

        let singleChar = array[1].charAt(0)
        newName = array[0] + " " + singleChar
        return newName
    } else {
        newName = name
    }
    //alert(array)
    return newName

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

export function getFormattedTournamentType(level) {

    switch (level) {
        case "INTER_ACADEMY":
            return "Inter-Academy"

        case "INTRA_ACADEMY":
            return "Intra-Academy"
    }
    return level
}

export function getFormattedCategory(category) {

    switch (category) {
        case "U10":
            return "U-10"

        case "U13":
            return "U-13"

        case "U15":
            return "U-15"

        case "U17":
            return "U-17"
    }
    return category
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
        alignItems: 'center',
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

    },
    bebas_text_blue_10: {
        fontSize: 10,
        color: '#F4F4F4',
        fontFamily: 'BebasNeue-Regular'
    },
}