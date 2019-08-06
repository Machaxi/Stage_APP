import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Platform, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import BaseComponent, { defaultStyle } from '../BaseComponent';
import moment from 'moment'
import { getPlayerBatchAttendenceDetails } from "../../redux/reducers/PlayerBatchReducer";
import { getData } from "../../components/auth";
import { connect } from 'react-redux';
import { Card, } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

class MyCalendar extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentDay: '',
            currentMonth: '',
            currentYear: '',
            dayInMonth: 0,
            dayArray: [],
            today: '',
            refresh: false,
            attendanceData: null,
            batchId: '',
            playerId: '',
            selectedDateData: null,
            eventsArray: [],
            selectedDate: null,
            monthly_attendance_report: null,
            spinner: false,
            isAttendanceHappenedInMonth: false
        }

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        console.log('date => ' + dd + " Month=> " + mm + " Year = " + yyyy)

        this.state.currentDay = dd
        this.state.currentMonth = mm
        this.state.currentYear = yyyy
        this.state.today = this.getCurrentDate();
        this.state.selectedDate = Date.now();
        this.state.batchId = this.props.navigation.getParam('batch_id');

        //console.warn('monthDays => ', this.monthDays())

    }

    progress(status) {
        this.setState({
            spinner: status
        })
    }


    getCurrentDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        return dd + "-" + mm + "-" + yyyy
    }

    componentDidMount() {

        getData('userInfo', (value) => {
            userData = JSON.parse(value);
            this.state.playerId = userData['player_id'];
            let month = this.state.currentMonth
            let year = this.state.currentYear
            this.monthDays()
            this.getCalendarData(month, year)

        }) 
    }

    getCalendarData(month, year) {

        this.progress(true)

        getData('header', (value) => {
            this.props.getPlayerBatchAttendenceDetails(value, this.state.playerId, this.state.batchId, month, year).then(() => {

                console.log('getPlayerBatchAttendenceDetails', JSON.stringify(this.props.data.batchdata));
                let data = this.props.data.batchdata;
                let success = data.success
                if (success) {

                    let monthly_attendance_report = data.data.monthly_attendance_report ? data.data.monthly_attendance_report : null;
                    let calendar_data = data.data.calendar_data
                    console.log('calendar_data ', calendar_data)
                    let array = []
                    let dayArray = this.state.dayArray

                    for (key in calendar_data) {

                        console.log('event==', JSON.stringify(calendar_data[key]))

                        for (let i = 0; i < dayArray.length; i++) {
                            let dateObj = dayArray[i]
                            let obj = { ...calendar_data[key] }

                            if (dateObj.day == key) {
                                obj.day = key
                                dayArray[i] = obj
                            }
                        }

                    }

                    console.log('final Array => ', JSON.stringify(dayArray))
                    this.state.dayArray = dayArray
                    this.setState({
                        dayArray: dayArray,
                        monthly_attendance_report: monthly_attendance_report,
                        isAttendanceHappenedInMonth: data.data.is_attendance_happened_in_month
                    })
                    this.progress(false)
                    /// console.log('eventsArray', this.state.eventsArray);
                    /// console.log(this.state.attendanceData)
                }

            }).catch((response) => {
                console.log(response);
                this.progress(false)
            })
        })

    }

    attendanceSummary(data) {

        console.warn('attendanceSummary', data);
        console.warn('this.state.isAttendanceHappenedInMonth', this.state.isAttendanceHappenedInMonth);
        console.warn('this.state.selectedDateData', this.state.selectedDateData);
        return (

            <Card style={styles.summaryCardOuter}>

                {
                    this.state.isAttendanceHappenedInMonth ?
                        <View>
                            <View style={styles.summaryText}>
                                <Text style={styles.attendanceText}>Attendance Summary for</Text>
                                <Text style={styles.dateText}>{data.month} {data.year}</Text>
                            </View>

                            <View style={styles.attSessionLabelOuter}>
                                <Text style={styles.attSessionLabel}>Attendance%</Text>
                                <Text style={styles.attSessionLabel}>Sessions Attended</Text>
                            </View>
                            <View style={styles.attSessionValueOuter}>
                                <Text style={styles.attSessionValue}>{data.attendance} %</Text>
                                <Text style={styles.attSessionValue}>{data.session_attended}/{data.total_session}</Text>
                            </View>
                            {
                                this.state.selectedDateData != null &&

                                (this.state.selectedDateData.session_scheduled == false ?
                                    <View><Text>No session schedule</Text></View> : (
                                        this.state.selectedDateData.is_cancelled == true ?
                                            <View><Text>Sesson cancelled due to- {this.state.selectedDateData.cancel_reason}</Text></View> : (
                                                this.state.selectedDateData.attendance_happened == false ? <View><Text>Attendance didn't happen</Text></View> : (
                                                    <View>
                                                        <View style={styles.summaryText}>
                                                            <Text style={styles.attendanceText}>Attendance </Text>
                                                            <Text style={styles.dateText}>{moment.utc(this.state.selectedDate).local().format("Do MMM")}</Text>
                                                        </View>

                                                        <View style={styles.attSessionLabelOuter}>
                                                            <Text style={styles.attSessionLabel}>Session</Text>
                                                            <Text style={styles.attSessionLabel}>Status</Text>
                                                            <Text style={styles.attSessionLabel}>Time</Text>
                                                        </View>
                                                        <View style={styles.attSessionValueOuter}>
                                                            <Text style={styles.attSessionValue}>{this.state.selectedDateData.session_name}</Text>
                                                            <Text style={styles.attSessionValue}>{this.state.selectedDateData.is_present ? 'P' : 'A'}</Text>
                                                            <Text style={styles.attSessionValue}>{this.state.selectedDateData.start_time} - {this.state.selectedDateData.end_time}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            )
                                    )
                                )

                            }

                        </View> : <View><Text>No attendance for this month</Text></View>
                }



            </Card>
        )
    }

    monthDays() {
        let currentMonth = this.state.currentMonth
        let currentYear = this.state.currentYear

        let days = new Date(currentYear, currentMonth, 0).getDate();

        let d = new Date(currentYear, currentMonth - 1, 1);
        //alert("First Day is " + currentMonth + " y = " + currentYear+" days "+days);

        let index = 0
        let array = []
        for (let i = 1; i < d.getDay(); i++) {
            array[index++] = { day: "" }
        }

        for (let i = 1; i <= days; i++) {
            array[index++] = { day: i + "" }
        }


        for (let i = index; i <= 35; i++) {
            array[index++] = { day: "" }
        }


        this.setState({
            dayArray: array,
            refresh: true
        })
    }

    onDateSelected(item) {
        let date = item
        let day = this.state.currentDay;
        let month = this.state.currentMonth;
        let year = this.state.currentYear;
        console.log(date + "/" + (+month) + "/" + year)
        console.log('onDateSelected', JSON.stringify(item));
        this.state.selectedDate = new Date(year,(month-1),item.day);
        console.log(new Date(2019,7,10));
        console.log(day,day)
         //console.log(moment.utc(new Date(year,month,day)).local().format("YYYY-MM-DD"))
        console.log(this.state.selectedDate)
        this.state.selectedDateData = item
        this.setState({
            selectedDateData: item
        })
    }

    onMonthChanged() {
        let month = this.state.currentMonth
        let year = this.state.currentYear
        console.log((+month) + "/" + year)
        this.getCalendarData(month, year)
    }



    _renderHeaderItem = ({ }) => {

        let currentMonth = this.state.currentMonth
        let currentYear = this.state.currentYear
        currentMonth = +currentMonth

        console.log('header=>', currentMonth + "/" + currentYear)
        let date = moment(currentMonth + "/" + currentYear, "MM/YYYY").format('MMMM YYYY')


        return (

            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>

                    <TouchableOpacity
                        style={{
                            width: "15%",
                        }}
                        onPress={() => {
                            let currentMonth = this.state.currentMonth
                            let currentYear = this.state.currentYear
                            if (currentMonth == 1) {
                                currentMonth = 12
                                currentYear = +currentYear - 1
                            }
                            else {
                                currentMonth = +currentMonth - 1
                            }
                            this.state.currentMonth = currentMonth
                            this.state.currentYear = currentYear
                            this.monthDays()
                            this.onMonthChanged()
                        }}>

                        <Image
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25
                            }}
                            source={require('../../images/calendar_left_arrow.png')}
                        />
                    </TouchableOpacity>

                    <Text style={{
                        width: "70%",
                        textAlign: 'center',
                        alignItems: 'center',
                        fontSize: 14,
                        color: '#404040',
                        fontFamily: 'Quicksand-Bold'
                    }}>
                        {date}
                    </Text>

                    <TouchableOpacity
                        style={{
                            width: "15%",
                        }}
                        onPress={() => {
                            let currentMonth = this.state.currentMonth
                            let currentYear = this.state.currentYear
                            if (currentMonth == 12) {
                                currentMonth = 1
                                currentYear = +currentYear + 1
                            }
                            else {
                                currentMonth = +currentMonth + 1
                            }
                            this.state.currentMonth = currentMonth
                            this.state.currentYear = currentYear
                            this.monthDays()
                            this.onMonthChanged()
                        }}
                    >

                        <Image
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                marginLeft: 20,
                                alignItems: 'flex-end',
                                selfAlign: 'flex-end',
                                justifyContent: 'flex-end'
                            }}
                            source={require('../../images/calendar_right_arrow.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginTop: 16,
                    flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <Text style={
                        styles.text_header}>
                        Mon
            </Text>
                    <Text style={
                        styles.text_header}>
                        Tue
            </Text>
                    <Text style={
                        styles.text_header}>
                        Wed
            </Text>
                    <Text style={
                        styles.text_header}>
                        Thu
            </Text>
                    <Text style={
                        styles.text_header}>
                        Fri
            </Text>
                    <Text style={
                        styles.text_header}>
                        Sat
            </Text>
                    <Text style={
                        styles.text_header}>
                        Sun
            </Text>
                </View>

            </View>
        )
    };

    _renderItem = ({ item }) => {

        this.state.refresh = false

        let currentMonth = this.state.currentMonth
        let currentDay = item.day
        currentDay = String(currentDay).padStart(2, '0');
        currentMonth = String(currentMonth).padStart(2, '0');
        let currentYear = this.state.currentYear
        let date = currentDay + "-" + currentMonth + "-" + currentYear
        //console.log('date => ' + this.state.today, date)

        let is_current_date = date == this.state.today


        let txt_style = is_current_date ? styles.text_inner_today : styles.text_inner
        let resource = null

        if (item.session_scheduled) {

            if (item.is_cancelled == true || item.attendance_happened==false) {
                resource = require("../../images/gray_circle.png")
            }
            else if (item.attendance_happened && item.is_present) {
                resource = require("../../images/calendar_right.png")
            } else if (item.attendance_happened && !item.is_present) {
                resource = require("../../images/calendar_cross.png")
            }
        }

        // let resource = is_show_cross ? require("../../images/calendar_cross.png") : null
        // if (!is_show_cross)
        //     resource = is_show_right ? require("../../images/calendar_right.png") : null

        return (

            <TouchableOpacity style={styles.text_date_header}
                onPress={() => {
                    this.onDateSelected(item)
                }}
            >
                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={txt_style}>{item.day}</Text>
                    <Image
                        style={{
                            width: 12, height: 12,
                            alignContent: 'center',
                            marginBottom: 6
                        }}
                        source={resource}
                    />

                </View>

            </TouchableOpacity>
        )
    };


    render() {

        


        let dayArray = this.state.dayArray
        let monthly_data = this.state.monthly_attendance_report;

        console.log('dayArray', dayArray);
        console.log('monthly_data', monthly_data);

        return (
            <View style={styles.container}>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={defaultStyle.spinnerTextStyle}
                />

                <FlatList
                    contentContainerStyle={{
                        flexGrow: 0
                    }}
                    columnWrapperStyle={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}

                    numColumns={7}
                    data={dayArray}
                    extraData={this.state.refresh}
                    renderItem={this._renderItem}
                    ListHeaderComponent={this._renderHeaderItem}
                />

                    {this.attendanceSummary(monthly_data)}

            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        data: state.PlayerBatchReducer,
    };
};
const mapDispatchToProps = {
    getPlayerBatchAttendenceDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar);


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: "100%",
        padding: 12,
    },
    text_inner: {
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 12,
        marginTop: 4,
        marginBottom: 4,
        color: '#4A4A4A',
        fontFamily: 'Quicksand-Medium',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_inner_today: {
        paddingLeft: 8,
        marginTop: 4,
        marginBottom: 4,
        paddingRight: 8,
        fontSize: 12,
        color: '#FFFFFF',
        fontFamily: 'Quicksand-Medium',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#667DDB',
        borderRadius: 12

    },
    text_date_header: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: "14%",

    },
    text_header: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: "14%",
        padding: 8,
        fontSize: 12,
        color: '#9B9B9B',
        fontFamily: 'Quicksand-Medium'
    },
    text_bold_header: {
        fontSize: 12,
        color: '#404040',
        fontFamily: 'Quicksand-Bold'
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    sliderImage: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        flex: 1,
        resizeMode: 'stretch',
    },
    calendarControls: {
        fontSize: 14,
        color: '#4A4A4A',
        fontWeight: '500',
        fontFamily: 'Quicksand-Regular',
    },
    day: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: 'Quicksand-Regular',
    },
    hasEventCircle: {
        backgroundColor: 'red',
    },
    dayCircleFiller: {
        //borderRadius:0
    },
    calendarContainer: {
        backgroundColor: '#F2F2F2'
    },
    calendarHeading: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        fontSize: 12,
        fontWeight: '500',
        color: '#9B9B9B',
        fontFamily: 'Quicksand-Regular',
    },
    dayButton:
    {
        borderTopWidth: 0,
    },

    calendarOuter: {
        paddingVertical: 20,
        paddingHorizontal: 5,
        backgroundColor: '#F2F2F2'
    },
    summaryCardOuter: {
        borderRadius: 16,
        marginBottom: 8,
        elevation: 2,
        paddingHorizontal: 30,
        paddingVertical: 25
    },
    summaryText: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
    },
    attendanceText: {
        fontSize: 14,
        fontFamily: 'Quicksand-Regular',
        color: '#404040'
    },
    dateText: {
        fontSize: 15,
        fontFamily: 'Quicksand-Regular',
        fontWeight: '500',
        color: '#404040',
    },
    attSessionLabelOuter: {
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 7
    },
    attSessionLabel: {
        fontSize: 10,
        color: '#A3A5AE',
        width: '33.33%',
        fontFamily: 'Quicksand-Regular',
        fontWeight: '500'
    },
    attSessionValueOuter: {
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        marginBottom: 25
    },
    attSessionValue: {
        fontSize: 14,
        color: '#404040',
        width: '33.33%',
        fontFamily: 'Quicksand-Regular',
    },
});


