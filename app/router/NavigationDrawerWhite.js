import React from "react";
import { isSignedIn } from "../components/auth";
import { Platform, StatusBar, Image, View, Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";

class NavigationDrawerWhite extends React.Component {

    //==================================================================
    //          showBackAction = true/false (show/hide)
    //           showDrawer = true/false
    //==================================================================

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
        };
    }


    //Structure for the navigatin Drawer
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
    };

    toggleToHome = () => {
        this.props.navigationProps.goBack(null);
    };

    render() {

        let showBackAction = true
        if (this.props.showBackAction != undefined)
            showBackAction = this.props.showBackAction


        let showDrawer = true

        if (this.props.showDrawer != undefined)
            showDrawer = this.props.showDrawer

        return (
            <View style={{ flexDirection: 'row' }}>
                {showBackAction ?
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={{padding: 10, marginLeft: 12}}
                        onPress={this.toggleToHome.bind(this)}>

                        <Image
                            resizeMode="contain"
                            source={require('../images/go_back_arrow.png')}
                            style={{ width: 20, height: 16 }}
                        />
                    </TouchableOpacity>
                   
                    : null
                }

                {showDrawer ?  <TouchableOpacity
                        style={{ marginRight: 8, padding: 7 }}
                        onPress={() => {
                        navigation.toggleDrawer();
                        }}
                        activeOpacity={0.8}
                    >
                        <Image
                        resizeMode="contain"
                        source={require("../images/hamburger_white.png")}
                        style={{ width: 20, height: 16, marginLeft: 12 }}
                        />
                    </TouchableOpacity>
                    : null}

                {/* <TouchableOpacity onPress={this.toggleToHome.bind(this)}>
                <Image
                        source={require('../images/header_icon.png')}
                        style={{ width: 55, height: 50,marginLeft:-15}}
                    />
                    </TouchableOpacity> */}
            </View>
        );
    }
}

export default NavigationDrawerWhite;