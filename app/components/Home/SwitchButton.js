import React from 'react'

import {View,TouchableOpacity,Text,Button,StyleSheet} from 'react-native'

export const SwitchButton = ({onPress,children}) => {


    return (
        <TouchableOpacity style={styles.buttonStyle}
                          onPress={ onPress}
        >
            <Text style={styles.textStyle}>{children}</Text>
        </TouchableOpacity>
    );


}

//export default SwitchButton;

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
    textStyle: {
        fontSize:14,
        color: '#67BAF5',
        textAlign: 'center',
        marginTop:5
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
        fontSize:14,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop:5
    },

    buttonStyleB: {
        padding:10,
        backgroundColor: '#67BAF5',
        height:46,


        borderRadius:23,
        marginBottom:20,
    }
});

