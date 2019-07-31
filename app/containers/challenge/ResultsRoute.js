import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text, ImageBackground, ScrollView, Modal } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle, EVENT_REFRESH_CHALLENGE } from '../BaseComponent'
import { getData } from "../../components/auth";
import { getChallengeDashboard, acceptChallenge, cancelChallenge, dismissChallenge, abortChallenge } from "../../redux/reducers/ChallengeReducer";
import { connect } from 'react-redux';
import moment from 'moment';
import Events from '../../router/events';
import RNPickerSelect from 'react-native-picker-select'

const placeholder = {
  label: 'Showing for',
  value: null,
  color: '#9EA0A4',
};

class ResultsRoute extends BaseComponent {

  constructor(props) {
    super(props)

    this.state = {
      playerData: ['Test'],
      challengeData: [],
      query: '',
      playerId: null,
      days: [
        { 'value': '1', 'label': 'Oct 18' },
        { 'value': '2', 'label': 'Nov 19' },
        { 'value': '3', 'label': 'Dec 20' }
      ],
      day: ''
    }
    this.inputRefs = {
      day: null
    };
  }

  componentDidMount() {

    this.getResultsData();

    // var testData = [
    //     {'dayId':'1','dayname':'Oct 18'},
    //     {'dayId':'2','dayname':'Nov 19'},
    //     {'dayId':'3','dayname':'Dec 20'}
    //   ];
    // let array = testData;
    // let newArray = []
    // for (let i = 0; i < array.length; i++) {
    //     let row = array[i];
    //     let obj = {
    //         label: row.dayname,
    //         value: row.dayId,
    //     }
    //     newArray[i] = obj
    // }
    // this.setState({
    //     days: newArray
    // });

    console.log('this.state.days', this.state.days);

  }

  getResultsData() {
    // getData('userInfo', (value) => {
    //     userData = JSON.parse(value)
    //     let academy_id = userData['academy_id'];
    //     this.state.player_id = userData['player_id'];
    //     getData('header', (value) => {
    //       this.props.getChallengeDashboard(value, academy_id).then(() => {
    //         let data = this.props.data.data
    //         console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));

    //         console.log('data.data.dashboard', data.data.dashboard);
    //         console.log('data.data.challenges', data.data.dashboard.challenges)

    //         let success = data.success
    //         if (success) {

    //           console.log(' getChallengeDashboardsds ' + JSON.stringify(data.data.dashboard));

    //           this.setState({
    //             playerData: [data.data.dashboard.player],
    //             challengeData: data.data.dashboard.challenges,
    //           })
    //         }

    //       }).catch((response) => {
    //         console.log(response);
    //       })
    //     })
    // });
  }


  // acceptTheChallenge(challengeId) {
  //   getData('header', (value) => {
  //     this.props.acceptChallenge(value, challengeId).then(() => {
  //       let data = this.props.data.data
  //       console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));

  //       let success = data.success
  //       if (success) {

  //         this.setState({
  //           playerData: [data.data.dashboard.player],
  //           challengeData: data.data.dashboard.challenges,
  //         })
  //       }

  //     }).catch((response) => {
  //       console.log(response);
  //     })
  //   })
  // }


  // find(query) {
  //     if (query === '') {
  //         return [];
  //     }
  //     const { suggestionResult } = this.state;
  //     const regex = new RegExp(`${query.trim()}`, 'i');
  //     console.log('regex ', regex)
  //     return suggestionResult.filter(item => item.name.search(regex) >= 0);
  // }

  _renderItem = ({ item }) => (

    <View>
      <View style={styles.totalResultsValueOuter}>
        <Text style={styles.opponentValue}>Prithviraj P</Text>
        <Text style={styles.scoreValue}>21-12</Text>
        <View style={styles.resultOuter}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={require('../../images/win_badge.png')} style={{ paddingRight: 10 }}></Image>
            <Text style={styles.resultValue}>Won</Text>
          </View>
          <Text style={styles.disputeLabel}>Dispute</Text>
        </View>
      </View>

      <View style={styles.totalResultsValueOuter}>
        <Text style={styles.opponentValue}>Rahul P</Text>
        <Text style={styles.scoreValue}>12-21</Text>
        <View style={styles.resultOuter}>
          <Text style={styles.resultValue}>Lost</Text>
          <Text style={styles.disputeLabel}>Dispute</Text>
        </View>
      </View>

      <View style={styles.totalResultsValueOuter}>
        <Text style={styles.opponentValue}>Prithviraj P</Text>
        <Text style={styles.scoreValue}>21-12</Text>
        <View style={styles.resultOuter}>
          <Text style={styles.resultValue}>Won</Text>
          <Text style={styles.disputeLabel}>Dispute</Text>
        </View>
      </View>
    </View>




  );

