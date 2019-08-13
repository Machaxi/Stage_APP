import React from "react";
import { Platform, StatusBar, Image, View, Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";
import { getData, storeData } from '../components/auth';
import { GUEST, PLAYER, PARENT, COACH, ACADEMY } from '../components/Constants'
import events from "./events";
import BaseComponent, {GO_TO_HOME} from "../containers/BaseComponent";

class RightMenuToolbar extends BaseComponent {

    //==================================================================
    //          showNotification = true/false (show/hide)
    //          showHome
    //==================================================================

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {

        //showNotification={false} showHome={true}
        let showNotification = false
        let showHome = false
        if (this.props.showNotification != undefined)
            showNotification = this.props.showNotification

        if (this.props.showHome != undefined)
            showHome = this.props.showHome


        //for balance weightage
        let show_empty = false
        if (showHome == false && showNotification == false)
        {
            show_empty = true
            console.warn('show-empty ',show_empty)
        }    

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                {showNotification ? <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => { }}>

                    <Image
                        source={require('../images/ic_notifications.png')}
                        style={{ width: 20, height: 20, marginRight: 12 }}
                    />
                </TouchableOpacity> : null}


                {showHome ? <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => {
                        setTimeout(() => {
                            events.publish(GO_TO_HOME, msg);

                        }, 100)
                    }}>

                    <Image
                        source={require('../images/ic_home.png')}
                        style={{ width: 20, height: 20, marginRight: 12 }}
                    />
                </TouchableOpacity> : null}

                {show_empty ?
                    <Image
                        style={{ width: 20, height: 20, marginRight: 12 }}
                    />
                    : null}


            </View>
        );
    }
}
export default RightMenuToolbar;