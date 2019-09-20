import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, FlatList, TextInput, ImageBackground, Switch } from 'react-native';
import { Card, Text, } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getData, storeData } from "../../components/auth";
import FilterDialog from './FilterDialog'
import { getAcademyBatchDetail } from '../../redux/reducers/AcademyReducer'
import BaseComponent, { defaultStyle, formattedName } from '../BaseComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment'

const placeholderProf = {
  label: 'Select Proficiency',
  value: null,
  color: '#9EA0A4',
};

const placeholderRating = {
  label: 'Coach Rating',
  value: null,
  color: '#9EA0A4',
};


class AcademyBatch extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      academy: null,
      feedback: [],
      filter_dialog: false,
      spinner: false,
      sortType: '',
      type: '',
      proficiency: [
        { 'value': '', 'label': 'All' },
        { 'value': 'BASIC', 'label': 'Basic' },
        { 'value': 'INTERMEDIATE', 'label': 'Intermediate' },
        { 'value': 'ADVANCED', 'label': 'Advanced' }
      ],
      proficiencyValue: '',
      rating: [
        { 'value': '', 'label': 'All' },
        { 'value': '1', 'label': '1' },
        { 'value': '2', 'label': '2' },
        { 'value': '3', 'label': '3' },
        { 'value': '4', 'label': '4' },
        { 'value': '5', 'label': '>4' }
      ],
      ratingValue: '',
      academyId: null,
      batchDetails: null,
      availability: ''
    }
    this.inputRefs = {
      proficiencyValue: null,
      ratingValue: null
    };
    this.state.academyId = this.props.navigation.getParam('academy_id');
  }

  componentDidMount() {

    this.getBatchData();
  }

  getBatchData() {

    this.props.getAcademyBatchDetail(this.state.academyId, this.state.proficiencyValue, this.state.ratingValue, this.state.availability).then(() => {

      console.log("dataaaaaaaaaaaaaa", this.props.data.res.data.batches);
      let status = this.props.data.res.success
      if (status) {

        this.setState({
          batchDetails: this.props.data.res.data.batches
        })

      }


    }).catch((response) => {
      console.log(response);
    })
  }

  _renderItem = ({ item }) => (
    <View style={styles.batchContainerOuter}>
      <Card style={styles.batchCardContainer}>
        <Text style={styles.batchCardHeader}>{item.batch_name}</Text>

        <View style={styles.batchWeekTimeOuter}>

          <View style={{ width: '55%' }}>

            <Text style={styles.batchLabel}>Weekdays</Text>
            {item.operations.weekday ?
              <View style={{ marginTop: 10 }} ><Text style={styles.batchValue}>{item.operations.weekday.days.join(' ')} </Text></View> : <View><Text>-</Text></View>
            }
            {
              item.operations.weekday ?
                <View style={{ marginTop: 10 }}><Text style={styles.batchValue}>
                  {moment.utc(item.operations.weekday.start_time, 'hh:mm a').local().format("hh:mm a")} - {moment.utc(item.operations.weekday.end_time, 'hh:mm a').local().format("hh:mm a")}
                </Text></View> : <View><Text>-</Text></View>
            }

          </View>

          <View style={{ width: '45%' }}>
            <Text style={styles.batchLabel}>Weekends</Text>
            {
              item.operations.weekend ?
                <View style={{ marginTop: 10 }}><Text style={styles.batchValue}>{item.operations.weekend.days.join(' ')}</Text></View> : <View><Text>-</Text></View>
            }
            {
              item.operations.weekend ?
                <View style={{ marginTop: 10 }}><Text style={styles.batchValue}>
                  {/* {item.operations.weekend.start_time}- {item.operations.weekend.end_time} */}
                  {moment.utc(item.operations.weekend.start_time, 'hh:mm a').local().format("hh:mm a")} - {moment.utc(item.operations.weekend.end_time, 'hh:mm a').local().format("hh:mm a")}

                </Text></View> : <View><Text>-</Text></View>
            }
          </View>

        </View>

        <View style={styles.batchLabelOuter}>
          <Text style={styles.batchLabel}>Monthly Fees</Text>
        </View>

        <View style={styles.batchValueOuter}>
          <Text style={styles.batchValuefullWidth}>Rs {item.monthly_fees} onwards</Text>
        </View>

        {item.coaches.length > 0 &&
          <View style={styles.batchLabelOuter}>
            <Text style={styles.coachLabel}>Coach</Text>
          </View>
        }



        {item.coaches.map((item, index) => {
          return (
            <View>

              <View style={defaultStyle.line_style} />

              <TouchableOpacity key={item} onPress={() => {
                console.warn("Touch Press");
                this.props.navigation.navigate('CoachProfileDetail', {
                  academy_id: this.state.academyId,
                  coach_id: item.id
                })
              }}>
                <View style={styles.coachInfoOuter}>
                  <View style={styles.coachInfo}>
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: item.profile_pic
                      }} style={styles.coachImg} />
                    <Text style={[defaultStyle.regular_text_14]}>{formattedName(item.name)}</Text>
                    <View style={styles.headCoachOuter}>
                      {item.is_head ? <Text style={styles.headCoachLabel}>Head Coach</Text> : null}
                    </View>
                  </View>

                  <View style={styles.coachRatingOuter}>
                    <Image
                      resizeMode="contain"
                      source={require('../../images/ic_star.png')} style={styles.starImg} />
                    <View style={styles.ratingBorder}>
                      <Text style={styles.ratingText}>{item.ratings.toFixed(1)}</Text>
                    </View>
                    <Image
                      resizeMode="contain"
                      source={require('../../images/right_icon.png')} style={styles.rightArrow} />
                  </View>
                </View>


              </TouchableOpacity>

            </View>
          )

        })

        }

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <TouchableOpacity
            activeOpacity={.8}
            onPress={() => {
              this.props.navigation.navigate('BookTrial', {
                data: item,
                academyId: this.state.academyId
              })
              //alert('Under development')
            }}
          >
            <View style={[styles.challengeBtnOuter, {
              width: 150,
            }]}>
              <Text style={defaultStyle.rounded_button_150}>Book Trial Session</Text>
            </View>
          </TouchableOpacity>
        </View>


      </Card>
    </View>

  )

  render() {

    let data = this.state.batchDetails;
    if (this.props.data.loading || !this.state.batchDetails) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      )
    }
    return (

      <View style={{ flex: 1 }}>

        <View style={styles.filterOuter}>

          <View style={styles.dropDownFilter}>

            <View style={{ width: '45.33%' }}>

              <View><Text style={styles.filterPlaceholder}>Select Proficiency</Text></View>

              <RNPickerSelect
                placeholder={{}}
                items={this.state.proficiency}
                onValueChange={(value) => {
                  console.log(value)
                  this.setState({
                    proficiencyValue: value,
                  }, () => {
                    this.getBatchData();
                  });
                  //this.fetchBatchByAcademy(value)
                }}
                style={pickerSelectStyles}
                value={this.state.proficiencyValue}
                useNativeAndroidPickerStyle={false}
                ref={(el) => {
                  this.inputRefs.proficiencyValue = el;
                }}
              />



              <View style={{
                width: 100,
                backgroundColor: '#A3A5AE',
                height: 1
              }}></View>


            </View>

            <View style={{ width: '45.33%' }}>

              <View><Text style={styles.filterPlaceholder}>Coach Rating</Text></View>

              <RNPickerSelect
                placeholder={{}}
                items={this.state.rating}
                onValueChange={(value) => {
                  console.log(value)
                  this.setState({
                    ratingValue: value,
                  }, () => {
                    this.getBatchData();
                  });
                  //this.fetchBatchByAcademy(value)
                }}
                style={pickerSelectStyles}
                value={this.state.ratingValue}
                useNativeAndroidPickerStyle={false}
                ref={(el) => {
                  this.inputRefs.ratingValue = el;
                }}
              />
              <View style={{
                width: 100,
                backgroundColor: '#A3A5AE',
                height: 1
              }}></View>
            </View>

          </View>

          <View style={styles.toggleOuter}>
            <View style={styles.toggleAvailable}>
              <View><Text style={styles.availableLabel}>Availability</Text></View>
              <View style={styles.toggleView}>
                <Switch disabled={false}
                  ios_backgroundColor={'#667DDB'}
                  onValueChange={(value) => {
                    console.log(value)
                    this.setState({
                      availability: value
                    }, () => {
                      this.getBatchData();
                    })
                  }}
                  value={this.state.availability}
                >

                </Switch>
              </View>
            </View>
            <View>
              <Text style={styles.resultLabel}>{this.state.batchDetails == null ? '0' : this.state.batchDetails.length} Results</Text>
            </View>
          </View>

        </View>

        {this.state.batchDetails != null && this.state.batchDetails.length > 0 ?
          <FlatList
            data={data}
            renderItem={this._renderItem}
          /> :
          this.state.batchDetails == null ? null : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontWeight: '500' }}>No data available</Text></View>

        }


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
  getAcademyBatchDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademyBatch);


