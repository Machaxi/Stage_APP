import React from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

export const SkyFilledButton = ({ onPress, children }) => {


    return (
        <TouchableOpacity activeOpacity={.8}
            style={styles.rounded_button}
            onPress={onPress}>
            <Text
                style={{
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'Quicksand-Medium'
                }}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

export const SkyBorderButton = ({ onPress, children }) => {


    return (
        <TouchableOpacity activeOpacity={.8}
            style={styles.rounded_button1}
            onPress={onPress}>
            <Text
                style={{
                    fontSize: 14,
                    color: '#FFFFFF',
                    textAlign: 'center',
                    
                    fontFamily: 'Quicksand-Medium',
                }}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}
const styles = {
    rounded_button: {
        // width:'100%',
        // padding: 10,
        // flexShrink: 1,
        // alignItems: 'stretch',
        // borderRadius: 20,
        // //borderWidth: 1,
        // marginLeft: 4,
        // marginRight: 4,
        // borderColor: '#67BAF5',
        // backgroundColor: '#67BAF5',
        padding: 10,
        backgroundColor: '#67BAF5',
        height: 44,
        borderRadius: 23,

    },
    rounded_button1: {
        width: '100%',
        padding: 10,
        flexShrink: 1,
        alignItems: 'stretch',
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: 'white',

    },
}

