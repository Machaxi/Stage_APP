import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";

const CallButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{ minWidth:0, flexDirection: 'row', alignItems: "center" }}>
                <Image
                    style={{
                        width: 14,
                        alignSelf: "center",
                        height: 14,
                        marginRight: 5
                    }}
                    source={require("../../images/call_icon.png")}
                />
                <Text style={styles.title}>Call us</Text></View>
        </TouchableOpacity>)
}
const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        color: '#667DDB',
        fontFamily: 'Quicksand-Medium'
    }
});
export default CallButton;