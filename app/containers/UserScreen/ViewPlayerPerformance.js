import React from 'react'
import * as Progress from 'react-native-progress';

import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { getData, storeData } from "../../components/auth";
import { getPlayerPerformance } from "../../redux/reducers/PerformenceReducer";
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import BaseComponent, { defaultStyle,getStatsImageById } from '../BaseComponent';
import moment from 'moment'
import RNPickerSelect from 'react-native-picker-select'
import { TabView, TabBar } from 'react-native-tab-view';
import PlayerPerformanceComponent from './PlayerPerformanceComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomProgress from '../../components/custom/CustomProgress';

var deviceWidth = Dimensions.get('window').width - 20;

class ViewPlayerPerformance extends BaseComponent {

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      months: [],
      month: '',
      response: [],
      index: 0,
      routes: [],
      performanceData: null,
      currentPerformanceData: null,
      spinner: false,
    }
    this.inputRefs = {
      month: null
    };
  }

  componentDidMount() {

    this.state.performanceData = this.props.navigation.getParam('performance_data');
    for (i = 0; i < 12; i++) {
      let obj = {
        label: moment().month(i).format('MMM') + ' ' + moment().format('YY'),
        value: (i + 1).toString()
      }
      this.state.months.push(obj);
    };

    console.log('this.state.performanceData', this.state.performanceData);
    this.state.month = this.state.performanceData.month.toString();

    this.getPerformanceData();

  }

  progress(status) {
    this.setState({
      spinner: status
    })
  }

  onSwipeStart() { }

  getPerformanceData() {

    this.progress(true)

    getData('userInfo', (value) => {
      userData = JSON.parse(value);
      getData('header', (value) => {
        this.props.getPlayerPerformance(value, this.state.performanceData.id, this.state.month, this.state.performanceData.year, this.state.performanceData.batchId, userData['player_id'], this.state.routes.length != 0 ? this.state.routes[this.state.index].key : null).then(() => {
          this.progress(false);
          console.log('this.props.data===========', this.props.data);
          let data = this.props.data.performencedata
          //console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));

          let success = data.success
          if (success) {

            this.setState({
              response: data.data,
            })

            let array = data.data.attribute.parameters
            let newArray = []
            for (let i = 0; i < array.length; i++) {
              let row = array[i];
              let obj = {
                key: row.parameter_id,
                title: row.name,
              }
              newArray[i] = obj
            }
            this.setState({
              routes: newArray,
            })
            console.warn(JSON.stringify(newArray))

          }

        }).catch((response) => {
          this.progress(false)
          console.log(response);
        })
      })
    })
  }

  _getLabelText = ({ route, scene }) => (
    route.title
  );

  _renderTabBar = props => (

    <TabBar
      {...props}
      scrollEnabled
      getLabelText={this._getLabelText}
      indicatorStyle={{
        backgroundColor: '#667DDB',
        height: 4,
      }}
      style={{ backgroundColor: 'white', elevation: 0 }}
      tabStyle={{ width: 143 }}
      labelStyle={defaultStyle.regular_text_14}
    />
  );
  renderScene = ({ route, jumpTo }) => {

    return <PlayerPerformanceComponent jumpTo={this.state.response}
      name={route.title}
      navigation={this.props.navigation} />;

  };

  render() {


    if (this.state.performanceData == null) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      )
    }

    const statId = this.state.performanceData.id

    return (

      <View style={styles.performanceContainer}>

        <Spinner
          visible={this.state.spinner}
          textStyle={defaultStyle.spinnerTextStyle}
        />

        <View style={styles.statsOuter}>

          <Image 
          resizeMode="contain"
          source={getStatsImageById(statId)}
            style={styles.statsImg} />

          <View>

            <Text style={defaultStyle.bold_text_14}>{this.state.performanceData.name}</Text>

            <View style={styles.statsProgressOuter}>
              <Text style={[defaultStyle.bold_text_12, { color: '#A3A5AE' }]}>
                Current Score
                        </Text>
              <Text style={defaultStyle.bold_text_12}>
                {this.state.performanceData.score}
              </Text>
            </View>
            <CustomProgress
                        percent={this.state.performanceData.score}
                        width={deviceWidth - 100}
                        height={14}
                    />

            {/* <Progress.Bar style={styles.progressBar} 
            progress={this.state.performanceData.score / 100} 
            width={deviceWidth - 100} height={14} /> */}

            <View style={{ width: '45.33%', marginTop: 16, paddingLeft: 2 }}>

              <View><Text style={styles.filterPlaceholder}>Showing for</Text></View>
              <RNPickerSelect
                placeholder={{}}
                items={this.state.months}
                onValueChange={(value) => {
                  console.log(value)
                  this.setState({
                    month: value,
                  }, () => {
                    this.getPerformanceData();
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

          </View>
        </View>

        <View style={{ flex: 1 }}>
          <TabView
            navigationState={this.state}
            renderTabBar={this._renderTabBar}
            renderScene={this.renderScene}
            onIndexChange={index => {
              console.log('index', index);
              this.setState({ index });
              this.getPerformanceData();

            }

            }
          />

        </View>

      </View>
    );

  }
}
const mapStateToProps = state => {
  return {
    data: state.PerformenceReducer,
  };
};
const mapDispatchToProps = {
  getPlayerPerformance,
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewPlayerPerformance);

const styles = StyleSheet.create({
  performanceContainer: {
    flex: 1,
    fontFamily: 'Quicksand-Regular',
  },
  statsOuter: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF'
  },
  statsImg: {
    width: 70,
    height: 70,
    marginRight: 20
  },
  statsProgressOuter: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBar: {
    backgroundColor: '#E1E1E1',
    color: '#305F82',
    borderRadius: 11,
    borderWidth: 0
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