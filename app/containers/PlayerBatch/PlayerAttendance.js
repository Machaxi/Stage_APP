import React from 'react'
import { View, ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import { CustomeCard } from '../../components/Home/Card'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import Calendar from 'react-native-calendar';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { getPlayerBatchAttendenceDetails } from "../../redux/reducers/PlayerBatchReducer";
import { getData } from "../../components/auth";
import { connect } from 'react-redux';
import moment from 'moment'

class PlayerAttendance extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      is_refresh:false,
      attendanceData: null,
      batchId: '',
      playerId: '',
      selectedDateData: null,
      eventsArray: [],
      selectedDate: null
    }
    this.state.batchId = this.props.navigation.getParam('batch_id');
    this.state.selectedDate = Date.now();

  }

  onDateSelect(date,calendar_data) {
    console.log(date);

    var currentDate =new Date(date).getDate();

    console.log(currentDate);
    console.log(calendar_data[currentDate]);

    this.setState({
      selectedDateData: calendar_data[currentDate]
    })
    this.state.is_refresh = true;
    this.state.selectedDate = moment.utc(date).local().format("YYYY-MM-DD")

    console.log(this.state.selectedDateData);
    console.log(typeof(this.state.selectedDate));
    
    

  }

  onDateLongPress(date, calendar_data) {

    console.log(date);

    var currentDate =new Date(date).getDate();

    console.log(currentDate);
    console.log(calendar_data[currentDate]);

    this.setState({
      selectedDateData: calendar_data[currentDate]
    })
    this.state.is_refresh = true;
    this.state.selectedDate = moment.utc(date).local().format("YYYY-MM-DD")

    console.log(this.state.selectedDateData);
    console.log(typeof(this.state.selectedDate));
    
  }

  onSwipeNext() {
  }

  onSwipePrev() {
  }

  onTouchNext() {
  }

  onTouchPrev(date) {

    console.log('dataaaaaaaaaaaaaaaaaaaa',JSON.stringify(date));

    this.getCalendarData(date.month()+1,date.year());
    this.state.is_refresh = true;
    this.state.selectedDate = moment.utc(date).local().format("YYYY-MM-DD")

  }

  onTitlePress() {

  }

  getCalendarData(month, year) {

    getData('header', (value) => {
      this.props.getPlayerBatchAttendenceDetails(value, 1, 1, month, year).then(() => {
        console.log('data', this.props.data.batchdata.data);
        let data = this.props.data.batchdata;
        let success = data.success
        if (success) {
            this.setState({
                attendanceData: [data.data],
            },
            () => {
            
              for (key in this.state.attendanceData[0].calendar_data) {

                var event ={};
                var fullMonth = (month).toString().length<2 ? '0'+month : month;
                var fullDay = key.length<2 ? '0'+key : key;

                if(this.state.attendanceData[0].calendar_data[key].session_scheduled == true) {

                    if(this.state.attendanceData[0].calendar_data[key].is_cancelled==true || this.state.attendanceData[0].calendar_data[key].attendance_happened==false) {
                        event['date'] = `${year}-${fullMonth}-${fullDay}`;
                        event['hasEventCircle'] = {
                          backgroundColor: 'grey'
                        }
                          this.state.eventsArray.push(event);
                    }

                    if(this.state.attendanceData[0].calendar_data[key].attendance_happened==true) {
                      if(this.state.attendanceData[0].calendar_data[key].is_present==true) {
                        event['date'] = `${year}-${fullMonth}-${fullDay}`;
                        event['hasEventCircle'] = {
                          backgroundColor: 'green'
                        }
                          this.state.eventsArray.push(event);
                      }
                      else {
                        event['date'] = `${year}-${fullMonth}-${fullDay}`;
                        event['hasEventCircle'] = {
                          backgroundColor: 'red'
                        }
                          this.state.eventsArray.push(event);
                      }
                    }
                }
              }

              console.log('eventsArray', this.state.eventsArray);
              console.log(this.state.attendanceData)

            })

        }

        }).catch((response) => {
            console.log(response);
        })
    })

  }
  

  componentDidMount() {
    
    getData('userInfo', (value) => {
      userData = JSON.parse(value);
      this.state.playerId = userData['player_id'];
      const month = new Date().getMonth()+1;
      const year = new Date().getFullYear();

      this.getCalendarData(month,year)
      
    })

  }

  attendanceSummary(data) {

    console.log('this.state.selectedDateDataaaaaa', this.state.selectedDateData);
    return (
      
      <Card style={styles.summaryCardOuter}>

        {
          data.is_attendance_happened_in_month ? 
          <View>
            <View style={styles.summaryText}>
              <Text style={styles.attendanceText}>Attendance Summary for</Text>
              <Text style={styles.dateText}>{data.monthly_attendance_report.month} {data.monthly_attendance_report.year}</Text>
            </View>

            <View style={styles.attSessionLabelOuter}>
              <Text style={styles.attSessionLabel}>Attendance%</Text>
              <Text style={styles.attSessionLabel}>Sessions Attended</Text>
            </View>
            <View style={styles.attSessionValueOuter}>
              <Text style={styles.attSessionValue}>{data.monthly_attendance_report.attendance} %</Text>
              <Text style={styles.attSessionValue}>{data.monthly_attendance_report.session_attended}/{data.monthly_attendance_report.total_session}</Text>
            </View>
            {
              this.state.selectedDateData != null && 

              (this.state.selectedDateData.session_scheduled==false ?
                <View><Text>No session schedule</Text></View> : (
                  this.state.selectedDateData.is_cancelled==true  ? 
                    <View><Text>Sesson cancelled due to- {this.state.selectedDateData.cancel_reason}</Text></View> : (
                      this.state.selectedDateData.attendance_happened==false ? <View><Text>Attendance didn't happen</Text></View> : (
                          <View>
                            <View style={styles.summaryText}>
                              <Text style={styles.attendanceText}>Attendance </Text>
                              <Text style={styles.dateText}>{moment.utc(this.state.selectedDate).local().format("Do MMM")}</Text>
                            </View>

                            <View style={styles.attSessionLabelOuter}>
                              <Text style={styles.attSessionLabel}>Session</Text>
                              <Text style={styles.attSessionLabel}>Time</Text>
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

  _renderItem = ({ item }) => 
  {
    console.warn('render item')
    this.setState({
      is_refresh:false
    })
    return(

    <View>
      <View style={styles.calendarOuter}>
        <Calendar
          currentMonth={this.state.selectedDate}
          customStyle={customStyle}
          dayHeadings= {['Sun','Mon','Tue','Wed','Thu','Fri','Sat']}

          events={this.state.eventsArray} // Optional array of moment() parseable dates that will show an event indicator

          // moŒœnthNames={[JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC]}                // Defaults to english names of months
          nextButtonText={'►'}           // Text for next button. Default: 'Next'
          onDateSelect={(date) => this.onDateSelect(date,item.calendar_data)} // Callback after date selection
          onDateLongPress={(date) => this.onDateLongPress(date, item.calendar_data)} // Callback after date is long pressed
          onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
          onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
          onTouchNext={this.onTouchNext}    // Callback for next touch event
          onTouchPrev={(date) => this.onTouchPrev(date)}    // Callback for prev touch event
          onTitlePress={this.onTitlePress}  // Callback on title press
          prevButtonText={'◄ '}           // Text for previous button. Default: 'Prev'
          removeClippedSubviews={false}     // Set to false for us within Modals. Default: true
          // renderDay={<CustomDay />}         // Optionally render a custom day component
          scrollEnabled={true}              // False disables swiping. Default: False
          // selectedDate={Date.now()}       // Day to be selected
          showControls={true}               // False hides prev/next buttons. Default: False
          showEventIndicators={false}        // False hides event indicators. Default:False
          startDate={this.state.selectedDate}          // The first month that will display. Default: current month
          titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
          today={this.state.selectedDate}              // Defaults to today
          weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
        />
      </View>

      {this.attendanceSummary(item)}

    </View>
  
  )}

  render() {

    let data = this.state.attendanceData;
    console.log('state', data);

    return (

      <View style={{ flex: 1}}>
        <FlatList
          data={data}
          extraData={this.state.is_refresh}
          renderItem={this._renderItem}
        />
      </View>
     
    )

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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAttendance);

const customStyle = {
  calendarControls: {
    fontSize: 14,
    color: '4A4A4A',
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
  calendarHeading:{ 
    borderTopWidth: 0,
    borderBottomWidth: 0,
    fontSize: 12,
    fontWeight: '500',
    color: '#9B9B9B',
    fontFamily: 'Quicksand-Regular',
  },
  dayButton:
  { borderTopWidth: 0,
  },
  // eventIndicator: {
  //     backgroundColor: 'blue',
  //     width: 10,
  //     height: 10,
  //   },
};

const styles = StyleSheet.create({
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
  attSessionLabelOuter:  {
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
}
);