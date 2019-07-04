import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'


export default class UpcomingRoute extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            data: ["", "", ""],
            query: '',
        }
    }


    find(query) {
        if (query === '') {
            return [];
        }
        const { suggestionResult } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log('regex ', regex)
        return suggestionResult.filter(item => item.name.search(regex) >= 0);
    }

    listHeader() {

        return (
            <View
                style={{
                    marginLeft: 16,
                    marginRight: 16,
                    marginTop: 16,
                    marginBottom: 8,
                    borderRadius: 12
                }}>
                <Card style={{ borderRadius: 16, elevation: 1 }}>

                    <TextInput style={{
                        marginLeft: 8,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        fontFamily: 'Quicksand-Regular'
                    }} placeholder="Search"></TextInput>


                </Card>

                <Text style={{
                    marginTop: 8, marginBottom: 4,
                    textAlign: 'right',
                    color: '#404040', fontSize: 12,
                    fontFamily: 'Quicksand-Regular'
                }} >Filter</Text>

                <View style={{ width: '100%', height: 1, backgroundColor: '#d7d7d7' }}></View>
            </View>
        )
    }
    _renderItem = ({ item }) => (

        <TouchableOpacity activeOpacity={.8}
            onPress={() => {
                this.props.navigation.navigate('ResultsTournamentDetail')
            }}>

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
                    <Image style={{ height: 150, width: "100%", borderRadius: 16, }}
                        source={require('../../images/tournament_banner.png')}
                    >

                    </Image>

                    <View style={{
                        paddingLeft: 16,
                        paddingTop: 8,
                        paddingBottom: 8
                    }}>


                        <View style={{
                            paddingTop: 12, paddingRight: 12,
                            flexDirection: 'row', flex: 1, justifyContent: 'space-between'
                        }}>

                            <Text style={defaultStyle.bold_text_14}>
                                Feather Academy Tournament
                    </Text>

                            <Image
                                style={{ width: 5, height: 12, }}
                                source={require('../../images/forward.png')}
                            >

                            </Image>

                        </View>


                        <View style={{ paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                            <Text style={defaultStyle.bold_text_14}>
                                May 2019
                    </Text>

                            <Text style={defaultStyle.blue_rounded_4}>Inter-Academy</Text>

                        </View>

                        <Text style={{
                            paddingTop: 6, 
                            fontSize: 14,
                            color: '#404040',
                            fontFamily: 'Quicksand-Regular'
                        }}>
                            Dates <Text style={defaultStyle.bold_text_14}>05 May 19</Text>
                        </Text>

                        <View style={{ marginTop: 8, marginBottom: 8, backgroundColor: '#DFDFDF', height: 1 }}></View>

                        <View style={{ marginBottom: 8, marginRight: 12 }}>


                            <Text style={{
                                fontSize: 10,
                                color: '#A3A5AE',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                Winner Singles
                        </Text>

                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

                                <Text style={{
                                    paddingTop: 10, 
                                    fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Prithiviraj
                    </Text>
                                <Text style={{
                                    paddingTop: 10, 
                                    fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    1st
                    </Text>
                                <Text style={{
                                    paddingTop: 10, 
                                    fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Feather Academy
                    </Text>

                            </View>
                        </View>

                        <View style={{ marginBottom: 8, marginRight: 12, marginTop: 4 }}>


                            <Text style={{
                                fontSize: 10,
                                color: '#A3A5AE',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                                Winner Doubles
                        </Text>

                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

                                <Text style={{
                                    paddingTop: 10, fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Prithiviraj
                    </Text>
                                <Text style={{
                                    paddingTop: 10, fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    1st
                    </Text>
                                <Text style={{
                                    paddingTop: 10, fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Feather Academy
                    </Text>

                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

                                <Text style={{
                                    paddingTop: 10, fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Prithiviraj
                                </Text>
                                <Text style={{
                                    paddingTop: 10, fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>

                                </Text>
                                <Text style={{
                                    paddingTop: 10, 
                                    fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Feather Academy
                             </Text>

                            </View>

                            <TouchableOpacity activeOpacity={.8}
                                onPress={() => {
                                    this.props.navigation.navigate('TournamentFixture')
                                }}
                            >

                                <View style={{
                                    width: '100%',
                                    marginTop: 12,
                                    marginBottom: 8,
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                    <Text style={defaultStyle.rounded_button_150}>
                                        View Fixtures
                                </Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>


                </View>

            </Card>
        </TouchableOpacity>

    );

    render() {

        // if (this.props.data.loading && !this.state.isAutoSuggest) {
        //     return (
        //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //             <ActivityIndicator size="large" color="#67BAF5" />
        //         </View>
        //     )
        // }

        return (

            <View style={styles.chartContainer}>

                <FlatList
                    ListHeaderComponent={() => this.listHeader()}
                    data={this.state.data}
                    extraData={this.state.data}
                    renderItem={this._renderItem}
                />

            </View>
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
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular'
    },
});

