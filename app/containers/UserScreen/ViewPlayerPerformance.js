import React from 'react'
import * as Progress from 'react-native-progress';

import { View, ImageBackground, Text, StyleSheet, Image, RefreshControl, StatusBar, TouchableOpacity, Dimensions, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { CustomeCard } from '../../components/Home/Card'
import { Card } from 'react-native-paper'
import { getData, storeData } from "../../components/auth";
import { getPlayerDashboard } from "../../redux/reducers/dashboardReducer";
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import BaseComponent, { defaultStyle, getFormattedLevel, EVENT_EDIT_PROFILE, SESSION_DATE_FORMAT } from '../BaseComponent';
import { Rating } from 'react-native-ratings';
import moment from 'moment'
import Events from '../../router/events';
import PlayerHeader from '../../components/custom/PlayerHeader'
import { RateViewFill } from '../../components/Home/RateViewFill'
import { RateViewBorder } from '../../components/Home/RateViewBorder';
import RNPickerSelect from 'react-native-picker-select'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PlayerPerformanceComponent from './PlayerPerformanceComponent';

var deviceWidth = Dimensions.get('window').width - 20;

var is_show_badge = false

class ViewPlayerPerformance extends BaseComponent {

    constructor(props) {
        super(props)
      
        this.state = {
            refreshing: false,
            userData: null,
            country: undefined,
            player_profile: null,
            strenthList: null,
            acedemy_name: '',
            academy_feedback_data: null,
            coach_feedback_data: null,
            academy_id: '',
            months: [],
            month: '',
            response: [
              'Parameter 1','Parameter 2','Parameter 3'
            ],
            index: 0,
            routes: [
              { key: 'first', title: 'Dashboard' },
              { key: 'second', title: 'Your results' },
              { key: 'third', title: 'Leader board' }
            ],
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
            tabStyle={styles.tab}
            labelStyle={defaultStyle.regular_text_14}
        />
    );
    renderScene = ({ route, jumpTo }) => {
        
        return <PlayerPerformanceComponent jumpTo={this.state.response[route.key]} 
        name={route.title}
        navigation={this.props.navigation} />;
  
    };

  
    render() {


        if (this.props.data.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        return (

          <View style={styles.performanceContainer}>
            <View style={styles.statsOuter}>

                <Image source={require('../../images/Mysatus.png')}
                    style={styles.statsImg} />
                    
                <View>

                  <Text style={defaultStyle.bold_text_14}>Core Strength</Text>

                  <View style={styles.statsProgressOuter}>
                        <Text style={[defaultStyle.bold_text_12,{color: '#A3A5AE'}]}>
                           Current Score
                        </Text>
                        <Text style={defaultStyle.bold_text_12}>
                           65
                        </Text>
                  </View>
                  <Progress.Bar style={styles.progressBar} progress={65 / 100} width={deviceWidth - 100} height={14} />

                  <View style={{width:'45.33%',marginTop:10,paddingLeft: 2}}>

                      <View><Text style={styles.filterPlaceholder}>Showing for</Text></View>

                      <RNPickerSelect
                        placeholder={{}}
                        items={this.state.months}
                        onValueChange={(value) => {
                          console.log(value)
                          this.setState({
                            month: value,
                          },()=>{
                            //this.getResultsData()
                            console.log('test');
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

            <View style={{flex:1}}>
              <TabView
                  navigationState={this.state}
                  renderTabBar={this._renderTabBar}
                  renderScene={this.renderScene}
                  onIndexChange={index => this.setState({ index })}
              />

            </View>
        
          </View>
        );

    }
}
const mapStateToProps = state => {
    return {
        data: state.DashboardReducer,
    };
};
const mapDispatchToProps = {
    getPlayerDashboard,
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