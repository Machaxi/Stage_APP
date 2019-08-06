import React from 'react'

import { View, Text } from 'react-native'

export const RateViewFill = ({ children }) => {


    return (
        <View
            style={{
                height: 19,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#D8D8D8',
                borderRadius: 10,
                textAlignVertical: 'center'
            }}>
            <Text style={{
                marginBottom: 1,
                color: '#707070',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Quicksand-Medium',
                fontSize: 12,
            }}>{children.toFixed(1)}
            </Text>
        </View>
    );
}

