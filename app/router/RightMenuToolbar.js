import React from "react";
import { Platform, StatusBar, Image, View, Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";

class RightMenuToolbar extends React.Component {

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
                    onPress={() => { }}>

                    <Image
                        source={require('../images/ic_home.png')}
                        style={{ width: 20, height: 20, marginRight: 12 }}
                    />
                </TouchableOpacity> : null}


            </View>
        );
    }
}
export default RightMenuToolbar;