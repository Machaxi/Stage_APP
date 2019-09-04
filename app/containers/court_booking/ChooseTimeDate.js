import React from 'react'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import BaseComponent, {defaultStyle} from '../BaseComponent';
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
            selectedSlotIndex:null,
            allCourts: null,
            showCourts: false
        };

        var today = new Date();
        this.state.currentDay = String(today.getDate()).padStart(2, '0');
        this.state.currentMonth = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        this.state.currentYear = today.getFullYear();
        this.state.today = this.state.currentDay + "-" + this.state.currentMonth + "-" + this.state.currentYear;
        this.state.selectedDate = Date.now();   
        this.getCalendar();     

    }

 


    getCalendar() {
        let currentDay = this.state.currentDay;
        let currentMonth = this.state.currentMonth
        let currentYear = this.state.currentYear
        let days = new Date(currentYear, currentMonth, 0).getDate();
        let curDay = new Date().getDate();
        let dateObjArray = []

        for(i=0 ; i<this.state.showDays; i++) {

            var dateObj = {};
            dateObj['day'] = String(curDay).padStart(2, '0');
            dateObj['month'] = moment(new Date(currentYear,String(currentMonth-1).padStart(2, '0'), dateObj['day']),'YYY-MM-DD').format('MMM');
            dateObj['year'] = currentYear;
            dateObj['date'] = dateObj['day'] + "-" + String(currentMonth).padStart(2, '0') + "-" + currentYear;
            if(i==0) {
                dateObj['selected'] = true;
            } else {
                dateObj['selected'] = false;
            }
            

            if(curDay==days) {
                curDay=1;
                if(currentMonth==12) {
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
            this.getBookingDetails(this.state.today);
            
        });
    }

    getBookingDetails(date) {
        this.progress(true)
        getData('header', (value) => {
            this.props.getCourtBookingDetails(value, this.state.academyId, date ).then(() => {
            this.progress(false)
            let data = this.props.data.res
            //console.log('getchallengeResults1111 ' + JSON.stringify(data));
    
            console.log('data.data.challenges', data.data)
    
            let success = data.success
            if (success) {
               
                var bookingDetails = [];

                // data.data.slots.map((element, index) => {
                //     var courtDetails = [];
                //     element.courts.map((element1, index1)=>{
                //         element1['selected'] = false;
                //         element1['disabled'] = false;
                //         courtDetails.push(element1);
                //     })
                //     element['courts'] = courtDetails;
                //     element['selected'] = false;
                //     bookingDetails.push(element);
                // })

                var abc= [{"start_time":"00:00:00","end_time":"01:00:00","slot_id":1,"is_booked":false,"deactivate":false,"courts":[{"name":"court1","fee":500,"court_id":9,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"01:00:00","end_time":"02:00:00","slot_id":2,"is_booked":false,"deactivate":false,"courts":[{"name":"court1","fee":500,"court_id":9,"is_booked":false,"selected":false,"disabled":false}, {"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"02:00:00","end_time":"03:00:00","slot_id":3,"is_booked":false,"deactivate":false,"courts":[{"name":"court1","fee":500,"court_id":9,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"03:00:00","end_time":"04:00:00","slot_id":4,"is_booked":false,"deactivate":false,"courts":[{"name":"court1","fee":500,"court_id":9,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"04:00:00","end_time":"05:00:00","slot_id":5,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"05:00:00","end_time":"06:00:00","slot_id":6,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"06:00:00","end_time":"07:00:00","slot_id":7,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"07:00:00","end_time":"08:00:00","slot_id":8,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"08:00:00","end_time":"09:00:00","slot_id":9,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"09:00:00","end_time":"10:00:00","slot_id":10,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"10:00:00","end_time":"11:00:00","slot_id":11,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"11:00:00","end_time":"12:00:00","slot_id":12,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"12:00:00","end_time":"13:00:00","slot_id":13,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"13:00:00","end_time":"14:00:00","slot_id":14,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"14:00:00","end_time":"15:00:00","slot_id":15,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"15:00:00","end_time":"16:00:00","slot_id":16,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"16:00:00","end_time":"17:00:00","slot_id":17,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"17:00:00","end_time":"18:00:00","slot_id":18,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"18:00:00","end_time":"19:00:00","slot_id":19,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"19:00:00","end_time":"20:00:00","slot_id":20,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"20:00:00","end_time":"21:00:00","slot_id":21,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"21:00:00","end_time":"22:00:00","slot_id":22,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"22:00:00","end_time":"23:00:00","slot_id":23,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false},{"start_time":"23:00:00","end_time":"00:00:00","slot_id":24,"is_booked":false,"deactivate":false,"courts":[{"name":"Test Court","fee":600,"court_id":10,"is_booked":false,"selected":false,"disabled":false}],"selected":false}]

                var bookingDetails = abc;


                let courts=[];
                var hash = {}, key; 
                bookingDetails.map((element,index) => {
                    for ( var i = 0, l = element.courts.length; i < l; ++i ) {
                        key = JSON.stringify(element.courts[i]);
                        if ( !hash.hasOwnProperty(key) ) {
                            hash[key] = true;
                            courts.push(element.courts[i]);
                        }
                    }                    
                })

                console.log('courts=======================', courts);

                //console.log('getchallengeResultssds ' + JSON.stringify(bookingDetails));
    
                this.setState({
                    courtBookingDetails: bookingDetails,
                    allCourts: courts
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

    toggleDateSelector(selectedIndex) {

        var datePickerData = this.state.calendarData;
        this.state.calendarData.map((element, index) =>{
            if(selectedIndex == index && datePickerData[selectedIndex].selected==false) {
                datePickerData[selectedIndex].selected= !datePickerData[index].selected;
            }
            else if(selectedIndex != index) {
                datePickerData[index].selected= false; 
            }
        })

        this.setState({
            calendarData: datePickerData,
            selectedDate: datePickerData[selectedIndex].date
        })

    }

    timeSlotSelector(selectedIndex) {




        var timePickerData = this.state.courtBookingDetails;

        var courts = this.state.allCourts;

        this.state.allCourts.map((element, index) => {
            var flag=0;
            timePickerData[selectedIndex].courts.map((element1, index1) => {
                if(element.court_id==element1.court_id) {
                    flag=1
                }
            })
            if(flag==1) {
                if(element.is_booked== false && element.selected==false) {
                    courts[index].disabled = false;
                }else {
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

        timePickerData[selectedIndex].selected = ! timePickerData[selectedIndex].selected;

        var slots = this.state.selectedTimeSlots;
        if(timePickerData[selectedIndex].selected == true) {
            slots.push(timePickerData[selectedIndex].slot_id);
        } else {

            this.state.allCourts.map((element, index) => {
                courts[index].disabled = true;
            })
            
            this.state.selectedTimeSlots.map((element,index) => {

                if(element == timePickerData[selectedIndex].slot_id) {
                    slots.splice(index,1);
                }
                
           })
        }

        if(slots.length==0) {

            timePickerData.map((element, index) => {
                element.courts.map((element1, index1) => {
                    timePickerData[index].courts[index1].selected= false;
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

            console.log('in if');
            console.log('index', index);
            console.log('courts[selectedIndex].selected', courts[selectedIndex].selected);

            if(selectedIndex == index && courts[selectedIndex].selected==false) {
                console.log('in if 1')
                courts[index].selected = !courts[index].selected;
            }
            else if(selectedIndex != index) {
                console.log('in if 2')
                courts[index].selected =false
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
        },()=> {
            console.log('this.state.selectedCourt', this.state.selectedCourt);
            console.log('allCourts', this.state.allCourts);
        })

        //console.log()

    }


    render() {

        console.log('this.state.calendarData',this.state.calendarData)

        return (
            

            <View style={styles.bookingContainer}>
                <Spinner visible={this.state.spinner} textStyle={defaultStyle.spinnerTextStyle}
                />
               <ScrollView>
                    <View style={styles.datePickerLabel}>
                        <Text style={styles.headingLabel}>Pick a Date</Text>
                    </View>
                        {
                            this.state.calendarData!=null && 
                            <ScrollView horizontal={true} style={styles.datePicker}>
                            {
                                this.state.calendarData.map((element,index) => {
                                    let pickerStyle,textStyleLarge, textStyleSmall
                                    if(element.selected==true) {
                                        pickerStyle = styles.datePickerSelected;
                                        textStyleLarge = [defaultStyle.bold_text_14, styles.whiteColor];
                                        textStyleSmall = [defaultStyle.bold_text_10, styles.whiteColor];
                                        
                                    }
                                    else if(element.selected==false) {
                                        pickerStyle = styles.datePickerUnselected;
                                        textStyleLarge = defaultStyle.bold_text_14;
                                        textStyleSmall = defaultStyle.bold_text_10;
                                    }

                                    return(
                                        <TouchableOpacity onPress={() => { this.toggleDateSelector(index) }}>
                                            <View  style={pickerStyle}>
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
                                <Text style={styles.slotsLabel}>{this.state.courtBookingDetails.length} Slots available</Text>
                            </View>

                            <ScrollView horizontal={true} style={styles.timePicker}>

                            {
                                this.state.courtBookingDetails.map((element,index)=> {

                                    let pickerStyle,textStyleLarge, textStyleSmall, timeShift
                                    if(element.selected==true) {
                                        pickerStyle = styles.timePickerSelected;
                                        textStyleLarge = [defaultStyle.bold_text_14, styles.whiteColor];
                                        textStyleSmall = [defaultStyle.bold_text_10, styles.whiteColor];
                                        timeShift = [defaultStyle.bold_text_10, styles.whiteColor, styles.timeIndicator]
                                        
                                    }
                                    else if(element.selected==false) {
                                        pickerStyle = styles.timePickerUnselected;
                                        textStyleLarge = defaultStyle.bold_text_14;
                                        textStyleSmall = defaultStyle.bold_text_10;
                                        timeShift = [defaultStyle.bold_text_10, styles.timeIndicator]
                                    }

                                    return(

                                        <TouchableOpacity onPress={() => { this.timeSlotSelector(index) }}>
                                            <View style={pickerStyle}>
                                                <View>
                                                    <Text style={textStyleLarge}>{moment(element.start_time, "HH:mm:ss").format("hh:mm A").split(' ')[0]}</Text>
                                                    <Text style={timeShift}>{moment(element.start_time, "HH:mm:ss").format("hh:mm A").split(' ')[1]}</Text>
                                                </View>
                                                <View style={styles.timeDivider}>
                                                    <Text style={[defaultStyle.bold_text_14, styles.whiteColor]}>-</Text>
                                                </View>
                                                <View>
                                                    <Text style={textStyleLarge}>{moment(element.end_time, "HH:mm:ss").format("hh:mm A").split(' ')[0]}</Text>
                                                    <Text style={timeShift}>{moment(element.end_time, "HH:mm:ss").format("hh:mm A").split(' ')[1]}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )

                                })
                            }

                            </ScrollView>

                            {
                                this.state.showCourts && 
                                <View style={{marginTop: 30, paddingLeft: 12, marginBottom: 10 }}>
                                    <Text style={styles.headingLabel}>Select Court</Text>
                                </View>
                            }

                             <ScrollView horizontal={true} style={styles.courtPicker}>

                            {

                                this.state.showCourts     &&    

                                this.state.allCourts.map((element, index) => {

                                    console.log('element', element);


                                    let pickerStyle, textStyleLarge;

                                    if(element.disabled==true) {
                                        pickerStyle = styles.courtPickerDisabled;
                                        textStyleLarge = defaultStyle.bold_text_14;
                                    }
                                    else if(element.selected==true) {
                                        pickerStyle = styles.courtPickerSelected;
                                        textStyleLarge = [defaultStyle.bold_text_14, styles.whiteColor];
                                    }
                                    else if(element.selected==false) {
                                        pickerStyle = styles.courtPickerUnSelected;
                                        textStyleLarge = defaultStyle.bold_text_14;
                                    }




                                    return(

                                        <TouchableOpacity onPress={() => { element.disabled== false && this.courtSelector(index) }}>
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
               <View style={{padding: 12, borderRadius: 1, elevation: 1.5, shadowOpacity: 0.32, shadowOffset: { width: 0, height: 1, borderBottomRadius: 0 } }}>
                    <View style={{flexDirection:'row', justifyContent: 'space-between',}}>
                        <Text style={{fontFamily:'Quicksand-Medium', fontSize: 14, color: '#A3A5AE'}}>Your Booking</Text>
                        <Text style={{fontFamily:'Quicksand-Regular', fontSize: 14, color: '#404040'}} >Cost per hour Rs 600</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={{fontFamily:'Quicksand-Regular', fontSize: 14, color: '#404040'}}>Number of hours 01</Text>
                        <Text style={{fontFamily:'Quicksand-Medium', fontSize: 14, color: '#404040'}}>Total cost Rs 600</Text>
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
        backgroundColor:'white',
        fontFamily: 'Quicksand-Regular',
        //justifyContent: "center",
    },
    whiteColor: {
        color: '#FFFFFF'
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
        flexGrow:0,
        paddingLeft: 12, 
        height: 75
    },
    rounded_button: {
        width: '100%',
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
        marginTop: 16
    },
    slotsLabel: {
        fontFamily: 'Quicksand-Medium', 
        fontSize: 10, 
        color: '#A3A5AE'
    },
    timePicker: {
        flexGrow:0, 
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
    timeDivider : {
        marginTop:-18, 
        paddingLeft:5, 
        paddingRight: 5
    },
    timeIndicator: {
        marginTop: -4, 
        paddingLeft:13
    },
    courtPicker: {
        flexGrow:0,
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
