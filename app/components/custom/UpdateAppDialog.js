import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BaseComponent, { defaultStyle } from '../../containers/BaseComponent';

export default class UpdateAppDialog extends BaseComponent {

    render() {

        let message = 'You do not have the most up-to-date version of this app installed on your device.' +
            ' Click the button to open the App store to install the latest version.'
        let width = 300


        return (
            <Dialog
                width={width}
                height={250}
                visible={this.props.visible}
                dialogStyle={{ borderRadius: 12, }}
                onTouchOutside={() => {
                    //this.props.touchOutside();
                }}
            >
                <DialogContent style={styles.contentContainer}>

                    <Text style={[defaultStyle.heavy_bold_text_14, {
                        padding: 16,
                    }]}>APP UPDATED REQUIRED</Text>
                    <View style={styles.header}></View>

                    <Text style={[defaultStyle.regular_text_14, { padding: 8, marginBottom: 20 }]}>
                        {message}
                    </Text>



                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>

                        <TouchableOpacity

                            onPress={() => {
                                this.props.updatePressed()
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View style={{
                                width: width / 2,

                            }}>
                                <Text style={[defaultStyle.bold_text_14, {
                                    marginTop: 20,
                                }]}>Update App</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: width / 2,

                            }}
                            onPress={() => {
                                this.props.exitPressed()
                            }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View >
                                <Text style={[defaultStyle.bold_text_14, {
                                    marginTop: 20,
                                }]}>Exit App</Text>
                            </View>
                        </TouchableOpacity>
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
        alignContent: 'stretch',
        paddingTop: 10,
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

