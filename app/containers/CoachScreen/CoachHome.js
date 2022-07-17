
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';
import { GUEST, PLAYER, COACH, ACADEMY } from "../../components/Constants";

import {
    View, ImageBackground, Text, StyleSheet, RefreshControl, Image, TouchableOpacity,
    Dimensions, ActivityIndicator, FlatList, ScrollView, BackHandler, Linking
} from 'react-native';
import { Card } from 'react-native-paper'
import { SwitchButton, CustomeButtonB } from '../../components/Home/SwitchButton'
import { CustomeCard } from '../../components/Home/Card'
import { getCoachDashboard, getCoachSWitcher } from "../../redux/reducers/dashboardReducer";
import { getData, storeData } from "../../components/auth";
import { connect } from 'react-redux';
import moment from 'moment'
import BaseComponent, {
    defaultStyle, EVENT_REFRESH_DASHBOARD, getUtcDateFromTime,
    getFormatTimeDate, EVENT_UPDATE_DIALOG, PROFILE_PIC_UPDATED, EVENT_EDIT_PROFILE, getUtcDateFromTimeFormatted
} from '../BaseComponent';
import Events from '../../router/events';
import { DueView } from '../../components/Home/DueView';
import UpdateAppDialog from '../../components/custom/UpdateAppDialog'

var notification_count = 0

