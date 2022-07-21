import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BaseComponent, { defaultStyle } from '../../containers/BaseComponent';

export default class InfoMessage extends BaseComponent {

    render() {

        let message = this.props.message


        return (
            <Dialog
                width={330}
                height={130}
                visible={this.props.visible}
                dialogStyle={{ borderRadius: 12, }}
                onTouchOutside={() => {
                    this.props.touchOutside();
                }}
            >
                <DialogContent style={styles.contentContainer}>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.touchOutside();
                        }}
                        style={{
                            textAlign: 'right'
                        }}>
                        <Image
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                marginLeft: 280
                            }}
                            source={require('../../images/ic_close.png')}
                        />
                    </TouchableOpacity>

                    <Text style={[defaultStyle.regular_text_14, { padding: 8 }]}>
                        {message}
                    </Text>

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

