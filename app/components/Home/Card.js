import React from 'react'

import { View, TouchableOpacity, Text, Button, StyleSheet } from 'react-native'

export const CustomeCard = ({ children }) => {


    return (
        <View style={styles.cardStyle}>
            {children}
        </View>
    );


}



export const CustomeButtonB = ({ onPress, children }) => {


    return (
        <TouchableOpacity style={styles.buttonStyleB}
            onPress={onPress}
        >
            <Text style={styles.textStyleB}>{children}</Text>
        </TouchableOpacity>
    );


}

export const CustomRedFillButton = ({ onPress, children }) => {


    return (
        <TouchableOpacity style={styles.touch_red_border}
            onPress={onPress}
        >
            <Text style={styles.touch_red_border_txt}>{children}</Text>
        </TouchableOpacity>
    );


}


const styles = StyleSheet.create({

    touch_red_border: {
        padding: 10,
        backgroundColor: '#ffffff',
        height: 46,
        borderColor:'#FF7373',
        borderRadius: 23,
        borderWidth:1
    },
    touch_red_border_txt: {
        fontSize: 14,
        color: '#FF7373',
        textAlign: 'center'
    },

    cardStyle: {
        elevation: 4,
        margin: 10,
        borderRadius: 12,
        backgroundColor: '#ffffff'
    },

    buttonStyle: {
        padding: 10,
        // backgroundColor: '#67BAF5',
        height: 46,
        borderWidth: 1,
        borderColor: '#67BAF5',

        borderRadius: 23,
        marginBottom: 10,
    },

    textStyleB: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    },

    buttonStyleB: {
        padding: 10,
        backgroundColor: '#67BAF5',
        height: 46,
        justifyContent:'center',
        borderRadius: 23,
        marginBottom: 10,
    }
});

