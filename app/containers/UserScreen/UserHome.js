import React from 'react'
import * as Progress from 'react-native-progress';

import { View, ImageBackground, Text, StyleSheet, Image, RefreshControl, StatusBar, TouchableOpacity, Dimensions, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { CustomeCard } from '../../components/Home/Card'
import { Card } from 'react-native-paper'
import { getData, storeData } from "../../components/auth";
import { getPlayerDashboard } from "../../redux/reducers/dashboardReducer";
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import BaseComponent, { defaultStyle, getFormattedLevel,EVENT_EDIT_PROFILE, SESSION_DATE_FORMAT } from '../BaseComponent';
import { Rating } from 'react-native-ratings';
import moment from 'moment'
import Events from '../../router/events';
import PlayerHeader from '../../components/custom/PlayerHeader'
import { RateViewFill } from '../../components/Home/RateViewFill'
import { RateViewBorder } from '../../components/Home/RateViewBorder';

var deviceWidth = Dimensions.get('window').width - 20;

class UserHome extends BaseComponent {



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
                        navigation.navigate('SwitchPlayer')
                    }}
                    activeOpacity={.8}
                >
                    <Text
                        style={{
                            fontFamily: 'Quicksand-Medium',
                            fontSize: 14,
                            color: 'white'
                        }}
                    >{navigation.getParam('Title', '') + ' ▼'}</Text>
                </TouchableOpacity>

            ),
            headerTitleStyle: {
                color: 'white'
            },
            headerStyle: {
                elevation: 0, shadowOpacity: 0, borderBottomWidth: 0,

            },
            //  header: <CustomHeader title="Navdeep's Academy ▼ " showBackArrow={true}
            // navigation={navigation} />,
            headerBackground: (
                <LinearGradient
                    colors={['#332B70', '#24262A']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2.5, y: 0 }}
                />
            ),
            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.toggleDrawer();
                    }}
                    activeOpacity={.8}
                >

                    <Image

                        source={require('../../images/hamburger_white.png')}
                        style={{ width: 20, height: 16, marginLeft: 12 }}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    style={{ marginRight: 8 }}
                    onPress={() => {
                        //navigation.toggleDrawer();
                    }}
                    activeOpacity={.8}
                >

                    <Image
                        resizeMode="contain"
                        source={require('../../images/ic_notifications.png')}
                        style={{ width: 20, height: 20, marginRight: 12 }}
                    />
                </TouchableOpacity>
            )
        };

    };


    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {
            refreshing: false,
            userData: null,
            country: undefined,
            player_profile: null,
            strenthList: null,
            acedemy_name: '',
            academy_feedback_data: null,
            coach_feedback_data: null,
            academy_id: ''
        }
        //StatusBar.setBackgroundColor("#262051")
        //StatusBar.setBarStyle('light-content', true)

    }

    componentDidMount() {

        this.selfComponentDidMount()
    }

    selfComponentDidMount() {
        var userData;
        getData('header', (value) => {
            console.log("header", value);
        });

        console.log("PlayerDashboard");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.state.academy_id = userData['academy_id']

            let academy_name = userData.academy_name
            if (academy_name == undefined)
                academy_name = ''
            this.props.navigation.setParams({ Title: academy_name });
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user", userData.user['user_type'])
            if (userData.user['user_type'] == 'PLAYER') {
                this.getPlayerDashboardData(userData['academy_id'], userData['player_id'])

            }
            //else if (userData.user['user_type'] == 'PARENT') {
            //     this.getParentSwitchingData();

            // }


        });
    }

    onRefresh = () => {

        this.setState({ refreshing: true });
        this.selfComponentDidMount()
        // In actual case set refreshing to false when whatever is being refreshed is done!
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    };
    getPlayerDashboardData(academy_id, player_id, ) {

        getData('header', (value) => {
            console.log("header", value, academy_id, player_id);

            this.props.getPlayerDashboard(value, player_id, academy_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.dashboardData);
                console.log(' user response getPlayerDashboard ' + user);
                let user1 = JSON.parse(user)

                if (user1.data['coach_data'] != null && user1.data['coach_data']) {

                    this.setState({
                        coach_feedback_data: user1.data['coach_data'].coach_feedback[0],
                    })
                }

                if (user1.data['academy_data'] != null && user1.data['academy_data'].feedback) {
                    this.setState({
                        academy_feedback_data: user1.data['academy_data'].feedback[0],
                    })
                }

                if (user1.data.player_profile['stats'] != null &&
                    user1.data.player_profile['stats']) {
                    this.setState({
                        strenthList: user1.data.player_profile['stats'],
                    })
                }

                if (user1.success == true) {
                    this.setState({
                        player_profile: user1.data['player_profile'],
                        //strenthList: user1.data.player_profile['stats'],
                        //acedemy_name: user1.data['player_profile'].academy_name,
                        //academy_feedback_data: user1.data['academy_data'].feedback[0],
                        //coach_feedback_data: user1.data['coach_data'].coach_feedback[0],

                    })
                    let acedemy_name = user1.data['player_profile'].academy_name
                    //navigation.title = user1.data['player_profile'].academy_name
                    this.props.navigation.setParams({ Title: acedemy_name });

                    getData('userInfo', (value) => {
                        userData = JSON.parse(value)
                        userData['academy_name'] = acedemy_name
                        storeData("userInfo", JSON.stringify(userData))
                        Events.publish(EVENT_EDIT_PROFILE);

                    });


                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }

    renderItem = ({ item }) => (
        <TouchableOpacity key={item} onPress={() => {

            console.warn("Touch Press1")

            // this.props.navigation.navigate('OrderTracking', {
            //     order_id: item.increment_id
            // })

        }}>
            <View style={{ margin: 10, flexDirection: 'row', height: 60 }}>

                <Image source={require('../../images/Mysatus.png')}
                    style={{
                        width: 40,
                        height: 40, marginRight: 20
                    }} />
                <View>

                    <View style={{
                        marginLeft: 8,
                        marginRight: 15,
                        marginBottom: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={defaultStyle.bold_text_14}>
                            {item.name}
                        </Text>
                        <Text style={defaultStyle.bold_text_12}>
                            {item.score}
                        </Text>
                    </View>
                    <Progress.Bar style={{ backgroundColor: '#E1E1E1', color: '#305F82', borderRadius: 11, borderWidth: 0 }} progress={item.score / 100} width={deviceWidth - 130} height={14} />
                </View>
                <View style={{
                    height: 50,
                    width: 30,
                    alignItems: 'center',
                    marginTop: 26, marginRight: 10, marginLeft: 20
                }}>
                    <Image source={require('../../images/ic_drawer_arrow.png')}
                        resizeMode="contain"
                        style={{
                            width: 5,
                            height: 11, marginRight: 10
                        }} />
                </View>

            </View>
        </TouchableOpacity>

    );






    render() {

        let academy_feedback_data = this.state.academy_feedback_data
        let coach_feedback_data = this.state.coach_feedback_data
        let academy_id = this.state.academy_id

        if (this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#67BAF5" />
                </View>
            )
        }
        if (this.state.player_profile) {


            const { name, academy_name, badge, rank, score, player_level, reward_point, player_category, operations } = this.state.player_profile
            sessionArray = [];
            if (operations.next_sessions != null) {

                for (let i = 0; i < operations.next_sessions.length; i++) {
                    const { routine_name, session_date, is_canceled, end_time, start_time } = operations.next_sessions[i]

                    if (is_canceled == true) {
                        sessionArray.push(
                            <View
                                style={{
                                    marginTop: 6,
                                    marginBottom: 16
                                }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={[defaultStyle.bold_text_14, {
                                        textDecorationLine: 'line-through'
                                    }]}
                                    >{routine_name}</Text>
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
                                        {moment.utc(session_date).local().format(SESSION_DATE_FORMAT)}
                                    </Text>
                                    <Text
                                        style={[defaultStyle.regular_text_14, {
                                            textDecorationLine: 'line-through',
                                            marginLeft: 10,
                                        }]}>
                                        {moment.utc(session_date + " " + start_time).local().format("hh:mm a")
                                            + "  -   " +
                                            moment.utc(session_date + " " + end_time).local().format("hh:mm a")}
                                    </Text>

                                </View>

                            </View>
                        );
                    } else {
                        sessionArray.push(
                            <View style={{
                                marginTop: 6,
                                marginBottom: 16
                            }}>

                                <Text style={[defaultStyle.bold_text_14, {
                                }]}>{routine_name}</Text>

                                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                    <Text style={defaultStyle.regular_text_14}>
                                        {moment.utc(session_date).local().format(SESSION_DATE_FORMAT)}
                                    </Text>

                                    <Text style={[defaultStyle.regular_text_14, { marginLeft: 10 }]}>
                                        {moment.utc(session_date + " " + start_time).local().format("hh:mm a")
                                            + "  -   " +
                                            moment.utc(session_date + " " + end_time).local().format("hh:mm a")}
                                    </Text>

                                </View>

                            </View >

                        );
                    }
                }
            }


            return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                {/* <StatusBar translucent backgroundColor="#264d9b"
                barStyle="light-content"/> */}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            title="Pull to refresh"
                        />
                    }
                    style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

                    <PlayerHeader
                        player_profile={this.state.player_profile}
                    />

                    {sessionArray.length != 0 ?
                        <CustomeCard >

                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Batch')
                                }}
                            >

                                <View
                                    style={{
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        backgroundColor: '#F9FBE9',
                                        paddingLeft: 12,
                                        paddingRight: 12,
                                        paddingTop: 16,
                                        paddingBottom: 12
                                    }}
                                >
                                    <Text style={defaultStyle.bold_text_10}>Next Session</Text>
                                </View>
                                <View style={{ marginLeft: 12, marginRight: 12 }}>


                                    <View style={[defaultStyle.line_style, { marginTop: 0 }]} />

                                    {sessionArray}
                                </View>
                            </TouchableOpacity>

                        </CustomeCard>
                        : null}



                    {this.state.strenthList.length != 0 ?
                        <View style={{ margin: 10 }}>
                            <Card style={{ borderRadius: 12 }}>
                                <View>

                                    <Text style={[defaultStyle.bold_text_14, { marginLeft: 10, marginTop: 10 }]}>My Stats </Text>
                                    <View style={{
                                        width: 60,
                                        height: 3, marginLeft: 10,
                                        marginTop: 2, marginBottom: 8, backgroundColor: '#404040'
                                    }}></View>

                                    <FlatList
                                        data={this.state.strenthList}
                                        renderItem={this.renderItem}
                                        keyExtractor={(item, index) => item.id}
                                    />
                                </View>
                            </Card>
                        </View> : null}



                    <View style={{ margin: 5 }}>
                        <Card style={{ margin: 5, borderRadius: 10 }}>
                            <TouchableOpacity onPress={() => {

                                this.props.navigation.navigate('PlayersListing',
                                    { id: academy_id })

                            }}>
                                <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>

                                    <Image source={require('../../images/view_academy_player.png')}
                                        resizeMode="contain"
                                        style={{
                                            width: 30,
                                            height: 30, marginRight: 20, marginTop: 5
                                        }} />
                                    <View style={{ flex: 1 }}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={defaultStyle.bold_text_14}>
                                                View Academy Players
                                        </Text>

                                            <Image source={require('../../images/path.png')}
                                                style={{
                                                    width: 19,
                                                    height: 13, marginRight: 0, marginTop: 5
                                                }} />

                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        </Card>
                    </View>
                    <View style={{ margin: 5 }}>
                        <Card style={{ margin: 5, borderRadius: 10 }}>
                            <TouchableOpacity onPress={() => {

                                console.warn("Touch Press")
                                this.props.navigation.navigate('AcademyListing')

                            }}>
                                <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>

                                    <Image source={require('../../images/browse_academy.png')}
                                        resizeMode="contain"
                                        style={{
                                            width: 30,
                                            height: 30, marginRight: 20, marginTop: 5
                                        }} />
                                    <View style={{ flex: 1 }}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={defaultStyle.bold_text_14}>
                                                Browse Academies
                                        </Text>

                                            <Image source={require('../../images/path.png')}
                                                style={{
                                                    width: 19,
                                                    height: 13, marginRight: 0, marginTop: 5
                                                }} />

                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        </Card>
                    </View>

                    {/* ================================ ACADEMY FEEDBACk =================== */}


                    {academy_feedback_data != null ?

                        <Card
                            style={{
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 10,
                                borderRadius: 12,
                                marginBottom: 8,

                            }}
                        >
                            <View
                                style={{
                                    marginLeft: 12,
                                    marginRight: 12,
                                    marginTop: 16
                                }}
                            >
                                <Text style={defaultStyle.bold_text_10}>Academy Feedback</Text>
                            </View>

                            <View style={[defaultStyle.line_style, { marginLeft: 12, marginRight: 12 }]} />


                            <View style={{ marginLeft: 10, marginRight: 10 }}>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={[defaultStyle.bold_text_14, { color: "#707070" }]}>{academy_feedback_data.target.name}</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>

                                        <Rating
                                            type='custom'
                                            ratingColor='#F4FC9A'
                                            ratingBackgroundColor='#D7D7D7'
                                            ratingCount={5}
                                            imageSize={12}
                                            readonly={true}
                                            startingValue={academy_feedback_data.target.avgFeedbackEntities[0].avgRating}
                                            style={{ width: 80 }}
                                        />

                                        {/* <Text style={{
                                            borderColor: '#DFDFDF',
                                            borderWidth: 1,
                                            height: 19, width: 30, textAlign: 'center',
                                            fontSize: 12,
                                            color: '#707070',
                                            paddingTop: 0,
                                            borderRadius: 12,
                                            fontFamily: 'Quicksand-Medium'
                                        }}>{academy_feedback_data.target.avgFeedbackEntities[0].avgRating.toFixed(1)}</Text> */}
                                        <RateViewBorder>{academy_feedback_data.target.avgFeedbackEntities[0].avgRating}</RateViewBorder>
                                    </View>
                                </View>
                                <View>

                                    <View style={{ marginTop: 10 }}>
                                        <Text style={
                                            [defaultStyle.bold_text_10, { marginTop: 5, color: '#A3A5AE' }]
                                        }>Top Reviews</Text>
                                        {/* <Text style={[defaultStyle.bold_text_12, { marginTop: 5, color: '#707070' }]} >{academy_feedback_data.source.name}</Text> */}
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: 5,
                                                alignItems: 'center'
                                            }}
                                        >


                                            <Text style={[defaultStyle.bold_text_12, { color: '#707070' }]} >{academy_feedback_data.source.name}</Text>


                                            <View style={{
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                marginLeft: 6,
                                                marginTop: 4
                                            }}>

                                                <Rating
                                                    type='custom'
                                                    ratingColor='#F4FC9A'
                                                    ratingBackgroundColor='#D7D7D7'
                                                    ratingCount={5}
                                                    imageSize={12}
                                                    readonly={true}
                                                    startingValue={academy_feedback_data.rating}
                                                    style={{ width: 80 }}
                                                />

                                                {/* <Text style={{
                                                    backgroundColor: '#D8D8D8',
                                                    height: 19, width: 30, textAlign: 'center',
                                                    fontSize: 12,
                                                    color: '#707070',
                                                    paddingTop: 0,
                                                    borderRadius: 12,
                                                    fontFamily: 'Quicksand-Medium'
                                                }}>{academy_feedback_data.rating.toFixed(1)}</Text> */}
                                                <RateViewFill>{academy_feedback_data.rating}</RateViewFill>

                                            </View>
                                        </View>

                                        <Text style={[defaultStyle.regular_text_12, {
                                            marginTop: 5,
                                            color: '#707070'

                                        }]}>{academy_feedback_data.review}</Text>

                                    </View>




                                </View>

                            </View>
                            <Card style={{
                                elevation: 4,
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                                marginTop: 12,
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            }}>

                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('AcademyProfile', {
                                        id: academy_feedback_data.academyId
                                    })
                                }}>
                                    <Text
                                        style={[defaultStyle.bold_text_12,
                                        { textAlign: 'center', flex: 1, padding: 16, color: '#707070' }]}>
                                        View Academy
                                                </Text>

                                </TouchableOpacity>
                            </Card>
                        </Card>
                        : null
                    }

                    {/* ================================ COACH FEEDBACk =================== */}

                    {coach_feedback_data != null ?

                        <Card
                            style={{
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 10,
                                marginBottom: 10,
                                borderRadius: 12,
                            }}>
                            <View
                                style={{
                                    marginLeft: 12,
                                    marginRight: 12,
                                    marginTop: 16
                                }}
                            >
                                <Text style={defaultStyle.bold_text_10}>Coach Feedback</Text>
                            </View>

                            <View style={[defaultStyle.line_style, { marginLeft: 12, marginRight: 12 }]} />


                            <View style={{ marginLeft: 10, marginRight: 10 }}>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'space-between'
                                }}>

                                    <View style={{ flexDirection: 'row' }}>

                                        <Text style={[defaultStyle.bold_text_14, { color: "#707070" }]}>{coach_feedback_data.target.name}</Text>
                                        <View style={{ fontFamily: 'Quicksand-Medium', backgroundColor: '#CDB473', borderRadius: 8, marginRight: 0, marginLeft: 6, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 10, color: 'white', marginRight: 6, marginLeft: 6, textAlign: 'center' }}>Head Coach</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}>

                                        <Rating
                                            type='custom'
                                            ratingColor='#F4FC9A'
                                            ratingBackgroundColor='#D7D7D7'
                                            ratingCount={5}
                                            imageSize={12}
                                            readonly={true}
                                            startingValue={coach_feedback_data.target.avgFeedbackEntities[0].avgRating}
                                            style={{ width: 80 }}
                                        />

                                        {/* <Text style={{
                                            borderColor: '#DFDFDF',
                                            borderWidth: 1,
                                            height: 19, width: 30, textAlign: 'center',
                                            fontSize: 12,
                                            color: '#707070',
                                            paddingTop: 0,
                                            borderRadius: 12,
                                            fontFamily: 'Quicksand-Medium'
                                        }}>{coach_feedback_data.target.avgFeedbackEntities[0].avgRating.toFixed(1)}</Text> */}
                                        <RateViewBorder>{coach_feedback_data.target.avgFeedbackEntities[0].avgRating}</RateViewBorder>
                                    </View>
                                </View>
                                <View>

                                    <View style={{ marginTop: 10 }}>
                                        <Text style={
                                            [defaultStyle.bold_text_10, { marginTop: 5, color: '#A3A5AE' }]
                                        }>Top Reviews</Text>
                                        {/* <Text style={[defaultStyle.bold_text_12, { marginTop: 5, color: '#707070' }]} >{coach_feedback_data.source.name}</Text> */}

                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: 5,
                                            alignItems: 'center'
                                        }}>

                                            <Text style={[defaultStyle.bold_text_12, { color: '#707070' }]} >{coach_feedback_data.source.name}</Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginLeft: 6,
                                                marginTop: 4
                                            }}>

                                                <Rating
                                                    type='custom'
                                                    ratingColor='#F4FC9A'
                                                    ratingBackgroundColor='#D7D7D7'
                                                    ratingCount={5}
                                                    imageSize={12}
                                                    readonly={true}
                                                    startingValue={coach_feedback_data.rating}
                                                    style={{ width: 80 }}
                                                />

                                                {/* <Text style={{
                                                    backgroundColor: '#D8D8D8',
                                                    height: 19, width: 30, textAlign: 'center',
                                                    fontSize: 12,
                                                    color: '#707070',
                                                    paddingTop: 0,
                                                    borderRadius: 12,
                                                    fontFamily: 'Quicksand-Medium'
                                                }}>{coach_feedback_data.rating.toFixed(1)}</Text> */}
                                                <RateViewFill>{coach_feedback_data.rating}</RateViewFill>
                                            </View>
                                        </View>
                                        <Text style={[defaultStyle.regular_text_12, {
                                            marginTop: 5,
                                            color: '#707070'

                                        }]}>{coach_feedback_data.review}</Text>

                                    </View>

                                </View>

                            </View>

                            <Card style={{
                                elevation: 4,
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12,
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                marginTop: 12,
                            }}>

                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('CoachProfileDetail', {
                                        academy_id: coach_feedback_data.academyId,
                                        coach_id: coach_feedback_data.target.id
                                    })
                                }}>
                                    <Text
                                        style={[defaultStyle.bold_text_12,
                                        { textAlign: 'center', flex: 1, padding: 16, color: '#707070' }]}>
                                        View Coach
                                                </Text>

                                </TouchableOpacity>
                            </Card>
                        </Card>
                        : null
                    }


                </ScrollView>
            </View >;
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
    getPlayerDashboard,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserHome);


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
        marginBottom: 20,
        textAlign: 'right',
        fontSize: 24,
        fontFamily: 'Quicksand-Bold'
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

    }


});