import React from 'react'

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import { Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { getCourtBookingDetails } from '../../redux/reducers/AcademyReducer';
import { connect } from 'react-redux';
import { getData } from "../../components/auth";
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment'

class ChooseTimeDate extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            academyId: '',
            courtBookingDetails: null,
            courtSlots: null,
            spinner: false,
            currentDay: '',
            currentMonth: '',
            currentYear: '',
            today: '',
            selectedDate: '',
            showDays: 7,
            calendarData: null,
            selectedTimeSlots: [],
            selectedCourt: null,
            selectedSlotIndex: null,
            allCourts: null,
            showCourts: false,
            bookingDetails: null,
            sportsData: null,
            selectedSportsId: null,
            selectedSportTimeData: null,
            selectedDuration: null
        };

        var today = new Date();
        this.state.currentDay = String(today.getDate()).padStart(2, '0');
        this.state.currentMonth = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        this.state.currentYear = today.getFullYear();
        this.state.today = this.state.currentDay + "-" + this.state.currentMonth + "-" + this.state.currentYear;
        //this.state.selectedDate = Date.now();
        this.state.selectedDate = this.state.today;
        console.log('Date.now()', Date.now());
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

        console.log('hellllllllllllllllllllo', this.state.calendarData);

        // this.setState({
        //     calendarData: dateObjArray
        // })

        console.log('dateObjArray', dateObjArray);

    }

    componentDidMount() {
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.state.academyId = userData['academy_id'];
            this.getBookingDetails(this.state.today, this.state.selectedSportsId);

        });
    }

    convertTimeStringToMins(time) {
        let arr = time.split(":");
        return (arr[0] * 60) + (arr[1] * 1);
    }

    convertMinsToHrsMins(minutes) {
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

        console.log('res', res);
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
                this.progress(false)
                let data = this.props.data.res
                //console.log('getchallengeResults1111 ' + JSON.stringify(data));

                console.log('data.data.challenges', data.data);

                let success = data.success
                if (success) {

                    // "sports": [
                    //     {
                    //         "id": 1,
                    //         "name": "Badminton",
                    //         "min_booking_time": 30,
                    //         "max_booking_time": 180,
                    //         "incremental_time": 30
                    //     }
                    // ],

                    //var bookingDetails = data.data.courts;

                    data.data.sports = [
                        {
                            "id": 1,
                            "name": "Badminton",
                            "min_booking_time": 30,
                            "max_booking_time": 180,
                            "incremental_time": 30,
                            "selected": true
                        },
                        {
                            "id": 2,
                            "name": "Cricket",
                            "min_booking_time": 30,
                            "max_booking_time": 180,
                            "incremental_time": 30,
                            "selected": false
                        }
                    ]

                    //selectedSportTimeData

                    data.data.sports.map((element, index) => {
                        if (element.selected == true) {
                            this.setState({
                                selectedSportTimeData: element,
                                selectedDuration: element.min_booking_time
                            })
                        }
                    });

                    // data.data.sports.map((element, index) => {
                    //     var temp = element;
                    //     element['selected'] = false;
                    // });

                    this.setState({
                        sportsData: data.data.sports,
                        courtBookingDetails: data.data.courts,
                    }, () => {
                        console.log('sportsData', this.state.sportsData);
                    })

                    //console.log('ddd');


                    var bookingDetails = [
                        {
                            "name": "court1",
                            "court_id": 9,
                            "court_timings": [
                                {
                                    "open_time": "06:30:00",
                                    "close_time": "09:00:00"
                                },
                                {
                                    "open_time": "11:00:00",
                                    "close_time": "14:00:00"
                                },
                                {
                                    "open_time": "15:00:00",
                                    "close_time": "17:00:00"
                                }
                            ],
                            "court_bookings": [
                            ],
                            "pricing_plan": [
                            ]
                        },
                        {
                            "name": "Test Court",
                            "court_id": 10,
                            "court_timings": [
                                {
                                    "open_time": "06:00:00",
                                    "close_time": "9:30:00"
                                },
                                {
                                    "open_time": "11:00:00",
                                    "close_time": "13:00:00"
                                },
                                {
                                    "open_time": "15:00:00",
                                    "close_time": "17:00:00"
                                }
                            ],
                            "court_bookings": [
                            ],
                            "pricing_plan": [
                            ]
                        },
                        {
                            "name": "Test Court1",
                            "court_id": 11,
                            "court_timings": [
                                {
                                    "open_time": "12:00:00",
                                    "close_time": "13:00:00"
                                },
                                {
                                    "open_time": "13:30:00",
                                    "close_time": "14:00:00"
                                }
                            ],
                            "court_bookings": [
                            ],
                            "pricing_plan": [
                            ]
                        }
                    ]





                    var courtTimings = [];
                    var courtBookings = [];
                    var courtAvailability = [];



                    bookingDetails.map((element, index) => {
                        var item1 = {};
                        var item2 = {};
                        item1['name'] = element.name;
                        item1['court_id'] = element.court_id;
                        item1['court_timings'] = [];
                        item2['name'] = element.name;
                        item2['court_id'] = element.court_id;
                        item2['court_bookings'] = [];
                        element.court_timings.map((element1, index1) => {
                            var timing = {};
                            timing['startTime'] = this.convertTimeStringToMins(element1.open_time);
                            timing['endTime'] = this.convertTimeStringToMins(element1.close_time);

                            item1['court_timings'].push(timing);
                        })
                        courtTimings.push(item1);
                        element.court_bookings.map((element2, index2) => {
                            var timing = {};
                            timing['startTime'] = this.convertTimeStringToMins(element2.start_time);
                            timing['endTime'] = this.convertTimeStringToMins(element2.end_time);
                            item2['court_bookings'].push(timing);
                        })
                        courtBookings.push(item2);
                    })

                    console.log('courtTimings', courtTimings);
                    console.log('courtBookings', courtBookings);

                    courtTimings.map((ele, ind) => {

                        var item = {};
                        item['name'] = ele.name;
                        item['court_id'] = ele.court_id;
                        item['court_availability'] = [];
                        var flag = 0;
                        var newflag = 1;
                        var tflag = false;
                        var elseflag = 0;

                        ele['court_timings'].map((element, index) => {

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
                                        console.log('in if 1');
                                        if (element1.startTime != courtBookings[ind]['court_bookings'][i - 1].endTime) {
                                            console.log('in if 2');
                                            console.log(courtBookings[ind]['court_bookings'][i - 1].endTime);
                                            var timing = {};
                                            timing['startTime'] = courtBookings[ind]['court_bookings'][i - 1].endTime;
                                            timing['endTime'] = element1.startTime;
                                            console.log('timimggggggggggg', timing);
                                            item['court_availability'].push(timing);
                                            newflag = i;
                                            elseflag = elseflag + 1;
                                        }
                                        if (courtBookings[ind]['court_bookings'].length > i + 1 && courtBookings[ind]['court_bookings'][i + 1].startTime > element.endTime) {
                                            console.log('in if 3');
                                            if (element1.endTime != element.endTime) {
                                                console.log('in if 4');
                                                var timing = {};
                                                timing['startTime'] = element1.endTime;
                                                timing['endTime'] = element.endTime;
                                                item['court_availability'].push(timing);
                                            }
                                            console.log('in else');
                                            flag = i + 1;
                                            tflag = true;
                                            elseflag = 0;
                                            break;
                                        }
                                        else if (courtBookings[ind]['court_bookings'].length == i + 1 && element1.startTime < element.endTime) {
                                            console.log('in if 5');
                                            if (element1.endTime != element.endTime) {
                                                console.log('in if 6');
                                                var timing = {};
                                                timing['startTime'] = element1.endTime;
                                                timing['endTime'] = element.endTime;
                                                item['court_availability'].push(timing);
                                            }
                                            console.log('in else');
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
                                        console.log('in else 1')
                                        var timing = {};
                                        timing['startTime'] = element.startTime;
                                        timing['endTime'] = element1.startTime;
                                        item['court_availability'].push(timing);
                                    }
                                    if ((element.endTime != element1.endTime) && (element1.startTime >= element.startTime && element1.endTime < element.endTime) && (courtBookings[ind]['court_bookings'].length == 1 || courtBookings[ind]['court_bookings'].length - 1 == i)) {
                                        console.log('in else 2')
                                        var timing = {};
                                        timing['startTime'] = element1.endTime;
                                        timing['endTime'] = element.endTime;
                                        item['court_availability'].push(timing);
                                    }
                                    if ((element.startTime != element1.startTime && element.endTime != element1.endTime)) {
                                        console.log('in else 3')
                                        //console.log(element1.startTime < element.startTime)
                                        //console.log(element1.startTime < element.startTime)
                                        if ((element1.startTime < element.startTime) && (element1.endTime < element.startTime)) {
                                            console.log('in else 4')
                                            var timing = {};
                                            timing['startTime'] = element.startTime;
                                            timing['endTime'] = element.endTime;
                                            item['court_availability'].push(timing);
                                        }
                                        if ((element1.startTime > element.startTime) && (element1.endTime > element.endTime)) {
                                            console.log('in else 5')
                                            var timing = {};
                                            timing['startTime'] = element.startTime;
                                            timing['endTime'] = element.endTime;
                                            item['court_availability'].push(timing);
                                        }
                                    }
                                }

                            }

                            if (i == 0) {
                                var timing = {};
                                timing['startTime'] = element.startTime;
                                timing['endTime'] = element.endTime;
                                item['court_availability'].push(timing);
                            }


                        })

                        courtAvailability.push(item);

                    })

                    var minTime, maxTime;

                    //find min and max time of courts

                    courtTimings.map((ele, index) => {

                        var length = ele['court_timings'].length;

                        if (index == 0) {
                            minTime = ele['court_timings'][0].startTime;
                            maxTime = ele['court_timings'][length - 1].endTime;
                        }
                        else {
                            if (ele['court_timings'][0].startTime < minTime) {
                                minTime = ele['court_timings'][0].startTime;
                            }
                            if (ele['court_timings'][length - 1].endTime > maxTime) {
                                console.log('end time');
                                console.log('length-1', length - 1);
                                console.log(ele['court_timings'][length - 1].endTime);
                                console.log(courtTimings[index - 1]['court_timings'][length - 1].endTime);
                                maxTime = ele['court_timings'][length - 1].endTime;
                            }
                        }


                    })

                    this.state.minTime = minTime;
                    this.state.maxTime = maxTime;

                    console.log('minTime', minTime, this.convertMinsToHrsMins_sql(minTime));
                    console.log('maxTime', maxTime, this.convertMinsToHrsMins_sql(maxTime));


                    var allCourtsDeadSlots = [];

                    courtTimings.map((ele, index) => {

                        var item = {};
                        item['name'] = ele.name;
                        item['court_id'] = ele.court_id;
                        item['dead_slots'] = [];

                        var courtDeadSlots = this.getSingleCourtDeadSlots(ele['court_timings']);
                        item['dead_slots'] = courtDeadSlots;

                        allCourtsDeadSlots.push(item);
                    });


                    console.log('allCourtsDeadSlots', allCourtsDeadSlots);

                    allCourtsDeadSlots.map((element, index) => {
                        element.dead_slots.map((element1, index1) => {
                            element1['startTime'] = this.convertMinsToHrsMins_sql(element1.startTime);
                            element1['endTime'] = this.convertMinsToHrsMins_sql(element1.endTime);
                            // console.log('element', element);
                        })
                    })

                    var intersect;

                    var finalDeadSlots = [];

                    allCourtsDeadSlots.map((ele, index) => {


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

                    finalDeadSlots = intersect;


                    console.log('finalDeadSlots======', finalDeadSlots);





                    //console.log('courtAvailability', courtAvailability);

                    // courtAvailability.map((element, index) => {
                    //     console.log(element.court_id);
                    //     element.court_availability.map((element1, index1) => {
                    //         element1['startTime'] = this.convertMinsToHrsMins_sql(element1.startTime);
                    //         element1['endTime'] = this.convertMinsToHrsMins_sql(element1.endTime);
                    //         // console.log('element', element);
                    //     })
                    // })

                }

            }).catch((response) => {
                this.progress(false)
                console.log(response);
            })
        })
    }

    getIntersectingDeadSlots(arr1, arr2) {

        var newArray = [];

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
                    timing['startTime'] = element.startTime;
                    timing['endTime'] = element.endTime;

                    newArray.push(timing);
                }
            })
        })

        console.log('newArray', newArray);

        return newArray;

    }

    getSingleCourtDeadSlots(arr) {

        var newArray = [];

        arr.map((element, index) => {

            if (arr.length == 1) {

                if (element.startTime > this.state.minTime) {
                    var timing = {};
                    timing['startTime'] = this.state.minTime;
                    timing['endTime'] = element.startTime;
                    newArray.push(timing);
                }
                if (element.endTime < this.state.maxTime) {
                    var timing = {};
                    timing['startTime'] = element.endTime;
                    timing['endTime'] = this.state.maxTime;
                    newArray.push(timing);
                }
            }
            else {
                if (index == 0) {
                    if (element.startTime > this.state.minTime) {
                        var timing = {};
                        timing['startTime'] = this.state.minTime;
                        timing['endTime'] = element.startTime;
                        newArray.push(timing);
                    }
                }
                if (index == arr.length - 1) {
                    if (element.endTime < this.state.maxTime) {
                        var timing = {};
                        timing['startTime'] = element.endTime;
                        timing['endTime'] = this.state.maxTime;
                        newArray.push(timing);
                    }
                }
                //else {
                //console.log('in else 5');

                if (index <= (arr.length - 2) && element.endTime != arr[index + 1].startTime) {
                    var timing = {};
                    timing['startTime'] = element.endTime;
                    timing['endTime'] = arr[index + 1].startTime;
                    newArray.push(timing);
                }
                //}

            }

        });

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
                    sportsPickerData[index].selected = true;
                }
                else {
                    sportsPickerData[index].selected = false;
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
                selectedDate: selectedDate
            }, () => {
                this.getBookingDetails(this.state.selectedDate, this.state.selectedSportsId)
            })

        }




        // var datePickerData = this.state.calendarData;
        // this.state.calendarData.map((element, index) => {
        //     if (selectedIndex == index && datePickerData[selectedIndex].selected == false) {
        //         datePickerData[selectedIndex].selected = !datePickerData[index].selected;
        //     }
        //     else if (selectedIndex != index) {
        //         datePickerData[index].selected = false;
        //     }
        // })

        // this.setState({
        //     calendarData: datePickerData,
        //     selectedDate: datePickerData[selectedIndex].date
        // }, () => {
        //     this.getBookingDetails(this.state.selectedDate, this.state.selectedSportsId)
        // })

    }

    incrementDuration() {

        console.log('hiiiiiiiiiiiiiiiiiii');



        var selectedDuration = this.state.selectedDuration;

        console.log(this.state.selectedSportTimeData.max_booking_time)
        console.log(selectedDuration)

        if (this.state.selectedSportTimeData.max_booking_time != selectedDuration) {
            selectedDuration = selectedDuration + this.state.selectedSportTimeData.incremental_time;
        }


        this.setState({
            selectedDuration: selectedDuration
        }, () => {
            console.log(this.state.selectedDuration);
        })

    }

    decrementDuration() {

        console.log('eeeeeeeeeeeeeeeeeeeeee');

        var selectedDuration = this.state.selectedDuration;

        if (this.state.selectedSportTimeData.min_booking_time != selectedDuration) {
            selectedDuration = selectedDuration - this.state.selectedSportTimeData.incremental_time;
        }

        this.setState({
            selectedDuration: selectedDuration
        })

    }


    timeSlotSelector(selectedIndex) {




        var timePickerData = this.state.courtBookingDetails;

        var courts = this.state.allCourts;

        this.state.allCourts.map((element, index) => {
            var flag = 0;
            timePickerData[selectedIndex].courts.map((element1, index1) => {
                if (element.court_id == element1.court_id) {
                    flag = 1
                }
            })
            if (flag == 1) {
                if (element.is_booked == false && element.selected == false) {
                    courts[index].disabled = false;
                } else {
                    courts[index].disabled = true;
                }
            }
            else {
                courts[index].disabled = true;
            }
        })




        // this.timePickerData[selectedIndex].courts.map((element, index) => {
        //     if(element.court_id==)
        // })

        timePickerData[selectedIndex].selected = !timePickerData[selectedIndex].selected;

        var slots = this.state.selectedTimeSlots;
        if (timePickerData[selectedIndex].selected == true) {
            slots.push(timePickerData[selectedIndex].slot_id);
        } else {

            this.state.allCourts.map((element, index) => {
                courts[index].disabled = true;
            })

            this.state.selectedTimeSlots.map((element, index) => {

                if (element == timePickerData[selectedIndex].slot_id) {
                    slots.splice(index, 1);
                }

            })
        }

        if (slots.length == 0) {

            timePickerData.map((element, index) => {
                element.courts.map((element1, index1) => {
                    timePickerData[index].courts[index1].selected = false;
                })
            })

        }

        this.setState({
            //selectedSlotIndex: selectedIndex,
            showCourts: true,
            courtBookingDetails: timePickerData,
            selectedTimeSlots: slots,
            allCourts: courts
        }, () => {
            console.log('this.state.allCourts', this.state.allCourts);
        })

        // console.log('this.state.courtBookingDetails[this.state.selectedSlotIndex].courts', this.state.courtBookingDetails[selectedIndex].courts)

    }

    courtSelector(selectedIndex) {

        console.log('selectedIndex', selectedIndex);

        var courts = this.state.allCourts;

        console.log('courts', courts);


        this.state.allCourts.map((element, index) => {

            console.log('index', index);
            console.log('courts[selectedIndex].selected', courts[selectedIndex].selected);

            if (selectedIndex == index && courts[selectedIndex].selected == false) {
                courts[index].selected = !courts[index].selected;
            }
            else if (selectedIndex != index) {
                courts[index].selected = false
            }

        })


        //var timePickerData = this.state.courtBookingDetails;
        // this.state.courtBookingDetails[this.state.selectedSlotIndex].courts.map((element, index) =>{
        //     if(selectedIndex == index && timePickerData[this.state.selectedSlotIndex].courts[selectedIndex].selected==false) {
        //         timePickerData[this.state.selectedSlotIndex].courts[selectedIndex].selected= !timePickerData[this.state.selectedSlotIndex].courts[selectedIndex].selected;
        //     }
        //     else if(selectedIndex != index) {
        //         timePickerData[this.state.selectedSlotIndex].courts[selectedIndex].selected= false; 
        //     }
        // })


        this.setState({
            selectedCourt: courts[selectedIndex].court_id,
            allCourts: courts
            //courtBookingDetails: timePickerData,
        }, () => {
            console.log('this.state.selectedCourt', this.state.selectedCourt);
            console.log('allCourts', this.state.allCourts);
        })

        //console.log()

    }


    render() {

        console.log('this.state.calendarData', this.state.calendarData)

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
                                    if (element.selected == true) {
                                        pickerStyle = styles.sportPickerSelected;
                                    }
                                    else if (element.selected == false) {
                                        pickerStyle = styles.sportPickerUnselected;
                                    }

                                    return (
                                        <TouchableOpacity onPress={() => { this.toggleSportsSelector(element.id) }}>
                                            <View style={pickerStyle}>
                                                <View style={{ marginBottom: 6, paddingVertical: 15 }}>
                                                    <Image source={require('../../images/info-bulb.png')} style={{}} ></Image>
                                                </View>
                                                <View style={{ backgroundColor: 'white' }}>
                                                    <Text style={[defaultStyle.bold_text_10]}>{element.name}</Text>
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
                                        <TouchableOpacity onPress={() => { this.toggleDateSelector(element.date) }}>
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
                                {/* <Text style={styles.slotsLabel}>{this.state.courtBookingDetails.length}>Duration</Text> */}
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '37.33%', }}><Text style={[styles.slotsLabel, { marginBottom: 10 }]}>Duration</Text></View>
                                    <View style={{ width: '62.66%', }}><Text style={[styles.slotsLabel, { marginBottom: 10 }]}>Time Range</Text></View >

                                </View>
                                <View style={{ flexDirection: 'row' }}>



                                    {

                                        this.state.selectedSportTimeData != null &&

                                        <View style={{ flexDirection: 'row', width: '37.33%' }}>


                                            <TouchableOpacity onPress={() => { this.decrementDuration() }}>
                                                <Image source={require('../../images/minus.png')} style={{}}></Image>
                                            </TouchableOpacity>



                                            <View style={{ marginHorizontal: 12, marginTop: -5 }}>
                                                <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 20, color: '#404040' }}>{this.convertMinsToHrs(this.state.selectedDuration).split(' ')[0]}</Text>
                                                <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 12, color: '#404040' }}>{this.convertMinsToHrs(this.state.selectedDuration).split(' ')[1]}</Text>
                                            </View>

                                            {
                                                this.convertMinsToHrs(this.state.selectedDuration).split(' ')[2] &&

                                                <View style={{ marginTop: -5 }}>
                                                    <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 20, color: '#404040' }}>{this.convertMinsToHrs(this.state.selectedDuration).split(' ')[2]}</Text>
                                                    <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 12, color: '#404040' }}>{this.convertMinsToHrs(this.state.selectedDuration).split(' ')[3]}</Text>
                                                </View>

                                            }

                                            <TouchableOpacity onPress={() => { this.incrementDuration() }}>
                                                <Image source={require('../../images/plus.png')} style={{}}></Image>
                                            </TouchableOpacity>


                                        </View>



                                    }







                                    <View style={{ width: '62.66%', }}><Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 20, color: '#404040' }}>08:00 am - 09:00 am</Text></View>
                                </View>
                            </View>

                            {
                                this.state.showCourts &&
                                <View style={{ marginTop: 30, paddingLeft: 12, marginBottom: 10 }}>
                                    <Text style={styles.headingLabel}>Select Court</Text>
                                </View>
                            }

                            <ScrollView horizontal={true} style={styles.courtPicker}>

                                {

                                    this.state.showCourts &&

                                    this.state.allCourts.map((element, index) => {

                                        console.log('element', element);


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

                                            <TouchableOpacity onPress={() => { element.disabled == false && this.courtSelector(index) }}>
                                                <View style={pickerStyle}>
                                                    <View style={{ marginBottom: 6 }}>
                                                        <Text style={textStyleLarge}>{element.name}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>



                                            // <View style={styles.courtPickerUnSelected}>
                                            //     <View style={{ marginBottom: 6 }}>
                                            //         <Text style={defaultStyle.bold_text_14}>Court 2</Text>
                                            //     </View>
                                            // </View>
                                        )



                                    })
                                }
                            </ScrollView>

                            {/* <View style={{marginTop: 30, paddingLeft: 12}}>
                                <View>
                                    <Text style={styles.headingLabel}>Playing Rules</Text>
                                    <View style={{marginTop: 12}}>
                                        <Text style={{fontFamily:'Quicksand-Regular', fontSize: 14, color: '#404040'}}>{`\u2022 Must have non-marking shoes.`}</Text>
                                        <Text style={{fontFamily:'Quicksand-Regular', fontSize: 14, color: '#404040'}}>{`\u2022 Must have non-marking shoes.`}</Text>
                                        <Text style={{fontFamily:'Quicksand-Regular', fontSize: 14, color: '#404040'}}>{`\u2022 Must have non-marking shoes.`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{marginTop: 30, paddingLeft: 12, marginBottom: 10}}>
                                <View>
                                    <Text style={styles.headingLabel}>Reschedule/Cancellation</Text>
                                    <View style={{marginTop: 12}}>
                                        <Text style={{fontFamily:'Quicksand-Regular', fontSize: 14, color: '#404040'}}>{`\u2022 Must have non-marking shoes.`}</Text>
                                        <Text style={{fontFamily:'Quicksand-Regular', fontSize: 14, color: '#404040'}}>{`\u2022 Must have non-marking shoes.`}</Text>
                                        <Text style={{fontFamily:'Quicksand-Regular', fontSize: 14, color: '#404040'}}>{`\u2022 Must have non-marking shoes.`}</Text>
                                    </View>
                                </View>
                            </View> */}
                        </View>


                    }



                </ScrollView>
                {/* <View style={{padding: 12}}>
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <View><Text style={{fontFamily:'Quicksand-Medium', fontSize: 14, color: '#A3A5AE'}}>Your Booking</Text></View>
                            <View><Text style={{fontFamily:'Quicksand-Regular', fontSize: 14, color: '#404040'}}>Number of hours 01</Text></View>
                        </View>
                        <View>
                            <View><Text style={{fontFamily:'Quicksand-Regular', fontSize: 14, color: '#404040'}} >Cost per hour Rs 600</Text></View>
                            <View><Text style={{fontFamily:'Quicksand-Medium', fontSize: 14, color: '#404040'}}>Total cost Rs 600</Text></View>
                        </View>
                    </View>
               </View> */}
                <View style={{ padding: 12, borderRadius: 1, elevation: 1.5, shadowOpacity: 0.32, shadowOffset: { width: 0, height: 1, borderBottomRadius: 0 } }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 14, color: '#A3A5AE' }}>Your Booking</Text>
                        <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 14, color: '#404040' }} >Cost per hour Rs 600</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={{ fontFamily: 'Quicksand-Regular', fontSize: 14, color: '#404040' }}>Number of hours 01</Text>
                        <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 14, color: '#404040' }}>Total cost Rs 600</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 25
                    }}>

                        <Text onPress={() => {
                            //this.props.navigation.navigate('CourtAcademyListing')
                        }} style={styles.rounded_button}>Book</Text>

                    </View>
                </View>
            </View>

        );

    }

}

