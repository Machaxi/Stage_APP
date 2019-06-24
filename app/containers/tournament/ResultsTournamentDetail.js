import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent from '../BaseComponent'
import { ScrollView } from 'react-native-gesture-handler';


export default class ResultsTournamentDetail extends BaseComponent {

    constructor(props) {
        super(props)

    }


    render() {

        // if (this.props.data.loading && !this.state.isAutoSuggest) {
        //     return (
        //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //             <ActivityIndicator size="large" color="#67BAF5" />
        //         </View>
        //     )
        // }

        return (

            <ScrollView>

                <View style={styles.chartContainer}>

                    <Card
                        style={{
                            elevation: 2
                        }}>
                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 2 }}>
                            <Image style={{ height: 150, width: "100%" }}
                                source={require('../../images/tournament_banner.png')}
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

                                    <Text style={{
                                        fontSize: 14,
                                        color: '#404040',
                                        fontFamily: 'Quicksand-Regular'
                                    }}>
                                        Feather Academy Tournament
                    </Text>

                                    <Image
                                        style={{ width: 16, height: 18, marginRight: 8 }}
                                        source={require('../../images/share.png')}
                                    >

                                    </Image>

                                </View>


                                <View style={{ paddingTop: 8, flexDirection: 'row' }}>

                                    <Text style={{
                                        fontSize: 14,
                                        color: '#404040',
                                        fontFamily: 'Quicksand-Regular'
                                    }}>
                                        May 2019
                    </Text>

                                    <Text style={{
                                        backgroundColor: '#667DDB',
                                        textAlign: 'center',
                                        fontSize: 12,
                                        marginLeft: 8,
                                        color: 'white',
                                        borderRadius: 4,
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        fontFamily: 'Quicksand-Regular'
                                    }}>Inter-Academy</Text>

                                </View>

                                <Text style={{
                                    paddingTop: 6, fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Dates <Text style={{ color: '#404040' }}>05 May 19</Text>
                                </Text>


                                <Text style={{
                                    paddingTop: 15, fontSize: 14,
                                    color: '#404040',
                                    fontWeight: '400',
                                    fontFamily: 'Quicksand-Bold'
                                }}>
                                    Fixtures
                                </Text>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 12,

                                }}>

                                    <Text style={{
                                        width: '30%',
                                        fontSize: 10,
                                        color: '#A3A5AE',
                                        fontFamily: 'Quicksand-Regular'
                                    }}>
                                        Select Category
                                    </Text>

                                    <Text style={{
                                        width: '30%',
                                        fontSize: 10,
                                        color: '#A3A5AE',
                                        fontFamily: 'Quicksand-Regular'
                                    }}>
                                        Gender
                                    </Text>

                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 4,
                                }}>

                                    <Text style={{
                                        width: '30%',
                                        paddingTop: 6,
                                        fontSize: 14,
                                        color: '#404040',
                                        fontFamily: 'Quicksand-Regular'
                                    }}>
                                        U-10
                                 </Text>

                                    <Text style={{
                                        width: '30%',
                                        paddingTop: 6,
                                        fontSize: 14,
                                        color: '#404040',
                                        fontFamily: 'Quicksand-Regular'
                                    }}>
                                        Males
                                 </Text>

                                </View>

                                <View style={{ marginTop: 12, marginBottom: 8, backgroundColor: '#DFDFDF', height: 1 }}></View>

                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 16 }}>

                                <Card style={styles.card_style}>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>

                                        <Image
                                            style={{ width: 18, height: 48, marginLeft: 16 }}
                                            source={require('../../images/single_man.png')}
                                        />

                                        <Text style={{
                                            fontSize: 14,
                                            color: '#404040',
                                            marginLeft: 12,
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Singles
                                 </Text>
                                    </View>
                                </Card>


                                <Card style={styles.card_style}>

                                    <View style={{ flexDirection: 'row', textAlign: 'center', alignItems: 'center' }}>

                                        <Image
                                            style={{
                                                width: 18, height: 48, marginLeft: 16
                                            }}
                                            source={require('../../images/single_man.png')}
                                        />

                                        <Text style={{
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontSize: 14,
                                            marginLeft: 12,
                                            color: '#404040',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Singles
                                        </Text>
                                    </View>
                                </Card>


                            </View>

                        </View>
                    </Card>
                </View></ScrollView >
        );
    }
}


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    card_style: {
        width: "48%",
        paddingTop: 8,
        paddingBottom: 8,
        elevation: 2,
        marginRight: 4,
        borderRadius: 16
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
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
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

