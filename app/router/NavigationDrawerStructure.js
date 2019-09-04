import React from "react";
import { isSignedIn } from "../components/auth";
import { Platform, StatusBar, Image, View, Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground } from "react-native";

class NavigationDrawerStructure extends React.Component {

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
                        onPress={this.toggleToHome.bind(this)}>

                        <Image
                            resizeMode="contain"
                            source={require('../images/go_back_arrow.png')}
                            style={{
                                marginLeft: 12,
                                width: 20, height: 16, paddingLeft: 12, paddingRight: 4,
                                paddingTop: 8, paddingBottom: 8
                            }}
                        />
                    </TouchableOpacity>
                    : null
                }

                {showDrawer ? <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    {/*Donute Button Image */}
                    <Image
                    resizeMode="contain"
                        source={require('../images/hamburger.png')}
                        style={{ width: 24, height: 16, marginLeft: 12 }}
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

export default NavigationDrawerStructure;