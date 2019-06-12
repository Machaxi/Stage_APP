import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';

export default class AcademyProfile extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }


    render() {
        return (
            <ScrollView style={styles.chartContainer}>

                <View>

                    <Card
                        style={{
                            elevation: 2,

                        }}>
                        <View style={{ marginLeft: 8, marginRight: 8, marginTop: 4 }}>

                            <Image style={{ height: 130, width: "100%", }}
                                source={require('../../images/academy_img.png')}
                            >

                            </Image>

                            <Text style={{ paddingTop: 12, fontSize: 18, color: 'gray' }}> Feather Academy</Text>

                            <View style={{ paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                                <Rating
                                    type='custom'
                                    ratingColor='#F4FC9A'
                                    ratingBackgroundColor='#D7D7D7'
                                    ratingCount={5}
                                    imageSize={14}
                                    style={{ height: 30, width: 80 }}
                                />

                                <Text style={{
                                    backgroundColor: '#D6D6D6', height: 19, width: 30, textAlign: 'center',
                                    fontSize: 12,
                                    paddingTop:2,
                                    color: '#707070',
                                    borderRadius: 12,
                                }}>4.5</Text>

                            </View>


                            <View style={{ flexDirection: 'row', marginBottom: 16 }}>

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

                    <Card
                        style={styles.card_style}>


                        <View style={{ padding: 12 }}>

                            <Text style={{ fontSize: 10, color: '#404040' }}>Founder Corner</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>


                        <View style={{ padding: 12 }}>

                            <Text style={{ fontSize: 10, color: '#404040' }}>Offering</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>


                        <View style={{ padding: 12 }}>

                            <Text style={{ fontSize: 10, color: '#404040' }}>Address</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>

                        <View style={{ padding: 12 }}>

                            <Text style={{ fontSize: 10, color: '#404040' }}>Facilities</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>
                            <Text style={{ fontSize: 14, color: '#404040' }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </Text>
                        </View>

                    </Card>

                    <Card
                        style={styles.card_style}>

                        <View style={{ padding: 12 }}>

                            <Text style={{ fontSize: 10, color: '#404040' }}>Best Player (Badminton)</Text>
                            <View style={{ marginTop: 4, marginBottom: 4, height: 1, width: '100%', backgroundColor: '#dfdfdf' }}></View>

                            <View style={{
                                marginTop: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                <Image style={{ height: 170, width: 130, alignContent: 'center', justifyContent: 'center', textAlign: 'center' }}
                                    source={require('../../images/best_player_temp.png')}
                                >
                                </Image>
                            </View>
                        </View>

                    </Card>

                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => {
                            this.props.navigation.navigate('PlayersListing')
                        }}
                    >
                        <Card
                            style={styles.card_style}>

                            <View style={{ padding: 16, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, color: '#404040', width: '90%' }}>View Other Players</Text>
                                <Image
                                    style={{ width: 19, height: 13, }}
                                    source={require('../../images/path.png')}
                                ></Image>
                            </View>

                        </Card>
                    </TouchableOpacity>


                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => {
                            this.props.navigation.navigate('CoachListing')
                        }}
                    >

                        <Card
                            style={styles.card_style}>

                            <View style={{ padding: 16, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, color: '#404040', width: '90%' }}>View Coaches</Text>
                                <Image
                                    style={{ width: 19, height: 13, }}
                                    source={require('../../images/path.png')}
                                ></Image>
                            </View>

                        </Card>
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', marginBottom: 16, justifyContent: 'center' }}>

                        <Text
                            style={styles.filled_button}
                        >
                            Give Feedback
                                </Text>

                    </View>


                </View>
            </ScrollView>

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
        backgroundColor:'#67BAF5',
        color: 'white', textAlign: 'center'
    },
    filled_button: {
        width: '90%',
        padding: 12,
        borderRadius: 22,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 16,
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
    },
    card_style: {
        elevation: 1,
        borderRadius: 10,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 6,
        marginBottom: 6
    }
});

