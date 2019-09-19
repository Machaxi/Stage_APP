import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Card, } from 'react-native-paper';
import BaseComponent, {
    defaultStyle, getFormattedTournamentType, getFormattedRound,
    getFormattedCategory, getFormattedTournamentLevel, formattedName
} from '../BaseComponent'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'moment';
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';
import { Linking } from 'react-native'
import Share from 'react-native-share';
import { getData, storeData } from '../../components/auth';
import NavigationDrawerStructure from '../../router/NavigationDrawerStructure'
import { PARENT } from '../../components/Constants';


export default class RegisteredTournamentDetail extends BaseComponent {

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: 'Registered Tournament',
            headerTitleStyle: defaultStyle.headerStyle,

            headerLeft: <NavigationDrawerStructure navigationProps={navigation}
                showBackAction={true}
            />,
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.getParam('editAction')();
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            marginRight: 12,
                            fontFamily: 'Quicksand-Regular',
                            fontSize: 12,
                            color: '#667DDB'
                        }}>Edit</Text>
                </TouchableOpacity>

            )
        };

    };

    editAction = () => {
        //Setting edit flag forcefully
        const data = this.state.data
        data.is_edit_mode = true
        storeData('detail', JSON.stringify(data))
        //console.log('EditCAll=>', JSON.stringify(data))
        setTimeout(() => {
            this.props.navigation.navigate('RegistrationSteps')
        }, 100)
    }

    constructor(props) {
        super(props)
        this.state = {
            data: {},

        }
        const { navigation } = this.props
        navigation.setParams({
            editAction: this.editAction,
        })

        this.state.data = JSON.parse(this.props.navigation.getParam('data'));
        storeData("detail", JSON.stringify(this.state.data))

        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            let user_type = userData.user['user_type']
            this.setState({
                user_type: user_type
            });
        });

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
            message: 'I\'m using Machaxi app.',
            url: url,
            //social: Share.Social.WHATSAPP,
            //whatsAppNumber: "9199999999"  // country code + phone number(currently only works on Android)
        };
        Share.open(shareOptions).catch(err => console.log(err))

    }

    getRegisteredPlayers(tournament_registrations) {

        let array = []
        let str = ''
        for (let i = 0; i < tournament_registrations.length; i++) {
            let name = tournament_registrations[i].player.name
            array.push(name)
            //str = str + name + " | "
        }

        let unique = [...new Set(array)];
        for (let i = 0; i < unique.length; i++) {
            let name = unique[i]
            str = str + name + " | "
        }
        return str.substring(0, str.length - 2);
    }

    render() {


        let data = this.state.data
        let tournament_types = this.tournament_types(data.tournament_types)
        let mobile_number = data.mobile_number
        let tournament_link = data.tournament_link
        let registeredPlayer = this.getRegisteredPlayers(data.tournament_registrations)
        let tournament_registrations = data.tournament_registrations
        let fees = data.amount_paid

        let can_register_more = this.state.user_type == PARENT

        let registered_array = []
        for (let i = 0; i < tournament_registrations.length; i++) {

            let obj = tournament_registrations[i]

            registered_array.push(
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
                    }}>{formattedName(obj.player.name)}</Text>

                    <Text style={{
                        paddingTop: 10,
                        fontSize: 14,
                        color: '#404040',
                        width: "20%",
                        textAlign: 'left',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        fontFamily: 'Quicksand-Regular'
                    }}>{getFormattedCategory(obj.tournament_category)}</Text>

                    <Text style={{
                        paddingTop: 10,
                        fontSize: 14,
                        textAlign: 'left',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        color: '#404040',
                        width: "30%",
                        fontFamily: 'Quicksand-Regular'
                    }}>{getFormattedTournamentLevel(obj.tournament_type)}</Text>

                    {obj.tournament_type == 'MIX_DOUBLE' || obj.tournament_type == 'DOUBLE'
                        ?
                        <Text
                            onPress={() => {
                                alert('under development')
                            }}
                            style={{
                                paddingTop: 10, fontSize: 10,
                                color: '#667DDB',
                                width: "20%",
                                textAlign: 'center',
                                alignItems: 'center',
                                fontFamily: 'Quicksand-Regular'
                            }}>
                            Edit Partner
                    </Text>
                        : <Text style={{ width: "20%", }}></Text>
                    }


                </View>
            )

        }

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

                                        {/* <Text style={{
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
                        </Text> */}

                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text style={{
                                            paddingTop: 10, fontSize: 14,
                                            color: '#404040',
                                            width: "33.33%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>
                                            Rs. {fees}/-
                                    </Text>
                                        {/* <Text style={{
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
                                 </Text> */}

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
                                        {registered_array}
                                    </View>

                                    {can_register_more ?
                                        <TouchableOpacity
                                            style={{
                                                paddingTop: 16,
                                            }}
                                            onPress={() => {
                                                this.props.navigation.navigate('RegistrationSteps')
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    color: '#667DDB',
                                                    fontFamily: 'Quicksand-Regular'
                                                }}>Register another Player?</Text>
                                        </TouchableOpacity> : null
                                    }



                                    <View style={{ marginTop: 16, marginBottom: 12, backgroundColor: '#DFDFDF', height: 1 }}></View>


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
                                                .format("hh:mm a") +" onwards": "-"}</Text>
                                        <Text style={{
                                            paddingTop: 10, fontSize: 14,
                                            color: '#404040',
                                            width: "50%",
                                            fontFamily: 'Quicksand-Regular'
                                        }}>{data.tournament_format != undefined ?
                                            getFormattedRound(data.tournament_format) : '-'}</Text>

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
                                                this.props.navigation.navigate('FixtureSelection', {
                                                    id: data.id
                                                })
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
        //borderWidth: 1,
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

