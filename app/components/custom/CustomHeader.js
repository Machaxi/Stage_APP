import React from "react";
import { Header } from "react-navigation";
import { View, Platform, Text, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

class CustomHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            showBackArrow: true
        };
    }

    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigation.toggleDrawer();
        //this.props.navigation.navigate('DrawerToggle')
    };

    componentDidMount() {
        this.setState({
            title: this.props.title,
        });
    }

    render() {
        return (

            <View>

                <LinearGradient

                    colors={['#262051', '#24262A']}

                    start={{ x: 0, y: 0 }}
                    end={{ x: 2.5, y: 0 }}
                >
                    <View
                        style={{
                            height: 50,
                            flexDirection: 'row',
                            paddingTop: 16,
                            justifyContent: 'space-between',
                        }}
                    >

                        <TouchableOpacity
                            onPress={this.toggleDrawer.bind(this)}
                            activeOpacity={.8}
                        >

                            <Image

                                source={require('../../images/hamburger_white.png')}
                                style={{ width: 20, height: 16, marginLeft: 12 }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity

                            onPress={() => {
                                this.props.navigation.navigate('SwitchPlayer')
                            }}
                            activeOpacity={.8}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Quicksand-Medium',
                                    fontSize: 14,
                                    color: 'white'
                                }}
                            >{this.state.title}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={.8}
                        >

                            <Image
                                source={require('../../images/ic_notifications.png')}
                                style={{ width: 20, height: 20, marginRight: 12 }}
                            />
                        </TouchableOpacity>

                    </View>
                </LinearGradient>
            </View>

        );
    }

}


export default CustomHeader;