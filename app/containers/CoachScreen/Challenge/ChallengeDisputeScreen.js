
import React from 'react'
import { View, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, ScrollView, Modal, TextInput } from 'react-native';
import { Card } from 'react-native-paper'
import { CustomeCard } from '../../../components/Home/Card'
import { getData } from "../../../components/auth";
import { connect } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import BaseComponent, { defaultStyle, formattedName, getFormattedCategory } from '../../BaseComponent';
import RNPickerSelect from 'react-native-picker-select'
import { getAcademyListing } from "../../../redux/reducers/RewardReducer";
import { getDisputedChallenges } from "../../../redux/reducers/CoachReducer";
import { getChallengeScore, updateChallengeScore } from "../../../redux/reducers/ChallengeReducer";
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
            selectedChallengeData: null,
            matchData: null,
            academyId: ''
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

   getChallengeScoreData(challengeId) {
    //this.progress(true);
    getData('header', (value) => {
      this.props.getChallengeScore(value, challengeId).then(() => {
        console.log(this.props);
        let data = this.props.challengeData.data
        console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));
        //this.progress(false);
        let success = data.success
        if (success) {

          this.setState({
            matchData: data.data,
          },() => {
            this.setModalVisible(true);
          })
        }

      }).catch((response) => {
        //this.progress(false);
        console.log(response);
      })
    })
   }

  saveData() {

    let postData = {}
    postData['data'] = this.state.matchData;

    console.log('postData',JSON.stringify(postData));
    
    getData('header', (value) => {
      this.props.updateChallengeScore(value, postData).then(() => {
        console.log(this.props);
        let data = this.props.data.data
        console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));
        //this.progress(false);
        let success = data.success
        if (success) {
          this.fetchDisputeListByAcademy(this.state.academyId);
          this.setModalVisible(false);  
        }

      }).catch((response) => {
        console.log(response);
      })
    })

  }

  updateScoreModal() {
    return (
      <ScrollView style={{ backgroundColor: '#F7F7F7' }}>
        <View>
          <Modal animationType="none" transparent={true} visible={this.state.modalVisible}>
            <View style={styles.modalOuter}>
              <View style={styles.modalBox}>
                <View style={styles.modalHeadingOuter}>
                  <Text></Text>
                  <Text style={[defaultStyle.bold_text_14, styles.modalHeadingText]}>Update Score</Text>

                  <TouchableOpacity onPress={() => { this.setModalVisible(false); }}>
                    <Image style={styles.closeImg} source={require('../../../images/ic_close.png')} />
                  </TouchableOpacity>
                </View>

                <View style={styles.playerCardOuter}>
                  <View style={styles.modalPlayerCard}>
                    <TouchableOpacity>
                      <ImageBackground resizeMode='contain' style={styles.playerBackImage}
                        source={require('../../../images/batch_card.png')}
                      >
                        <Text style={styles.playerScoreLabel}>Score</Text>
                        <Text style={styles.playerScore}>{this.state.selectedChallengeData.challenge_by.score}</Text>

                        <View style={styles.middleBox}>
                          <Text style={styles.playerCategory}>{getFormattedCategory(this.state.selectedChallengeData.challenge_by.player_category)}</Text>
                          <Image style={styles.playerImage} source={{ uri: this.state.selectedChallengeData.challenge_by.profile_pic }}></Image>
                          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerLevel}>{this.state.selectedChallengeData.challenge_by.player_level.split(" ").join("\n")}</Text>
                        </View>

                        <View style={styles.playerNameOuter}>
                          <Text style={styles.playerName}>{formattedName(this.state.selectedChallengeData.challenge_by.name)}</Text>
                        </View>

                        <View style={styles.badgeOuter}>
                          <ImageBackground style={styles.badgeBackImage} source={require('../../../images/single_shield.png')}>
                            <View style={styles.badgeInner}>
                              {/* <Image style={styles.badgeLeftArrow} source={require('../../images/left_batch_arrow.png')}></Image> */}
                              <Text style={styles.badgeValue}>{this.state.selectedChallengeData.challenge_by.badge== undefined ? '' : this.state.selectedChallengeData.challenge_by.badge}</Text>
                              {/* <Image style={styles.badgeRightArrow} source={require('../../images/right_batch_arrow.png')}></Image> */}
                            </View>
                          </ImageBackground>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.versusOuter}>
                    <Text style={styles.versusText}>VS</Text>
                  </View>

                      <View style={styles.modalPlayerCard}>
                        <TouchableOpacity>
                          <ImageBackground resizeMode='contain' style={styles.playerBackImage}
                            source={require('../../../images/batch_card.png')}
                          >
                            <Text style={styles.playerScoreLabel}>Score</Text>
                            <Text style={styles.playerScore}>{this.state.selectedChallengeData.opponent.score}</Text>

                            <View style={styles.middleBox}>
                              <Text style={styles.playerCategory}>{getFormattedCategory(this.state.selectedChallengeData.opponent.player_category)}</Text>
                              <Image style={styles.playerImage} source={{ uri: this.state.selectedChallengeData.opponent.profile_pic }}></Image>
                              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerLevel}>{this.state.selectedChallengeData.opponent.player_level.split(" ").join("\n")}</Text>
                            </View>

                            <View style={styles.playerNameOuter}>
                              <Text style={styles.playerName}>{formattedName(this.state.selectedChallengeData.opponent.name)}</Text>
                            </View>

                            <View style={styles.badgeOuter}>
                              <ImageBackground style={styles.badgeBackImage} source={require('../../../images/single_shield.png')}>
                                <View style={styles.badgeInner}>
                                  {/* <Image style={styles.badgeLeftArrow} source={require('../../images/left_batch_arrow.png')}></Image> */}
                                  <Text style={styles.badgeValue}>{this.state.selectedChallengeData.opponent.badge== undefined ? '' : this.state.selectedChallengeData.opponent.badge}</Text>
                                  {/* <Image style={styles.badgeRightArrow} source={require('../../images/right_batch_arrow.png')}></Image> */}
                                </View> 
                              </ImageBackground>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>

                </View>

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={styles.challengeScoreLabel}>You</Text>
                  <Text style={styles.challengeScoreLabel}>Opponent</Text>
                </View>

                {this.state.matchData != null &&
                  <View style={styles.scoreOuter}>
                    <TextInput
                      placeholder={"Enter Score"}
                      keyboardType={'number-pad'}
                      style={styles.scoreTextbox}
                      onChangeText={(text) => {
                          //item.input_score = text

                          this.state.matchData.match_scores[0].player1_score =text

                      }}>{this.state.matchData.match_scores[0].player1_score}</TextInput>
                    <TextInput
                      placeholder={"Enter Score"}
                      keyboardType={'number-pad'}
                      style={styles.scoreTextbox}
                      onChangeText={(text) => {
                        //item.input_score = text
                        this.state.matchData.match_scores[0].player2_score = text
                      }}

                    >{this.state.matchData.match_scores[0].player2_score}</TextInput>
                  </View>
                }

                <View style={styles.confirmBtnOuter}>
                  <Text style={[defaultStyle.rounded_button, styles.confirmBtn]} onPress={() => { this.saveData() }}>Submit</Text>
                </View>

              </View>
            </View>
          </Modal>
        </View>
      </ScrollView >
    )

  }


    _renderItem = ({ item }) => (

      <Card style={styles.disputeCard}>   
          <View>
            <Text style={styles.cardHeading}>{moment.utc(item.date).local().format("Do MMM YY")}</Text>
            <Text style={styles.challengePlayersName}>{item.challenge_by.name} Vs {item.opponent.name}</Text>
            <View style={styles.challengeStatusOuter}>
              <Text style={styles.challengeStatus}>{item.winner.name} won {item.score}</Text>
              <Text style={styles.challengeScoreUpdated}>Score updated by {item.score_updated_by}</Text>
            </View>

            <View>
              <Text style={styles.disputePlayer}>{item.disputed_by}<Text style={styles.disputeLabel}> has disputed the score</Text></Text>
            </View>

            <View style={styles.resolveBtnOuter}>
                <TouchableOpacity activeOpacity={.8} style={styles.rounded_button}
                onPress={() => { 
                  this.getChallengeScoreData(item.id);
                  this.setState({
                    selectedChallengeData: item
                  })

                }}>
                <Text style={styles.primaryBtnText}>Resolve</Text>
              </TouchableOpacity>
            </View>
          </View>

      </Card>
    );

  
    render() {       

      console.log('this.state.disputedChallenges', this.state.disputedChallenges);

        if (this.props.data.loading || this.props.disputeData.loading || this.props.challengeData.loading || this.state.academies.length == []) {
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
                                academyId: value
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

                
                {data!=null && data.length>0
                ?
              
                  <FlatList
                    data={data}
                    renderItem={this._renderItem}
                />
                :
                
                <View style={{ padding:16, alignItems: 
                'center', justifyContent: 'center' }}>
                <Text style={defaultStyle.regular_text_14}>{data==null?"Select Academy":"No challenge dispute found"}</Text>
            </View>
              }
                {this.state.selectedChallengeData!=null && this.updateScoreModal()}

            </View>);

    }
}

