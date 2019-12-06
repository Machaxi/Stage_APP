import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BaseComponent, { defaultStyle } from '../../containers/BaseComponent';

export default class InfoMessage extends BaseComponent {
    constructor(props){
        super(props)
    }

    render() {
     return (
            <Dialog
                width={270}
                height={150}
                visible={this.props.visible}
                dialogStyle={{ borderRadius: 0, padding: 16 }}
                onTouchOutside={() => {
                    this.props.touchOutside();
                }}>
                <DialogContent style={styles.contentContainer}>
                    <TouchableOpacity onPress={() => this.props.pickImage(0)}>
                        <Text style={{
                            fontSize: 18, color: '#A3A5AE',
                            fontFamily: 'Quicksand-Regular', justifyContent: 'center'
                        }}>
                            Adhaar ID
                        </Text>
                        <View style={{
                            backgroundColor: '#C7C7CD',
                            height: 1,
                            marginTop: 2,
                            marginBottom: 2
                        }}></View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.pickImage(1)}>
                        <Text style={{
                            fontSize: 18, color: '#A3A5AE',
                            fontFamily: 'Quicksand-Regular', marginTop: 2
                        }}>
                            PAN Card
                                </Text>
                        <View style={{
                            backgroundColor: '#C7C7CD',
                            height: 1,
                            marginTop: 2,
                            marginBottom: 2
                        }}></View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.pickImage(2)}>
                        <Text style={{
                            fontSize: 18, color: '#A3A5AE',
                            fontFamily: 'Quicksand-Regular', marginTop: 2
                        }}>
                            Driving License
                                </Text>
                        {/* <View style={{
                            backgroundColor: '#C7C7CD',
                            height: 1,
                            marginTop: 2
                        }}></View> */}
                    </TouchableOpacity>
                </DialogContent>
            </Dialog>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'stretch',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 0,
        margin: 0,
    },
    text: {
        color: '#404040',
        fontSize: 14,
        // marginVertical:7,
        padding: 8
    },
    text1: {
        color: '#000',
        fontSize: 15,
        // marginVertical:7,
        padding: 8
    },
    header: {
        width: '100%',
        height: 1,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
    }
})

