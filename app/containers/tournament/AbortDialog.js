import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BaseComponent, { defaultStyle } from '../BaseComponent';

export default class AbortDialog extends BaseComponent {

    render() {

        return (
            <Dialog

                width={300}
                height={300}
                visible={this.props.visible}
                dialogStyle={{ borderRadius: 12, aspectRatio: 1 }}
                onTouchOutside={() => {
                    this.props.onNoPress();
                }}
            >
                <DialogContent style={styles.contentContainer}>

                    <View style={{
                        borderRadius: 16,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Text
                            style={{
                                fontSize: 16,
                                color: 'black',
                                fontFamily: 'Quicksand-Bold'
                            }}
                        >Abort</Text>

                        <Image
                            style={{ marginTop: 16, height: 100, width: 100 }}
                            source={require('../../images/ic_alert_icon.png')}
                        ></Image>

                        <Text
                            style={{
                                fontSize: 14,
                                margin: 16,
                                color: 'black',
                                textAlign: 'center',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                            Are you sure you want to Abort the Registration?</Text>

                        <View style={{ flexDirection: 'row', }}>

                            <View

                                style={{ width: "50%" }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.onYesPress();
                                    }}
                                    style={[styles.touch_red_border, { marginRight: 6 }]}>

                                    <Text style={styles.touch_red_border_txt}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "50%" }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.onNoPress();
                                    }}
                                    style={[styles.touch_sky_fill, { marginRight: 6 }]}>

                                    <Text style={styles.touch_sky_txt}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </DialogContent>
            </Dialog>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'stretch',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 0,
        margin: 0,
    },
    touch_red_border: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderColor: '#FF7373',
        borderRadius: 23,
        borderWidth: 1,
    },
    touch_red_border_txt: {
        fontSize: 14,
        color: '#FF7373',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
    touch_sky_fill: {
        padding: 10,
        backgroundColor: '#67BAF5',
        color: 'white',
        borderRadius: 23,
    },
    touch_sky_txt: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    },
})

