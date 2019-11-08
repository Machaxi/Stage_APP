import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, {
    defaultStyle,
    getFormattedRound,
    getFormattedTournamentLevel,
    genderCamal,
    getFormattedCategory,
    getFormattedTournamentType
} from '../BaseComponent'
import { ScrollView } from 'react-native-gesture-handler';
import Moment from 'moment';
import { storeData, isSignedIn, getData } from '../../components/auth';
import Share from 'react-native-share';
import { getTournamentById } from "../../redux/reducers/UpcomingReducer";
import { connect } from 'react-redux';
import firebase from "react-native-firebase";

class UpcomingTournamentDetail extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            signedIn: false,
            tournament_id: null
        }
        let data = this.props.navigation.getParam('data');
        if (data) {
            this.state.data = data
            storeData("detail", JSON.stringify(this.state.data))
        } else {
            this.state.tournament_id = this.props.navigation.getParam('tournament_id')
            console.log('Upcoming Detail => ', this.state.tournament_id)
            this.fetchTournamentData(this.state.tournament_id)
        }
    }

    fetchTournamentData(tournament_id) {

        firebase.analytics().logEvent("UpcomingTournament", {})


        getData('header', (value) => {

            this.props.getTournamentById(value, tournament_id).then(() => {
                let data = this.props.data.data
                console.log(' getTournamentById ' + JSON.stringify(data));

                let success = data.success
                if (success) {

                    //console.log(' getUpcomingTournament ' + JSON.stringify(data.data.tournaments));
                    let tournament = data.data.tournament
                    this.setState({
                        data: tournament
                    })
                    this.state.tournament = tournament
                    storeData("detail", JSON.stringify(tournament))
                }

            }).catch((response) => {
                this.setState({ isRefreshing: false })
                console.log(response);
            })
        })
    }

    register() {
        this.props.navigation.navigate('RegistrationSteps')
    }

    getMinimum(tournament_types) {

        let minimumAmount = +tournament_types[0].fees
        for (let i = 0; i < tournament_types.length; i++) {
            if (+tournament_types[i].fees > 0 && +tournament_types[i].fees < minimumAmount) {
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
            message: 'I\'m using Machaxi app.',
            url: url,
            //social: Share.Social.WHATSAPP,
            //whatsAppNumber: "9199999999"  // country code + phone number(currently only works on Android)
        };
        Share.open(shareOptions).catch(err => console.log(err))


        //Share.shareSingle(shareOptions);
    }


    category_type(category_types) {

        let str = ''
        for (let i = 0; i < category_types.length; i++) {
            let type = category_types[i]
            str = str + getFormattedCategory(type) + ", "
        }
        return str.substring(0, str.length - 2);
    }

    render() {

        let data = this.state.data

        if (this.props.data.loading || data == null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }


        let minimumAmount = this.getMinimum(data.tournament_types)
        let label = minimumAmount == 0 ? 'Free' : 'Rs. ' + minimumAmount + ' Onwards'
        let tournament_types = this.tournament_types(data.tournament_types)
        let tournament_link = data.tournament_link
        let category_type = this.category_type(data.category_types)
        let split = data.registration_last_date.split("T")
        let reg_last = split[0] + " 23:59:59"
        console.log('reg_last=>', reg_last)
        let last_date = Moment(reg_last).format("X")
        var today = new Date();
        console.log('today=> ', today)
        let today_time = Moment(today).format("X")

        console.log('last_date => ', last_date)
        console.log('last_date => 1', today_time)
        let show_register = data.can_register;
        if (show_register) {
            if (today_time > last_date)
                show_register = false
        }
        const conditions = data.conditions

        return (

            <View style={{
                flex: 1
            }}>

                <ScrollView

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

                                        <Text style={defaultStyle.blue_rounded_4}>{getFormattedTournamentType(data.academic_type)}</Text>

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


                                        <View style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row'
                                        }}>
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
                                                    //width: "100%",
                                                    fontFamily: 'Quicksand-Regular'
                                                }}>{label}</Text>

                                            </View>

                                            <View style={{
                                                //marginTop: 12
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
                                                    //width: "33.33%",
                                                    fontFamily: 'Quicksand-Regular'
                                                }}>{category_type}</Text>

                                            </View>

                                            <View style={{
                                                //marginTop: 12
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
                                                    //width: "33.33%",
                                                    fontFamily: 'Quicksand-Regular'
                                                }}>{genderCamal(data.genderType)}</Text>

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
                                            }}>
                                                {/* {Moment(data.start_time, "HH:mm:ss").format("hh:mm a")} */}
                                                {data.start_time != undefined ?
                                                    Moment(data.start_time, "HH:mm:ss")
                                                        .format("hh:mm a") + " onwards" : "-"}
                                            </Text>
                                            <Text style={{
                                                paddingTop: 10, fontSize: 14,
                                                color: '#404040',
                                                width: "50%",
                                                fontFamily: 'Quicksand-Regular'
                                            }}>{data.tournament_format != undefined ?
                                                getFormattedRound(data.tournament_format) : '-'}</Text>

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

                                        {conditions ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.props.navigation.navigate('TournamentTerms', {
                                                        conditions: conditions,
                                                        show_register: show_register
                                                    })
                                                    //console.warn('terms')
                                                }}>

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
                                            : null
                                        }
                                    </View>

                                </View>

                            </View>
                        </Card>
                    </View>

                </ScrollView>

                <View style={defaultStyle.line_style}></View>

                <View style={{
                    elevation: 4,
                }}>
                    <View style={{
                        padding: 12,
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
                                    fontFamily: 'Quicksand-Medium'
                                }}
                            >
                                Close
                    </Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.8}
                            style={[styles.rounded_button, {
                                backgroundColor: show_register ? '#67BAF5' : 'gray',
                            }]}
                            onPress={() => {

                                if (show_register)
                                    this.register();
                                else {
                                    //alert('Registrations are closed.')
                                }

                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontFamily: 'Quicksand-Medium'
                                }}
                            >Register</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View >
        );
    }
}
const mapStateToProps = state => {
    return {
        data: state.UpcomingTournamentReducer,
    };
};
const mapDispatchToProps = {
    getTournamentById
};
export default connect(mapStateToProps, mapDispatchToProps)(UpcomingTournamentDetail);


const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    rounded_button: {
        width: '48%',
        height: 44,
        padding: 10,
        borderRadius: 23,
        //borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        //borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        justifyContent: 'center'
    },
    rounded_button_white: {
        width: '48%',
        padding: 10,
        borderRadius: 23,
        borderRadius: 23,
        borderWidth: 1,
        marginLeft: 4,
        marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: 'white',
        color: '#67BAF5',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        justifyContent: 'center'
    },
});

