import React from 'react'

import { View, Text, StyleSheet, FlatList } from 'react-native'
import BaseComponent, { defaultStyle, SESSION_DATE_FORMAT } from '../BaseComponent';
import { Card } from 'react-native-paper';
import { getData, isSignedIn } from "../../components/auth";
import { getCourtBookings } from '../../redux/reducers/CourtBookingReducer';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import moment from 'moment'

class CurrentBooking extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            bookingsData: null,
            spinner: false,
        };
    }

    componentDidMount() {

        isSignedIn()
            .then(res => {
                console.log('isSignedIn => ', res);
                let signedIn = res
                if (signedIn) {
                    this.getAllBookings();
                } else {
                    this.setState({
                        bookingsData: []
                    })
                }
            })
            .catch(err => alert("An error occurred"));
    }

    getAllBookings() {
        this.progress(true);
        getData('header', (value) => {
            this.props.getCourtBookings(value).then(() => {
                let data = this.props.data.res
                this.progress(false)
                console.log('data.data.challenges', data.data)

                let success = data.success
                if (success) {

                    this.setState({
                        bookingsData: data.data.bookings,
                    })
                }

            }).catch((response) => {
                this.progress(false)
                console.log(response);
            })
        })
    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }

    _renderItem = ({ item }) => (

        <View>

            <Card style={styles.bookingCard}>
                <View style={{
                    paddingLeft: 12, paddingRight: 12,
                    paddingTop: 16, paddingBottom: 16
                }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.text_12}>Booked on {moment.utc(item.booking_date).local().format('DD/MM/YYYY')}</Text>
                        {/* <Text style={styles.small_text}>Edit</Text> */}
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
                        <Text style={styles.bookingLabel}>Place</Text>
                        <Text style={styles.bookingLabel}>Sports</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                        <Text style={styles.text_14_regular}>{item.academy_name}</Text>
                        <Text style={styles.text_14_regular}>{item.sport_name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 14 }}>
                        <Text style={styles.bookingLabel}>Date</Text>
                        <Text style={styles.bookingLabel}>Time</Text>
                    </View>
                    {/* moment(this.state.attendenceDate).format('YYYY-MM-DD') */}

                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                        <Text style={styles.text_bold}>{moment.utc(item.created_at).local().format(SESSION_DATE_FORMAT)}</Text>
                        <Text style={styles.text_bold}>{item.start_time} - {item.end_time}</Text>
                    </View>

                    <View style={{ marginTop: 14 }}>
                        <Text style={styles.bookingLabel}> Court</Text>
                        <View style={{ marginTop: 6 }}>
                            <Text style={styles.text_14_full}>{item.court_names}</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 14 }}>
                        <Text style={styles.bookingLabel}> Venue</Text>
                        <View style={{ marginTop: 6 }}>
                            <Text style={styles.text_14_full}>{item.venue}</Text>
                        </View>
                    </View>

                </View>
            </Card>


        </View>



    );

    render() {

        if (this.state.bookingsData != null && this.state.bookingsData.length > 0) {
            return (
                <View style={styles.bookingContainer}>

                    <Spinner visible={this.state.spinner} textStyle={defaultStyle.spinnerTextStyle}
                    />



                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.text}>My Bookings</Text>
                        {/* <Text style={styles.small_text}>View Old Bookings</Text> */}
                    </View>

                    <FlatList
                        data={this.state.bookingsData}
                        renderItem={this._renderItem}
                    />

                    <View
                        style={{
                            alignSelf: 'flex-end',
                            flexDirection: 'row',
                            marginTop: 10, marginBottom: 0, marginLeft: 8, marginRight: 8
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

            )
        }

        {
            if (this.state.bookingsData != null && this.state.bookingsData.length == 0) {
                return (
                    <View style={styles.bookingContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50, alignItems: 'center' }}>
                            <Text style={styles.text}>No Bookings</Text>
                            {/* <Text style={styles.small_text}>View Old Bookings</Text> */}
                        </View>
                        <FlatList
                            data={this.state.bookingsData}
                            renderItem={this._renderItem}
                        />
                        <View
                            style={{
                                alignSelf: 'flex-end',
                                flexDirection: 'row',
                                marginTop: 10, marginBottom: 0, marginLeft: 8, marginRight: 8
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

                )
            }
        }

        return null;

    }

}

const mapStateToProps = state => {
    return {
        data: state.CourtBookingReducer,
    };
};
const mapDispatchToProps = {
    getCourtBookings
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBooking);

const styles = {
    bookingContainer: {
        padding: 16,
        flex: 1,
        backgroundColor: '#F7F7F7',
        fontFamily: 'Quicksand-Regular'
    },
    bookingCard: {
        borderRadius: 16,
        marginTop: 8,
        marginBottom: 8,
        elevation: 2,
        paddingVertical: 16
    },
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
        fontSize: 14,
        color: '#404040',
        fontFamily: 'Quicksand-Medium'
    },
    text_bold: {
        width: "50%",
        fontSize: 14,
        color: '#404040',
        fontFamily: 'Quicksand-Medium'
    },
    text_12: {
        fontSize: 12, fontWeight: "400",
        color: '#404040',
        fontFamily: 'Quicksand-Medium'
    },
    bookingLabel: {
        width: "50%",
        fontSize: 10,
        color: '#A3A5AE',
        fontFamily: 'Quicksand-Medium'
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
