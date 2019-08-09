import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text, ImageBackground, ScrollView, Modal } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle, EVENT_REFRESH_CHALLENGE } from '../BaseComponent'
import { getData } from "../../components/auth";
import { getchallengeResults, disputeChallenge } from "../../redux/reducers/ChallengeReducer";
import { connect } from 'react-redux';
import moment from 'moment';
import Events from '../../router/events';
import RNPickerSelect from 'react-native-picker-select'

class ResultsRoute extends BaseComponent {

  constructor(props) {
    super(props)

    this.state = {
      playerData: ['Test'],
      challengeResultsData: null,
      query: '',
      playerId: null,
      academyId: null,
      months: [],
      month: ''
    }
    this.inputRefs = {
      month: null
    };
  }

  componentDidMount() {

    for(i=0; i< 12; i++) {
      let obj = {
        label: moment().month(i).format('MMM') + ' ' + moment().format('YY'),
        value: (i+1).toString()
      } 
      this.state.months.push(obj);
    };

    this.setState({ 
      month: moment().format('M')
    });

    getData('userInfo', (value) => {
        userData = JSON.parse(value)
        this.state.academyId = userData['academy_id'];
        this.getResultsData();
        
    });

    console.log('current month', this.state.month);

  }

  getResultsData() {
     getData('header', (value) => {
      this.props.getchallengeResults(value, this.state.academyId, this.state.month, moment().format('YYYY')).then(() => {
        console.log('ggggfgfgfdgfd', this.props.data);
        let data = this.props.data.data
        console.log('getchallengeResults1111 ' + JSON.stringify(data));

        // console.log('data.data.dashboard', data.data.dashboard);
        // console.log('data.data.challenges', data.data.dashboard.challenges)

        let success = data.success
        if (success) {

          console.log('getchallengeResultssds ' + JSON.stringify(data.data.dashboard));

          this.setState({
            challengeResultsData: data.data,
          })
        }

      }).catch((response) => {
        console.log(response);
      })
    })
  }

  disputeTheChallenge(challengeId) {
    getData('header', (value) => {
      this.props.disputeChallenge(value, challengeId).then(() => {
        let data = this.props.data.data
        console.log('getchallengeResults1111 ' + JSON.stringify(data));

        // let success = data.success
        // if (success) {

        //   this.setState({
        //     playerData: [data.data.dashboard.player],
        //     challengeData: data.data.dashboard.challenges,
        //   })
        // }

      }).catch((response) => {
        console.log(response);
      })
    })
  }


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
        <Text style={styles.opponentValue}>{item.opponent.name}</Text>
        <Text style={styles.scoreValue}>{item.score}</Text>
        <View style={styles.resultOuter}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image source={require('../../images/win_badge.png')} style={{ marginRight: 10,marginTop: 3 }}></Image>
            <Text style={styles.resultValue}>{item.win ? 'Won': 'Lost'}</Text>
          </View>
          <View style={{paddingTop:3}}><Text onPress={() => { this.disputeTheChallenge(item.id) }} style={styles.disputeLabel}>Dispute</Text></View>
        </View>
      </View>
    </View>

  );

  render() {

    if (this.props.data.loading || this.state.challengeResultsData == null) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      )
    }

    let data = this.state.challengeResultsData
    return (

      <View style={styles.resultsPageContainer} >

        <View style={{width:'45.33%', paddingLeft: 16}}>

          <View><Text style={styles.filterPlaceholder}>Showing for</Text></View>

          <RNPickerSelect
            placeholder={{}}
            items={this.state.months}
            onValueChange={(value) => {
              console.log(value)
              this.setState({
                month: value,
              },()=>{
                this.getResultsData()
              });
            }}
            style={pickerSelectStyles}
            value={this.state.month}
            useNativeAndroidPickerStyle={false}
            ref={(el) => {
              this.inputRefs.month = el;
            }}
          />
           <View style={{
            width: 80,
            backgroundColor: '#A3A5AE',
            height: 1
          }}></View>

        </View> 

        <View style={styles.totalGamesLabelOuter}>
          <Text style={styles.totalLabel}>Total Games</Text>
          <Text style={styles.totalLabel}>Won</Text>
          <Text style={styles.totalLabel}>Lost</Text>
        </View>

        <View style={styles.totalGamesValueOuter}>
          <Text style={styles.gameValue}>{data.total_count}</Text>
          <View style={[styles.wonValue,{ flex: 1, flexDirection: 'row' }]}>
            <View><Text>{data.win}</Text></View>
            <View style={{marginLeft: 5}}><Image source={require('../../images/win_badge.png')} style={{ marginTop: 2 }}></Image></View>
          </View>
          <Text style={styles.lostValue}>{data.loss}</Text>
        </View>

        {
          data.challenges.length>0 && 
          <View style={styles.totalResultsLabelOuter}>
            <Text style={styles.opponentLabel}>Opponent</Text>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={[styles.resultLabel, {marginLeft: 8}]}>Result</Text>
          </View>
        }

        <FlatList
          data={data.challenges}
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
  getchallengeResults, disputeChallenge
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
  totalLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
  },
  opponentLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '43.33%',
    fontFamily: 'Quicksand-Medium'
  },
  scoreLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '23.33%',
    fontFamily: 'Quicksand-Medium'
  },
  resultLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
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
    width: '43.33%',
    fontFamily: 'Quicksand-Regular'
  },
  scoreValue: {
    fontSize: 14,
    color: '#404040',
    width: '23.33%',
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
  },
  filterPlaceholder: {
    fontSize: 10,
    fontFamily: 'Quicksand-Medium',
    color: '#A3A5AE'
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
    paddingHorizontal: 0,
    paddingVertical: 8,
    fontFamily: 'Quicksand-Regular',
    borderColor: '#614051',
    borderRadius: 8,
    color: 'black',
  },
});