const mapStateToProps = state => {
    return {
        data: state.RewardReducer,
        disputeData: state.coachReducer,
        challengeData: state.ChallengeReducer
    };
};
const mapDispatchToProps = {
    getAcademyListing, getDisputedChallenges, getChallengeScore, updateChallengeScore
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
    //borderWidth: 1,
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
  },
  closeImg: {
    height: 30,
    width: 30,
  },
  modalOuter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    paddingVertical: 16
  },
  modalBox: {
    width: "95%",
    //margin: 16,
    //padding: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    height: 470,
  },
  modalHeadingOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10
  },
  modalHeadingText: {
    color: '#707070',
    fontFamily: 'Quicksand-Regular'
  },
  confirmBtnOuter: {
    marginHorizontal: 16,
    //marginTop: 20,
    marginBottom: 15
  },
  confirmBtn: {
    marginTop: 16,
    width: "100%",
    marginLeft: 0,
    marginRight: 0,
    fontFamily: 'Quicksand-Regular',
  },
  scoreOuter: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 18, 
    marginTop: 5
  },
  scoreTextbox: {
    textAlign: 'center',
    color: '#404040',
    width: '40%', 
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CECECE'
},
challengeScoreLabel: { 
  color: '#404040', 
  fontSize: 14, 
  fontFamily: 'Quicksand-Regular', 
  width: "50%", 
  textAlign: 'center' 
},
  playerCardOuter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal: 5
    marginLeft: 18,
    marginTop: 15
  },
  modalPlayerCard: {
    overflow: 'hidden',
    height: 200,
    width: "35%",
    marginBottom: 16
  },
  playerScoreLabel: {
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 6,
    paddingTop: 6,
    fontFamily: 'Quicksand-Medium'
  },
  playerScore: {
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Quicksand-Medium'
  },
  middleBox: {
    flexDirection: 'row',
    paddingTop: 10,
    marginLeft: 2,
    marginRight: 2,
  },
  playerCategory: {
    width: 26,
    height: 12,
    color: 'white',
    marginRight: 4,
    marginTop: 16,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'red',
    borderRadius: 4,
    fontSize: 8,
    paddingTop: 1,
    fontFamily: 'Quicksand-Regular'
  },
  playerImage: {
    height: 65,
    width: 50,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  playerLevel: {
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 7,
    marginLeft: 4,
    marginTop: 16,
    fontFamily: 'Quicksand-Regular'
  },
  playerNameOuter: {
    position: 'absolute',
    marginTop: 103,
    width: "100%",
    height: 23,
    backgroundColor: 'white'
  },
  playerName: {
    color: '#404040',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium'
  },
  badgeOuter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  badgeBackImage: {
    height: 38,
    width: 57,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeInner: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  badgeLeftArrow: {
    height: 7,
    width: 12,
    marginLeft: -12
  },
  badgeValue: {
    fontSize: 5,
    color: '#F4F4F4',
  },
  badgeRightArrow: {
    height: 7,
    width: 12,
    marginRight: -12
  },
  versusOuter: {
    backgroundColor: '#6759B7',
    borderRadius: 50,
    width: 40,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  versusText: {
    color: '#ffffff',
    fontFamily: 'Quicksand-Regular',
    fontSize: 17,
    fontFamily: 'Quicksand-Regular'
  },
  opponentCard: {
    overflow: 'hidden',
    height: 200,
    width: "35%",
    marginBottom: 16
  },
  opponentBackImage: {
    height: 200,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addOpponentLabel: {
    color: 'white',
    fontSize: 12,
    paddingTop: 6,
    color: '#A3A5AE',
    fontFamily: 'Quicksand-Regular'
  },
   playerBackImage: {
    height: 182,
    width: '100%'
  },
});
