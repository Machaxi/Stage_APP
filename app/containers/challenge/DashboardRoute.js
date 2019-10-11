import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, FlatList, TextInput, Keyboard, Text, ImageBackground, ScrollView, Modal } from 'react-native';
import { Card } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BaseComponent, { defaultStyle, EVENT_REFRESH_CHALLENGE, formattedName, getFormattedCategory, EVENT_REFRESH_RESULTS, SESSION_DATE_FORMAT, getFormattedBadge } from '../BaseComponent'
import { getData } from "../../components/auth";
import {
  getChallengeDashboard, acceptChallenge,
  cancelChallenge, dismissChallenge, abortChallenge,
  getChallengeScore, updateChallengeScore
} from "../../redux/reducers/ChallengeReducer";
import { connect } from 'react-redux';
import moment from 'moment';
import Events from '../../router/events';
import Spinner from 'react-native-loading-spinner-overlay';

class DashboardRoute extends BaseComponent {

  constructor(props) {
    super(props)

    this.state = {
      playerData: [],
      challengeData: [],
      query: '',
      modalVisible: false,
      playerId: null,
      selectedOpponentData: null,
      matchData: null,
      spinner: false,
      academyId: null,
      isRefreshing: false
    }
  }

  componentDidMount() {

    this.refreshEvent = Events.subscribe(EVENT_REFRESH_CHALLENGE, () => {
      console.warn(EVENT_REFRESH_CHALLENGE)
      this.getDashboardData();
    });

    this.getDashboardData();

  }

  progress(status) {
    this.setState({
      spinner: status
    })
  }

