import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import { getAllAcademy, search, search_auto_suggest } from '../../redux/reducers/AcademyReducer'
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios'
import BaseComponent from '../BaseComponent'

export default class WriteFeedback extends BaseComponent {

    constructor(props) {
        super(props)
    }


    render() {

        return (

            <View style={styles.chartContainer}>

                <Card
                    style={{
                        borderRadius: 16,
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 8,
                        marginBottom: 8,
                        elevation: 2

                    }}>
                    <View>
                        
                        <Text style={{
                            paddingTop: 12, paddingLeft: 12, fontSize: 16,
                            color: '#707070',
                            fontFamily: 'Quicksand-Regular'
                        }}>
                            Name
                            </Text>

                        <View style={{ paddingLeft: 12, paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                            <Rating
                                type='custom'
                                ratingColor='#F4FC9A'
                                ratingBackgroundColor='#D7D7D7'
                                ratingCount={5}
                                imageSize={14}
                                readonly={true}
                                startingValue={item.ratings}
                                style={{ height: 30, width: 80 }}
                            />

                            <Text style={{
                                backgroundColor: '#DFDFDF', height: 19, width: 30, textAlign: 'center',
                                fontSize: 12,
                                color: '#707070',
                                paddingTop: 2,
                                borderRadius: 12,
                                fontFamily: 'Quicksand-Regular'
                            }}>5</Text>

                        </View>

                        <View style={{ flexDirection: 'row', margin: 8 }}>

                            <Text
                                style={styles.rounded_button}
                            >
                                View Batches
                                </Text>
                            <Text
                                style={styles.rounded_button}
                            >
                                Book Court
                                </Text>

                        </View>

                    </View>

                </Card>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
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
});

