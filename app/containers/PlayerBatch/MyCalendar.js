import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Platform, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import BaseComponent, { defaultStyle, getFormatTime } from '../BaseComponent';
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

    getCancelLabel(item) {

        let currentMonth = this.state.currentMonth
        let currentYear = this.state.currentYear
        let day = item.day

        let selectedDate = new Date(day + '-' + currentMonth + '-' + currentYear)
        var today = new Date();
        console.log('SelecedDate->', day + '-' + currentMonth + '-' + currentYear)
        const selectedTime = moment(currentYear + "/" + currentMonth + "/" + day).format("x");
        console.log('today->', today.getTime())
        console.log('selectedTime->', selectedTime)
        if (selectedTime > today.getTime()) {
            return 'Session yet to happen'
        } else {
            return 'Attendance didn\'t happen'
        }
    }

    attendanceSummary(data) {

        //console.warn('attendanceSummary', data);
        //console.warn('this.state.isAttendanceHappenedInMonth', this.state.isAttendanceHappenedInMonth);
        //console.warn('this.state.selectedDateData', this.state.selectedDateData);
        const {selectedDateData} = this.state
        return (

            <View style={styles.summaryCardOuter}>

                {
                    this.state.isAttendanceHappenedInMonth ?
                        <View style={{
                            padding: 16
                        }}>
                            <View style={styles.summaryText}>
                                <Text style={styles.attendanceText}>Attendance Summary for</Text>
                                <Text style={styles.dateText}> {data.month} {data.year}</Text>
                            </View>

                            <View style={styles.attSessionLabelOuter}>
                                <Text style={styles.attSessionLabel}>Attendance%</Text>
                                <Text style={styles.attSessionLabel}>Sessions Attended</Text>
                            </View>
                            <View style={styles.attSessionValueOuter}>
                                <Text style={styles.attSessionValue}>{data.attendance}%</Text>
                                <Text style={styles.attSessionValue}>{data.session_attended}/{data.total_session}</Text>
                            </View>
                            {
                                selectedDateData != null &&

                                (selectedDateData.session_scheduled == false ?
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1
                                    }}><Text style={
                                        defaultStyle.regular_text_14
                                    }>No attendance for this month</Text></View>
                                    : (
                                        selectedDateData.is_cancelled == true ?
                                            <View>
                                                <Text style={[defaultStyle.regular_text_14, {
                                                    color: '#A3A5AE'
                                                }]}>Session cancelled due to - {selectedDateData.cancellation_reason}</Text></View> : (
                                                selectedDateData.attendance_happened == false ? <View>
                                                    <Text style={[defaultStyle.regular_text_14, {
                                                        color: '#A3A5AE'
                                                    }]}>{this.getCancelLabel(selectedDateData)}</Text></View> : (
                                                        <View>
                                                            <View style={styles.summaryText}>
                                                                <Text style={styles.attendanceText}>Attendance </Text>
                                                                <Text style={styles.dateText}>{moment.utc(this.state.selectedDate).local().format("Do MMM YY")}</Text>
                                                            </View>

                                                            <View style={styles.attSessionLabelOuter}>
                                                                <Text style={styles.attSessionLabel}>Session</Text>
                                                                <Text style={styles.attSessionLabel}>Status</Text>
                                                                <Text style={styles.attSessionLabel}>Time</Text>
                                                            </View>
                                                            <View style={styles.attSessionValueOuter}>
                                                                <Text style={styles.attSessionValue}>{selectedDateData.session_name}</Text>
                                                                <Text style={styles.attSessionValue}>{selectedDateData.is_present ? 'P' : 'A'}</Text>
                                                                <Text style={styles.attSessionValue}>
                                                                    {getFormatTime(selectedDateData.start_time)} -
                                                                {getFormatTime(selectedDateData.end_time)}</Text>
                                                            </View>
                                                        </View>
                                                    )
                                            )
                                    )
                                )

                            }

                        </View> : <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1
                        }}><Text style={
                            defaultStyle.regular_text_14
                        }>No attendance for this month</Text></View>
                }

            </View>
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
        console.log('item is', item)
        let date = item
        let day = this.state.currentDay;
        let month = this.state.currentMonth;
        let year = this.state.currentYear;
        console.log(day + "/" + (+month) + "/" + year)
        console.log('onDateSelected', JSON.stringify(item));
        this.state.selectedDate = new Date(year, (month - 1), item.day);
        console.log(new Date(2019, 7, 10));
        console.log(day, day)
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
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>

                    <TouchableOpacity
                        style={{
                            width: "15%",
                        }}
                        onPress={() => {
                            let currentMonth = this.state.currentMonth
                            let currentYear = this.state.currentYear
                            this.setState({ selectedDateData: null })
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
                            this.setState({ selectedDateData: null })
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

        // if (item.session_scheduled) {

        //     if (item.is_cancelled == true) {// || item.attendance_happened == false
        //         resource = require("../../images/gray_circle.png")
        //     }
        //     else if (item.attendance_happened && item.is_present) {
        //         resource = require("../../images/calendar_right.png")
        //     } else if (item.attendance_happened && !item.is_present) {
        //         resource = require("../../images/calendar_cross.png")
        //     }
        // }

        if (item.is_present && item.is_compensatory !== undefined && item.is_compensatory) {
            resource = require("../../images/check.png")
        } else if (item.is_cancelled == true || (item.session_scheduled == true &&
            item.attendance_happened == false)) {
            resource = require("../../images/gray_circle.png")
        } else if (item.attendance_happened && item.is_present) {
            resource = require("../../images/calendar_right.png")
        } else if (item.attendance_happened && !item.is_present) {
            resource = require("../../images/calendar_cross.png")
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
                        resizeMode="contain"
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


            <View style={
                styles.parent
            }>
                <View style={styles.container}>

                    <Spinner
                        visible={this.state.spinner}
                        textStyle={defaultStyle.spinnerTextStyle}
                    />

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        style={{
                            height: 300
                        }}
                        contentContainerStyle={{
                            flexGrow: 0,

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


                </View>

                <ScrollView>

                    {this.attendanceSummary(monthly_data)}
                </ScrollView>

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
    parent: {
        backgroundColor: 'white',
        width: '100%',
        height: "100%",
    },
    container: {
        padding: 12,
        backgroundColor: '#F7f7f7'
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
        elevation: 5,
        padding: 16,
        marginBottom: 4,
        backgroundColor: 'white'
    },
    summaryText: {
        flexDirection: 'row',
        alignItems: 'center'
        //justifyContent: 'space-between',
    },
    attendanceText: {
        fontSize: 14,
        fontFamily: 'Quicksand-Regular',
        color: '#404040'
    },
    dateText: {
        fontSize: 15,
        fontFamily: 'Quicksand-Medium',
        color: '#404040',
    },
    attSessionLabelOuter: {
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        marginTop: 14,
        marginBottom: 7
    },
    attSessionLabel: {
        fontSize: 10,
        color: '#A3A5AE',
        width: '33.33%',
        fontFamily: 'Quicksand-Medium',
    },
    attSessionValueOuter: {
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        marginBottom: 25
    },
    attSessionValue: {
        fontSize: 12,
        color: '#404040',
        width: '33.33%',
        fontFamily: 'Quicksand-Regular',
    },
});


