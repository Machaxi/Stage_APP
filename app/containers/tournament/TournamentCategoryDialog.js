import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BaseComponent, { defaultStyle } from '../BaseComponent';

class TournamentCategoryDialog extends BaseComponent {

    render() {

        let array = this.props.tournament_fixture
        console.log('Array=> ', JSON.stringify(array))
        let view_array = []
        for (let i = 0; i < array.length; i++) {
            let obj = array[i]
            view_array.push(
                <View>
                    <TouchableOpacity onPress={() => 
                        this.props.touchOutside(obj.id)}>
                        <Text style={[defaultStyle.bold_text_14, { padding: 8, }]}>
                            {obj.name}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.header} />
                </View>
            )
        }

        return (
            <Dialog
                width={250}
                visible={this.props.visible}
                dialogStyle={{ borderRadius: 0, padding: 16, aspectRatio: 1 }}
                onTouchOutside={() => {
                    this.props.touchOutside();
                }}
            >
                <DialogContent style={styles.contentContainer}>

                    <Text style={[defaultStyle.heavy_bold_text_14]}>SELECT TYPE</Text>
                    <View style={styles.header} />

                    {view_array}

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
        width: 200
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

export default TournamentCategoryDialog;