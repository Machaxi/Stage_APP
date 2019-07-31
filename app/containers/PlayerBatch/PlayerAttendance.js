import React from 'react'

import { View, ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import { CustomeCard } from '../../components/Home/Card'
import moment from 'moment'
import BaseComponent, { defaultStyle } from '../BaseComponent';
import Calendar from 'react-native-calendar';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { getPlayerBatchAttendenceDetails } from "../../redux/reducers/PlayerBatchReducer";
import { connect } from 'react-redux';
let { width } = Dimensions.get('window');

class PlayerAttendance extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {

      batchdata: null,
      coactList: [],
      events: [
        {
            start: '2019-01-01 00:00:00',
            end: '2019-01-01 02:00:00',
            title: 'New Year Party',
            summary: 'xyz Location',
        },{
            start: '2019-01-01 01:00:00',
            end: '2019-01-01 02:00:00',
            title: 'New Year Wishes',
            summary: 'Call to every one',
        },
        {
            start: '2019-01-02 00:30:00',
            end: '2019-01-02 01:30:00',
            title: 'Parag Birthday Party',
            summary: 'Call him',
        },
        {
            start: '2019-01-03 01:30:00',
            end: '2019-01-03 02:20:00',
            title: 'My Birthday Party',
            summary: 'Lets Enjoy',
        },
        {
            start: '2019-02-04 04:10:00',
            end: '2019-02-04 04:40:00',
            title: 'Engg Expo 2019',
            summary: 'Expoo Vanue not confirm',
        },
      ],
    }

  }

  onDateSelect(date) {
        //On Click oC a event showing alert from here
        alert(JSON.stringify(date));
    }

  componentDidMount() {

    // getData('userInfo', (value) => {
    //   userData = JSON.parse(value);
    //   this.state.academy_id = userData['academy_id'];
    //   this.state.player_id = userData['player_id'];
    //   getData('header', (value) => {
    //       this.props.getOpponentList(value, userData['academy_id'], 0, 10).then(() => {
    //           let data = this.props.data.data
    //           console.log(' getOpponentList ' + JSON.stringify(data));

    //           // console.log('data.data.dashboard', data.data.dashboard);
    //           // console.log('data.data.challenges', data.data.dashboard.challenges)

    //           let success = data.success
    //           if (success) {

    //               console.log(' getChallengeDashboardsds ' + JSON.stringify(data.data.dashboard));

    //               this.setState({
    //                   opponentData: data.data.players,
    //               })
    //           }

    //       }).catch((response) => {
    //           console.log(response);
    //       })
    //   })
    // })

  }

  _renderItem = ({ item }) => (

    <View>
      <View style={styles.calendarOuter}>
        <Calendar
          currentMonth={Date.now()}
          customStyle={customStyle}
          dayHeadings= {['Sun','Mon','Tue','Wed','Thu','Fri','Sat']}
          eventDates={['2019-05-01','2019-07-02']}       // Optional array of moment() parseable dates that will show an event indicator
          events={[{date:'2019-05-01', title: 'My Birthday Party',
              summary: 'Lets Enjoy',},{date:'2019-05-02', title: 'My Birthday Party',
              summary: 'Lets Enjoy',}]}

          // moŒœnthNames={[JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC]}                // Defaults to english names of months
          nextButtonText={'►'}           // Text for next button. Default: 'Next'
          onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
          onDateLongPress={(date) => this.onDateLongPress(date)} // Callback after date is long pressed
          onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
          onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
          onTouchNext={this.onTouchNext}    // Callback for next touch event
          onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
          onTitlePress={this.onTitlePress}  // Callback on title press
          prevButtonText={'◄ '}           // Text for previous button. Default: 'Prev'
          removeClippedSubviews={false}     // Set to false for us within Modals. Default: true
          // renderDay={<CustomDay />}         // Optionally render a custom day component
          scrollEnabled={true}              // False disables swiping. Default: False
          selectedDate={Date.now()}       // Day to be selected
          showControls={true}               // False hides prev/next buttons. Default: False
          showEventIndicators={true}        // False hides event indicators. Default:False
          startDate={Date.now()}          // The first month that will display. Default: current month
          titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
          today={Date.now()}              // Defaults to today
          weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
        />
      </View>

      <Card style={styles.summaryCardOuter}>
        <View style={styles.summaryText}>
          <Text style={styles.attendanceText}>Attendance Summary for </Text>
          <Text style={styles.dateText}>May 18</Text>
        </View>

        <View style={styles.attSessionLabelOuter}>
          <Text style={styles.attSessionLabel}>Attendance%</Text>
          <Text style={styles.attSessionLabel}>Sessions Attended</Text>
        </View>
        <View style={styles.attSessionValueOuter}>
          <Text style={styles.attSessionValue}>85 %</Text>
          <Text style={styles.attSessionValue}>12/18</Text>
        </View>

        <View style={styles.summaryText}>
          <Text style={styles.attendanceText}>Attendance </Text>
          <Text style={styles.dateText}>25th May</Text>
        </View>

        <View style={styles.attSessionLabelOuter}>
          <Text style={styles.attSessionLabel}>Session</Text>
          <Text style={styles.attSessionLabel}>Time</Text>
          <Text style={styles.attSessionLabel}>Time</Text>
        </View>
        <View style={styles.attSessionValueOuter}>
          <Text style={styles.attSessionValue}>Session 1</Text>
          <Text style={styles.attSessionValue}>A</Text>
          <Text style={styles.attSessionValue}>08:30 am - 09:30 am</Text>
        </View>

      </Card>
    </View>

  )

  render() {

    let data = [{'name':'Deepika'}];

    return (

      <View style={{ flex: 1}}>
        <FlatList
          data={data}
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
    borderRadius:0
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
  }
};

const styles = StyleSheet.create({
  calendarOuter: {
    padding: 20,
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

// const Schedule = () => {
//   const customStyle = {
//     day: {
//       fontSize: 15, 
//       textAlign: 'center',
//     },
//     hasEventCircle: {
//       backgroundColor: 'red',
//     },
//     dayCircleFiller: {
//        borderRadius:0
//     },
//     calendarContainer: {
//       backgroundColor: '#ffffff'
//     },
//     calendarHeading:{ 
//       borderTopWidth: 0,
//       borderBottomWidth: 0,
//     },
//     dayButton:
//     { borderTopWidth: 0,
//     }
//   }
// }