import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { ScrollView } from 'react-native-gesture-handler';
import Moment from 'moment';


export default class UpcomingTournamentDetail extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
        this.state.data = this.props.navigation.getParam('data');
    }



    render() {

        let data = this.state.data

        return (

            <ScrollView>

                <View style={styles.chartContainer}>

                    <Card
                        style={{
                            elevation: 2
                        }}>
                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 2 }}>
                            <Image style={{ height: 150, width: "100%" }}
                                source={{ uri: data.cover_pic }}
                            />


                            <View style={{
                                marginLeft: 6,
                                marginRight: 6,
                                marginBottom: 12
                            }}>

                                <View style={{
                                    paddingTop: 12, paddingRight: 12,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>

                                    <Text style={defaultStyle.bold_text_14}>
                                        {data.name}
                                    </Text>

                                    <Image
                                        style={{ width: 16, height: 18, marginRight: 8 }}
                                        source={require('../../images/share.png')}
                                    >

                                    </Image>

                                </View>


                                <View style={{ paddingTop: 8, flexDirection: 'row' }}>

                                    <Text style={defaultStyle.bold_text_14}>
                                        {Moment(data.start_date).format('MMM YYYY')}
                                    </Text>

                                    <Text style={defaultStyle.blue_rounded_4}>Inter-Academy</Text>

                                </View>

                                <Text style={{
                                    paddingTop: 6,
                                    fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Dates
                                    <Text style={defaultStyle.bold_text_14}>
                                        {" " + Moment(data.start_date).format('DD') + " - " + Moment(data.end_date).format('DD MMM')}
                                    </Text>
                                </Text>

                                <Text style={[defaultStyle.regular_text_14, { paddingTop: 6 }]}>
                                    Last Date of Registration
                                    <Text style={defaultStyle.bold_text_14}>
                                        {" " + Moment(data.registration_last_date).format('DD MMM YYYY')}</Text>
                                </Text>


                                <View style={defaultStyle.line_style}></View>

                                <View style={{ marginBottom: 8, marginRight: 12 }}>


                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text style={{
                                            fontSize: 10,
                                            color: '#A3A5AE',
                                            width: "33.33%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Registration Fees
                        </Text>

                                        <Text style={{
                                            fontSize: 10,
                                            color: '#A3A5AE',
                                            width: "33.33%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Category
                        </Text>

                                        <Text style={{
                                            fontSize: 10,
                                            color: '#A3A5AE',
                                            width: "33.33%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Gender
                        </Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text style={{
                                            paddingTop: 10, fontSize: 14,
                                            color: '#404040',
                                            width: "33.33%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Rs. 500/-
                                    </Text>
                                        <Text style={{
                                            paddingTop: 10, fontSize: 14,
                                            color: '#404040',
                                            width: "33.33%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            U-13
                                    </Text>
                                        <Text style={{
                                            paddingTop: 10, fontSize: 14,
                                            color: '#404040',
                                            width: "33.33%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Male
                                 </Text>

                                    </View>


                                    <View style={{
                                        marginTop: 10,
                                    }}>

                                        <Text style={{
                                            fontSize: 10,
                                            color: '#A3A5AE',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Type
                                    </Text>

                                        <Text style={{
                                            paddingTop: 6, fontSize: 14,
                                            color: '#404040',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Singles, Doubles, Mixed Doubles
                                 </Text>

                                        <Text style={{
                                            paddingTop: 6, fontSize: 14,
                                            color: '#404040',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Total 20 players
                                 </Text>
                                    </View>

                                    <View style={{ marginTop: 12, marginBottom: 12, backgroundColor: '#DFDFDF', height: 1 }}></View>


                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text style={{
                                            fontSize: 10,
                                            color: '#A3A5AE',
                                            width: "50%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Time
</Text>

                                        <Text style={{
                                            fontSize: 10,
                                            color: '#A3A5AE',
                                            width: "50%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Tournament Format
</Text>


                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text style={{
                                            paddingTop: 10, fontSize: 14,
                                            color: '#404040',
                                            width: "50%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            09:30 am Onwards
</Text>
                                        <Text style={{
                                            paddingTop: 10, fontSize: 14,
                                            color: '#404040',
                                            width: "50%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Round Robin
</Text>

                                    </View>



                                    <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 16, marginLeft: 8, marginRight: 8 }}>

                                        <TouchableOpacity activeOpacity={.8}
                                            style={styles.rounded_button_white}
                                            onPress={() => {
                                                this.props.navigation.navigate('Registration')
                                            }}>
                                            <Text
                                                style={{
                                                    color: '#67BAF5',
                                                    textAlign: 'center',
                                                    fontFamily: 'Quicksand-Regular'
                                                }}
                                            >
                                                Close
        </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity activeOpacity={.8}
                                            style={styles.rounded_button}
                                            onPress={() => {
                                                this.props.navigation.navigate('Registration')
                                            }}>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    fontFamily: 'Quicksand-Regular'
                                                }}
                                            >
                                                Register
                                            </Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>

                            </View>

                        </View>
                    </Card>
                </View></ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    rounded_button: {
        width: '48%',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',

    },
    rounded_button_white: {
        width: '48%',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: 'white',
        color: '#67BAF5',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
});

