import React from 'react'

import { View, Text } from 'react-native'

export const RateViewBorder = ({ children }) => {


    return (
        <View
            style={{
                height: 19,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#D8D8D8',
                borderWidth: 1,
                backgroundColor: 'white',
                borderRadius: 10
            }}>
            <Text style={{
                color: '#707070',
                marginTop: -2,
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Quicksand-Medium',
                fontSize: 12,
            }}>{children.toFixed(1)}
            </Text>
        </View>
    );
}

