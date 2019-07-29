import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Card, } from 'react-native-paper';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { ScrollView } from 'react-native-gesture-handler';
import Moment from 'moment';


export default class RegisteredTournamentDetail extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            
        }
        this.state.data = JSON.parse(this.props.navigation.getParam('data'));
        
    }


    render() {
        let data = this.state.data
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

                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 20, height: 20, marginRight: 16 }}
                                            source={require('../../images/ic_call.png')}
                                        />
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 16, height: 18, }}
                                            source={require('../../images/share.png')}
                                        />

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
                                    }}>{data.academic_type}</Text>

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
                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>

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
                                            <Text style={{
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
                                        }}>
                                            Cras quis nulla commodo, aliquam lectus sed, blandit augue.
                                 </Text>
                                    </View>


                                    <View
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

