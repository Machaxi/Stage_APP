import React from 'react'

import { View, Text, StyleSheet } from 'react-native'
import BaseComponent from '../BaseComponent';
import { Card } from 'react-native-paper';

class CurrentBooking extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={{ padding: 16, flex:1 }}>

                <View style={{flex:1}}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                        <Text style={styles.text}>
                            My Bookings
                </Text>

                        <Text style={styles.small_text}>
                            View Old Bookings
                </Text>

                    </View>

                    <Card style={{ marginTop: 10, elevation: 2, borderRadius: 8 }}>

                        <View style={{
                            paddingLeft: 10, paddingRight: 10,
                            paddingTop: 16, paddingBottom: 16
                        }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text style={styles.text_12}>
                                    Booked on 22/05/2019
                            </Text>

                                <Text style={styles.small_text}>
                                    Edit
                            </Text>

                            </View>


                            <View
                                style={{
                                    marginTop: 8, marginBottom: 8,
                                    width: "100%",
                                    height: 1,
                                    backgroundColor: "#DFDFDF"
                                }}
                            ></View>

                            <View style={{ flexDirection: 'row' }}>

                                <Text style={styles.text_12_regular}>
                                    Place
                            </Text>

                                <Text style={styles.text_12_regular}>
                                    Sports
                            </Text>


                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 4 }}>

                                <Text style={styles.text_14_regular}>
                                    Feather Academy
                            </Text>

                                <Text style={styles.text_14_regular}>
                                    Badminton
                            </Text>


                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 14 }}>

                                <Text style={styles.text_12_regular}>
                                    Date
                            </Text>

                                <Text style={styles.text_12_regular}>
                                    Time
                            </Text>


                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 4 }}>

                                <Text style={styles.text_bold}>
                                    30 May 2019
                            </Text>

                                <Text style={styles.text_bold}>
                                    08:00 am - 09:00 am
                            </Text>


                            </View>

                            <View style={{ marginTop: 14 }}>

                                <Text style={styles.text_12_regular}>
                                    Venue
                            </Text>

                                <View style={{ marginTop: 6 }}>

                                    <Text style={styles.text_14_full}>
                                        Lorem Ipsum
                            </Text>
                                </View>

                            </View>


                        </View>

                    </Card>

                </View>

                <View
                    style={{
                        alignSelf: 'flex-end',
                        flexDirection: 'row',
                        marginTop: 16, marginBottom: 16, marginLeft: 8, marginRight: 8
                    }}>

                    <Text
                        onPress={() => {
                            this.props.navigation.navigate('CourtAcademyListing')
                        }}
                        style={styles.rounded_button}
                    >
                        Book and Play
                                        </Text>

                </View>

            </View>
        );

    }

}
const styles = {
    rounded_button: {
        width: '100%',
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
    text: {
        fontSize: 14, fontWeight: "400",
        color: '#404040',
        fontFamily: 'Quicksand-Medium'
    },
    text_bold: {
        width: "50%",
        fontSize: 14, fontWeight: "400",
        color: '#404040',
        fontFamily: 'Quicksand-Medium'
    },
    text_12: {
        fontSize: 12, fontWeight: "400",
        color: '#404040',
        fontFamily: 'Quicksand-Medium'
    },
    text_12_regular: {
        width: "50%",
        fontSize: 12,
        color: '#A3A5AE',
        fontFamily: 'Quicksand-Regular'
    },
    text_14_regular: {
        width: "50%",
        fontSize: 14,
        color: '#404040',
        fontFamily: 'Quicksand-Regular'
    },
    text_14_full: {
        fontSize: 14,
        color: '#404040',
        fontFamily: 'Quicksand-Regular'
    },
    small_text: {
        fontSize: 10,
        color: '#667DDB',
        fontFamily: 'Quicksand-Regular'
    }
}
export default CurrentBooking;