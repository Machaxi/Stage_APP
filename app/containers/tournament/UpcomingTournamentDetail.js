import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle, getFormattedTournamentLevel } from '../BaseComponent'
import { ScrollView } from 'react-native-gesture-handler';
import Moment from 'moment';
import { storeData, isSignedIn, getData } from '../../components/auth';
import Share from 'react-native-share';


export default class UpcomingTournamentDetail extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            signedIn: false
        }
        this.state.data = this.props.navigation.getParam('data');
        storeData("detail", JSON.stringify(this.state.data))



    }

    register() {
        this.props.navigation.navigate('RegistrationSteps')
    }

    getMinimum(tournament_types) {

        let minimumAmount = +tournament_types[0].fees
        for (let i = 0; i < tournament_types.length; i++) {
            if (+tournament_types[i].fees < minimumAmount) {
                minimumAmount = +tournament_types[i].fees
            }
        }
        return minimumAmount
    }

    tournament_types(tournament_types) {

        let str = ''
        for (let i = 0; i < tournament_types.length; i++) {
            let tournament_type = tournament_types[i].tournament_type
            str = str + getFormattedTournamentLevel(tournament_type) + ", "
        }

        return str.substring(0, str.length - 2);
    }

    shareLink(url) {
        const shareOptions = {
            title: 'Share via',
            message: 'I\'m using dribble diary app.',
            url: url,
            //social: Share.Social.WHATSAPP,
            //whatsAppNumber: "9199999999"  // country code + phone number(currently only works on Android)
        };
        Share.open(shareOptions).catch(err => console.log(err))


        //Share.shareSingle(shareOptions);
    }

    render() {

        let data = this.state.data
        let minimumAmount = this.getMinimum(data.tournament_types)
        let tournament_types = this.tournament_types(data.tournament_types)
        let tournament_link = data.tournament_link

        return (

            <View>

                <ScrollView
                    style={{
                        flex: 0
                    }}
                >

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

                                        {tournament_link != undefined ?

                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.shareLink(tournament_link)
                                                }}
                                            >

                                                <Image
                                                    resizeMode="contain"
                                                    style={{ width: 16, height: 18, marginRight: 8 }}
                                                    source={require('../../images/share.png')}
                                                /></TouchableOpacity>
                                            : null
                                        }


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

                                    <Text style={[defaultStyle.regular_text_14,
                                    { paddingTop: 6, color: '#FF7373' }]}>
                                        Last Date of Registration
                                    <Text style={defaultStyle.bold_text_14}>
                                            {" " + Moment(data.registration_last_date).format('DD MMM YYYY')}</Text>
                                    </Text>


                                    <View style={defaultStyle.line_style}></View>

                                    <View style={{ marginBottom: 8, marginRight: 12 }}>


                                        <View>

                                            <Text style={{
                                                fontSize: 10,
                                                color: '#A3A5AE',
                                                fontFamily: 'Quicksand-Regular'
                                            }}>
                                                Registration Fees
                                            </Text>

                                            <Text style={{
                                                paddingTop: 6, fontSize: 14,
                                                color: '#404040',
                                                width: "33.33%",
                                                fontFamily: 'Quicksand-Regular'
                                            }}>Rs. {minimumAmount} Onwards</Text>

                                        </View>

                                        <View style={{
                                            marginTop: 12
                                        }}>

                                            <Text style={{
                                                fontSize: 10,
                                                color: '#A3A5AE',
                                                fontFamily: 'Quicksand-Regular'
                                            }}>
                                                Category
                                            </Text>

                                            <Text style={{
                                                paddingTop: 6, fontSize: 14,
                                                color: '#404040',
                                                width: "33.33%",
                                                fontFamily: 'Quicksand-Regular'
                                            }}>{data.category_types.join()}</Text>

                                        </View>

                                        <View style={{
                                            marginTop: 12
                                        }}>

                                            <Text style={{
                                                fontSize: 10,
                                                color: '#A3A5AE',
                                                fontFamily: 'Quicksand-Regular'
                                            }}>
                                                Gender
                                            </Text>

                                            <Text style={{
                                                paddingTop: 6, fontSize: 14,
                                                color: '#404040',
                                                width: "33.33%",
                                                fontFamily: 'Quicksand-Regular'
                                            }}>{data.genderType}</Text>

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
                                            }}>{tournament_types}</Text>

                                            <Text style={{
                                                paddingTop: 12, fontSize: 14,
                                                color: '#404040',
                                                fontFamily: 'Quicksand-Regular'
                                            }}>
                                                Total <Text style={defaultStyle.bold_text_14}>{data.max_registration} players</Text>
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
                                            }}>{Moment(data.start_time, "HH:mm:ss").format("hh:mm a")}</Text>
                                            <Text style={{
                                                paddingTop: 10, fontSize: 14,
                                                color: '#404040',
                                                width: "50%",
                                                fontFamily: 'Quicksand-Regular'
                                            }}>{data.tournament_format}</Text>

                                        </View>

                                    </View>

                                    <View style={{
                                        marginTop: 10,
                                    }}>

                                        <Text style={{
                                            fontSize: 10,
                                            color: '#A3A5AE',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Venue
                                    </Text>

                                        <Text style={{
                                            paddingTop: 6, fontSize: 14,
                                            color: '#404040',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>{data.address}</Text>


                                        <TouchableOpacity
                                            onPress={() => {
                                                console.warn('terms')
                                            }}
                                        >

                                            <Text style={{
                                                paddingTop: 16,
                                                paddingBottom: 10,
                                                fontSize: 10,
                                                color: '#667DDB',
                                                fontFamily: 'Quicksand-Regular'
                                            }}>
                                                Terms and Conditions
                                        </Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>

                            </View>
                        </Card>
                    </View>

                </ScrollView>

                {/* <View style={{
                    elevation: 4
                }}>
                    <View style={defaultStyle.line_style}></View>
                    <View style={{

                        flexDirection: 'row',
                        //marginLeft: 16,
                        //marginRight: 16,
                        //marginTop: 24,
                        //marginBottom: 24,
                        elevation: 4
                    }}>

                        <TouchableOpacity activeOpacity={.8}
                            style={styles.rounded_button_white}
                            onPress={() => {
                                this.props.navigation.goBack()
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
                                this.register();

                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontFamily: 'Quicksand-Regular'
                                }}
                            >Register</Text>
                        </TouchableOpacity>

                    </View>
                </View> */}

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

