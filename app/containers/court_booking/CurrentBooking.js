import React from 'react'

import { View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import BaseComponent, { defaultStyle, SESSION_DATE_FORMAT, getFormatTime } from '../BaseComponent';
import { Card } from 'react-native-paper';
import { getData, isSignedIn } from "../../components/auth";
import { getCourtBookings, cancelBooking } from '../../redux/reducers/CourtBookingReducer';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import moment from 'moment'
import { SkyFilledButton } from '../../components/Home/SkyFilledButton';
import Events from '../../router/events';

class CurrentBooking extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            bookingsData: null,
            spinner: false,
            refreshing: false,
        };

        this.refreshEvent = Events.subscribe('OPEN_LISTING', () => {
            this.props.navigation.navigate('AcademyListing', {
                book_court: true,
                title: 'Book and Play',
                show_back: true
            })
        });

    }

    componentDidMount() {

        this.checkAndGet()

        this.refreshEvent = Events.subscribe('REFRESH_BOOKING', () => {
            this.checkAndGet()
        });
    }

    onRefresh = () => {

        this.setState({ refreshing: true });
        this.checkAndGet()
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    };

    checkAndGet() {
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
                console.log('getCourtBookings', JSON.stringify(data.data))

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

    cancel(item) {
        this.progress(true)

        const booking_id = item.booking_id

        getData('header', (value) => {
            this.props.cancelBooking(value, booking_id).then(() => {
                let data = this.props.data.res
                this.progress(false)
                console.log('cancelBooking', JSON.stringify(data.data))

                let success = data.success
                if (success) {
                    let success_message = data.success_message
                    setTimeout(() => {
                        Alert.alert(
                            'Success',
                            success_message,
                            [{
                                text: 'OK', onPress: () => {
                                    this.getAllBookings()
                                }
                            },
                            ],
                            { cancelable: false },
                        );
                    }, 500)
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

        <View style={{
            margin: 16,
        }}>

            <Card style={styles.bookingCard}>
                <View style={{
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingTop: 16,
                    paddingBottom: 16
                }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.text_12}>Booked on {moment.utc(item.created_at).local().format('DD/MM/YYYY')}</Text>
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
                        <Text style={styles.text_bold}>{moment.utc(item.booking_date).local().format(SESSION_DATE_FORMAT)}</Text>
                        <Text style={styles.text_bold}>{getFormatTime(item.start_time)} - {getFormatTime(item.end_time)}</Text>
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

                    {item.canCancel && !item.isCancelled ?
                        <View style={{
                            marginTop: 16,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <TouchableOpacity activeOpacity={.8}
                                style={defaultStyle.rounded_button_150}
                                onPress={() => {
                                    this.cancel(item)
                                }}>
                                <Text
                                    style={[defaultStyle.bold_text_14, { color: 'white' }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View> : null}

                    {item.isCancelled ?
                        <View style={{ marginTop: 16 }}>
                            <Text style={defaultStyle.heavy_bold_text_14}>You have cancelled court booking.</Text>
                        </View> : null
                    }
                </View>
            </Card>


        </View>
    );

    _renderHeaderItem = ({ }) => (
        <View style={{
            marginLeft: 16,
            marginTop: 12,
        }}>
            <Text style={styles.text}>My Bookings</Text>
        </View>
    );

    render() {

        const bookingsData = this.state.bookingsData
        if (this.props.data.loading && !bookingsData) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        return (

            <View style={styles.bookingContainer}>
                <ScrollView

                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            title="Pull to refresh"
                        />
                    }>


                    <View >

                        <Spinner visible={this.state.spinner} textStyle={defaultStyle.spinnerTextStyle}
                        />

                        {this.state.bookingsData != null && this.state.bookingsData.length == 0
                            ?
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                flex: 1,
                                margin: 20,
                                alignItems: 'center'
                            }}>
                                <Text style={styles.text}>No Bookings</Text>
                            </View>
                            :
                            <FlatList
                                ListHeaderComponent={this._renderHeaderItem}
                                data={this.state.bookingsData}
                                extraData={bookingsData}
                                renderItem={this._renderItem}
                            />}



                        {/* <TouchableOpacity>

                    <Text
                        onPress={() => {
                            this.props.navigation.navigate('AcademyListing', {
                                book_court: true
                            })
                        }}
                        style={styles.rounded_button}>
                        Book and Play</Text>
                        </TouchableOpacity> */}




                    </View>

                </ScrollView>

                <View
                    style={{
                        alignSelf: 'flex-end',
                        flexDirection: 'row',
                        margin: 12,
                    }}>
                    <View style={{
                        width: "100%"
                    }}>
                        <SkyFilledButton
                            onPress={() => {
                                this.props.navigation.navigate('AcademyListing', {
                                    book_court: true,
                                    title: 'Book and Play',
                                    show_back: true
                                })
                            }}
                        >Book and Play</SkyFilledButton>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.CourtBookingReducer,
    };
};
const mapDispatchToProps = {
    getCourtBookings, cancelBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBooking);

const styles = {
    bookingContainer: {
        //padding: 16,
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
        fontFamily: 'Quicksand-Medium'
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