const mapStateToProps = state => {
    return {
        data: state.AcademyReducer,
    };
};
const mapDispatchToProps = {
    getCourtBookingDetails
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
        marginBottom: 10,
        paddingLeft: 12,
        paddingTop: 16
    },
    sportPicker: {
        flexGrow: 0,
        paddingLeft: 12,
        height: 75
    },
    sportPickerSelected: {
        //height: 63,
        width: 56,
        backgroundColor: '#efefef',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 1.5,
        shadowOpacity: 0.32,
        shadowOffset: { width: 0, height: 1 }
    },
    sportPickerUnselected: {
        //height: 63,
        width: 56,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    datePickerLabel: {
        marginBottom: 10,
        paddingLeft: 12,
        paddingTop: 16
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
        marginRight: 12
    },
    datePickerUnselected: {
        height: 63,
        width: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 1.5,
        shadowOpacity: 0.32,
        shadowOffset: { width: 0, height: 1 }
    },
    timePickerLabel: {
        marginTop: 30,
        paddingLeft: 12
    },
    slotsLabelOuter: {
        marginBottom: 10,
        paddingLeft: 12,
        marginTop: 16,
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
        marginRight: 12
    },
    courtPickerUnSelected: {
        height: 38,
        width: 128,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 1.5,
        shadowOpacity: 0.32,
        shadowOffset: { width: 0, height: 1 }
    },
    courtPickerDisabled: {
        height: 38,
        width: 128,
        backgroundColor: '#DFDFDF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    }
}
