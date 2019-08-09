
import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'
import { CustomeCard } from '../../../components/Home/Card'
import { getData } from "../../../components/auth";
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import BaseComponent, { defaultStyle } from '../../BaseComponent';
import RNPickerSelect from 'react-native-picker-select'
import { getAcademyListing } from "../../../redux/reducers/RewardReducer";
import { getDisputedChallenges } from "../../../redux/reducers/CoachReducer";
import moment from 'moment'

const placeholder = {
    label: 'Select Academy ',
    value: null,
    color: '#9EA0A4',
};

class ChallengeDisputeScreen extends BaseComponent {


    constructor(props) {
        super(props)
        this.state = {
            isFirstInstance: true,
            batchList: ["Test1", "Test2", "Test3"],
            country: '',
            academies: [],
            coach_id: '',
            dues: null,
            alert: false,
            disputedChallenges: null,
            modalVisible: false,
            selectedChallengeData: null
        }
        this.inputRefs = {
            country: null
        };
        console.warn('test')
    }

    componentDidMount() {

        getData('userInfo', (value) => {
            let userData = JSON.parse(value)
            this.setState({
                coach_id: userData['coach_id']
            })
        })

        this.getAcademyList();
        //this.fetchDisputeListByAcademy(1);
    }

     setModalVisible(visible) {
      this.setState({ modalVisible: visible });
    }

    getAcademyList() {
      getData('header', (value) => {
        this.props.getAcademyListing(value).then(() => {
            let user = JSON.stringify(this.props.data.data);
            console.log(' user response payload 11' + user);
            let user1 = JSON.parse(user)
            if (user1.success) {
                let array = user1.data['academies']
                let newArray = []
                for (let i = 0; i < array.length; i++) {
                    let row = array[i];
                    let obj = {
                        label: row.academy_name,
                        value: row.academy_id,
                    }
                    newArray[i] = obj
                }
                this.setState({
                    academies: newArray
                })
            }

        }).catch((response) => {
            //handle form errors
            console.log(response);
        })
      });
    }

    fetchDisputeListByAcademy(academyId) {
      getData('header', (value) => {
        this.props.getDisputedChallenges(value, academyId).then(() => {
          console.log('this.props.disputeData',this.props.disputeData.res);
            let data = this.props.disputeData.res;
            console.log(' user response payload 11' + data);
            if (data.success) {
              console.log('in if');
                this.setState({
                    disputedChallenges: data.data.challenges
                })
           }

        }).catch((response) => {
            //handle form errors
            console.log(response);
        })
      });
    }


    _renderItem = ({ item }) => (

      <Card style={styles.disputeCard}>   
          <View>
            <Text style={styles.cardHeading}>{item.date}</Text>
            <Text style={styles.challengePlayersName}>{item.challenge_by.name} Vs {item.opponent.name}</Text>
            <View style={styles.challengeStatusOuter}>
              <Text style={styles.challengeStatus}>Rahul won {item.score}</Text>
              <Text style={styles.challengeScoreUpdated}>Score updated by {item.score_updated_by}</Text>
            </View>

            <View>
              <Text style={styles.disputePlayer}>{item.disputed_by}<Text style={styles.disputeLabel}>has disputed the score</Text></Text>
            </View>

            <View style={styles.resolveBtnOuter}>
                <TouchableOpacity activeOpacity={.8} style={styles.rounded_button}
                onPress={() => { 
                  this.getChallengeScoreData(item.id);
                  this.setState({
                    selectedChallengeData: item
                  })
                  //this.setModalVisible(true); }}>
                <Text style={styles.primaryBtnText}>Resolve</Text>
              </TouchableOpacity>
            </View>
          </View>

      </Card>
    );

  
    render() {       

      console.log('this.state.disputedChallenges', this.state.disputedChallenges);

        if (this.props.data.loading || this.props.disputeData.loading || this.state.academies.length == []) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }

        let data = this.state.disputedChallenges;

        console.log('data111111111111', data);

        return (

            <View style={{ flex: 1, padding: 16, backgroundColor: '#F7F7F7' }}>

                <View
                    style={{ justifyContent: 'center', alignItems: 'center', }} >

                    <RNPickerSelect style={{
                        width: '90%',
                    }}
                        placeholder={placeholder}
                        items={this.state.academies}
                        onValueChange={(value) => {
                            console.warn(value)
                            this.setState({
                                country: value,
                            });
                            this.fetchDisputeListByAcademy(value)
                        }}
                        style={pickerSelectStyles}
                        value={this.state.country}
                        useNativeAndroidPickerStyle={false}
                        ref={(el) => {
                            this.inputRefs.country = el;
                        }}
                    />


                    <View style={{
                        width: 220,
                        backgroundColor: '#A3A5AE',
                        height: 1,
                        marginBottom: 20
                    }}></View>

                </View>


                  <FlatList
                    data={data}
                    renderItem={this._renderItem}
                />
                {data!=null && this.updateScoreModal()}

            </View>);

    }
}

const mapStateToProps = state => {
    return {
        data: state.RewardReducer,
        disputeData: state.coachReducer
    };
};
const mapDispatchToProps = {
    getAcademyListing, getDisputedChallenges
};
export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDisputeScreen);


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      //paddingVertical: 12,
      //paddingHorizontal: 10,
      borderColor: '#614051',
      borderRadius: 8,
      color: 'black',
      marginBottom: 4,
      alignItems:'center',
      textAlign:'center',
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
const styles = StyleSheet.create({
  disputeCard: {
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 8,
    elevation: 2,
    padding: 14
  },
  cardHeading: {
    fontSize: 10,
    color: '#404040',
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
    paddingBottom: 15,
    fontFamily: 'Quicksand-Medium'
  },
   challengePlayersName: {
    fontSize: 14,
    color: '#404040',
    marginTop: 15,
    marginBottom: 15,
    fontFamily: 'Quicksand-Medium'
  },
  challengeStatusOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
   challengeStatus: {
    fontSize: 14,
    color: '#404040',
    width: '50%',
    fontFamily: 'Quicksand-Regular'
  },
  challengeScoreUpdated: {
    fontSize: 14,
    color: '#404040',
    width: '50%',
    fontFamily: 'Quicksand-Regular'
  },
  rounded_button: {
    width: '50%',
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
  primaryBtnText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Quicksand-Regular'
  },
  resolveBtnOuter: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disputePlayer: {
    color: '#404040',
    fontFamily: 'Quicksand-Medium',
    fontSize: 14
  },
  disputeLabel: {
    color: '#404040',
    fontFamily: 'Quicksand-Regular',
    fontSize: 14
  }
});
