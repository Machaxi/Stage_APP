import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Card, } from 'react-native-paper';
import BaseComponent, { defaultStyle, getFormattedTournamentType, getFormattedTournamentLevel } from '../BaseComponent'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'moment';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';
import { Linking } from 'react-native'
import Share from 'react-native-share';


export default class RegisteredTournamentDetail extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: {},

        }
        this.state.data = JSON.parse(this.props.navigation.getParam('data'));

    }

    tournament_types(tournament_types) {

        let str = ''
        for (let i = 0; i < tournament_types.length; i++) {
            let tournament_type = tournament_types[i].tournament_type
            str = str + getFormattedTournamentLevel(tournament_type) + ", "
        }

        return str.substring(0, str.length - 2);
    }

    phoneNumberClicked(phoneNumber) {
        Linking.openURL(`tel:${phoneNumber}`)

    }

    shareLink(url) {
        const shareOptions = {
            title: 'Share via',
            message: 'I\'m using dribble diary app.',
            url: url,
            //social: Share.Social.WHATSAPP,
            //whatsAppNumber: "9199999999"  // country code + phone number(currently only works on Android)
        };
        Share.shareSingle(shareOptions);
    }

    render() {


        let data = this.state.data
        let tournament_types = this.tournament_types(data.tournament_types)
        let mobile_number = data.mobile_number
        let tournament_link = data.tournament_link


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

                                    <Text style={defaultStyle.bold_text_14}>
                                        {data.name}
                                    </Text>

                                    <View style={{ flexDirection: 'row' }}>

                                        {mobile_number != undefined ?

                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.phoneNumberClicked(mobile_number)
                                                }}>

                                                <Image
                                                    resizeMode="contain"
                                                    style={{ width: 20, height: 20, marginRight: 16 }}
                                                    source={require('../../images/ic_call.png')}
                                                />
                                            </TouchableOpacity>
                                            : null}

                                        {tournament_link != undefined ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.shareLink(tournament_link)
                                                }}>
                                                <Image
                                                    resizeMode="contain"
                                                    style={{ width: 16, height: 18, }}
                                                    source={require('../../images/share.png')}
                                                />
                                            </TouchableOpacity> : null}
                                    </View>

                                </View>


                                <View style={{ paddingTop: 8, flexDirection: 'row' }}>

                                    <Text style={defaultStyle.bold_text_14}>
                                        {data.month + " " + data.year}
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
                                        fontFamily: 'Quicksand-Medium'
                                    }}>{getFormattedTournamentType(data.academic_type)}</Text>

                                </View>

                                <Text style={{
                                    paddingTop: 6, fontSize: 14,
                                    color: '#404040',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Dates <Text style={defaultStyle.bold_text_14}>
                                        {Moment(data.start_date).format('DD MMM') + " - " + Moment(data.end_date).format('DD MMM')}
                                    </Text>
                                </Text>

                                <Text style={{
                                    paddingTop: 6, fontSize: 14,
                                    color: '#FF7373',
                                    fontFamily: 'Quicksand-Regular'
                                }}>
                                    Last Date of Registration <Text style={defaultStyle.bold_text_14}>
                                        {" " + Moment(data.registration_last_date).format('DD MMM YYYY')}
                                    </Text>
                                </Text>

                                <View style={{ marginTop: 8, marginBottom: 8, backgroundColor: '#DFDFDF', height: 1 }}></View>

                                <View style={{ marginBottom: 8, marginRight: 12 }}>


                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>



                                        <Text style={{
                                            fontSize: 10,
                                            color: '#A3A5AE',
                                            width: "33.33%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Fees Paid
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
                                            Rs. 1100/-
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
                                            {tournament_types}
                                        </Text>

                                        <Text style={{
                                            paddingTop: 6, fontSize: 14,
                                            color: '#404040',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Total <Text style={defaultStyle.bold_text_14}>{data.max_registration} players</Text>
                                        </Text>
                                    </View>


                                    <View style={{
                                        marginTop: 12,
                                    }}>

                                        <Text style={{
                                            fontSize: 10,
                                            color: '#A3A5AE',
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Registered Players
                                    </Text>
                                        <View style={{

                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flex: 1,
                                            justifyContent: 'space-between'
                                        }}>

                                            <Text style={{
                                                paddingTop: 10, fontSize: 14,
                                                color: '#404040',
                                                width: "30%",
                                                fontWeight: '400',
                                                fontFamily: 'Quicksand-Medium'
                                            }}>
                                                Prithiviraj P
                                            </Text>
                                            <Text style={{
                                                paddingTop: 10, fontSize: 14,
                                                color: '#404040',
                                                width: "15%",
                                                fontFamily: 'Quicksand-Regular'
                                            }}>
                                                U-13
                                            </Text>
                                            <Text style={{
                                                paddingTop: 10, fontSize: 14,
                                                color: '#404040',
                                                width: "35%",
                                                fontFamily: 'Quicksand-Regular'
                                            }}>
                                                Singles,Doubles
                                            </Text>


                                            <Text
                                                onPress={() => {
                                                    alert('under development')
                                                }}
                                                style={{
                                                    paddingTop: 10, fontSize: 10,
                                                    color: '#667DDB',
                                                    width: "20%",
                                                    textAlign: 'center',
                                                    marginTop: 2,
                                                    alignItems: 'center',
                                                    fontFamily: 'Quicksand-Regular'
                                                }}>
                                                Edit Partner
                                            </Text>

                                        </View>
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
                                        }}>{data.start_time != undefined ?
                                            Moment(data.start_time, "HH:mm:ss")
                                                .format("hh:mm a") : "-"}</Text>
                                        <Text style={{
                                            paddingTop: 10, fontSize: 14,
                                            color: '#404040',
                                            width: "50%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>{data.tournament_format != undefined ?
                                            data.tournament_format : '-'}</Text>

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
                                    </View>


                                    {/* <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            marginTop: 16, marginBottom: 16, marginLeft: 8, marginRight: 8
                                        }}>

                                        <Text
                                            onPress={() => {
                                                this.props.navigation.navigate('TournamentFixture')
                                            }}
                                            style={styles.rounded_button}
                                        >
                                            View Fixture
                                        </Text>

                                    </View> */}
                                    <View style={{
                                        margin: 16,
                                        alignSelf: 'center',
                                        width: 150,
                                    }}>
                                        <SkyFilledButton
                                            onPress={() => {
                                                //this.getFixtureData(item.id)
                                            }}
                                        >View Fixtures</SkyFilledButton>
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