  render() {

    // if (this.props.data.loading || this.state.tournadataments == null) {
    //   return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //       <ActivityIndicator size="large" color="#67BAF5" />
    //     </View>
    //   )
    // }

    let data = this.state.playerData
    return (

      <View style={styles.resultsPageContainer} >

        <RNPickerSelect style={{
          width: '50%',
        }}
          placeholder={placeholder}
          items={this.state.days}
          onValueChange={(value) => {
            console.log(value)
            this.setState({
              day: value,
            });
            //this.fetchBatchByAcademy(value)
          }}
          style={pickerSelectStyles}
          value={this.state.day}
          useNativeAndroidPickerStyle={false}
          ref={(el) => {
            this.inputRefs.day = el;
          }}
        />


        <View style={{
          width: 220,
          backgroundColor: '#A3A5AE',
          height: 1
        }}></View>

        <View style={styles.totalGamesLabelOuter}>
          <Text style={styles.gameLabel}>Total Games</Text>
          <Text style={styles.wonLabel}>Won</Text>
          <Text style={styles.lostLabel}>Lost</Text>
        </View>
        <View style={styles.totalGamesValueOuter}>
          <Text style={styles.gameValue}>24</Text>
          <Text style={styles.wonValue}>18</Text>
          <Text style={styles.lostValue}>6</Text>
        </View>

        <View style={styles.totalResultsLabelOuter}>
          <Text style={styles.gameLabel}>Opponent</Text>
          <Text style={styles.wonLabel}>Score</Text>
          <Text style={styles.lostLabel}>Result</Text>
        </View>

        <FlatList
          data={data}
          renderItem={this._renderItem}
        />

      </View>




    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.ChallengeReducer,
  };
};
const mapDispatchToProps = {
  getChallengeDashboard
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultsRoute);

const styles = StyleSheet.create({
  resultsPageContainer: {
    flex: 1,
    fontFamily: 'Quicksand-Regular',
  },
  totalGamesLabelOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 16
  },
  gameLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '33.33%',
    fontFamily: 'Quicksand-Regular'
  },
  wonLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '33.33%',
    fontFamily: 'Quicksand-Regular'
  },
  lostLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '33.33%',
    fontFamily: 'Quicksand-Regular'
  },
  totalGamesValueOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 16
  },
  gameValue: {
    fontSize: 14,
    color: '#404040',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
  },
  wonValue: {
    fontSize: 14,
    color: '#404040',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
  },
  lostValue: {
    fontSize: 14,
    color: '#404040',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
  },
  totalResultsLabelOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    backgroundColor: '#F4F5FB',
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  totalResultsValueOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 16
  },
  opponentValue: {
    fontSize: 14,
    color: '#404040',
    width: '33.33%',
    fontFamily: 'Quicksand-Regular'
  },
  scoreValue: {
    fontSize: 14,
    color: '#404040',
    width: '33.33%',
    fontFamily: 'Quicksand-Regular'
  },
  resultOuter: {
    width: '33.33%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resultValue: {
    fontSize: 14,
    color: '#404040',
    fontFamily: 'Quicksand-Regular'
  },
  disputeLabel: {
    fontSize: 12,
    fontFamily: 'Quicksand-Regular',
    color: '#667DDB'
  }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    //paddingVertical: 12,
    //paddingHorizontal: 10,
    borderColor: '#D3D3D3',
    borderRadius: 4,
    color: 'black',
    width: 200,
    height: 40,
    marginBottom: 4,
    fontFamily: 'Quicksand-Regular',
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: 'Quicksand-Regular',
    borderColor: '#614051',
    borderRadius: 8,
    color: 'black',
  },
});