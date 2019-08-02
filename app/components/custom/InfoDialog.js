import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BaseComponent, { defaultStyle } from '../../containers/BaseComponent';

export default class InfoDialog extends BaseComponent {

    render() {

        let message = this.props.message


        return (
            <Dialog
                width={300}
                height={200}
                visible={this.props.visible}
                dialogStyle={{ borderRadius: 12, }}
                onTouchOutside={() => {
                    this.props.touchOutside();
                }}
            >
                <DialogContent style={styles.contentContainer}>

                    <Text style={[defaultStyle.bold_text_14, {
                        padding: 16,
                    }]}>Oops</Text>
                    <View style={styles.header}></View>

                    <Text style={[defaultStyle.regular_text_14, { padding: 8, marginBottom: 20 }]}>
                        {message}
                    </Text>




                    <TouchableOpacity
                        onPress={() => {
                            this.props.touchOutside();
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View style={{width:"100%"}}>
                            <Text style={[defaultStyle.bold_text_14, {
                                width: "100%",
                                marginTop:20,
                            }]}>OK</Text>
                        </View>
                    </TouchableOpacity>

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