const styles = StyleSheet.create({
  batchContainerOuter: {
    backgroundColor: '#F7F7F7',
  },
  batchCardContainer: {
    borderRadius: 16,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 8,
    marginBottom: 8,
    elevation: 2,
    padding: 16
  },
  batchCardHeader: {
    fontSize: 14,
    color: '#404040',
    fontFamily: 'Quicksand-Medium'
  },
  batchWeekTimeOuter: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 7
  },
  batchLabelOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 7
  },
  batchLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    fontFamily: 'Quicksand-Medium',
  },
  batchValueOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  batchValue: {
    fontSize: 14,
    color: '#404040',
    fontFamily: 'Quicksand-Regular',
  },
  batchValuefullWidth: {
    fontSize: 14,
    color: '#404040',
    fontFamily: 'Quicksand-Regular',
  },
  coachLabel: {
    fontSize: 10,
    color: '#404040',
    fontFamily: 'Quicksand-Medium',
  },
  coachInfoOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  coachInfo: {
    marginRight: 20,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  coachImg: {
    width: 36,
    borderRadius: 8,
    height: 36,
    marginRight: 10
  },
  headCoachOuter: {
    fontFamily: 'Quicksand-Medium',
    backgroundColor: '#CDB473',
    borderRadius: 10,
    marginRight: 0,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headCoachLabel: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 10,
    color: 'white',
    marginRight: 6,
    marginLeft: 6,
    textAlign: 'center'
  },
  coachRatingOuter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  starImg: {
    width: 14,
    height: 14,
    marginRight: 6
  },
  ratingBorder: {
    borderColor: '#DFDFDF',
    marginTop: 2,
    marginBottom: 2,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingText: {
    fontSize: 12,
    color: '#707070',
    fontFamily: 'Quicksand-Bold',
    marginRight: 10,
    marginLeft: 10,
  },
  rightArrow: {
    width: 6,
    height: 13,
    marginLeft: 10
  },
  challengeBtnOuter: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  toggleAvailable: {
    flexDirection: 'row',
    //marginTop: 15,
    //marginBottom: 5,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  resultLabel: {
    color: '#A3A5AE',
    fontSize: 10,
    fontFamily: 'Quicksand-Medium',
  },
  filterOuter: {
    padding: 16
  },
  availableLabel: {
    color: '#404040',
    fontSize: 14,
    fontFamily: 'Quicksand-Medium',
  },
  toggleView: {
    marginLeft: 15
  },
  dropDownFilter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    paddingVertical: 6,
    fontFamily: 'Quicksand-Regular',
    borderColor: '#614051',
    borderRadius: 8,
    color: 'black',
  },
});

