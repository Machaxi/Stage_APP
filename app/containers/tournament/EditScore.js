import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Picker } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import RNPickerSelect from 'react-native-picker-select'
import BaseComponent, { defaultStyle } from '../BaseComponent';

const placeholder = {
    label: 'Select',
    value: null,
    color: '#9EA0A4',
};

export default class EditScore extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            previousRound: this.props.previousRound,
            // previousRound: null,
            alert: '',
            winner: '',
        }

        const { player1, player2 } = this.props
        let selectWinner = [
            { label: player1.name, value: player1.id }, { label: player2.name, value: player2.id }
        ]
        this.selectWinner = [...selectWinner]
        console.log('inside constuctor')
        // this.state.previousRound = this.props.previousRound
    }

    componentDidMount() {
        const { match_score, edit_index } = this.props
        this.setState({winner: match_score[edit_index]['winner_id']})
    }

    setWinner(winner_id){
        console.log('in set winner');
        this.setState({winner: winner_id})
    }

    isFloat = (n) =>{
        console.log('number is', typeof n)
        return Number(n) === n && n % 1 !== 0;
    }

    render() {
        console.log('selectWinner', this.props)
        let player1 = this.props.player1
        let player2 = this.props.player2
        console.log('player1', player1)
        console.log('player2', player2)
        let alert = this.state.alert
        // this.state.previousRound = this.props.previousRound
        let previousRound = this.state.previousRound

        console.warn('Element->EditScore ', JSON.stringify(previousRound))
        //console.warn('visible ', this.props.visible)

        return (
            <Dialog
                width={300}
                height={350}
                visible={this.props.visible}
                dialogStyle={{ borderRadius: 0, padding: 16 }}
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
                                    marginTop: 10,
                                    justifyContent: 'center'
                                }]}>Edit Score for Set {previousRound.round} </Text>


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
                                            if (this.isFloat(+text)) {
                                                this.setState({
                                                    alert: 'score must be in integers'
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
                                }} >

                                    <Text style={[defaultStyle.regular_text_14,
                                    { marginRight: 12 }]}>
                                        {player2.name}</Text>

                                    <TextInput style={styles.formInput}
                                        placeholder="Score"
                                        keyboardType={'number-pad'}
                                        onChangeText={(text) => {
                                            if (this.isFloat(+text)) {
                                                this.setState({
                                                    alert: 'score must be in integers'
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

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: 15,
                                    marginBottom: 10,
                                }}>
                                    <Text style={[defaultStyle.regular_text_14,
                                    { marginRight: 12 }]}>
                                        Winner</Text>
                                    {/* <Picker selectedValue={this.state.winner} onValueChange={(value)=>this.setWinner(value)}>
                                        <Picker.Item label='ajkfja'  value='klfk' />
                                        <Picker.Item label='klfka'  value='kflakf' />
                                    </Picker> */}
                                    <View>
                                    <RNPickerSelect
                                        placeholder={placeholder}
                                        items={this.selectWinner}
                                        onValueChange={(value) => {this.setWinner(value)}}
                                        style={pickerSelectStyles}
                                        value={this.state.winner}
                                        useNativeAndroidPickerStyle={false}
                                    />
                                    </View>
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
                                            this.props.touchOutside(previousRound, this.state.winner)
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
        flexDirection: 'column',
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        //paddingVertical: 12,
        //paddingHorizontal: 10,
        borderColor: '#D3D3D3',
        borderRadius: 4,
        color: 'black',
        width: 200,
        height: 40,
        marginBottom: 4,
        fontFamily: 'Quicksand-Regular',
        // to ensure the text is never behind the icon
    },
    inputAndroid: {
        height: 40,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontFamily: 'Quicksand-Regular',
        // borderColor: '#614051',
        borderRadius: 8,
        color: 'black',
        textAlign: 'left'
    },
});