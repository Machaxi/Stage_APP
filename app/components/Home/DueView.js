import React from 'react'

import { View, Text } from 'react-native'

export const DueView = () => {


    return (
        <View
            style={{
                backgroundColor: '#FF7373',
                borderRadius: 4
            }}>
            <Text style={{
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 2,
                paddingBottom: 2,
                fontFamily: 'Quicksand-Medium',
                fontSize: 10,
                color: 'white',
            }}>Due
            </Text>
        </View>
    );
}

