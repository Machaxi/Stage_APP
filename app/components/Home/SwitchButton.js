import React from 'react'

import { View, TouchableOpacity, Text, Button, StyleSheet } from 'react-native'

export const SwitchButton = ({ onPress, children }) => {


    return (
        <TouchableOpacity
            activeOpacity={.8}
            style={styles.buttonStyle}
            onPress={onPress}
        >
            <Text style={styles.textStyle}>{children}</Text>
        </TouchableOpacity>
    );


}

//export default SwitchButton;

export const CustomeButtonB = ({ onPress, children }) => {


    return (
        <TouchableOpacity
            activeOpacity={.8}
            style={styles.buttonStyleB}
            onPress={onPress}
        >
            <Text style={styles.textStyleB}>{children}</Text>
        </TouchableOpacity>
    );


}


const styles = StyleSheet.create({
    textStyle: {
        fontSize: 14,
        color: '#67BAF5',
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 2,
        fontFamily: 'Quicksand-Medium',
    },

    buttonStyle: {
        padding: 10,
        // backgroundColor: '#67BAF5',
        height: 46,
        borderWidth: 1,
        borderColor: '#67BAF5',
        borderRadius: 23,
        marginBottom: 10,
        justifyContent:'center'
    },

    textStyleB: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 2,
        fontFamily: 'Quicksand-Medium',
    },

    buttonStyleB: {
        padding: 10,
        backgroundColor: '#67BAF5',
        height: 46,
        textAlign:'center',
        borderRadius: 23,
        marginBottom: 20,
        justifyContent:'center'
    }
});

