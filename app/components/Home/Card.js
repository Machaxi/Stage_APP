import React from 'react'

import {View,TouchableOpacity,Text,Button,StyleSheet} from 'react-native'

export const CustomeCard = ({children}) => {


    return (
        <View style={styles.cardStyle}>
            {children}
        </View>
    );


}



export const CustomeButtonB = ({onPress,children}) => {


    return (
        <TouchableOpacity style={styles.buttonStyleB}
                          onPress={ onPress}
        >
            <Text style={styles.textStyleB}>{children}</Text>
        </TouchableOpacity>
    );


}


const styles = StyleSheet.create({
    cardStyle: {
        margin:10,
        borderRadius:10,
        backgroundColor:'#ffffff'
    },

    buttonStyle: {
        padding:10,
        // backgroundColor: '#67BAF5',
        height:46,
        borderWidth:1,
        borderColor:'#67BAF5',

        borderRadius:23,
        marginBottom:10,
    },

    textStyleB: {
        fontSize:20,
        color: '#FFFFFF',
        textAlign: 'center'
    },

    buttonStyleB: {
        padding:10,
        backgroundColor: '#67BAF5',
        height:46,


        borderRadius:23,
        marginBottom:10,
    }
});

