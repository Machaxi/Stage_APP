import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, TextInput, ImageBackground, Switch } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getData, storeData } from "../../components/auth";
import FilterDialog from './FilterDialog'
import { getAcademyDetail, getAcademyFeedbackList } from '../../redux/reducers/AcademyReducer'
import BaseComponent, { defaultStyle,formattedName } from '../BaseComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import ViewMoreText from 'react-native-view-more-text';
import ReadMore from 'react-native-read-more-text';
import RNPickerSelect from 'react-native-picker-select';

const placeholder = {
  label: 'Showing for',
  value: null,
  color: '#9EA0A4',
};

class AcademyBatch extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            academy: null,
            player_id: '',
            showFeedback: false,
            feedback: [],
            filter_dialog: false,
            spinner: false,
            page: 0,
            sortType: '',
            type: '',
            clear_feedback_array: false,
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
        this.state.id = this.props.navigation.getParam('id', '');
        // getData('userInfo', (value) => {
        //     userData = JSON.parse(value)
        //     this.state.player_id = userData.user['id']
        //     console.log(this.state.player_id)
        //     if (userData.user['user_type'] == 'PLAYER' || userData.user['user_type'] == 'FAMILY') {
        //         this.setState({
        //             showFeedback: true
        //         })
        //     } else {
        //         this.setState({
        //             showFeedback: false
        //         })
        //     }
        // });
    }
 
    componentDidMount() {

        // this.props.getAcademyDetail(this.state.id).then(() => {
        //     //console.warn('Res=> ' + JSON.stringify(this.props.data.res))
        //     let status = this.props.data.res.success
        //     if (status) {
        //         let academy = this.props.data.res.data.academy
        //         this.setState({
        //             academy: academy
        //         })

        //         let sortType = this.state.sortType
        //         let type = this.state.type
        //         this.getAcademyFeedbacks(sortType, type, false)

        //     }


        // }).catch((response) => {
        //     console.log(response);
        // })
    }

    // _renderRatingItem = ({ item }) => (


    // );

    _renderItem = ({ item }) => (
      <Card style={styles.batchCardContainer}>
          <Text style={styles.batchCardHeader}>Batch 1</Text>

          <View style={styles.batchLabelOuter}>
            <Text style={styles.batchLabel}>Weekdays</Text>
            <Text style={styles.batchLabel}>Weekends</Text>
          </View>

          <View style={styles.batchValueOuter}>
            <Text style={styles.batchValue}>Mon, Tue, Wed, Thu</Text>
            <Text style={styles.batchValue}>Sat, Sun</Text>
          </View>

          <View style={styles.batchValueOuter}>
            <Text style={styles.batchValue}>8:30 AM - 10:30 AM</Text>
            <Text style={styles.batchValue}>8:30 PM - 10:30 PM</Text>
          </View>

          <View style={styles.batchLabelOuter}>
            <Text style={styles.batchLabel}>Monthly Fees</Text>
          </View>

          <View style={styles.batchValueOuter}>
            <Text style={styles.batchValuefullWidth}>Rs 2000 onwards</Text>
          </View>

          <View style={styles.batchLabelOuter}>
             <Text style={styles.coachLabel}>Caoch</Text>
          </View>

          <View style={defaultStyle.line_style} />

          <TouchableOpacity key={item} onPress={() => { console.warn("Touch Press")} }>
            <View style={styles.coachInfoOuter}>
                <View style={styles.coachInfo}>
                    <Image source={require('../../images/coach_small_pic.png')} style={styles.coachImg} />
                    <Text style={[defaultStyle.regular_text_14]}>Manish J</Text>
                    <View style={styles.headCoachOuter}>
                        {/* {item.is_head ? <Text style={styles.headCoachLabel}>Head Coach</Text> : null} */}
                         <Text style={styles.headCoachLabel}>Head Coach</Text>
                    </View>
                </View>

                <View style={styles.coachRatingOuter}>
                    <Image source={require('../../images/ic_star.png')} style={styles.starImg} />
                    <View style={styles.ratingBorder}>
                        <Text style={styles.ratingText}>4.5</Text>
                    </View>
                    <Image source={require('../../images/right_icon.png')} style={styles.rightArrow} />
                </View>
            </View>

            <View style={styles.challengeBtnOuter}>
              <Text style={defaultStyle.rounded_button}>Enquire</Text>
            </View>
        </TouchableOpacity>
      </Card>
    )

    render() {

      let data=[{'name': 'Deepika'}]
      return (

          <View>

            <View style={styles.filterOuter}>

              <View style={styles.dropDownFilter}>

                <View style={{width:'33.33%'}}>
                    <RNPickerSelect
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
                        width: 100,
                        backgroundColor: '#A3A5AE',
                        height: 1
                    }}></View>
                </View>

                    <View style={{width:'33.33%'}}>
                    <RNPickerSelect
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
                        width: 100,
                        backgroundColor: '#A3A5AE',
                        height: 1
                    }}></View>
                </View>

                    <View style={{width:'33.33%'}}>
                    <RNPickerSelect
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
                        width: 100,
                        backgroundColor: '#A3A5AE',
                        height: 1
                    }}></View>
                </View>
              </View>

               <View style={styles.toggleOuter}>
                    <View style={styles.toggleAvailable}>
                      <View><Text style={styles.availableLabel}>Availability</Text></View>
                      <View style={styles.toggleView}><Switch></Switch></View>
                    </View>
                    <View>
                      <Text style={styles.resultLabel}>4 Results</Text>
                    </View> 
                </View>

            </View>
            
            <View style={styles.batchContainerOuter}>
              <FlatList
                data={data}
                renderItem={this._renderItem}
              />
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
    getAcademyDetail, getAcademyFeedbackList
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademyBatch);


const styles = StyleSheet.create({
  batchContainerOuter: {
    backgroundColor: '#F7F7F7',
  },
  batchCardContainer  : {
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
    fontWeight: '500',
    color: '#404040',
    fontFamily: 'Quicksand-Regular'
  }, 
  batchLabelOuter:  {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 7
  },
  batchLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    fontFamily: 'Quicksand-Regular',
    fontWeight: '500',
    width: '33.33%'
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
    width: '33.33%'
  },
  batchValuefullWidth: {
    fontSize: 14,
    color: '#404040',
    fontFamily: 'Quicksand-Regular',
  },
  coachLabel: {
    fontSize: 10,
    color: '#404040',
    fontFamily: 'Quicksand-Regular',
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
    borderRadius: 6,
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
    fontSize: 14,
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
    color : '#A3A5AE',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Quicksand-Regular',
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

