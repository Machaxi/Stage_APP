import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import BaseComponent, { defaultStyle } from '../BaseComponent';

export default class EditScore extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            previousRound: null,
            alert: ''
        }

        this.state.previousRound = this.props.previousRound

    }

    render() {

        let player1 = this.props.player1
        let player2 = this.props.player2
        let alert = this.state.alert
        this.state.previousRound = this.props.previousRound
        let previousRound = this.state.previousRound

        console.warn('Element->EditScore ', JSON.stringify(previousRound))
        //console.warn('visible ', this.props.visible)

        return (
            <Dialog
                width={300}
                visible={this.props.visible}
                dialogStyle={{ borderRadius: 0, padding: 16, aspectRatio: 1 }}
                onTouchOutside={() => {
                    this.props.touchOutside(null);
                }}
            >

                {previousRound != null ?
                    <DialogContent style={styles.contentContainer}>

                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                borderRadius: 16,
                                backgroundColor: 'white',
                                width: "100%",
                                height: "100%",
                            }}>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={defaultStyle.bold_text_14}></Text>

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.touchOutside(null);
                                        }} >

                                        <Image
                                            resizeMode="contain"
                                            style={{
                                                height: 30, width: 30,
                                                padding: 8
                                            }} source={require('../../images/ic_close.png')}
                                        />
                                    </TouchableOpacity>

                                </View>

                                <Text style={[defaultStyle.bold_text_14, {
                                    marginTop: 16,
                                    justifyContent: 'center'
                                }]}>Edit Score for Round {previousRound.round} </Text>


                                <View style={{
                                    flex: 1, flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: 15,
                                }} >

                                    <Text style={[defaultStyle.regular_text_14,
                                    { marginRight: 12 }]}>
                                        {player1.name}</Text>

                                    <TextInput style={styles.formInput}
                                        placeholder="Score"
                                        keyboardType={'number-pad'}
                                        onChangeText={(text) => {
                                            if (+text > 21) {
                                                this.setState({
                                                    alert: 'score must be less than or equal to 21'
                                                })
                                            } else {
                                                previousRound.player1_score = text
                                                this.setState({
                                                    previousRound: previousRound
                                                })
                                            }
                                        }
                                        }
                                        value={previousRound.player1_score + ""}
                                    />

                                </View>

                                <View style={{
                                    flex: 1, flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: 15,
                                    marginBottom: 18,
                                }} >

                                    <Text style={[defaultStyle.regular_text_14,
                                    { marginRight: 12 }]}>
                                        {player2.name}</Text>

                                    <TextInput style={styles.formInput}
                                        placeholder="Score"
                                        keyboardType={'number-pad'}
                                        onChangeText={(text) => {
                                            if (+text > 21) {
                                                this.setState({
                                                    alert: 'score must be less than or equal to 21'
                                                })
                                            } else {
                                                previousRound.player2_score = text
                                                this.setState({
                                                    previousRound: previousRound
                                                })
                                            }

                                        }}
                                        value={previousRound.player2_score + ""}
                                    />

                                </View>


                                <Text style={[defaultStyle.bold_text_12, { color: 'red' }]}>{this.state.alert}</Text>


                                <Text style={[defaultStyle.rounded_button, { marginTop: 16, width: "100%", marginLeft: 0, marginRight: 0 }]}
                                    onPress={() => {
                                        let previousRound = this.state.previousRound
                                        if (previousRound.player1_score == '') {
                                            previousRound.player1_score = 0
                                        }
                                        if (previousRound.player2_score == '') {
                                            previousRound.player2_score = 0
                                        }
                                        if (+previousRound.player1_score <= 21 && +previousRound.player2_score <= 21) {
                                            this.props.touchOutside(previousRound)
                                        }

                                    }}>Save</Text>

                            </View>

                        </View>


                    </DialogContent>
                    : null}
            </Dialog>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
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
    },
    formInput: {
        backgroundColor: 'white',
        fontFamily: 'Quicksand-Regular',
        borderColor: '#A3A5AE',
        borderRadius: 4,
        fontSize: 14,
        borderWidth: 1,
        height: 40,
        width: '45%',
        color: '#404040',
    },
})

