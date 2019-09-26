import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text, ImageBackground, ScrollView, Modal } from 'react-native';
import { Card, ActivityIndicator, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle } from '../BaseComponent'
import { getData } from "../../components/auth";
import { getchallengeLeaderboard } from "../../redux/reducers/ChallengeReducer";
import { connect } from 'react-redux';
import moment from 'moment';
import Events from '../../router/events';
import RNPickerSelect from 'react-native-picker-select'

class LeaderboardRoute extends BaseComponent {

  constructor(props) {
    super(props)

    this.state = {
      challengeLeaderboardData: null,
      query: '',
      academyId: null,
      months: [],
      month: '',
      initialLeaderboardData: null,
    }
    this.inputRefs = {
      month: null
    };
  }

  componentDidMount() {

    for (i = 0; i < 12; i++) {
      let obj = {
        label: moment().month(i).format('MMM') + ' ' + moment().format('YY'),
        value: (i + 1).toString()
      }
      this.state.months.push(obj);
    };

    this.setState({
      month: moment().format('M')
    });

    getData('userInfo', (value) => {
      userData = JSON.parse(value)
      this.state.academyId = userData['academy_id'];
      this.getLeaderboardData();

    });

    console.log('current month', this.state.month);

  }

  getLeaderboardData() {
    getData('header', (value) => {
      this.props.getchallengeLeaderboard(value, this.state.academyId, this.state.month, moment().format('YYYY')).then(() => {
        console.log('ggggfgfgfdgfd', this.props.data);
        let data = this.props.data.data
        console.log('getchallengeLeaderboard111 ' + JSON.stringify(data));

        let success = data.success
        if (success) {

          console.log('getchallengeLeaderboardssds ' + JSON.stringify(data.data.top_players));

          this.setState({
            challengeLeaderboardData: data.data.top_players,
            initialLeaderboardData: data.data.top_players
          })
        }

      }).catch((response) => {
        console.log(response);
      })
    })
  }

  find(query) {
    const { challengeLeaderboardData } = this.state;
    if (query === '') {
      return this.state.initialLeaderboardData;
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return challengeLeaderboardData.filter(item => item.player.name.search(regex) >= 0);
  }

  listHeader() {
    return (
      <View style={styles.searchOuter}>
        <Card style={styles.searchCard}>
          <TextInput style={styles.searchBox} placeholder="Search" onChangeText={text => {
            this.state.query = text
            const data = this.find(this.state.query);
            this.state.challengeLeaderboardData = data;
            this.setState({
              challengeLeaderboardData: data
            })
          }}></TextInput>
        </Card>
      </View>
    )
  }

  _renderItem = ({ item }) => (

    <View>
      <TouchableOpacity
        activeOpacity={.8}
        onPress={() => {
          this.props.navigation.navigate('OtherPlayerDeatils', {
            academy_id: this.state.academyId,
            player_id: item.player.id
          })
        }}>
        <View style={styles.totalResultsValueOuter}>
          <View style={styles.nameOuter}>
            <Text style={styles.nameValue}>{item.player.name}</Text>
          </View>
          <View style={[styles.winOuter, { marginLeft: 4 }]}>
            <Text style={styles.nameValue}>{item.win_count}</Text>
          </View>
          <View style={[styles.lostOuter, { marginLeft: 1 }]}>
            <Text style={styles.nameValue}>{item.loss_count}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>

  );

  render() {

    if (this.props.data.loading || this.state.challengeLeaderboardData == null) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      )
    }

    let data = this.state.challengeLeaderboardData
    return (

      <View style={styles.dashboardPageContainer} >

        {this.listHeader()}

        <View style={{ width: '45.33%', paddingLeft: 16 }}>

          <View><Text style={styles.filterPlaceholder}>Showing for</Text></View>

          <RNPickerSelect
            placeholder={{}}
            items={this.state.months}
            onValueChange={(value) => {
              console.log(value)
              this.setState({
                month: value,
              }, () => {
                this.getLeaderboardData()
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

        {
          data.length > 0 &&
          <View style={styles.totalResultsLabelOuter}>
            <Text style={styles.nameLabel}>Name</Text>
            <Text style={styles.winLabel}>Won</Text>
            <Text style={styles.lostLabel}>Lost</Text>
          </View>
        }

        {data.length == 0 ?

          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}><Text style={{ fontFamily: 'Quicksand-Medium', color: 'black' }}>No Challenges</Text></View>

          :

          <FlatList
            data={data}
            renderItem={this._renderItem}
          />
        }



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
  getchallengeLeaderboard
};
export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardRoute);

const styles = StyleSheet.create({
  dashboardPageContainer: {
    flex: 1,
    fontFamily: 'Quicksand-Regular',
  },
  searchOuter: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 16,
    marginBottom: 25,
    borderRadius: 12
  },
  searchCard: {
    borderRadius: 16,
    elevation: 1
  },
  searchBox: {
    marginLeft: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    fontFamily: 'Quicksand-Regular'
  },
  nameLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '53.33%',
    fontFamily: 'Quicksand-Medium'
  },
  winLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '23.33%',
    fontFamily: 'Quicksand-Medium'
  },
  lostLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '23.33%',
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
  nameOuter: {
    width: '53.33%',
  },
  winOuter: {
    width: '23.33%',
  },
  lostOuter: {
    width: '23.33%',
  },
  nameValue: {
    fontSize: 14,
    color: '#404040',
    fontFamily: 'Quicksand-Regular'
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