class CoachHome extends BaseComponent {

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: (
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        flex: 1
                    }}
                    onPress={() => {
                        let userType = navigation.getParam('userType', '')
                        if (userType == COACH || userType == ACADEMY)
                            navigation.navigate('SwitchPlayer')
                    }}
                    activeOpacity={.8}
                >
                    <View style={{
                        flexDirection: 'row',
                        //alignItems: 'center'
                    }}>

                        <Text
                            style={{
                                fontFamily: 'Quicksand-Medium',
                                fontSize: 16,
                                color: '#404040'
                            }}
                        >{navigation.getParam('academy_name', '') == "" ? "" :
                            navigation.getParam('academy_name', '')}</Text>
                        {navigation.getParam('academy_name', '') == '' ? <Text></Text> :
                            <Image
                                source={require('../../images/blank_down_arrow.png')}
                                resizeMode="contain"
                                style={{
                                    width: 8,
                                    marginLeft: 6,
                                    height: 6,
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    marginTop: 6,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            />}
                    </View>

                </TouchableOpacity>

            ),
            headerStyle: {
                elevation: 2, shadowOpacity: 1, borderBottomWidth: 0,
            },
            headerTitleStyle: styles.headerStyle,
            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.toggleDrawer();
                    }}
                    style={{ padding: 7 }}
                    activeOpacity={.8}>
                    <Image
                        source={require('../../images/hamburger.png')}
                        style={{ width: 20, height: 16, marginLeft: 12 }}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    style={{ marginRight: 8 }}
                    onPress={() => {
                        navigation.navigate('NotificationList')
                    }}
                    activeOpacity={.8} >
                    <ImageBackground
                        resizeMode="contain"
                        source={require('../../images/bellicon.png')}
                        style={{
                            width: 22, height: 22, marginLeft: 12,
                            marginRight: 12,
                            alignItems: 'flex-end'
                        }}>

                        {navigation.getParam('notification_count', 0) > 0 ? <View style={{
                            width: 16,
                            height: 16,
                            // padding: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30 / 2,
                            backgroundColor: '#ED2638'
                        }}>
                            <Text style={[defaultStyle.bold_text_10, { fontSize: 8, color: 'white' }]}>
                                {navigation.getParam('notification_count', '') > 99 ? '99+' : navigation.getParam('notification_count', '')}
                            </Text>
                        </View> : null}


                    </ImageBackground>
                </TouchableOpacity>
            )
        };

    };

    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.setNavigation(this.props.navigation)
        this.state = {
            refreshing: false,
            coach_profile: null,
            country: undefined,
            strenthList: null,
            userData: null,
            userType: '',
            show_must_update_alert: false,
        }


        getData('academy_name', (value) => {
            this.props.navigation.setParams({ 'academy_name': value });
        })
    }

    componentDidMount() {

        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.getNotifications()
            }
        );

        this.refreshEvent = Events.subscribe('NOTIFICATION_CALL', (msg) => {
            this.getNotifications()
        });

        this.selfComponentDidMount()

        this.refreshEvent = Events.subscribe('FROM_REGISTRATION', () => {
            this.props.navigation.navigate('Tournament')
        });

        this.refreshEvent = Events.subscribe('REFRESH_DASHBOARD', () => {
            this.selfComponentDidMount()
        });

        this.refreshEvent = Events.subscribe('REFRESH_DASHBOARD_1', () => {
            this.selfComponentDidMount()
        });


        this.checkNotification()

        this.refreshEvent = Events.subscribe('NOTIFICATION_CLICKED', (msg) => {
            this.checkNotification()
        });

        this.refreshEvent = Events.subscribe(EVENT_UPDATE_DIALOG, (must_update) => {
            // must_update = true
            console.log('must update', must_update);
            this.setState({
                show_must_update_alert: must_update,
            })
        });


    }

    checkNotification() {
        if (global.NOTIFICATION_DATA) {
            try {
                let notification_for = global.NOTIFICATION_DATA.notification_for
                this.notificationOpenScreen(notification_for)
                global.NOTIFICATION_DATA = null

            } catch (err) {
            }
        }
    }

    getNotifications() {
        this.getNotificationCount((count) => {
            this.props.navigation.setParams({ notification_count: count });
            notification_count = count
        })
    }

    selfComponentDidMount() {
        this.getCoachData()

        this.refreshEvent = Events.subscribe(EVENT_REFRESH_DASHBOARD, () => {
            console.warn(EVENT_REFRESH_DASHBOARD)
            this.getCoachData()
        });

        //This case is used because academy name was not returning from api, 
        //in switch case we were getting from previous screen

        getData('multiple', (value) => {
            //console.warn('multiple => ' + value)
            if (value != '' && value == 'false') {
                //console.warn('multiple1 => ' + value)
                this.getSwitchData()
            }
        })

        this.refreshEvent = Events.subscribe('FROM_REGISTRATION', (deep_data) => {
            let type = null;
            console.log('deep data', deep_data)
            if (deep_data != null) {
                storeData('deep_data', JSON.stringify(deep_data))
                let player_id = deep_data.player_id
                let academy_id = deep_data.academy_id
                type = deep_data.type
                if (type !== null && type === 'profile') {
                    this.props.navigation.navigate('OtherPlayerDeatils', { player_id: player_id, academy_id: academy_id })
                }
            }
            if (type == null) {
                setTimeout(() => {
                    this.props.navigation.navigate('Tournament')
                }, 100)
            }
        });
    }

    getSwitchData() {
        getData('header', (value) => {
            console.log("header", value);
            this.props.getCoachSWitcher(value).then(() => {
                let user = JSON.stringify(this.props.data.dashboardData);
                console.log(' getCoachSWitcher payload ' + user);
                let user1 = JSON.parse(user)

                if (user1.success == true) {
                    let data = user1.data['academies']
                    if (data.length > 0) {
                        let name = data[0].academy_name
                        let academy_id = data[0].academy_id
                        console.warn('test => ' + name)
                        // getData('userInfo',(value)=>{
                        //     console.warn('UserInfo ',value)
                        //     let json = JSON.parse(value)
                        //     json.academy_id = academy_id
                        //     storeData('userInfo',JSON.stringify(json))
                        // })
                        this.props.navigation.setParams({ 'academy_name': name })
                    }

                }



            }).catch((response) => {
                //handle form errors
                console.log(response);

            })

        });
    }

    getCoachData() {
        var userData;
        getData('header', (value) => {
            console.log("header", value);
        });

        console.log("CoachDashboard");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            global.USER_TYPE = userData.user['user_type']


            this.setState({
                userData: JSON.parse(value)
            });

            let userType = userData.user['user_type']
            console.log("UserType", userType)
            this.props.navigation.setParams({ 'userType': userType })
            this.setState({
                userType: userType
            })

            if (userType == COACH || userType == ACADEMY) {
                this.getCoachDashboardData(userData['academy_id'], userData['coach_id'])
            }
        });
    }

    getCoachDashboardData(academy_id, player_id, ) {
        getData('header', (value) => {
            console.log("header", value, academy_id, player_id);
            this.props.getCoachDashboard(value, player_id, academy_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.dashboardData);
                console.log(' getCoachDashboard payload ' + user);
                let user1 = JSON.parse(user)

                try {
                    const profile_pic = user1.data.coach_profile['profile_pic']
                    Events.publish(PROFILE_PIC_UPDATED, profile_pic);
                } catch (err) {

                }

                if (user1.success == true) {
                    global.rating = user1.data.coach_profile['ratings']
                    this.setState({
                        coach_profile: user1.data['coach_profile'],

                        // strenthList:user1.data.player_profile['stats']

                    })
                    Events.publish(EVENT_EDIT_PROFILE);
                }
                this.setState({ refreshing: false });
            }).catch((response) => {
                //handle form errors
                console.log(response);
                this.setState({ refreshing: false });
            })

        });

    }

    attedenceMangement(attandence_batch) {

        attendenceArray = [];
        for (let i = 0; i < attandence_batch.length; i++) {
            const { routine_name, batch_name, batch_category, batch_id, session } = this.state.coach_profile.attandence_batch[i]
            const { is_canceled, end_time, session_date, start_time } = session
            attendenceArray.push(

                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={
                            [defaultStyle.bold_text_14]} >{batch_name}</Text>
                        {/* <Text style={
                            [defaultStyle.bold_text_14]}>{batch_category}</Text> */}
                    </View>

                    {is_canceled ?
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20, justifyContent: 'space-between' }}>
                            <Text style={[defaultStyle.regular_text_14, { textDecorationLine: 'line-through' }]}>
                                {/* {moment.utc(session_date).local().format("dddd, DD MMM YYYY")} */}
                                {getUtcDateFromTime(session_date, start_time)}
                            </Text>
                            <Text style={[defaultStyle.regular_text_14, { textDecorationLine: 'line-through' }]}>
                                {getFormatTimeDate(session_date, start_time)
                                    + "  -   " +
                                    getFormatTimeDate(session_date, end_time)}
                            </Text>
                        </View> :
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20, justifyContent: 'space-between' }}>
                                <Text style={defaultStyle.regular_text_14}>
                                    {/* {moment.utc(session_date).local().format("dddd, DD MMM YYYY")} */}
                                    {getUtcDateFromTime(session_date, start_time)}
                                </Text>

                                <Text style={defaultStyle.regular_text_14}>
                                    {getFormatTimeDate(session_date, start_time)
                                        + "  -   " +
                                        getFormatTimeDate(session_date, end_time)}</Text>
                            </View>
                            <CustomeButtonB onPress={() => this.props.navigation.navigate('MarkAttendence', { batch_id: batch_id, session_date: getUtcDateFromTimeFormatted(session_date,start_time) })}>
                                Mark/Edit Attendance</CustomeButtonB>
                        </View>}
                </View>
            );
        }
    }

    sessionMangement(operations) {

        sessionArray = [];
        if (operations.next_sessions) {


            for (let i = 0; i < operations.next_sessions.length; i++) {
                const { routine_name, session_date, is_canceled, end_time, start_time } = operations.next_sessions[i]
                console.log("is_canceled", { is_canceled })
                if (is_canceled == true) {
                    sessionArray.push(
                        <View
                            style={{
                                //marginTop: 6,
                                marginBottom: 16
                            }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                {/* <Text style={[defaultStyle.bold_text_14, {
                                    textDecorationLine: 'line-through'
                                }]}
                                >{routine_name}</Text> */}
                                <View style={{ backgroundColor: '#FF7373', margin: 0, borderRadius: 10 }}>
                                    <Text style={{
                                        fontFamily: 'Quicksand-Medium',
                                        fontSize: 10,
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginTop: 5,
                                        marginBottom: 5,
                                        color: 'white'
                                    }}>Canceled</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                <Text
                                    style={[defaultStyle.regular_text_14, {
                                        textDecorationLine: 'line-through'
                                    }]}>
                                    {/* {moment.utc(session_date).local().format("ddd, DD MMM YYYY")} */}
                                    {getUtcDateFromTime(session_date, start_time)}
                                </Text>
                                <Text
                                    style={[defaultStyle.regular_text_14, {
                                        textDecorationLine: 'line-through',
                                        marginLeft: 10,
                                    }]}>
                                    {getFormatTimeDate(session_date, start_time)
                                        + " - " +
                                        getFormatTimeDate(session_date, end_time)}
                                </Text>

                            </View>

                        </View>
                    );
                } else {
                    sessionArray.push(

                        <View style={{
                            //marginTop: 6,
                            marginBottom: 16
                        }}>

                            {/* <Text style={[defaultStyle.bold_text_14, {
                            }]}>{routine_name}</Text> */}

                            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                                <Text style={defaultStyle.regular_text_14}>
                                    {/* {moment.utc(session_date).local().format("ddd, DD MMM YYYY")} */}
                                    {getUtcDateFromTime(session_date, start_time)}
                                </Text>

                                <Text style={[defaultStyle.regular_text_14, { marginLeft: 10 }]}>
                                    {getFormatTimeDate(session_date, start_time)
                                        + " - " +
                                        getFormatTimeDate(session_date, end_time)}
                                </Text>

                            </View>

                        </View >
                    );
                }
            }
        }
    }

    scoreMangement(tournaments) {

        scoreArray = [];
        for (let i = 0; i < tournaments.length; i++) {
            const { name, start_date, end_date, is_canceled, end_time, start_time, id } = tournaments[i]
            console.log("end_date", end_date)
            let f_start_date = moment.utc(start_date, "DD-MM-YYYY").local().format("DD MMM")
            let f_end_date = moment.utc(end_date, "DD-MM-YYYY").local().format("DD MMM YYYY")

            scoreArray.push(
                <View>
                    <Text style={[defaultStyle.bold_text_14, { marginTop: 10 }]}>{name}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20, justifyContent: 'space-between' }}>
                        <Text style={defaultStyle.regular_text_14}>{
                            f_start_date
                            + ' - ' + f_end_date}</Text>
                        <Text style={defaultStyle.regular_text_14}>
                            {/* {moment.utc(start_date + " " + start_time).local().format("hh:mm a")
                                + " - " +
                                moment.utc(start_date + " " + end_time).local().format("hh:mm a")} */}
                            {start_time + " onwards"}
                        </Text>
                    </View>

                    <CustomeButtonB onPress={() =>
                        this.props.navigation.navigate('FixtureSelection', {
                            id: id
                        })}>
                        View Fixtures</CustomeButtonB>

                </View>
            );

        }
    }

    onRefresh = () => {

        this.setState({ refreshing: true });
        this.selfComponentDidMount()

    };

    handleClick() {
        let link = ''
        if (Platform.OS == 'ios') {
            link = 'itms-apps://itunes.apple.com/us/app/id${1484093762}?mt=8'
        } else {
            link = 'market://details?id=com.machaxi'
        }
        Linking.canOpenURL(link).then(supported => {
            supported && Linking.openURL(link);
        }, (err) => console.log(err));
    }

    render() {
        let show_must_update_alert = this.state.show_must_update_alert
        if (!this.state.refreshing && this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        if (this.state.coach_profile) {
            const { is_attandence_due, is_performance_due, is_reward_point_due, is_scorer, operations, tournaments, attandence_batch } = this.state.coach_profile
            // const {routine_name, batch_name, batch_category,batch_id} = this.state.coach_profile.attandence_batch[0]
            // const {is_canceled, end_time,session_date, start_time} = this.state.coach_profile.attandence_batch[0].session
            { is_attandence_due ? this.attedenceMangement(attandence_batch) : null }

            this.sessionMangement(operations)

            this.scoreMangement(tournaments)

            return (
              <View
                style={{
                  flex: 1,
                  marginTop: 0,
                  backgroundColor: "#F7F7F7",
                }}
              >
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh}
                      title="Pull to refresh"
                    />
                  }
                  style={{
                    flex: 1,
                    marginTop: 0,
                    backgroundColor: "#F7F7F7",
                  }}
                >
                  {this.state.userType == COACH ||
                  this.state.userType == ACADEMY ? (
                    <View style={{ margin: 10, marginTop: 20 }}>
                      <SwitchButton
                        onPress={() =>
                          this.props.navigation.navigate(
                            "SwitchPlayer",
                            {
                              userType: "coach",
                            }
                          )
                        }
                      >
                        Switch Academy
                      </SwitchButton>
                    </View>
                  ) : null}

                  {is_attandence_due ? (
                    <CustomeCard>
                      <View
                        style={{
                          marginLeft: 12,
                          marginRight: 12,
                          marginTop: 16,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text style={defaultStyle.bold_text_10}>
                            Attendance
                          </Text>

                          {is_attandence_due ? (
                            <View style={{ marginLeft: 10 }}>
                              <DueView />
                            </View>
                          ) : null}
                        </View>
                        <View style={defaultStyle.line_style} />

                        {attendenceArray}
                      </View>
                    </CustomeCard>
                  ) : null}

                  {sessionArray.length > 0 ? (
                    <CustomeCard>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate(
                            "BatchDetails",
                            {
                              batch_id: operations.batch_id,
                              batch_name: operations.batch_name,
                            }
                          );
                        }}
                      >
                        <View
                          style={{
                            marginLeft: 12,
                            marginRight: 12,
                            marginTop: 16,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={defaultStyle.bold_text_10}>
                              Next Session :{" "}
                              {
                                operations.next_sessions[0]
                                  .routine_name
                              }
                            </Text>
                            <Text style={defaultStyle.bold_text_10}>
                              {operations.batch_name}
                            </Text>

                            {/* {operations.attendance.attendance != undefined ?
                                    <Text style={{ color: '#667DDB' }}>{'Attendance  - ' + operations.attendance.attendance + '% (' + operations.attendance.month + ')'}</Text>
                                    : null
                                } */}
                          </View>
                          <View style={defaultStyle.line_style} />
                          {sessionArray}
                        </View>
                      </TouchableOpacity>
                    </CustomeCard>
                  ) : null}

                  {is_performance_due ? (
                    <CustomeCard>
                      <View
                        style={{
                          marginLeft: 12,
                          marginRight: 12,
                          marginTop: 16,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text style={defaultStyle.bold_text_10}>
                            Update Player Performance
                          </Text>
                          {/* <View
                                    style={{ backgroundColor: '#FF7373', marginRight: 10, marginLeft: 10, borderRadius: 5 }}>
                                    <Text style={{
                                        marginTop: 2,
                                        marginBottom: 2,
                                        fontSize: 10,
                                        color: 'white',
                                        marginRight: 10,
                                        fontFamily: 'Quicksand-Medium',
                                        marginLeft: 10,
                                    }}>Due</Text>
                                </View> */}
                          <View style={{ marginLeft: 10 }}>
                            <DueView />
                          </View>
                        </View>
                        <View style={defaultStyle.line_style} />

                        <View
                          style={{
                            flexDirection: "row",
                            margin: 10,
                            marginBottom: 20,
                          }}
                        >
                          <Text
                            style={[
                              defaultStyle.bold_text_14,
                              { marginRight: 20 },
                            ]}
                          >
                            You are yet to update performance of
                            players.
                          </Text>
                        </View>
                        <CustomeButtonB
                          onPress={() => {
                            this.props.navigation.navigate(
                              "CoachPerformence"
                            );
                            //alert('under development')
                          }}
                        >
                          Update Progress
                        </CustomeButtonB>
                      </View>
                    </CustomeCard>
                  ) : null}

                  {is_scorer && tournaments.length > 0 ? (
                    <CustomeCard>
                      <View
                        style={{
                          marginLeft: 12,
                          marginRight: 12,
                          marginTop: 16,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={defaultStyle.bold_text_10}>
                            Scorer
                          </Text>
                          {/*<Text style={{color:'#667DDB'}}>Attendance - 80% (Jul)</Text>*/}
                        </View>
                        <View style={defaultStyle.line_style} />

                        {scoreArray}
                      </View>
                    </CustomeCard>
                  ) : null}

                  {is_reward_point_due ? (
                    <CustomeCard>
                      <View
                        style={{
                          marginLeft: 12,
                          marginRight: 12,
                          marginTop: 16,
                        }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <Text style={defaultStyle.bold_text_10}>
                            Reward Point
                          </Text>
                          <View style={{ marginLeft: 10 }}>
                            <DueView />
                          </View>
                        </View>
                        <View style={defaultStyle.line_style} />

                        <View
                          style={{
                            flexDirection: "row",
                            margin: 10,
                            marginBottom: 20,
                          }}
                        >
                          <Text
                            style={[
                              defaultStyle.bold_text_14,
                              { marginRight: 20 },
                            ]}
                          >
                            You are yet to Reward the players .
                          </Text>
                        </View>
                        <CustomeButtonB
                          onPress={() => {
                            this.props.navigation.navigate(
                              "CoachRewardPoints"
                            );
                          }}
                        >
                          Reward Players
                        </CustomeButtonB>
                      </View>
                    </CustomeCard>
                  ) : null}

                  <View style={{ margin: 5 }}>
                    <Card
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        borderRadius: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          console.warn("Touch Press");
                          // this.props.navigation.navigate('PlayersListing')
                          this.props.navigation.navigate(
                            "PlayersListing",
                            { id: this.state.userData.academy_id }
                          );
                          //
                        }}
                      >
                        <View
                          style={{
                            marginLeft: 10,
                            marginRight: 10,
                            flexDirection: "row",
                            height: 50,
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              marginRight: 15,
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={defaultStyle.regular_text_14}
                            >
                              View Other Players
                            </Text>

                            <Image
                              source={require("../../images/path.png")}
                              style={{
                                width: 19,
                                resizeMode: "contain",
                                height: 13,
                                marginRight: 0,
                                marginTop: 5,
                              }}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Card>
                  </View>

                  {this.state.userType == COACH ? (
                    <View style={{ margin: 5 }}>
                      <Card
                        style={{
                          marginLeft: 5,
                          marginRight: 5,
                          borderRadius: 10,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            //console.warn("Touch Press")
                            this.props.navigation.navigate(
                              "CoachMyFeedbackListing"
                            );
                          }}
                        >
                          <View
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              flexDirection: "row",
                              height: 50,
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                marginRight: 15,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text
                                style={defaultStyle.regular_text_14}
                              >
                                View my Feedback
                              </Text>

                              <Image
                                source={require("../../images/path.png")}
                                style={{
                                  width: 19,
                                  resizeMode: "contain",
                                  height: 13,
                                  marginRight: 0,
                                  marginTop: 5,
                                }}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Card>
                    </View>
                  ) : null}
                  <View style={{ margin: 5 }}>
                    <Card
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        borderRadius: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          //console.warn("Touch Press")
                          //this.props.navigation.navigate('JobVacancies')
                          this.props.navigation.navigate(
                            "AcademyListing",
                            {
                              vacancy: true,
                            }
                          );
                        }}
                      >
                        <View
                          style={{
                            marginLeft: 10,
                            marginRight: 10,
                            flexDirection: "row",
                            height: 50,
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              marginRight: 15,
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={defaultStyle.regular_text_14}
                            >
                              Job vacancies
                            </Text>

                            <Image
                              source={require("../../images/path.png")}
                              style={{
                                width: 19,
                                resizeMode: "contain",
                                height: 13,
                                marginRight: 0,
                                marginTop: 5,
                              }}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Card>
                  </View>
                  {this.state.userType == COACH && (
                    <View style={{ margin: 5 }}>
                      <Card
                        style={{
                          marginLeft: 5,
                          marginRight: 5,
                          marginBottom: 20,
                          borderRadius: 10,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            //console.warn("Touch Press")
                            this.props.navigation.navigate(
                              "AcademyListing"
                            );
                          }}
                        >
                          <View
                            style={{
                              marginLeft: 10,
                              marginRight: 10,
                              flexDirection: "row",
                              height: 50,
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                marginRight: 15,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text
                                style={defaultStyle.regular_text_14}
                              >
                                Coaching Plans
                              </Text>

                              <Image
                                source={require("../../images/path.png")}
                                style={{
                                  width: 19,
                                  resizeMode: "contain",
                                  height: 13,
                                  marginRight: 0,
                                  marginTop: 5,
                                }}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Card>
                    </View>
                  )}

                  <UpdateAppDialog
                    navigation={this.state.navigation}
                    exitPressed={() => {
                      this.setState({
                        show_must_update_alert: false,
                      });
                      BackHandler.exitApp();
                      //this.props.navigation.goBack(null)
                    }}
                    updatePressed={() => {
                      this.setState({
                        show_must_update_alert: false,
                      });
                      this.handleClick();
                    }}
                    visible={show_must_update_alert}
                  />
                </ScrollView>
              </View>
            );
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                </View>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        data: state.DashboardReducer,
    };
};
const mapDispatchToProps = {
    getCoachDashboard, getCoachSWitcher
};
export default connect(mapStateToProps, mapDispatchToProps)(CoachHome);


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        // paddingVertical: 12,
        //paddingHorizontal: 10,
        borderWidth: 0,
        borderColor: '#D3D3D3',
        borderRadius: 4,
        color: 'white',
        // paddingLeft: 10,

        // alignItems: 'stretch',
        // // justifyContent: 'right',
        alignSelf: 'center',
        height: 40,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
        // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#614051',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    rightIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: 20
        //backgroundColor: 'white',
    },

    scoreBox: {
        color: 'white',
        marginRight: 20,
        textAlign: 'right', fontSize: 24, fontWeight: 'bold'
    },
    buttomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,

        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: -5,
        marginLeft: -5,
        marginRight: -5,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 1 }, borderBottomRightRadius: 10, borderBottomLeftRadius: 10

    },
    headerStyle: {
        color: '#191919',
        fontFamily: 'Quicksand-Medium',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 16,
        flexGrow: 1,
        alignSelf: 'center',
    }

});