  getDashboardData() {
    getData('userInfo', (value) => {
      userData = JSON.parse(value)
      let player_id = global.SELECTED_PLAYER_ID
      let academy_id = userData['academy_id'];
      this.state.playerId = player_id//userData['player_id'];
      this.state.academyId = userData['academy_id'];
      getData('header', (value) => {
        this.setState({ isRefreshing: false })


        this.props.getChallengeDashboard(value, academy_id, player_id).then(() => {
          let data = this.props.data.data
          //console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));

          //console.log('data.data.dashboard', data.data.dashboard);
          console.log('data.data.challenges', JSON.stringify(data.data.dashboard.challenges))

          let success = data.success
          if (success) {

            //console.log(' getChallengeDashboardsds ' + JSON.stringify(data.data.dashboard));

            this.setState({
              playerData: [data.data.dashboard.player],
              challengeData: data.data.dashboard.challenges,
            })
          }

        }).catch((response) => {
          console.log(response);
          this.setState({ isRefreshing: false })

        })
      })
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  acceptTheChallenge(challengeId) {
    getData('header', (value) => {
      let player_id = global.SELECTED_PLAYER_ID

      this.props.acceptChallenge(value, challengeId, player_id).then(() => {
        let data = this.props.data.data
        console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));

        let success = data.success
        if (success) {

          this.setState({
            playerData: [data.data.dashboard.player],
            challengeData: data.data.dashboard.challenges,
          })
        }

      }).catch((response) => {
        console.log(response);
      })
    })
  }

  cancelTheChallenge(challengeId) {
    getData('header', (value) => {
      let player_id = global.SELECTED_PLAYER_ID

      this.props.cancelChallenge(value, challengeId, player_id).then(() => {
        let data = this.props.data.data
        //console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));

        let success = data.success
        if (success) {

          this.setState({
            playerData: [data.data.dashboard.player],
            challengeData: data.data.dashboard.challenges,
          })
        }

      }).catch((response) => {
        console.log(response);
      })
    })
  }

  dismissTheChallenge(challengeId) {
    getData('header', (value) => {

      let player_id = global.SELECTED_PLAYER_ID
      this.props.dismissChallenge(value, challengeId, player_id).then(() => {
        let data = this.props.data.data
        //console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));

        let success = data.success
        if (success) {

          const success_message = data.success_message
          //this.dropDownAlertRef.alertWithType('success', 'Success', success_message);
          this.showSnackBar(success_message)

          this.setState({
            playerData: [data.data.dashboard.player],
            challengeData: data.data.dashboard.challenges,
          })
        }

      }).catch((response) => {
        console.log(response);
      })
    })
  }

  abortTheChallenge(challengeId) {
    getData('header', (value) => {
      let player_id = global.SELECTED_PLAYER_ID

      this.props.abortChallenge(value, challengeId, player_id).then(() => {
        let data = this.props.data.data
        //console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));

        let success = data.success
        if (success) {

          const success_message = data.success_message
          //this.dropDownAlertRef.alertWithType('success', 'Success', success_message);
          this.showSnackBar(success_message)

          this.setState({
            playerData: [data.data.dashboard.player],
            challengeData: data.data.dashboard.challenges,
          })
        }

      }).catch((response) => {
        console.log(response);
      })
    })
  }

  getChallengeScoreData(challengeId) {

    console.log('challengeId', challengeId);
    this.progress(true);
    getData('header', (value) => {
      this.props.getChallengeScore(value, challengeId).then(() => {
        let data = this.props.data.data
        console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));
        this.progress(false);
        let success = data.success
        if (success) {

          this.setState({
            matchData: data.data,
          }, () => {
            this.setModalVisible(true);
          })
        }

      }).catch((response) => {
        this.progress(false);
        console.log(response);
      })
    })
  }

  saveData() {





    let player1_score = +this.state.matchData.match_scores[0].player1_score
    let player2_score = +this.state.matchData.match_scores[0].player2_score

    if (player1_score != 21 && player2_score != 21) {
      alert('Please submit the valid score.')
      return
    }

    let matchData = { ...this.state.matchData }


    try {
      //console.log('updateScoreModal=>data', JSON.stringify(data))
      let opponentData = this.state.selected_score_update//challenge_by
      console.log('updateScoreModal=>ChallengeBy', JSON.stringify(this.state.selected_score_update))
      let player_id = global.SELECTED_PLAYER_ID
      let opponent_id = opponentData.opponent.id
      let challenge_by_other = player_id == opponent_id
      let is_player_1 = player_id == opponent_id
      console.log('updateScoreModal=>opponent_id', opponent_id)
      console.log('updateScoreModal=>player_id', player_id)
      console.log('updateScoreModal=>challenge_by_other', challenge_by_other)

      if (is_player_1) {
        matchData.match_scores[0].player1_score = player2_score
        matchData.match_scores[0].player2_score = player1_score

      }

    } catch (err) {
      console.log("err", JSON.stringify(err))
    }


    let postData = {}
    postData['data'] = matchData;

    console.log('postData', JSON.stringify(postData));

    this.progress(true);
    getData('header', (value) => {
      this.props.updateChallengeScore(value, postData).then(() => {
        console.log(this.props);
        let data = this.props.data.data
        //console.log(' getChallengeDashboard1111 ' + JSON.stringify(data));
        this.progress(false);
        let success = data.success
        if (success) {
          Events.publish(EVENT_REFRESH_RESULTS);
          this.setModalVisible(false);
          this.getDashboardData()
        }

      }).catch((response) => {
        this.progress(false);
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

  updateScoreModal(data) {

    return (
      <ScrollView style={{ backgroundColor: '#F7F7F7' }}>
        <View>
          <Modal animationType="none" transparent={true} visible={this.state.modalVisible}>
            <View style={styles.modalOuter}>
              <View style={styles.modalBox}>
                <View style={styles.modalHeadingOuter}>
                  <Text></Text>
                  <Text style={[defaultStyle.bold_text_14, styles.modalHeadingText]}>Update Score</Text>

                  <TouchableOpacity activeOpacity={.8} onPress={() => { this.setModalVisible(false); }}>
                    <Image style={styles.closeImg} source={require('../../images/ic_close.png')} />
                  </TouchableOpacity>
                </View>

                <View style={styles.playerCardOuter}>
                  <View style={styles.modalPlayerCard}>
                    <TouchableOpacity>
                      <ImageBackground resizeMode='contain' style={styles.playerBackImage}
                        source={require('../../images/batch_card.png')}
                      >
                        <Text style={styles.playerScoreLabel}>Score</Text>
                        <Text style={styles.playerScore}>{data.score == '' || data.score == undefined ? "-" : data.score}</Text>

                        <View style={styles.middleBox}>
                          <Text style={styles.playerCategory}>{getFormattedCategory(data.player_category)}</Text>
                          <Image resizeMode="contain" style={styles.playerImage} source={{ uri: data.profile_pic }}></Image>
                          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerLevel}>{data.player_level.split(" ").join("\n")}</Text>
                        </View>

                        <View style={styles.playerNameOuter}>
                          <Text style={styles.playerName}>{formattedName(data.name)}</Text>
                        </View>

                        <View style={styles.badgeOuter}>
                          <ImageBackground style={styles.badgeBackImage} source={require('../../images/single_shield.png')}>
                            <View style={styles.badgeInner}>
                              {/* <Image style={styles.badgeLeftArrow} source={require('../../images/left_batch_arrow.png')}></Image> */}
                              <Text style={[defaultStyle.bebas_text_blue_10, styles.badgeValue]}>{data.badge == undefined ? '' : getFormattedBadge(data.badge)}</Text>
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

                  {
                    this.state.selectedOpponentData != null ?
                      <View style={styles.modalPlayerCard}>
                        <TouchableOpacity>
                          <ImageBackground resizeMode='contain' style={styles.playerBackImage}
                            source={require('../../images/batch_card.png')}
                          >
                            <Text style={styles.playerScoreLabel}>Score</Text>
                            <Text style={styles.playerScore}>{this.state.selectedOpponentData.score}</Text>

                            <View style={styles.middleBox}>
                              <Text style={styles.playerCategory}>{getFormattedCategory(this.state.selectedOpponentData.player_category)}</Text>
                              <Image style={styles.playerImage} source={{ uri: this.state.selectedOpponentData.profile_pic }}></Image>
                              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerLevel}>{this.state.selectedOpponentData.player_level.split(" ").join("\n")}</Text>
                            </View>

                            <View style={styles.playerNameOuter}>
                              <Text style={styles.playerName}>{formattedName(this.state.selectedOpponentData.name)}</Text>
                            </View>

                            <View style={styles.badgeOuter}>
                              <ImageBackground style={styles.badgeBackImage} source={require('../../images/single_shield.png')}>
                                <View style={styles.badgeInner}>
                                  {/* <Image style={styles.badgeLeftArrow} source={require('../../images/left_batch_arrow.png')}></Image> */}
                                  <Text style={styles.badgeValue}>{getFormattedBadge(this.state.selectedOpponentData.badge)}</Text>
                                  {/* <Image style={styles.badgeRightArrow} source={require('../../images/right_batch_arrow.png')}></Image> */}
                                </View>
                              </ImageBackground>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View> : null
                  }

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
                      value={this.state.matchData.match_scores[0].player1_score}
                      onChangeText={(text) => {
                        //item.input_score = text

                        if (!this.isNumbericOnly(text)) {
                          text = ''
                        }
                        let matchData = { ...this.state.matchData }
                        matchData.match_scores[0].player1_score = text
                        console.log('matchData=>', JSON.stringify(matchData))
                        this.setState({
                          matchData
                        })
                      }}></TextInput>
                    <TextInput
                      placeholder={"Enter Score"}
                      keyboardType={'number-pad'}
                      style={styles.scoreTextbox}
                      value={this.state.matchData.match_scores[0].player2_score}
                      onChangeText={(text) => {
                        //item.input_score = text
                        //this.state.matchData.match_scores[0].player2_score = text

                        if (!this.isNumbericOnly(text)) {
                          text = ''
                        }
                        let matchData = { ...this.state.matchData }
                        matchData.match_scores[0].player2_score = text
                        console.log('matchData=>', JSON.stringify(matchData))
                        this.setState({
                          matchData
                        })

                      }}></TextInput>
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

  _renderItem = ({ item,index }) => (


    <View>
      <TouchableOpacity activeOpacity={.8}>
        <Card style={styles.challengePlayerCard}>
          <Text style={[styles.cardHeading, { marginHorizontal: 16 }]}>Create Challenge</Text>
          <View style={styles.playerCardOuter}>
            <View style={styles.playerCard}>
              <TouchableOpacity
                activeOpacity={1}
              >
                <ImageBackground resizeMode='contain' style={styles.playerBackImage}
                  source={require('../../images/batch_card.png')}
                >
                  <Text style={styles.playerScoreLabel}>Score</Text>
                  <Text style={styles.playerScore}>{item.score}</Text>

                  <View style={styles.middleBox}>
                    <Text style={styles.playerCategory}>{getFormattedCategory(item.player_category)}</Text>
                    <Image style={styles.playerImage} source={{ uri: item.profile_pic }}></Image>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerLevel}>{item.player_level.split(" ").join("\n")}</Text>
                  </View>

                  <View style={styles.playerNameOuter}>
                    <Text style={styles.playerName}>{formattedName(item.name)}</Text>
                  </View>

                  <View style={styles.badgeOuter}>
                    <ImageBackground
                      source={require('../../images/single_shield.png')}
                      style={styles.badgeBackImage} >
                      <View style={styles.badgeInner}>
                        <Text style={styles.badgeValue}>{getFormattedBadge(item.badge)}</Text>
                      </View>
                    </ImageBackground>


                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={styles.versusOuter}>
              <Text style={styles.versusText}>VS</Text>
            </View>

            <View style={styles.opponentCard}>
              <TouchableOpacity
                activeOpacity={.8}
                onPress={() => { this.props.navigation.navigate('OpponentList', { playerData: item }) }}>
                <ImageBackground resizeMode='contain' style={styles.opponentBackImage} source={require('../../images/batch_card_grey.png')}>
                  <Text style={styles.addOpponentLabel}>+ Add Opponent</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </TouchableOpacity>


      {this.state.challengeData.length > 0 ?
        < View style={styles.filterOuter}>
          <Text style={styles.challengeText}>Challenges</Text>
          {/* <Text style={styles.filterText}>Filter</Text> */}
        </View>
        : null
      }
      {
        this.state.challengeData.map((item, index) => {
          return (
            <Card key={index} style={styles.challengeCard}>

              {item.opponent.id == this.state.playerId ?
                <View>
                  <View style={styles.acceptCardHeadingOuter}>
                    <View style={styles.acceptCardHeading}>
                      <Text style={styles.acceptCardheadingText}>You have been challenged</Text>
                      {
                        item.challenge_status == 'ACCEPTED' &&
                        <Text style={styles.statusLabel}> Accepted </Text>
                      }
                      {
                        item.challenge_status == 'REJECTED' &&
                        <Text style={styles.statusErrorLabel}> Rejected </Text>
                      }
                    </View>
                    {
                      (item.challenge_status == 'ACCEPTED') &&

                      <Text style={styles.actionLabel} onPress={() => { this.abortTheChallenge(item.id) }}>Abort</Text>}
                    {(item.challenge_status == 'REJECTED') &&
                      <Text style={styles.actionDismissLabel} onPress={() => { this.dismissTheChallenge(item.id) }}>Dismiss</Text>
                    }

                  </View>
                  {/* <Text style={styles.cardHeading}>You have been challenged</Text> */}
                  <Text style={styles.challengePlayerName}>{item.challenge_by.name}</Text>
                  <View style={styles.scoreCatLabelOuter}>
                    <Text style={styles.scoreLabel}>Score</Text>
                    <Text style={styles.categoryLabel}>Category</Text>
                    <Text style={styles.dateLabel}>Date</Text>
                  </View>
                  <View style={styles.scoreCatValueOuter}>
                    <Text style={styles.scoreValue}>{item.challenge_by.score}</Text>
                    <Text style={styles.categoryValue}>{getFormattedCategory(item.challenge_by.player_category)}</Text>
                    <Text style={styles.dateValue}>{moment.utc(item.date).local().format(SESSION_DATE_FORMAT)}</Text>
                  </View>

                  {item.challenge_status == 'PENDING' &&
                    <View style={styles.challengeBtnOuter}>
                      <TouchableOpacity activeOpacity={.8} style={styles.rounded_button_white}
                        onPress={() => { this.cancelTheChallenge(item.id) }}>
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={.8} style={styles.rounded_button}
                        onPress={() => { this.acceptTheChallenge(item.id) }}>
                        <Text style={styles.primaryBtnText}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                  }

                  {item.challenge_status == 'ACCEPTED' &&
                    <View style={styles.challengeBtnOuter}>
                      <Text style={[defaultStyle.rounded_button_150, { marginRight: 20 }]}>Book Court</Text>
                      <Text style={defaultStyle.rounded_button_150} onPress={() => {
                        this.getChallengeScoreData(item.id);
                        //this.setModalVisible(true);
                        console.log('UpdateScore=>',JSON.stringify(item))
                        console.log('UpdateScore=>index',index)
                        this.setState({
                          selectedOpponentData: item.challenge_by,
                          selected_score_update: item
                        })
                      }}>Update Score</Text>
                    </View>
                  }


                </View>

                :

                <View>
                  <View style={styles.acceptCardHeadingOuter}>
                    <View style={styles.acceptCardHeading}>
                      <Text style={styles.acceptCardheadingText}>You have challenged</Text>
                      {
                        item.challenge_status == 'ACCEPTED' &&
                        <Text style={styles.statusLabel}> Accepted </Text>
                      }
                      {
                        item.challenge_status == 'PENDING' &&
                        <Text style={styles.statusLabel}> Pending </Text>
                      }
                      {
                        item.challenge_status == 'REJECTED' &&
                        <Text style={styles.statusErrorLabel}> Rejected </Text>
                      }
                    </View>
                    {
                      (item.challenge_status == 'ACCEPTED' || item.challenge_status == 'PENDING') ?

                        <Text style={styles.actionLabel} onPress={() => { this.abortTheChallenge(item.id) }}>Abort</Text>
                        :
                        <Text style={styles.actionDismissLabel} onPress={() => { this.dismissTheChallenge(item.id) }}>Dismiss</Text>
                    }

                  </View>
                  <Text style={styles.challengePlayerName}>{item.opponent.name}</Text>
                  <View style={styles.scoreCatLabelOuter}>
                    <Text style={styles.scoreLabel}>Score</Text>
                    <Text style={styles.categoryLabel}>Category</Text>
                    <Text style={styles.dateLabel}>Date</Text>
                  </View>
                  <View style={styles.scoreCatValueOuter}>
                    <Text style={styles.scoreValue}>{item.opponent.score}</Text>
                    <Text style={styles.categoryValue}>{getFormattedCategory(item.opponent.player_category)}</Text>
                    <Text style={styles.dateValue}>{moment.utc(item.date).local().format(SESSION_DATE_FORMAT)}</Text>
                  </View>

                  {item.challenge_status == 'ACCEPTED' &&
                    <View style={styles.challengeBtnOuter}>
                      <Text style={[defaultStyle.rounded_button_150, { marginRight: 20 }]}>Book Court</Text>
                      <Text style={defaultStyle.rounded_button_150} onPress={() => {
                        this.getChallengeScoreData(item.id);
                        console.log('UpdateScore=>index',index)
                        //this.setModalVisible(true);
                        this.setState({
                          selectedOpponentData: item.opponent,
                          selected_score_update: item

                        })
                      }}>Update Score</Text>
                    </View>
                  }

                </View>


              }

            </Card>
          )
        })
      }

      {/* <Card style={styles.challengeCard}>
        <View>
          <Text style={styles.cardHeading}>You have been challenged</Text>
          <Text style={styles.challengePlayerName}>Vinoth T</Text>
          <View style={styles.scoreCatLabelOuter}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.categoryLabel}>Category</Text>
            <Text style={styles.dateLabel}>Date</Text>
          </View>
          <View style={styles.scoreCatValueOuter}>
            <Text style={styles.scoreValue}>50</Text>
            <Text style={styles.categoryValue}>U-13</Text>
            <Text style={styles.dateValue}>25/05/2019</Text>
          </View>

          <View style={styles.challengeBtnOuter}>
            <TouchableOpacity activeOpacity={.8} style={styles.rounded_button_white}
              onPress={() => { this.props.navigation.navigate('Registration') }}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.8} style={styles.rounded_button}
              onPress={() => { this.props.navigation.navigate('Registration') }}>
              <Text style={styles.primaryBtnText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Card>

      <Card style={styles.challengeCard}>

        <View>
          <View style={styles.acceptCardHeadingOuter}>
            <View style={styles.acceptCardHeading}>
              <Text style={styles.acceptCardheadingText}>You have challenged</Text>
              <Text style={styles.statusLabel}> Accepted </Text>
            </View>
            <Text style={styles.actionLabel}>Abort</Text>
          </View>
          <Text style={styles.challengePlayerName}>Vinoth T</Text>
          <View style={styles.scoreCatLabelOuter}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.categoryLabel}>Category</Text>
            <Text style={styles.dateLabel}>Date</Text>
          </View>
          <View style={styles.scoreCatValueOuter}>
            <Text style={styles.scoreValue}>50</Text>
            <Text style={styles.categoryValue}>U-13</Text>
            <Text style={styles.dateValue}>25/05/2019</Text>
          </View>

          <View style={styles.challengeBtnOuter}>
            <Text style={[defaultStyle.rounded_button_150, { marginRight: 20 }]}>Book Court</Text>
            <Text style={defaultStyle.rounded_button_150}>Update Score</Text>
          </View>
        </View>

      </Card>

      <Card style={styles.challengeCard}>

        <View>
          <View style={styles.acceptCardHeadingOuter}>
            <View style={styles.acceptCardHeading}>
              <Text style={styles.acceptCardheadingText}>You have challenged</Text>
              <Text style={styles.statusLabel}> Pending </Text>
            </View>
            <Text style={styles.actionLabel}>Abort</Text>
          </View>
          <Text style={styles.challengePlayerName}>Vinoth T</Text>
          <View style={styles.scoreCatLabelOuter}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.categoryLabel}>Category</Text>
            <Text style={styles.dateLabel}>Date</Text>
          </View>
          <View style={styles.scoreCatValueOuter}>
            <Text style={styles.scoreValue}>50</Text>
            <Text style={styles.categoryValue}>U-13</Text>
            <Text style={styles.dateValue}>25/05/2019</Text>
          </View>
        </View>

      </Card>

      <Card style={styles.challengeCard}>

        <View>
          <View style={styles.acceptCardHeadingOuter}>
            <View style={styles.acceptCardHeading}>
              <Text style={styles.acceptCardheadingText}>You have challenged</Text>
              <Text style={styles.statusErrorLabel}> Rejected </Text>
            </View>
            <Text style={styles.actionDismissLabel}>Dismiss</Text>
          </View>
          <Text style={styles.challengePlayerName}>Vinoth T</Text>
          <View style={styles.scoreCatLabelOuter}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.categoryLabel}>Category</Text>
            <Text style={styles.dateLabel}>Date</Text>
          </View>
          <View style={styles.scoreCatValueOuter}>
            <Text style={styles.scoreValue}>50</Text>
            <Text style={styles.categoryValue}>U-13</Text>
            <Text style={styles.dateValue}>25/05/2019</Text>
          </View>
        </View>
      </Card> */}
    </View >

  );

  onRefresh() {
    this.setState({ isRefreshing: true }, function () { this.getDashboardData(); });
  }



  render() {

    if (this.props.data.loading || this.state.playerData == null) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#67BAF5" />
        </View>
      )
    }

    let selectedIndex = this.state.selectedIndex
    let data = this.state.playerData;
    //console.log('data', data);
    return (

      <View style={styles.chartContainer}>
        <Spinner
          visible={this.state.spinner}
          textStyle={defaultStyle.spinnerTextStyle}
        />

        <FlatList
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isRefreshing}
          data={data}
          extraData={data}
          renderItem={this._renderItem}
        />
        {data.length > 0 && this.updateScoreModal(data[0])}
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
  getChallengeDashboard, acceptChallenge, cancelChallenge, dismissChallenge, abortChallenge, getChallengeScore, updateChallengeScore
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardRoute);

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    fontFamily: 'Quicksand-Regular'
  },
  rounded_button: {
    width: '48%',
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
  challengePlayerCard: {
    borderRadius: 16,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 8,
    marginBottom: 8,
    elevation: 2,
    paddingVertical: 16
  },
  challengeCard: {
    borderRadius: 16,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 8,
    marginBottom: 8,
    elevation: 2,
    padding: 16
  },
  playerCardOuter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal: 5
    marginLeft: 18,
    marginTop: 15
  },
  playerCard: {
    overflow: 'hidden',
    height: 200,
    width: "35%",
    marginBottom: 16
  },
  playerBackImage: {
    height: 182,
    width: '100%'
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
    fontFamily: 'Quicksand-Medium',
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
    fontFamily: 'Quicksand-Medium'
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
    color: 'white',
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
    height: 180,
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
  filterOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16
  },
  challengeText: {
    fontSize: 14,
    color: '#707070',
    fontFamily: 'Quicksand-Medium',
  },
  filterText: {
    fontSize: 12,
    color: '#707070',
    fontFamily: 'Quicksand-Regular'
  },
  rounded_button_white: {
    width: '48%',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 4,
    borderColor: '#FF7373',
    backgroundColor: 'white',
    color: '#FC4E4E',
    textAlign: 'center',
    fontFamily: 'Quicksand-Regular'
  },
  cardHeading: {
    fontSize: 10,
    color: '#404040',
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
    paddingBottom: 15,
    fontFamily: 'Quicksand-Medium'
  },
  challengePlayerName: {
    fontSize: 14,
    color: '#404040',
    marginTop: 15,
    marginBottom: 15,
    fontFamily: 'Quicksand-Medium'
  },
  scoreCatLabelOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  scoreLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
  },
  categoryLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
  },
  dateLabel: {
    fontSize: 10,
    color: '#A3A5AE',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
  },
  scoreCatValueOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  scoreValue: {
    fontSize: 14,
    color: '#404040',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
  },
  categoryValue: {
    fontSize: 14,
    color: '#404040',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
  },
  dateValue: {
    fontSize: 14,
    color: '#404040',
    width: '33.33%',
    fontFamily: 'Quicksand-Medium'
  },
  challengeBtnOuter: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 15
  },
  cancelBtnText: {
    color: '#FC4E4E',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium'
  },
  primaryBtnText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium'
  },
  acceptCardHeadingOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
    paddingBottom: 7
  },
  acceptCardHeading: {
    display: 'flex',
    flexDirection: 'row'
  },
  acceptCardheadingText: {
    fontSize: 10,
    color: '#404040',
    marginRight: 10,
    fontFamily: 'Quicksand-Regular'
  },
  statusLabel: {
    fontSize: 10,
    color: '#404040',
    backgroundColor: '#667DDB',
    paddingVertical: 3,
    paddingHorizontal: 7,
    color: '#ffffff',
    borderRadius: 4,
    fontFamily: 'Quicksand-Regular'
  },
  actionLabel: {
    fontSize: 10,
    fontFamily: 'QuickSand-Regular',
    color: '#FF7373',
    fontFamily: 'Quicksand-Regular'
  },
  statusErrorLabel: {
    fontSize: 10,
    color: '#404040',
    backgroundColor: '#FF7373',
    paddingVertical: 3,
    paddingHorizontal: 7,
    color: '#ffffff',
    borderRadius: 4,
    fontFamily: 'Quicksand-Regular'
  },
  actionDismissLabel: {
    fontSize: 10,
    fontFamily: 'QuickSand-Regular',
    color: '#667DDB',
    fontFamily: 'Quicksand-Regular'
  },
  confirmBtn: {
    marginTop: 16,
    width: "100%",
    marginLeft: 0,
    marginRight: 0,
    fontFamily: 'Quicksand-Regular'
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
  }
});