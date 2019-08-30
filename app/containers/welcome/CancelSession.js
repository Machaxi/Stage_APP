import React from 'react'

import { View, ImageBackground, Text, Image, TextInput } from 'react-native'
import { Button } from 'react-native-paper';
import BaseComponent, { defaultStyle } from '../BaseComponent';
import firebase from "react-native-firebase";
import { onSignOut } from "../../components/auth";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
//import firebase from 'react-native-firebase';

class CancelSession extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            is_single_day: true
        }
    }

    getBatchItem(item) {
        return (
            <View style={{
                padding: 16,
                backgroundColor: 'white',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text
                    style={[defaultStyle.regular_text_14, { width: '33%', color: '#000000' }]}>
                    Batch 1
                    </Text>
                <Text
                    style={[defaultStyle.regular_text_14, { width: '33%', color: '#000000' }]}>
                    UG-13
                    </Text>

                <CheckBox
                    containerStyle={{
                        backgroundColor: 'white',
                        borderWidth: 0,
                        padding: 0,
                        margin: 0,
                        width: '33%'
                        //width: "60%",
                    }}
                    checked={false}
                    onPress={() => {

                    }}
                    style={{
                        color: '#404040',
                        backgroundColor: 'white',
                        fontFamily: 'Quicksand-Regular'
                    }}

                />

            </View>
        )
    }

    render() {


        let is_single_day = this.state.is_single_day
        let batch_array = []
        for (let i = 0; i < 6; i++) {
            batch_array.push(this.getBatchItem(null))
        }

        return (
            <ScrollView
                style={style.container}
            >

                <View

                >
                    <View
                        style={{
                            padding: 16
                        }}
                    >
                        <Text
                            style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}
                        >Select Date/ Date Range</Text>


                        <View style={{
                            marginTop: 8,
                            flexDirection: 'row'
                        }} >
                            <View style={{
                                flexDirection: 'row'
                            }} >

                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.setState({
                                            is_single_day: true
                                        })
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        style={{
                                            width: 16,
                                            height: 16,
                                            marginRight: 8
                                        }}
                                        source={
                                            is_single_day ? require('../../images/ic_radio_button_checked.png')
                                                : require('../../images/ic_radio_button_unchecked.png')
                                        } />
                                    <Text style={defaultStyle.regular_text_14}>Single day</Text>
                                </TouchableOpacity>


                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginLeft: 20
                            }} >

                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        this.setState({
                                            is_single_day: false
                                        })
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        style={{
                                            width: 16,
                                            height: 16,
                                            marginRight: 8
                                        }}
                                        source={
                                            !is_single_day ? require('../../images/ic_radio_button_checked.png')
                                                : require('../../images/ic_radio_button_unchecked.png')
                                        } />
                                    <Text style={defaultStyle.regular_text_14}>Range</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 25,
                            }}
                        >

                            <View
                                style={{ marginRight: 30 }}
                            >
                                <Text
                                    style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}
                                >Choose date</Text>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>

                                    <View>

                                        <Text style={[defaultStyle.bold_text_14, { width: 100 }]}>
                                            25 Oct ’19
                                    </Text>

                                    </View>

                                    <Image
                                        style={{ width: 8, height: 5 }}
                                        source={require('../../images/ic_down_arrow.png')} />
                                </View>
                                <View
                                    style={{
                                        width: 110,
                                        marginTop: 2,
                                        backgroundColor: '#A3A5AE',
                                        flex: 1,
                                        height: 1
                                    }}
                                ></View>

                            </View>

                            <View>

                                <Text
                                    style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}
                                >End date</Text>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>

                                    <View>

                                        <Text style={[defaultStyle.bold_text_14, { width: 100 }]}>
                                            25 Oct ’19
                                    </Text>

                                    </View>

                                    <Image
                                        style={{ width: 8, height: 5 }}
                                        source={require('../../images/ic_down_arrow.png')} />
                                </View>
                                <View
                                    style={{
                                        width: 110,
                                        marginTop: 2,
                                        backgroundColor: '#A3A5AE',
                                        flex: 1,
                                        height: 1
                                    }}
                                ></View>

                            </View>

                        </View>

                        <Text
                            style={[defaultStyle.bold_text_10, { marginTop: 30, color: '#A3A5AE' }]}
                        >Reason For cancellation</Text>

                        <TextInput
                            style={{
                                textAlignVertical: 'top',
                                marginTop: 12,
                                height: 100,
                                borderColor: '#CECECE',
                                borderWidth: 1,
                                borderRadius: 8
                            }}
                        >
                        </TextInput>

                        <Text
                            style={[defaultStyle.bold_text_14, { marginTop: 16 }]}
                        >Select batch</Text>

                        <View style={{ marginTop: 8, justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text
                                style={[defaultStyle.bold_text_10, { color: '#A3A5AE' }]}
                            >4 batch has sessions on this day</Text>

                            <TouchableOpacity>
                                <Text
                                    style={[defaultStyle.bold_text_10, { color: '#667DDB' }]}
                                >Select All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        marginTop: 10,
                        padding: 16,
                        backgroundColor: '#DCDEE7',
                        justifyContent: 'space-between',
                        flexDirection: 'row',

                    }}>
                        <Text
                            style={[defaultStyle.bold_text_10, {
                                width: "33%", color: '#A3A5AE',
                                alignContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1
                            }]}>
                            Batch name
                            </Text>
                        <Text
                            style={[defaultStyle.bold_text_10, {
                                width: "33%", color: '#A3A5AE'
                            }]}>
                            Type
                            </Text>
                        <Text
                            style={[defaultStyle.bold_text_10, {
                                width: "33%",
                                color: '#A3A5AE'
                            }]}>
                            Cancel
                            </Text>

                    </View>

                    {batch_array}


                    <TouchableOpacity activeOpacity={.8}
                        style={style.rounded_button}
                        onPress={() => {

                        }}>
                        <Text style={style.rounded_button_text}>
                            Cancel session</Text>
                    </TouchableOpacity>



                </View>


            </ScrollView >
        );
    }
}
export default CancelSession

const style = {
    container: {
        backgroundColor: 'white'
    },
    rounded_button_text: {
        width: "100%",
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
    },
    rounded_button: {
        width: '90%',
        padding: 12,
        borderRadius: 24,
        //borderWidth: 1,
        margin: 20,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
}