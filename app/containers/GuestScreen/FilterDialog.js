import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BaseComponent, { defaultStyle } from '../BaseComponent';

export default class FilterDialog extends BaseComponent {

    render() {

        //console.warn('visible ', this.props.visible)

        return (
            <Dialog
                width={270}
                visible={this.props.visible}
                dialogStyle={{ borderRadius: 0, padding: 16, aspectRatio: 1 }}
                onTouchOutside={() => {
                    this.props.touchOutside(undefined, undefined);
                }}
            >
                <DialogContent style={styles.contentContainer}>

                    <Text style={[defaultStyle.heavy_bold_text_14]}>Sort By</Text>
                    <View style={styles.header} />

                    <TouchableOpacity onPress={() => this.props.touchOutside('rating', 'desc')}>
                        <Text style={[defaultStyle.bold_text_14, { padding: 8, }]}>
                            Top Rating
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.header} />

                    <TouchableOpacity onPress={() => this.props.touchOutside('rating', 'asc')}>
                        <Text style={[defaultStyle.bold_text_14, { padding: 8, }]}>
                            Lowest Rating
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.header} />

                    <TouchableOpacity onPress={() => this.props.touchOutside('createdAt', 'desc')}>
                        <Text style={[defaultStyle.bold_text_14, { padding: 8, }]}>
                            Most Recent
                        </Text>
                    </TouchableOpacity>

                    {/* <View style={styles.header} /> */}

                    {/* <TouchableOpacity onPress={() => this.props.touchOutside('createdAt', 'asc')}>
                        <Text style={[defaultStyle.bold_text_14, { padding: 8, }]}>
                            Earlier
                        </Text>
                    </TouchableOpacity> */}

                    

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
        marginTop: 8,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    }
})

