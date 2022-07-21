'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    TextViewLabel: {
        fontSize: 12,
        fontFamily: 'Quicksand-Medium',
        color: '#A3A5AE'
    },

    LabelSmall: {
        fontSize: 12,
        fontFamily: 'Quicksand-Regular',
        color: '#404040'
    },
    LabelRegular: {
        fontSize: 14,
        fontFamily: 'Quicksand-Regular',
        color: '#404040'
    },
    LabelBig: {
        fontSize: 16,
        fontFamily: 'Quicksand-Medium',
        color: '#404040'
    },
    rounded_button_100_percent: {
        width: "100%",
        padding: 10,
        borderRadius: 20,
        borderColor: "#67BAF5",
        backgroundColor: "#67BAF5",
        color: "white",
        textAlign: "center",
        fontFamily: "Quicksand-Medium",
      },
    boxWithShadow: {
        shadowOffset: {height: -2},
        shadowOpacity: 0.2,
        elevation:2,
        padding:10
    },
    lineStyle: {
        width: "100%",
        borderWidth: 0.8,
        borderColor: '#EFEFEF',
        marginTop: 10,
        marginBottom: 10
      },
      textinput: {
        height: 36,
        color: '#404040',
        width: '100%',
        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1,
        fontFamily: 'Quicksand-Regular'
    },
});

