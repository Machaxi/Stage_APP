import React from "react";
import { Header } from "react-navigation";
import { View, Platform, Text } from "react-native";

class CustomHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            showBackArrow: true
        };
    }

    componentDidMount() {
        this.setState({
            title: this.props.title,
        });
    }

    render() {
        return (
            <View
                style={{
                    height: 50,
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Quicksand-Bold',
                        fontSize: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        alignContent: 'center',
                        color: '#404040'
                    }}
                >{this.state.title}</Text>
            </View>
        );
    }

}


export default CustomHeader;