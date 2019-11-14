import React from 'react'

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Dimensions, Modal, Platform } from 'react-native'
import BaseComponent, { defaultStyle, SESSION_DATE_FORMAT } from '../BaseComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { getCourtBookingDetails, createBooking } from '../../redux/reducers/CourtBookingReducer';
import { connect } from 'react-redux';
import { getData, isSignedIn } from "../../components/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';

var block_array = 2
var percent = 1.77
//var block_array = 4
//var percent = 1
var NO_COURT_MSG = 'Sorry, no courts available for selected time and duration.';

class ChooseTimeDate extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            academyId: '',
            academyName: '',
            courtBookingDetails: null,
            spinner: false,
            currentDay: '',
            currentMonth: '',
            currentYear: '',
            today: '',
            selectedDate: '',
            showDays: 7,
            calendarData: null,
            bookingDetails: null,
            sportsData: null,
            selectedSportsId: null,
            selectedSportTimeData: null,
            selectedDuration: null,
            selectedIndex: 0,
            selectedTimeRange: {},
            minTime: null,
            maxTime: null,
            courtAvailability: [],
            sliderData: null,
            availableCourts: null,
            finalDeadSlots: [],
            selectedCourtIds: [],
            selectedCourtNames: [],
            totalCost: 0,
            totalNoOfHours: 0,
            courtInfoMessage: '',
            modalVisible: false,
            paymentData: null,
            //slideToIndex: 4,
        };


        var today = new Date();
        this.state.currentDay = String(today.getDate()).padStart(2, '0');
        this.state.currentMonth = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        this.state.currentYear = today.getFullYear();
        this.state.today = this.state.currentDay + "-" + this.state.currentMonth + "-" + this.state.currentYear;
        this.state.selectedDate = this.state.today;
        this.getCalendar();

    }


    getCalendar() {
        let currentDay = this.state.currentDay;
        let currentMonth = this.state.currentMonth
        let currentYear = this.state.currentYear
        let days = new Date(currentYear, currentMonth, 0).getDate();
        let curDay = new Date().getDate();
        let dateObjArray = []

        for (i = 0; i < this.state.showDays; i++) {

            var dateObj = {};
            dateObj['day'] = String(curDay).padStart(2, '0');
            dateObj['month'] = moment(new Date(currentYear, String(currentMonth - 1).padStart(2, '0'), dateObj['day']), 'YYY-MM-DD').format('MMM');
            dateObj['year'] = currentYear;
            dateObj['date'] = dateObj['day'] + "-" + String(currentMonth).padStart(2, '0') + "-" + currentYear;
            if (i == 0) {
                dateObj['selected'] = true;
            } else {
                dateObj['selected'] = false;
            }
            if (curDay == days) {
                curDay = 1;
                if (currentMonth == 12) {
                    currentMonth = 1;
                    currentYear = +currentYear + 1
                }
                else {
                    currentMonth = +currentMonth + 1
                }
            }
            else {
                curDay++;
            }

            dateObjArray.push(dateObj);
        }

        this.state.calendarData = dateObjArray;

        console.log('hellllllllllllllllllllo', JSON.stringify(this.state.calendarData));
        console.log('dateObjArray', dateObjArray);

    }

    componentDidMount() {
        console.log('hiiiiiiiiiiiiiiiiiiiiii');
        // getData('userInfo', (value) => {
        //     userData = JSON.parse(value);
        //     console.log('userData', userData);
        //     this.state.academyId = userData['academy_id'];
        //     console.log('this.state.academyId', this.state.academyId);
        //     this.state.academyName = userData['academy_name'];


        // });

        console.log(this.props.navigation.getParam('id', ''))
        console.log(this.props.navigation.getParam('name', ''))

        this.state.academyId = this.props.navigation.getParam('id', '');
        this.state.academyName = this.props.navigation.getParam('name', '');
        this.getBookingDetails(this.state.today, this.state.selectedSportsId);
        setTimeout(()=>{
            if (this._carousel)
                this._carousel.snapToItem(this.state.slideToIndex);
        }, 3000)
    }

    convertTimeStringToMins(time, startOrEndTime = 'startTime') {
        let arr = time.split(":");
        let result = (arr[0] * 60) + (arr[1] * 1);
        //if(startOrEndTime === 'endTime' && result === 0){
        //    result = 1440
        //}
        console.log('convertTimeStringToMins input=' + time + ', out=' + result)
        return result
    }

    convertMinsToHrsMins(minutes) {

        //console.log('convertMinsToHrsMins=> ' + minutes)
        if (minutes == undefined || isNaN(minutes))
            return ''

        var h = Math.floor(minutes / 60);
        var m = minutes % 60;
        let am_pm = 'AM';
        let _h = h;
        if (h >= 13) {
            _h = _h - 12;
        }
        if (h > 11) {
            am_pm = 'PM';
        }
        if (h == 24) {
            am_pm = 'AM';
            _h = 0;
        }
        let _m = m < 10 ? '0' + m : m;
        return _h + ':' + _m + ' ' + am_pm;
    }

    convertMinsToHrs(minutes) {
        var h = Math.floor(minutes / 60);
        var m = minutes % 60;

        var res;

        if (m == 0 && h == 1) {
            res = '60 min';
        }
        else {
            if (h >= 1 && m > 0) {
                res = h + ' hrs ' + m + ' min'
            }
            else if (h > 1) {
                res = h + ' hrs'
            }
            else {
                res = m + ' min'
            }
        }
        return res;
    }

    convertMinsToHrsMins_sql(minutes) {
        var h = Math.floor(minutes / 60);
        var m = minutes % 60;
        if (h == 24) {
            h = 0;
        }
        return (((h < 10) ? '0' : '') + '' + h) + ':' + (((m < 10) ? '0' : '') + '' + m) + ':00';
    }

    getBookingDetails(date, sportsId) {
        this.progress(true)
        getData('header', (value) => {
            this.props.getCourtBookingDetails(value, this.state.academyId, this.state.selectedDate, sportsId).then(() => {
                //this.progress(false)
                console.log('this.props.data', this.props.data);
                let data = this.props.data.res

                console.log('data.data.challenges', JSON.stringify(data.data));

                let success = data.success
                if (success) {

                    data.data.sports.map((element, index) => {
                        if (element.is_selected == true) {
                            this.setState({
                                selectedSportTimeData: element,
                                selectedDuration: element.min_booking_time
                            })
                        }
                    });

                    var bookingDetails = data.data.courts;

                    this.setState({
                        sportsData: data.data.sports,
                        courtBookingDetails: bookingDetails,
                    }, () => {
                        console.log('sportsData', this.state.sportsData);
                    });

                    var courtTimings = [], courtBookings = [], courtAvailability1 = [], minMaxTime = {}, minTime, maxTime, timeRange = {}, allCourtsDeadSlots = [], finalDeadSlots = [], courtAvailability = [], sliderData = [];


                    /* split court data to timings and bookings array and convert time to minutes*/
                    courtTimings = this.convertArrayHoursToMinutes(bookingDetails, 'court_timings');
                    courtBookings = this.convertArrayHoursToMinutes(bookingDetails, 'court_bookings');

                    /* get all available courts from court bookings and court timings*/
                    courtAvailability1 = this.getAllAvailableCourts(courtTimings, courtBookings);

                    console.log('courtAvailability1', JSON.stringify(courtAvailability1));

                    /*get min and max time to plot slider, get data for showing time range */
                    minMaxTime = this.getMinAndMaxTimeofSlider(courtTimings);
                    console.log('minMaxTime->', JSON.stringify(minMaxTime))
                    minTime = minMaxTime['minTime'];
                    maxTime = minMaxTime['maxTime']
                    this.state.minTime = minTime;
                    this.state.maxTime = maxTime;
                    timeRange['startTime'] = minTime;
                    timeRange['endTime'] = minTime + this.state.selectedDuration;
                    this.setState({
                        selectedTimeRange: timeRange
                    }, () => {
                        console.log('selectedTimeRange', this.state.selectedTimeRange);
                    })

                    /* get dead slots of all individual courts*/
                    allCourtsDeadSlots = this.getAllCourtsDeadSlots(courtTimings);

                    /* get final dead slots to show on slider*/
                    console.log('allCourtsDeadSlots-> ', JSON.stringify(allCourtsDeadSlots))
                    finalDeadSlots = this.getFinalDeadSlots(allCourtsDeadSlots);
                    console.log('finalDeadSlots1->', JSON.stringify(finalDeadSlots))

                    courtAvailability = this.getFinalCourtAvailability(finalDeadSlots, courtAvailability1);
                    console.log('courtAvailability->', JSON.stringify(courtAvailability))

                    /* make slider data to show slider*/
                    sliderData = this.makeSliderData(finalDeadSlots, courtAvailability1);
                    console.log('FinalSlider->', JSON.stringify(sliderData))

                    this.setState({
                        courtAvailability: courtAvailability,
                        sliderData: sliderData,
                        finalDeadSlots: finalDeadSlots
                    }, () => {
                        console.log('courtAvailability', this.state.courtAvailability);
                    });

                    /*check if any court is available in the selected timings*/
                    this.checkCourtAvailability();



                    console.log('courtTimings', courtTimings);
                    console.log('courtBookings', courtBookings);
                    console.log('minTime', minTime, this.convertMinsToHrsMins_sql(minTime));
                    console.log('maxTime', maxTime, this.convertMinsToHrsMins_sql(maxTime));
                    console.log('allCourtsDeadSlots', allCourtsDeadSlots);
                    console.log('finalDeadSlots======', finalDeadSlots);
                    console.log('sliderData======', sliderData);

                    // courtAvailability.map((element, index) => {
                    //     console.log(element.court_id);
                    //     element.court_availability.map((element1, index1) => {
                    //         element1['startTime'] = this.convertMinsToHrsMins_sql(element1.startTime);
                    //         element1['endTime'] = this.convertMinsToHrsMins_sql(element1.endTime);
                    //         // console.log('element', element);
                    //     })
                    // })

                    this.progress(false);

                }

            }).catch((response) => {
                this.progress(false)
                console.log(response);
            })
        })
    }

    convertArrayHoursToMinutes(bookingDetails, name) {
        var newArray = [];
        bookingDetails.map((element, index) => {

            var item = {};
            item['name'] = element.name;
            item['court_id'] = element.court_id;
            item['pricing_plan'] = element.pricing_plan;
            item[name] = [];

            element[name].map((element1, index1) => {
                var timing = {};
                if (name == 'court_timings') {
                    timing['startTime'] = this.convertTimeStringToMins(element1.open_time);
                    timing['endTime'] = this.convertTimeStringToMins(element1.close_time, 'endTime');
                } else if (name == 'court_bookings') {
                    timing['startTime'] = this.convertTimeStringToMins(element1.start_time);
                    timing['endTime'] = this.convertTimeStringToMins(element1.end_time, 'endTime');
                }
                item[name].push(timing);
            })

            newArray.push(item);
        })

        return newArray;
    }

    getAllAvailableCourts(courtTimings, courtBookings) {

        var newArray = [];

        courtTimings.map((ele, ind) => {

            var item = {};
            item['name'] = ele.name;
            item['court_id'] = ele.court_id;
            item['pricing_plan'] = ele.pricing_plan;
            item['court_availability'] = [];
            var flag = 0;
            var newflag = 1;
            var tflag = false;
            var elseflag = 0;
            var cTime = false;

            ele['court_timings'].map((element, index) => {
                cTime = false;

                for (i = flag; i < courtBookings[ind]['court_bookings'].length; i++) {

                    var element1 = courtBookings[ind]['court_bookings'][i];

                    console.log('i', i, ' newflag', newflag);
                    console.log('elseflsg', elseflag);
                    if (elseflag > 0) {
                        console.log('in new condition');
                        newflag = i;
                    }
                    if (i > 0 && newflag == i) {

                        console.log('heyyy');
                        if (element1.startTime < element.endTime) {
                            //console.log('in if 1');
                            if (element1.startTime != courtBookings[ind]['court_bookings'][i - 1].endTime) {
                                // console.log('in if 2');
                                //console.log(courtBookings[ind]['court_bookings'][i - 1].endTime);
                                var timing = {};
                                timing['startTime'] = courtBookings[ind]['court_bookings'][i - 1].endTime;
                                timing['endTime'] = element1.startTime;
                                console.log('timimggggggggggg', timing);
                                item['court_availability'].push(timing);
                                newflag = i;
                                elseflag = elseflag + 1;
                                cTime = true;
                            }
                            if (courtBookings[ind]['court_bookings'].length > i + 1 && courtBookings[ind]['court_bookings'][i + 1].startTime > element.endTime) {
                                //console.log('in if 3');
                                if (element1.endTime != element.endTime) {
                                    //console.log('in if 4');
                                    var timing = {};
                                    timing['startTime'] = element1.endTime;
                                    timing['endTime'] = element.endTime;
                                    console.log('timimggggggggggg11', timing);
                                    item['court_availability'].push(timing);
                                    cTime = true;
                                }
                                // console.log('in else');
                                flag = i + 1;
                                tflag = true;
                                elseflag = 0;
                                break;
                            }
                            else if (courtBookings[ind]['court_bookings'].length == i + 1 && element1.startTime < element.endTime) {
                                //console.log('in if 5');
                                if (element1.endTime != element.endTime) {
                                    //console.log('in if 6');
                                    var timing = {};
                                    timing['startTime'] = element1.endTime;
                                    timing['endTime'] = element.endTime;
                                    console.log('timimggggggggggg22', timing);
                                    item['court_availability'].push(timing);
                                    cTime = true;
                                }
                                //console.log('in else');
                                flag = i + 1;
                                tflag = true;
                                elseflag = 0;
                                break;
                            }
                        }



                    }
                    else {
                        //console.log('---------111111111-', tflag, newflag, 'i', i)
                        if (tflag) {
                            //console.log('----------', newflag, 'i', i)
                            newflag = i + 1;
                            elseflag = 0;
                        }
                        if (element.startTime != element1.startTime && element1.startTime > element.startTime && element1.endTime <= element.endTime) {
                            //console.log('in else 1');
                            var timing = {};
                            timing['startTime'] = element.startTime;
                            timing['endTime'] = element1.startTime;
                            console.log('timimggggggggggg33', timing);
                            item['court_availability'].push(timing);
                            cTime = true;
                        }
                        if ((element.endTime != element1.endTime) && (element1.startTime >= element.startTime && element1.endTime < element.endTime) && (courtBookings[ind]['court_bookings'].length == 1 || courtBookings[ind]['court_bookings'].length - 1 == i)) {
                            //console.log('in else 2')
                            var timing = {};
                            timing['startTime'] = element1.endTime;
                            timing['endTime'] = element.endTime;
                            console.log('timimggggggggggg44', timing);
                            item['court_availability'].push(timing);
                            cTime = true;
                        }
                        /*if ((element.startTime != element1.startTime && element.endTime != element1.endTime)) {
                            //&& (ele['court_timings'].length==1 || courtBookings[ind]['court_bookings'].length)
                            console.log('in else 3')
                            //console.log(element1.startTime < element.startTime)
                            //console.log(element1.startTime < element.startTime)
                            if ((element1.startTime < element.startTime) && (element1.endTime < element.startTime)) {
                                //console.log('in else 4')
                                var timing = {};
                                timing['startTime'] = element.startTime;
                                timing['endTime'] = element.endTime;
                                console.log('timimggggggggggg55', timing);
                                item['court_availability'].push(timing);
                            }
                            if ((element1.startTime > element.endTime) && (element1.endTime > element.endTime)) {
                                //console.log('in else 5')
                                var timing = {};
                                timing['startTime'] = element.startTime;
                                timing['endTime'] = element.endTime;
                                console.log('timimggggggggggg66', timing);
                                item['court_availability'].push(timing);
                            }
                        }*/
                    }

                }

                if (cTime == false) {
                    console.log('in false');
                    var timing = {};
                    timing['startTime'] = element.startTime;
                    timing['endTime'] = element.endTime;
                    console.log('timimggggggggggg55', timing);
                    item['court_availability'].push(timing);
                    console.log('item.court_availability', item['court_availability']);
                }

                else if (i == 0) {
                    var timing = {};
                    timing['startTime'] = element.startTime;
                    timing['endTime'] = element.endTime;
                    console.log('timimggggggggggg66', timing);
                    item['court_availability'].push(timing);
                }


            })

            newArray.push(item);

        })

        console.log('getAllAvailableCourts->', JSON.stringify(newArray))

        return newArray;


    }

    //find min and max time of courts
    getMinAndMaxTimeofSlider(courtTimings) {
        var newObj = {};
        var minTime, maxTime;

        courtTimings.map((ele, index) => {
            var length = ele['court_timings'].length;
            if (index == 0) {
                minTime = ele['court_timings'][0].startTime;
                maxTime = ele['court_timings'][length - 1].endTime;
            }
            else {
                console.log('getMinAndMaxTimeofSlider=' + ele['court_timings'][0].startTime + '<' + minTime + ' == status=' + ele['court_timings'][0].startTime < minTime)
                if (ele['court_timings'][0].startTime < minTime) {
                    minTime = ele['court_timings'][0].startTime;
                }
                if (ele['court_timings'][length - 1].endTime > maxTime) {
                    maxTime = ele['court_timings'][length - 1].endTime;
                }
            }
        })

        newObj['minTime'] = minTime;
        newObj['maxTime'] = maxTime;

        return newObj;
    }

    getAllCourtsDeadSlots(courtTimings) {
        console.log('getAllCourtsDeadSlots', JSON.stringify(courtTimings))
        var newArray = [];
        courtTimings.map((ele, index) => {
            var item = {};
            item['name'] = ele.name;
            item['court_id'] = ele.court_id;
            item['pricing_plan'] = ele.pricing_plan;
            item['dead_slots'] = [];

            var courtDeadSlots = this.getSingleCourtDeadSlots(ele['court_timings']);
            item['dead_slots'] = courtDeadSlots;
            console.log('dead_slots', JSON.stringify(courtDeadSlots))
            newArray.push(item);
        });
        console.log('courtTimings->', JSON.stringify(courtTimings))
        return newArray;
    }

    getSingleCourtDeadSlots(arr) {

        var newArray = [];
        console.log('getSingleCourtDeadSlots=>', JSON.stringify(arr))

        arr.map((element, index) => {

            if (arr.length == 1) {
                if (+element.startTime > this.state.minTime) {
                    var timing = {};
                    timing['startTime'] = this.state.minTime;
                    timing['endTime'] = +element.startTime;
                    newArray.push(timing);
                }
                if (+element.endTime < this.state.maxTime) {
                    var timing = {};
                    timing['startTime'] = +element.endTime;
                    timing['endTime'] = this.state.maxTime;
                    newArray.push(timing);
                }
            }
            else {
                if (index == 0) {
                    if (+element.startTime > this.state.minTime) {
                        var timing = {};
                        timing['startTime'] = this.state.minTime;
                        timing['endTime'] = +element.startTime;
                        newArray.push(timing);
                    }
                }
                if (index == arr.length - 1) {
                    if (+element.endTime < this.state.maxTime) {
                        var timing = {};
                        timing['startTime'] = +element.endTime;
                        timing['endTime'] = this.state.maxTime;
                        newArray.push(timing);
                    }
                }

                if (index <= (arr.length - 2) && +element.endTime != arr[index + 1].startTime) {
                    var timing = {};
                    timing['startTime'] = +element.endTime;
                    timing['endTime'] = arr[index + 1].startTime;
                    newArray.push(timing);
                }

            }

        });

        console.log('newArray->', JSON.stringify(newArray))
        return newArray;
    }

    getFinalDeadSlots(allCourtsDeadSlots) {
        var intersect;
        console.log('getFinalDeadSlots->', JSON.stringify(allCourtsDeadSlots))
        allCourtsDeadSlots.map((ele, index) => {
            console.log('allCourtsDeadSlots->', JSON.stringify(ele))
            if (allCourtsDeadSlots.length == 1) {
                intersect = ele.dead_slots
            } else {
                if (index == 0) {
                    intersect = this.getIntersectingDeadSlots(ele.dead_slots, allCourtsDeadSlots[index + 1].dead_slots);
                }
                else if (index <= allCourtsDeadSlots.length - 2) {
                    intersect = this.getIntersectingDeadSlots(intersect, allCourtsDeadSlots[index + 1].dead_slots);
                }
            }

        })

        return intersect;
    }

    has30MinCondition(selectedSportTimeData) {
        let min_booking_time = selectedSportTimeData.min_booking_time
        let incremental_time = selectedSportTimeData.incremental_time
        if (min_booking_time % 30 == 0 && incremental_time % 30 == 0) {
            return true
        } else {
            return false
        }
    }

    getTodayTime() {

        // var today = new Date();
        // let today_time = moment(today).format("hh:mm a")
        // let today_date = moment(today).format("DD-MM-YYYY")
        // console.log('today=> ', today_time)
        // console.log('today=> ', this.state.selectedDate)
        // console.log('today=_date=> ', today_date)

        var today = new Date();
        let today_date = moment(today).format("DD-MM-YYYY")
        return today_date == this.state.selectedDate


    }

    getDeadSlotfromAvailableCourt(courtAvailability1, timing) {
        let is_dead = true
        timing = timing+1
        let courtAvailability = courtAvailability1
        for(let i =0;i<courtAvailability.length;i++){
            let element = courtAvailability[i]

            for(let j=0;j<element.court_availability.length;j++){

                let element1 = element.court_availability[j]
                if (timing >= element1.startTime && timing<= element1.endTime) {
                    is_dead = false
                    break
                }
            }
        }
        
        console.log('getDeadSlotfromAvailableCourt-timing->'+timing+"- is_dead "+is_dead)
        return is_dead
    }

    makeSliderData(finalDeadSlots, courtAvailability1) {

        console.log('selectedSportTimeData', JSON.stringify(this.state.selectedSportTimeData))
        console.log('makeSliderData->courtAvailability1', JSON.stringify(courtAvailability1))


        let has30Min = this.has30MinCondition(this.state.selectedSportTimeData)
        let incrementalTime = 15
        if (has30Min) {
            incrementalTime = 30
            block_array = 2
            // if(Platform.OS == 'ios')
            // percent = 1.80
            // else
            percent = 1.77
        } else {
            incrementalTime = 15
            block_array = 4
            percent = 1
        }

        var sliderData = [];

        //this will help to lead space on start, help us to start from center
        for (let i = 0; i < block_array; i++) {
            sliderData.push(null);
        }
        //end



        let todaySelected = this.getTodayTime()
        console.log('todaySelected=>', todaySelected)
        let todayPastTime = -1
        if (todaySelected) {
            var today = new Date();
            let today_time = moment(today).format("HH:mm")
            console.log('todaySelected=>time', today_time)
            todayPastTime = this.convertTimeStringToMins(today_time)
            console.log('todaySelected=>format_time', todayPastTime)
        }

        var index = 4;
        var time = this.state.minTime;
        console.log('Time=>' + time + " maxTime=" + this.state.maxTime)
        //return 
        var slidePointer = true;
        while (time < this.state.maxTime) {

            console.log('While-> ', this.convertMinsToHrsMins(time))
            var minutes, time;
            if (index == 4) {
                time = this.state.minTime;
                newtime = this.convertMinsToHrsMins(time);
            } else {
                time = time + incrementalTime;
                newtime = this.convertMinsToHrsMins(time);
            }
            var temp = {};
            temp['title'] = newtime;
            temp['minutes'] = time;

            
//Rajat work
            if (todaySelected && time <= todayPastTime) {
                temp['deadslot'] = true;
            } else {
                temp['deadslot'] = this.getDeadSlotfromAvailableCourt(courtAvailability1,time);
            }

            if (index % 2 == 0)
                temp['showLabel'] = true;
            else
                temp['showLabel'] = false;

            //if (time != this.state.maxTime)
            sliderData.push(temp);
            index++;
            
            if(todaySelected && !temp['deadslot'] && slidePointer){
                console.log('index is', index);
                this.setState({ slideToIndex: index-5 }, () => {
                    if(this._carousel)
                        this._carousel.snapToItem(index-5);
                });
                slidePointer = false;
            }
                
        };

        if (index != 0) {
            if (sliderData[sliderData.length - 1]) {
                sliderData[sliderData.length - 1]['is_last'] = true
                sliderData[sliderData.length - 1]['showLabel'] = true
            }
        }




        sliderData.map((element, index) => {
            if (element != null) {
                console.log('finalDeadSlots1->', JSON.stringify(finalDeadSlots))
                finalDeadSlots.map((element1, index1) => {
                    //900-1020 === 1095-1110
                    //
                    console.log('element=>start=' + element.minutes + ', element1=' + JSON.stringify(element1))

                    if (element.minutes == element1.startTime || /*element.minutes == element1.endTime ||*/ (element.minutes > element1.startTime && element.minutes < element1.endTime)) {
                        console.log('element=>true->start=' + element.minutes + ', element1=' + JSON.stringify(element1))
                        sliderData[index]['deadslot'] = true
                    }
                })
            }
        })

        return sliderData;

    }

    checkCourtAvailability() {

        var courts = [];

        var selectedTimeRange = this.state.selectedTimeRange;
        console.log('selecedTime', JSON.stringify(selectedTimeRange))
        var msg = '';

        console.log('this.state.finalDeadSlots', this.state.finalDeadSlots);
        let todaySelected = this.getTodayTime()
        let todayPastTime = -1
        if (todaySelected) {
            var today = new Date();
            let today_time = moment(today).format("HH:mm")
            console.log('todaySelected=>time', today_time)
            todayPastTime = this.convertTimeStringToMins(today_time)
            console.log('todaySelected=>format_time', todayPastTime)
        }

        const finalDeadSlots = this.state.finalDeadSlots
        console.log('checkCourtAvailability->finalDeadSlots', JSON.stringify(finalDeadSlots))
        if (finalDeadSlots == undefined /*|| finalDeadSlots.length == block_array*/) {
            msg = 'Sorry, all courts are closed for the selected time and duration.';

        } else
            finalDeadSlots.map((element, index) => {
                console.log('finalDeadSlots=>', JSON.stringify(finalDeadSlots));
                console.log(selectedTimeRange['startTime']);
                console.log(selectedTimeRange['endTime']);
                if (selectedTimeRange['startTime'] >= element.startTime && selectedTimeRange['endTime'] <= element.endTime || (selectedTimeRange['startTime'] >= element.startTime && selectedTimeRange['startTime'] < element.endTime) || (selectedTimeRange['endTime'] <= element.startTime && selectedTimeRange['endTime'] > element.startTime)) {
                    console.log('in iffffffffffffffffffff');
                    msg = 'Sorry, all courts are closed for the selected time and duration.';
                }
            })

        console.log('checkCourtAvailability->courtAvailability', this.state.courtAvailability);
        console.log('checkCourtAvailability->msg', msg);

        if (msg == '') {
            console.log('checkCourtAvailability->CourtAvailability', JSON.stringify(this.state.courtAvailability))
            this.state.courtAvailability.map((element, index) => {
                element.court_availability.map((element1, index1) => {

                    console.log('selectedTimeRange.startTime', selectedTimeRange['startTime'])
                    console.log('selectedTimeRange.endTime', selectedTimeRange['endTime'])

                    if (todaySelected && selectedTimeRange['startTime'] < todayPastTime) {

                    }
                    else if (selectedTimeRange['startTime'] >= element1.startTime && selectedTimeRange['endTime'] <= element1.endTime) {
                        console.log(element1.startTime)
                        console.log(element1.endTime)
                        element['selected'] = false;
                        console.log('in if');
                        courts.push(element);
                    }
                })
            })
            console.log('courts=>', JSON.stringify(courts))
            if (courts.length == 0) {
                msg = 'Sorry, no courts available for selected time and duration.';
            }

        }


        this.setState({
            availableCourts: courts,
            courtInfoMessage: msg
        }, () => {
            console.log('availableCourts', this.state.availableCourts);
            if (this.state.availableCourts.length == 0) {

            }
        })

    }

    getIntersectingDeadSlots(arr1, arr2) {

        var newArray = [];
        console.log('getIntersectingDeadSlots-arr1', JSON.stringify(arr1))
        console.log('getIntersectingDeadSlots-arr2', JSON.stringify(arr2))


        arr1.map((element, index) => {

            arr2.map((element1, index) => {

                if (element.startTime == element1.startTime && element.endTime == element1.endTime) {
                    console.log('in if 1');
                    var timing = {};
                    timing['startTime'] = element.startTime;
                    timing['endTime'] = element.endTime;
                    newArray.push(timing);
                }
                else if (element.startTime == element1.startTime) {

                    if (element1.endTime < element.endTime) {
                        console.log('in if 2');
                        var timing = {};
                        timing['startTime'] = element1.startTime;
                        timing['endTime'] = element1.endTime;
                        newArray.push(timing);
                    }
                    else if (element.endTime < element1.endTime) {
                        console.log('in if 3');
                        var timing = {};
                        timing['startTime'] = element.startTime;
                        timing['endTime'] = element.endTime;
                        newArray.push(timing);
                    }


                }
                else if (element.endTime == element1.endTime) {
                    if (element1.startTime > element.startTime) {
                        console.log('in if 4');
                        var timing = {};
                        timing['startTime'] = element1.startTime;
                        timing['endTime'] = element1.endTime;
                        console.log(timing);
                        newArray.push(timing);
                    }
                    else if (element.startTime > element1.startTime) {
                        console.log('in if 5');
                        var timing = {};
                        timing['startTime'] = element.startTime;
                        timing['endTime'] = element.endTime;
                        console.log(timing);
                        newArray.push(timing);
                    }

                }
                else if (element1.startTime > element.startTime && element1.endTime < element.endTime) {
                    console.log(element1.startTime)
                    console.log(element.startTime)

                    console.log('in if 6');
                    var timing = {};
                    timing['startTime'] = element1.startTime;
                    timing['endTime'] = element1.endTime;
                    console.log(timing);
                    newArray.push(timing);
                }
                else if (element.startTime > element1.startTime && element.endTime < element1.endTime) {
                    console.log('in if 7');
                    var timing = {};
                    timing['startTime'] = element.endTime;
                    timing['endTime'] = element.endTime;

                    newArray.push(timing);
                }
                else if (element.startTime > element1.startTime && element.endTime > element1.endTime) {
                    console.log('elemnt_new-case')
                    var timing = {};
                    timing['startTime'] = element.startTime;
                    timing['endTime'] = element1.endTime;
                    newArray.push(timing);
                }
                else if (element.startTime < element1.startTime && element.endTime < element1.endTime) {
                    console.log('elemnt_new-else case1=>' + JSON.stringify(element) + "," + JSON.stringify(element1))
                    var timing = {};
                    timing['startTime'] = element.startTime;
                    timing['endTime'] = element.endTime;
                    newArray.push(timing);
                }
                else {

                }

            })
        })

        console.log('newArray-11', JSON.stringify(newArray));
        let temp_new_array = []
        for (let i = 0; i < newArray; i++) {
            let obj = newArray[i]
            if (obj.startTime != obj.endTime ) {
                temp_new_array.push(obj)
            }
        }
        newArray = temp_new_array
        console.log('newArray-11-modi', JSON.stringify(temp_new_array));

        return newArray;

    }

    getFinalCourtAvailability(arr1, arr2) {

        var newArray = JSON.parse(JSON.stringify(arr2));
        console.log('getFinalCourtAvailability->arr1', JSON.stringify(arr1))
        console.log('getFinalCourtAvailability->arr2', JSON.stringify(arr2))


        arr2.map((element, index) => {
            var temparray = [];
            arr1.map((element1, index1) => {
                element['court_availability'].map((element2, index2) => {

                    if (element1.startTime == element2.startTime && element1.endTime == element2.endTime) {
                        console.log('start_time=' + element1.startTime + '==' + element2.endTime + ', end_time=' + element1.endTime + '==' + element2.endTime)
                        console.log(index2);
                        var timing = {};
                        timing['startTime'] = element2.startTime;
                        timing['endTime'] = element2.endTime;
                        temparray.push(timing);
                        //newArray[index]['court_availability'].splice(index2, 1);
                    }
                    else if (element1.startTime >= element2.startTime && element1.startTime < element2.endTime) {
                        console.log(element1.startTime, element2.startTime)
                        console.log(element1.startTime, element2.endTime)
                        var timing = {};
                        timing['startTime'] = element2.startTime;
                        timing['endTime'] = element2.endTime;
                        temparray.push(timing);
                        console.log(index2)
                        //newArray[index]['court_availability'].splice(index2, 1);
                    }
                    else if (element1.endTime <= element2.endTime && element1.endTime > element2.startTime) {
                        var timing = {};
                        timing['startTime'] = element2.startTime;
                        timing['endTime'] = element2.endTime;
                        temparray.push(timing);
                        console.log(index2)
                        //newArray[index]['court_availability'].splice(index2, 1);
                    }

                })



            })

            console.log('temparray', temparray);


            temparray.map((element, index4) => {
                newArray[index]['court_availability'].map((element1, index1) => {
                    if (element.startTime == element1.startTime && element.endTime == element1.endTime)
                        newArray[index]['court_availability'].splice(index1, 1)
                })
            })



        })




        console.log('newArray111111111111111', newArray);

        return newArray;

    }


    progress(status) {
        this.setState({
            spinner: status
        })
    }

    toggleSportsSelector(selectedId) {

        if (selectedId != this.state.selectedSportsId) {

            var sportsPickerData = this.state.sportsData;
            this.state.sportsData.map((element, index) => {
                if (selectedId == element.id) {
                    sportsPickerData[index].is_selected = true;
                }
                else {
                    sportsPickerData[index].is_selected = false;
                }
            })

            this.setState({
                sportsData: sportsPickerData,
                selectedSportsId: selectedId
            }, () => {
                this.getBookingDetails(this.state.selectedDate, this.state.selectedSportsId)
            })

        }
    }

    toggleDateSelector(selectedDate) {

        console.log(selectedDate, this.state.selectedDate)

        if (selectedDate != this.state.selectedDate) {
            console.log('in if');

            var datePickerData = this.state.calendarData;
            this.state.calendarData.map((element, index) => {
                if (selectedDate == element.date) {
                    datePickerData[index].selected = true;
                }
                else {
                    datePickerData[index].selected = false;
                }
            })

            this.setState({
                calendarData: datePickerData,
                selectedDate: selectedDate,
                selectedCourtNames: [],
                selectedCourtIds: []
            }, () => {
                this.getBookingDetails(this.state.selectedDate, this.state.selectedSportsId)
            })
        }

        if (this._carousel)
            this._carousel.snapToItem(0);
    }

    courtSelector(selectedIndex) {
        console.log('selectedIndex', selectedIndex);
        var courts = this.state.availableCourts;
        console.log('courts', JSON.stringify(courts));
        courts[selectedIndex].selected = !courts[selectedIndex].selected;

        var totalCost = this.state.totalCost;
        var courtIds = this.state.selectedCourtIds;
        var courtNames = this.state.selectedCourtNames;
        var totalNoOfHours = this.state.totalNoOfHours;
        console.log('courtIds', JSON.stringify(courtIds));

        if (courts[selectedIndex].selected == true) {
            courtIds.push(courts[selectedIndex].court_id);
            courtNames.push(courts[selectedIndex].name);
            courts[selectedIndex]['pricing_plan'].map((element, index) => {
                if (element.time_interval == this.state.selectedDuration) {
                    totalCost = totalCost + element.price;
                    totalNoOfHours = totalNoOfHours + element.time_interval;
                }
            })
        } else {

            let temp = []
            this.state.availableCourts.map((element, index) => {
                if (element.court_id == courts[selectedIndex].court_id) {
                    // courtIds.splice(index, 1);
                    courtNames.splice(index, 1);
                    temp.push(element.court_id)
                }
                // courts[selectedIndex]['pricing_plan'].map((element, index) => {
                //     if (element.time_interval == this.state.selectedDuration) {
                //         console.log('minus---', totalCost + "-" + element.price)
                //         totalCost = totalCost - element.price;
                //         totalNoOfHours = totalNoOfHours - element.time_interval;

                //     }
                // })



            })
            console.log('temp=>', temp)
            let new_courtIds = []
            for (let i = 0; i < courts.length; i++) {
                let element = courts[i]
                if (element.selected == true) {
                    let isExists = false

                    for (let j = 0; j < temp.length; j++) {
                        if (element.court_id == temp[j]) {
                            isExists = true;
                            break
                        }
                    }
                    if (isExists == false) {
                        new_courtIds.push(element.court_id)
                    }
                }

            }
            console.log('new_courtIds=>', new_courtIds)
            courtIds = new_courtIds

            let pricing_plan = courts[selectedIndex]['pricing_plan']
            for (let i = 0; i < pricing_plan.length; i++) {
                let element = pricing_plan[i]
                if (element.time_interval == this.state.selectedDuration) {
                    console.log('minus---', totalCost + "-" + element.price)
                    totalCost = totalCost - element.price;
                    totalNoOfHours = totalNoOfHours - element.time_interval;

                }
            }

        }

        // if (totalCost < 0) {
        //     totalCost = 0
        // }

        let unique = [...new Set(courtIds)];
        courtIds = unique

        let unique_courtNames =  [...new Set(courtNames)]
        courtNames = unique_courtNames

        console.log('totalCost', totalCost);
        console.log('courtIds', courtIds);
        console.log('courtNames', JSON.stringify(courtNames));
        console.log('courtNames-unique_name', JSON.stringify(unique_courtNames));

        //this.state.selectedCourtIds = courtIds
        //this.state.selectedCourtNames = courtNames
        //this.state.totalCost = totalCost
        //this.state.totalNoOfHours = totalNoOfHours
        //this.state.availableCourts = courts
        //console.log('this.state.selectedCourt', this.state.selectedCourtIds);
        //console.log('this.state.selectedCourt', this.state.totalCost);
        // console.log('allCourts', this.state.availableCourts);

        this.setState({
            selectedCourtIds: courtIds,
            selectedCourtNames: courtNames,
            totalCost: totalCost,
            totalNoOfHours: totalNoOfHours,
            availableCourts: courts
        }, () => {
            console.log('this.state.selectedCourt', this.state.selectedCourtIds);
            console.log('this.state.totalCost', this.state.totalCost);
            console.log('allCourts', this.state.availableCourts);
        })
    }

    incrementDuration() {

        var selectedTimeRange = this.state.selectedTimeRange;
        var selectedDuration = this.state.selectedDuration;

        console.log(this.state.selectedSportTimeData.max_booking_time)
        console.log(selectedDuration)

        if (this.state.selectedSportTimeData.max_booking_time != selectedDuration) {
            selectedDuration = selectedDuration + this.state.selectedSportTimeData.incremental_time;
            selectedTimeRange['endTime'] = selectedTimeRange['startTime'] + selectedDuration;
        }


        this.setState({
            selectedDuration: selectedDuration,
            selectedTimeRange: selectedTimeRange,
            totalCost: 0
        }, () => {
            this.checkCourtAvailability();
            console.log(this.state.selectedDuration);
        })

    }

    decrementDuration() {

        var selectedTimeRange = this.state.selectedTimeRange;
        var selectedDuration = this.state.selectedDuration;

        if (this.state.selectedSportTimeData.min_booking_time != selectedDuration) {
            selectedDuration = selectedDuration - this.state.selectedSportTimeData.incremental_time;
            selectedTimeRange['endTime'] = selectedTimeRange['startTime'] + selectedDuration;
        }

        this.state.selectedDuration = selectedDuration
        this.state.selectedTimeRange = selectedTimeRange

        this.setState({
            selectedDuration: selectedDuration,
            selectedTimeRange: selectedTimeRange
        }, () => {
            this.checkCourtAvailability();
        })

    }

    showPaymentModal() {
        //var courtNames = this.state.availableCourts.map(data => data.name);
        console.log('courtNames', this.state.selectedCourtNames);
        console.log('date', this.state.selectedDate);
        console.log('date', this.state.selectedTimeRange);
        console.log('totalNoOfHours', this.state.totalNoOfHours);
        console.log('totalNoOfHours', this.state.totalCost);
        this.setModalVisible(true);
    }

    checkUserLoggedIn() {



        console.log('this.state.selectedCourtIds', this.state.selectedCourtIds);
        console.log('date', this.state.selectedDate);
        console.log('date', this.state.selectedTimeRange);
        console.log('totalNoOfHours', this.state.totalNoOfHours);
        console.log('totalNoOfHours', this.state.totalCost);

        let selectedDate = moment(this.state.selectedDate, 'DD-MM-YYYY').format('YYYY-MM-DD')

        var paymentData = {
            court_ids: this.state.selectedCourtIds,
            academy_id: this.state.academyId,
            fees: this.state.totalCost,
            start_time: this.convertMinsToHrsMins_sql(this.state.selectedTimeRange.startTime),
            end_time: this.convertMinsToHrsMins_sql(this.state.selectedTimeRange.endTime),
            date: selectedDate
        };

        isSignedIn()
            .then(res => {
                console.log('isSignedIn => ', res);
                let signedIn = res
                if (signedIn) {
                    this.setModalVisible(false);
                    setTimeout(() => {

                        this.props.navigation.navigate('PaymentPage', {
                            paymentData: paymentData
                        });
                    }, 500)

                } else {
                    this.setModalVisible(false);
                    this.props.navigation.navigate('Registration', {
                        fromPage: 'Booking',
                        paymentData: paymentData
                    });
                }
            })
            .catch(err => alert("An error occurred"));
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    getSportImage(element) {

        let id = element.id
        let is_selected = element.is_selected
        if (id == 1) {
            if (is_selected) {
                return require('../../images/sport_badminton_selected.png')
            } else {
                return require('../../images/sport_badminton.png')
            }
        }
        else if (id == 2) {
            if (is_selected) {
                return require('../../images/sport_swiming_selected.png')
            } else {
                return require('../../images/sport_swiming.png')
            }
        }
        else if (id == 3) {
            if (is_selected) {
                return require('../../images/sport_cricket_selected.png')
            } else {
                return require('../../images/sport_cricket.png')
            }
        } else {
            return require('../../images/soccer-ball.png')
        }

        // switch (id) {
        //     case 1:
        //         return require('../../images/sport_badminton.png')
        //     case 2:
        //         return require('../../images/sport_swiming.png')
        //     case 3:
        //         return require('../../images/sport_cricket.png')
        // }
        // return require('../../images/soccer-ball.png')
    }

    render() {

        // if (this.props.data.loading || !this.state.sportsData) {
        //     return (
        //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //             <ActivityIndicator size="large" color="#67BAF5" />
        //         </View>
        //     )
        // }

        //console.log('this.state.calendarData', this.state.calendarData);
        //console.log('this.state.sliderData', JSON.stringify(this.state.sliderData));

        let itemWidth = 38 * percent
        if (Platform.OS == 'ios') {
            itemWidth = 39.2 * percent
        }
        //console.log('Dimensions'+Dimensions.get('window').width)


        return (

            <View style={styles.bookingContainer}>
                <Spinner visible={this.state.spinner} textStyle={defaultStyle.spinnerTextStyle}
                />
                <ScrollView>
                    <View style={styles.sportPickerLabel}>
                        <Text style={styles.headingLabel}>Pick a Sport</Text>
                    </View>
                    {
                        this.state.sportsData != null &&

                        <ScrollView horizontal={true} style={styles.sportPicker} >

                            {
                                this.state.sportsData.map((element, index) => {

                                    let pickerStyle;
                                    if (element.is_selected == true) {
                                        pickerStyle = styles.sportPickerSelected;
                                        textStyle = [defaultStyle.bold_text_12, styles.whiteColor]
                                    }
                                    else if (element.is_selected == false) {
                                        pickerStyle = styles.sportPickerUnselected;
                                        textStyle = defaultStyle.bold_text_12
                                    }

                                    return (
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => { this.toggleSportsSelector(element.id) }}>
                                            <View style={pickerStyle}>
                                                <View style={{ marginLeft: 19, marginRight: 15, marginVertical: 17 }}>
                                                    <Image
                                                        resizeMode="contain"
                                                        source={this.getSportImage(element)}
                                                        style={{
                                                            width: 25,
                                                            height: 25
                                                        }} />
                                                </View>
                                                <View style={{ marginVertical: 17, maxWidth: 65, marginRight: 18 }}>
                                                    <Text style={textStyle}>{element.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    }

                    <View style={styles.datePickerLabel}>
                        <Text style={styles.headingLabel}>Pick a Date</Text>
                    </View>

                    {
                        this.state.calendarData != null &&
                        <ScrollView horizontal={true} style={styles.datePicker}>
                            {
                                this.state.calendarData.map((element, index) => {
                                    let pickerStyle, textStyleLarge, textStyleSmall
                                    if (element.selected == true) {
                                        pickerStyle = styles.datePickerSelected;
                                        textStyleLarge = [defaultStyle.bold_text_14, styles.whiteColor];
                                        textStyleSmall = [defaultStyle.bold_text_10, styles.whiteColor];

                                    }
                                    else if (element.selected == false) {
                                        pickerStyle = styles.datePickerUnselected;
                                        textStyleLarge = defaultStyle.bold_text_14;
                                        textStyleSmall = defaultStyle.bold_text_10;
                                    }

                                    return (
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => { this.toggleDateSelector(element.date) }}>
                                            <View style={pickerStyle}>
                                                <View style={{ marginBottom: 6 }}>
                                                    <Text style={textStyleSmall}>{element.month}</Text>
                                                </View>
                                                <View>
                                                    <Text style={textStyleLarge}>{element.day}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    }

                    <View style={styles.timePickerLabel}>
                        <Text style={styles.headingLabel}>Pick Time Slot</Text>
                    </View>


                    {
                        this.state.courtBookingDetails != null &&

                        <View>

                            <View style={styles.slotsLabelOuter}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '37.33%', }}><Text style={[styles.slotsLabel, { marginBottom: 10 }]}>Duration</Text></View>
                                    <View style={{ width: '62.66%', }}><Text style={[styles.slotsLabel, { marginBottom: 10 }]}>Time Range</Text></View >

                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    {
                                        this.state.selectedSportTimeData != null &&

                                        <View style={{ flexDirection: 'row', width: '37.33%' }}>

                                            <TouchableOpacity
                                                activeOpacity={.8}
                                                onPress={() => { this.decrementDuration() }}>
                                                <Image source={require('../../images/minus.png')} style={{}}></Image>
                                            </TouchableOpacity>

                                            <View style={{ marginHorizontal: 12, marginTop: -5 }}>
                                                <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 16, color: '#404040' }}>{this.convertMinsToHrs(this.state.selectedDuration).split(' ')[0]}</Text>
                                                <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 12, color: '#404040' }}>{this.convertMinsToHrs(this.state.selectedDuration).split(' ')[1]}</Text>
                                            </View>

                                            {
                                                this.convertMinsToHrs(this.state.selectedDuration).split(' ')[2] &&

                                                <View style={{ marginTop: -5 }}>
                                                    <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 16, color: '#404040' }}>{this.convertMinsToHrs(this.state.selectedDuration).split(' ')[2]}</Text>
                                                    <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 12, color: '#404040' }}>{this.convertMinsToHrs(this.state.selectedDuration).split(' ')[3]}</Text>
                                                </View>

                                            }

                                            <TouchableOpacity
                                                activeOpacity={.8}
                                                onPress={() => { this.incrementDuration() }}>
                                                <Image
                                                    source={require('../../images/plus.png')} style={{}}></Image>
                                            </TouchableOpacity>

                                        </View>

                                    }

                                    <View style={{ width: '62.66%', }}><Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 16, color: '#404040' }}>
                                        {this.convertMinsToHrsMins(this.state.selectedTimeRange.startTime)} - {this.convertMinsToHrsMins(this.state.selectedTimeRange.endTime)}</Text></View>
                                </View>
                            </View>

                            {/* Time slider starts */}

                            {
                                this.state.sliderData != null && this.state.sliderData.length > block_array ?

                                    <View>
                                        <View>
                                            <Image resizeMode="contain" style={{
                                                alignSelf: 'center',
                                                justifyContent: 'center',
                                                alignItems: 'center', width: 50, height: 50
                                            }}
                                                source={require('../../images/ic_navigation.png')} />
                                        </View>


                                        <Carousel
                                            ref={(c) => { this._carousel = c; }}
                                            data={this.state.sliderData}
                                            loop={false}
                                            renderItem={this.renderItem}
                                            itemWidth={itemWidth}
                                            onSnapToItem={(index) => {
                                                console.log("Moved to=====> " + index)
                                                this.state.selectedIndex = index;
                                                this.setState({
                                                    selectedIndex: index

                                                }, () => {
                                                    var timing = {};
                                                    let data = this.state.sliderData[this.state.selectedIndex + block_array]
                                                    if (data) {
                                                        console.log('CarosoulData->', JSON.stringify(data))
                                                        if (data.deadslot) {
                                                            this.setState({
                                                                availableCourts: [],
                                                                courtInfoMessage: NO_COURT_MSG
                                                            })
                                                        } else {
                                                            timing['startTime'] = this.state.sliderData[this.state.selectedIndex + block_array].minutes;
                                                            timing['endTime'] = this.state.sliderData[this.state.selectedIndex + block_array].minutes + this.state.selectedDuration;
                                                            this.setState({
                                                                selectedTimeRange: timing,
                                                                totalNoOfHours: 0,
                                                                totalCost: 0
                                                            }, () => {
                                                                this.checkCourtAvailability();
                                                            })
                                                        }

                                                    }
                                                })
                                            }}

                                            onScroll={(event) => {
                                                // 114 is the item width
                                                if (event.nativeEvent.contentOffset.x % itemWidth === 0) {
                                                    if (this.state.selectedIndex + block_array == this.state.sliderData.length - 1) {
                                                        //alert('last')
                                                        // this._carousel.scrollTo({x: event.nativeEvent.contentOffset.x, y: 
                                                        //   event.nativeEvent.contentOffset.y});
                                                    }
                                                    //ReactNativeHapticFeedback.trigger('impactLight', true)
                                                    //console.log('onScroll-> ', event.nativeEvent.contentOffset.x)
                                                    let val = (this.state.sliderData.length - block_array) * itemWidth
                                                    console.log('onScroll-> ', event.nativeEvent.contentOffset.x + "== " + val)
                                                    if (event.nativeEvent.contentOffset.x >= val) {
                                                        // this._carousel.scrollTo({x: event.nativeEvent.contentOffset.x, y: 
                                                        //   event.nativeEvent.contentOffset.y});
                                                        //alert('outside')
                                                        console.log('outside')
                                                        this._carousel.snapToItem(this.state.sliderData.length - block_array - 2)
                                                        setTimeout(() => {
                                                            this._carousel.snapToItem(this.state.sliderData.length - block_array - 2)
                                                        }, 100)
                                                    }
                                                }
                                            }}
                                            //onScroll={(event) => this.handleScroll(event)}
                                            itemHeight={80}
                                            lockScrollWhileSnapping={false}
                                            sliderWidth={360}//Dimensions.get('window').width
                                            inactiveSlideOpacity={1}
                                            inactiveSlideScale={1}
                                            activeSlideAlignment={'start'}
                                            //slideStyle={{ marginLeft: 14 }}
                                            loopClonesPerSide={10}
                                            useScrollView={true}
                                        />

                                    </View> : null
                            }


                            {
                                (this.state.availableCourts != null && this.state.availableCourts.length > 0) &&
                                <View style={{ paddingLeft: 12, marginBottom: 10 }}>
                                    <Text style={styles.headingLabel}>Select Court</Text>
                                </View>
                            }

                            {
                                (this.state.availableCourts != null && this.state.courtInfoMessage != '' && this.state.availableCourts.length == 0) &&

                                <View style={{ paddingHorizontal: 12, marginTop: 30 }}>
                                    <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 14, color: '#A3A5AE' }}>{this.state.courtInfoMessage}</Text>
                                </View>
                            }

                            <ScrollView horizontal={true} style={styles.courtPicker}>

                                {
                                    this.state.availableCourts != null &&

                                    this.state.availableCourts.map((element, index) => {

                                        let pickerStyle, textStyleLarge;
                                        if (element.disabled == true) {
                                            pickerStyle = styles.courtPickerDisabled;
                                            textStyleLarge = defaultStyle.bold_text_14;
                                        }
                                        else if (element.selected == true) {
                                            pickerStyle = styles.courtPickerSelected;
                                            textStyleLarge = [defaultStyle.bold_text_14, styles.whiteColor];
                                        }
                                        else if (element.selected == false) {
                                            pickerStyle = styles.courtPickerUnSelected;
                                            textStyleLarge = defaultStyle.bold_text_14;
                                        }

                                        return (

                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPress={() => { this.courtSelector(index) }}>
                                                <View style={pickerStyle}>
                                                    <View style={{ marginBottom: 0 }}>
                                                        <Text style={textStyleLarge}>{element.name}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>

                            {this.state.selectedSportTimeData.rules ?
                                < View style={{ marginTop: 30, paddingLeft: 12 }}>
                                    <View>
                                        <Text style={styles.headingLabel}>Playing Rules</Text>
                                        <View style={{ marginTop: 12 }}>
                                            <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 14, color: '#404040' }}>
                                                {this.state.selectedSportTimeData.rules}
                                            </Text>
                                        </View>
                                    </View>
                                </View> : null}

                            <View style={{ marginTop: 16, paddingLeft: 12, marginBottom: 20 }}>
                                <View>
                                    <Text style={styles.headingLabel}>Reschedule/Cancellation</Text>
                                    <View style={{ marginTop: 12 }}>
                                        <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 14, color: '#404040' }}>
                                            {this.state.selectedSportTimeData.cancellation_policy}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                </ScrollView>
                <View style={{ padding: 12, borderRadius: 1, elevation: 1.5, shadowOpacity: 0.32, shadowOffset: { width: 0, height: 1, borderBottomRadius: 0 } }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View style={{ display: 'flex' }}>
                            <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 12, color: '#404040' }}>Total Cost</Text>
                            <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 14, color: '#404040' }}>Rs {this.state.totalCost}</Text>
                        </View>
                        <View style={{ width: '48%' }}>
                            {
                                this.state.selectedCourtIds.length == 0 || this.state.totalCost==0?
                                    <Text style={[styles.rounded_button_half, { backgroundColor: '#DDDDDD' }]} onPress={() => {
                                        //this.showPaymentModal();
                                    }}>Pay Now</Text> :
                                    <Text style={styles.rounded_button_half} onPress={() => {
                                        this.showPaymentModal();
                                    }}>Pay Now</Text>
                            }
                        </View>
                    </View>
                </View>

                {this.paymentModal()}

            </View >

        );

    }

    renderItem = ({ item, index }) => {

        let empty_width = (Dimensions.get('window').width / 2) / block_array
        //console.log('empty_width=> ', empty_width)
        const fullWidth = 52 * percent
        const singleWidth = 26 * percent

        let prevsBlock = false
        let nextBlock = false
        if (index != 0) {
            if (this.state.sliderData[index - 1] != null) {
                prevsBlock = this.state.sliderData[index - 1].deadslot
            }
            if (this.state.sliderData.length > index && this.state.sliderData[index + 1] != null) {
                nextBlock = this.state.sliderData[index + 1].deadslot
            }
        }


        return (

            <View>
                {item != null ?
                    <View style={{
                        //paddingTop: 8,
                        paddingBottom: 16,
                    }}>
                        <View style={{ flexDirection: 'row' }}>


                            {this.state.sliderData[index - 1] != null ?

                                (prevsBlock ?
                                    <View style={{ height: 3, width: singleWidth, backgroundColor: "red" }}></View> :

                                    <View style={{ height: 3, width: singleWidth, backgroundColor: "#758272" }}></View>)

                                : <View style={{ height: 3, width: singleWidth }}></View>

                            }



                            {
                                item['is_last'] == undefined ?
                                    (item['deadslot'] ?

                                        <View style={{ height: 3, width: singleWidth, backgroundColor: "red" }}></View> :

                                        <View style={{ height: 3, width: singleWidth, backgroundColor: "#758272" }}></View>)
                                    : null
                            }
                        </View>


                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                width: fullWidth,
                                marginTop: 12
                            }}>

                            {item.showLabel ?
                                < View style={{
                                    width: 2,
                                    height: 7, backgroundColor: "#758272"
                                }}></View>
                                :
                                <View style={{
                                    width: 2,
                                    height: 7, backgroundColor: "#758272"
                                }}></View>
                            }
                        </View>

                        {
                            item.showLabel &&

                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    width: fullWidth,
                                    paddingBottom: 8,
                                }}
                                onPress={() => { }}>

                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        width: fullWidth,
                                        paddingBottom: 8,
                                    }}>

                                    <View style={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: 2,
                                        marginTop: 5,
                                        marginBottom: 0,
                                        backgroundColor: '#758272'
                                    }}>

                                    </View>
                                    <Text style={[defaultStyle.regular_text_12, {
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        width: "100%",
                                        //fontSize: 8,
                                        //width: fullWidth
                                    }]}>{item.title}</Text>
                                </View>


                            </TouchableOpacity>
                        }

                    </View>
                    :
                    <View style={{ width: empty_width }}></View>
                }
            </View>

        );
    }

    paymentModal() {
        return (
            <ScrollView style={{ backgroundColor: '#F7F7F7' }}>
                <View>
                    <Modal animationType="none" transparent={true} visible={this.state.modalVisible}>
                        <View style={styles.modalOuter}>
                            <View style={styles.modalBox}>
                                <View style={styles.modalHeadingOuter}>
                                    <Text style={defaultStyle.bold_text_14}>Your Booking</Text>
                                    <TouchableOpacity activeOpacity={.8} onPress={() => { this.setModalVisible(false); }}>
                                        <Image style={styles.closeImg} source={require('../../images/ic_close.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <View style={styles.paymentLabelOuter}>
                                        <View style={styles.paymentLabelWidth}><Text style={styles.paymentLabel}>Place</Text></View>
                                        <View style={styles.paymentLabelWidth}><Text style={styles.paymentLabel}>Courts</Text></View>
                                    </View>
                                    <View style={styles.paymentValueOuter}>
                                        <View style={styles.paymentLabelWidth}><Text style={defaultStyle.regular_text_14}>{this.state.academyName}</Text></View>
                                        <View style={styles.paymentLabelWidth}><Text 
                                        style={styles.paymentValue}>{this.state.selectedCourtNames.join(',')}</Text></View>
                                    </View>
                                    <View style={styles.paymentLabelOuter}>
                                        <View style={styles.paymentLabelWidth}><Text style={styles.paymentLabel}>Date</Text></View>
                                        <View style={styles.paymentLabelWidth}><Text style={styles.paymentLabel}>Time</Text></View>
                                    </View>
                                    <View style={styles.paymentValueOuter}>
                                        <View style={styles.paymentLabelWidth}><Text style={styles.paymentValue}>{moment(this.state.selectedDate, 'DD-MM-YYYY').format("DD MMM'YY")}</Text></View>
                                        <View style={styles.paymentLabelWidth}><Text style={styles.paymentValue}>{this.convertMinsToHrsMins(this.state.selectedTimeRange['startTime'])}- {this.convertMinsToHrsMins(this.state.selectedTimeRange['endTime'])}</Text></View>
                                    </View>
                                    <View style={styles.paymentLabelOuter}>
                                        <View style={styles.paymentLabelWidth}><Text style={styles.paymentLabel}>Duration</Text></View>
                                        <View style={styles.paymentLabelWidth}><Text style={styles.paymentLabel}>Cost</Text></View>
                                    </View>
                                    <View style={styles.paymentValueOuter}>
                                        <View style={styles.paymentLabelWidth}><Text style={styles.paymentValue}>{this.convertMinsToHrs(this.state.totalNoOfHours)}</Text></View>
                                        <View style={styles.paymentLabelWidth}><Text style={styles.paymentValue}>Rs {this.state.totalCost}</Text></View>
                                    </View>
                                </View>

                                <View style={styles.confirmBtnOuter}>
                                    <Text style={[defaultStyle.rounded_button, styles.confirmBtn]} onPress={() => {
                                        this.checkUserLoggedIn();
                                    }}>Pay</Text>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView >
        )

    }

}

const mapStateToProps = state => {
    return {
        data: state.CourtBookingReducer,
    };
};
const mapDispatchToProps = {
    getCourtBookingDetails, createBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTimeDate);


const styles = {
    bookingContainer: {
        flex: 1,
        backgroundColor: 'white',
        fontFamily: 'Quicksand-Regular',
        //justifyContent: "center",
    },
    whiteColor: {
        color: '#FFFFFF'
    },
    sportPickerLabel: {
        marginBottom: 4,
        paddingLeft: 12,
        paddingTop: 16
    },
    sportPicker: {
        flexGrow: 0,
        paddingLeft: 12,
        height: 75
    },
    sportPickerSelected: {
        //width: 136,
        flexDirection: 'row',
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#667DDB',
        marginRight: 15,
        elevation: 4,
        margin: 4,
        shadowOpacity: 0.32,
        shadowOffset: { width: 0, height: 1 },
    },
    sportPickerUnselected: {
        //width: 136,
        margin: 4,
        flexDirection: 'row',
        borderRadius: 12,
        alignItems: 'center',
        elevation: 4,
        backgroundColor: 'white',
        shadowOpacity: 0.32,
        shadowOffset: { width: 0, height: 1 },
        marginRight: 15
    },
    datePickerLabel: {
        marginBottom: 10,
        paddingLeft: 12,
        paddingTop: 8
    },
    headingLabel: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 14,
        color: '#A3A5AE'
    },
    datePicker: {
        flexGrow: 0,
        paddingLeft: 12,
        height: 75
    },
    rounded_button_half: {
        //width: '70%',
        padding: 10,
        borderRadius: 20,
        //borderWidth: 1,
        marginLeft: 4,
        //marginRight: 4,
        borderColor: '#67BAF5',
        backgroundColor: '#67BAF5',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium'
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
    datePickerSelected: {
        height: 63,
        width: 56,
        backgroundColor: '#667DDB',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        margin: 2,
        elevation: 4,
        shadowOpacity: 0.32,
        shadowOffset: { width: 0, height: 1 },
    },
    datePickerUnselected: {
        height: 63,
        width: 56,
        margin: 2,
        backgroundColor: 'white',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 4,
        shadowOpacity: 0.32,
        shadowOffset: { width: 0, height: 1 }
    },
    timePickerLabel: {
        marginTop: 12,
        paddingLeft: 12
    },
    slotsLabelOuter: {
        marginBottom: 10,
        paddingLeft: 12,
        marginTop: 8,
    },
    slotsLabel: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 10,
        color: '#A3A5AE'
    },
    timePicker: {
        flexGrow: 0,
        paddingLeft: 12,
        height: 55
    },
    timePickerSelected: {
        height: 43,
        width: 118,
        backgroundColor: '#667DDB',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    timePickerUnselected: {
        height: 43,
        width: 118,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        flexDirection: 'row',
        paddingHorizontal: 5,
        elevation: 1.5,
        shadowOpacity: 0.32,
        shadowOffset: { width: 0, height: 1 }
    },
    timeDivider: {
        marginTop: -18,
        paddingLeft: 5,
        paddingRight: 5
    },
    timeIndicator: {
        marginTop: -4,
        paddingLeft: 13
    },
    courtPicker: {
        flexGrow: 0,
        paddingLeft: 12,
        height: 50
    },
    courtPickerSelected: {
        height: 38,
        width: 128,
        backgroundColor: '#667DDB',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 4,
        margin: 2,
    },
    courtPickerUnSelected: {
        backgroundColor: 'white',
        elevation: 4,
        margin: 2,
        height: 38,
        width: 128,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowOpacity: 0.32,
        shadowOffset: { width: 0, height: 1 },
    },
    courtPickerDisabled: {
        height: 38,
        width: 128,
        alignItems: 'center',
        backgroundColor: '#DFDFDF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowOpacity: 0.32,
        shadowOffset: { width: 0, height: 1 },
    },
    closeImg: {
        height: 30,
        width: 30,
    },
    modalOuter: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        paddingVertical: 20
    },
    modalBox: {
        width: "95%",
        //margin: 16,
        //padding: 16,
        borderRadius: 16,
        backgroundColor: 'white',
        height: 380,
    },
    modalHeadingOuter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingTop: 16
    },
    paymentLabelOuter: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        marginTop: 21
    },
    paymentLabel: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 10,
        color: '#A3A5AE'
    },
    paymentValueOuter: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        marginTop: 8
    },
    paymentValue: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 14,
        color: '#404040'
    },
    paymentLabelWidth: {
        width: '49.33%'
    },
    confirmBtnOuter: {
        marginHorizontal: 12,
        marginTop: 30,
        marginBottom: 0
    },
    confirmBtn: {
        marginTop: 16,
        width: "100%",
        marginLeft: 0,
        marginRight: 0,
        fontFamily: 'Quicksand-Medium',
    }
}
