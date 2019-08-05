import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Platform, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';


export default class MyCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }




    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: "100%",
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    sliderImage: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        flex: 1,
        resizeMode: 'stretch',
    }
});


