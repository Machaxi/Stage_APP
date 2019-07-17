import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import { View, ImageBackground, Text, StyleSheet, Image, StatusBar,TouchableOpacity, Dimensions, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { CustomeCard } from '../../components/Home/Card'
import { Card } from 'react-native-paper'
import { getData, storeData } from "../../components/auth";
import { getCoachSWitcher, getPlayerSWitcher } from "../../redux/reducers/switchReducer";
import { getPlayerDashboard } from "../../redux/reducers/dashboardReducer";
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../components/custom/CustomHeader';
import BaseComponent, { defaultStyle, getFormattedLevel, EVENT_EDIT_PROFILE } from '../BaseComponent';
import { Rating } from 'react-native-ratings';
import moment from 'moment'
import Events from '../../router/events';



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
                    colors={['#262051', '#24262A']}
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
                    onPress={() => {
                        navigation.toggleDrawer();
                    }}
                    activeOpacity={.8}
                >

                    <Image

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

        var userData;
        getData('header', (value) => {
            console.log("header", value);
        });

        console.log("PlayerDashboard");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            this.state.academy_id = userData['academy_id']
            this.props.navigation.setParams({ Title: userData.academy_name });
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


    getPlayerDashboardData(academy_id, player_id, ) {

        getData('header', (value) => {
            console.log("header", value, academy_id, player_id);

            this.props.getPlayerDashboard(value, player_id, academy_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.dashboardData);
                console.log(' user response getPlayerDashboard ' + user);
                let user1 = JSON.parse(user)

                if (user1.data['coach_data'] != null) {
                    this.setState({
                        coach_feedback_data: user1.data['coach_data'].coach_feedback[0],
                    })
                }

                if (user1.data['academy_data'] != null) {
                    this.setState({
                        academy_feedback_data: user1.data['academy_data'].feedback[0],
                    })
                }

                if (user1.success == true) {
                    this.setState({
                        player_profile: user1.data['player_profile'],
                        strenthList: user1.data.player_profile['stats'],
                        acedemy_name: user1.data['player_profile'].academy_name,
                        academy_feedback_data: user1.data['academy_data'].feedback[0],
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
                <View style={{ height: 50, width: 30, alignItems: 'center', marginTop: 20, marginBottom: 20, marginRight: 10, marginLeft: 10 }}>
                    <Image source={require('../../images/forward.png')}
                        style={{
                            width: 5,
                            height: 12, marginRight: 10
                        }} />
                </View>

            </View>
        </TouchableOpacity>

    );






    render() {

        let academy_feedback_data = this.state.academy_feedback_data
        let coach_feedback_data = this.state.coach_feedback_data

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

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text
                                        style={[defaultStyle.regular_text_14, {
                                            textDecorationLine: 'line-through'
                                        }]}>
                                        {moment.utc(session_date).local().format("ddd, DD MMM YYYY")}
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

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={defaultStyle.regular_text_14}>
                                        {moment.utc(session_date).local().format("ddd, DD MMM YYYY")}
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
                <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

                    <View style={{ width: '100%', height: 300, }}>
                        <ImageBackground
                            source={require('../../images/RectangleImg.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}>

                            {/* <CustomHeader title="Navdeep's Academy ▼ " showBackArrow={true}
                                navigation={this.props.navigation} /> */}

                            <View style={{ position: 'relative', marginTop: 30 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../images/playerimg.png')}
                                        style={{
                                            width: 201,
                                            height: 238, marginRight: 20, marginTop: 0, display: 'flex'
                                        }}>

                                    </Image>
                                    <View style={{ display: 'flex', flex: 1, marginBottom: 100 }}>
                                        <Text style={{
                                            color: 'white',
                                            marginRight: 0,
                                            fontFamily: 'Quicksand-Bold',
                                            textAlign: 'center', fontSize: 22,
                                        }}
                                            numberOfLines={1}
                                        >{name}</Text>


                                        <View style={{
                                            width: 119,
                                            height: 84,
                                            alignItems: 'center',
                                            display: 'flex',
                                            marginBottom: 20,
                                            marginTop: 20,
                                            justifyContent: 'center', alignItems: 'center',
                                        }}>

                                            <ImageBackground
                                                style={{
                                                    height: 85, width: 57, justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                source={require('../../images/batch_pink.png')}>


                                                <View style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    borderRadius: 2,
                                                    backgroundColor: '#485FA0', height: 26, width: '110%'
                                                }}>
                                                    <Image style={{ height: 18, width: 20, }}
                                                        source={require('../../images/left_batch_arrow.png')}></Image>

                                                    <Text style={{
                                                        width: '100%',
                                                        fontSize: 10,
                                                        color: '#F4F4F4',
                                                        textAlign: 'center',
                                                        fontFamily: 'Quicksand-Regular',
                                                    }}>{badge}</Text>
                                                    <Image style={{ height: 18, width: 20, }}
                                                        source={require('../../images/right_batch_arrow.png')}></Image>

                                                </View>
                                            </ImageBackground>




                                        </View>
                                        {/* <Image source={require('../../images/Rank.png')}
                                            style={{
                                                width: 119,
                                                height: 84,
                                                alignItems: 'center',
                                                display: 'flex',
                                                marginBottom: 20,
                                                marginTop: 20
                                            }}>

                                        </Image> */}
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <Text style={{
                                                color: 'white',
                                                marginRight: 10,
                                                textAlign: 'center',
                                                fontSize: 12,
                                                fontFamily: 'Quicksand-Medium',

                                            }}>{getFormattedLevel(player_level)}</Text>
                                            <View
                                                style={{
                                                    backgroundColor: 'red',
                                                    width: 36,
                                                    borderRadius: 4,
                                                    marginRight: 20,
                                                    marginTop: -5
                                                }}>
                                                <Text style={{
                                                    color: 'white',
                                                    marginRight: 0,
                                                    textAlign: 'center',
                                                    fontSize: 12,
                                                    fontFamily: 'Quicksand-Bold',
                                                    marginTop: 5,
                                                    marginBottom: 5
                                                }}> {player_category} </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    position: 'absolute',
                                    bottom: 20,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    selfAlign: 'center'
                                }}>
                                    {console.log("width", deviceWidth / 3)}
                                    <View style={{
                                        width: deviceWidth / 3,
                                        height: 80, marginLeft: 10
                                    }}>

                                        <ImageBackground source={require('../../images/box.png')}
                                            style={{
                                                width: '100%',
                                                height: 80,
                                            }}>

                                            <Text style={{ fontFamily: 'Quicksand-Medium', margin: 15, color: '#F4F4F4' }}>Rank</Text>
                                            {rank ? <Text style={styles.scoreBox}>{rank}</Text> : <Text style={styles.scoreBox}>00</Text>}


                                        </ImageBackground>

                                    </View>
                                    <ImageBackground source={require('../../images/box.png')}
                                        style={{
                                            width: deviceWidth / 3,
                                            height: 80,
                                        }}>
                                        <Text style={{ fontFamily: 'Quicksand-Medium', margin: 15, color: '#F4F4F4' }}>Score</Text>
                                        {score ? <Text style={styles.scoreBox}>{score}</Text> : <Text style={styles.scoreBox}>00</Text>}

                                    </ImageBackground>
                                    <View style={{
                                        width: deviceWidth / 3,
                                        height: 80, marginRight: 0
                                    }}>
                                        <ImageBackground source={require('../../images/box.png')}
                                            style={{
                                                width: '100%',
                                                height: 80,
                                            }}>

                                            <Text style={{ fontFamily: 'Quicksand-Medium', margin: 15, color: '#F4F4F4' }}>Reward</Text>
                                            {reward_point ? <Text style={styles.scoreBox}>{reward_point}</Text> : <Text style={styles.scoreBox}>00</Text>}


                                        </ImageBackground>

                                    </View>


                                </View>


                            </View>
                        </ImageBackground>

                    </View>

                    {sessionArray.length != 0 ?
                        <CustomeCard >
                            <View
                                style={{
                                    marginLeft: 16,
                                    marginRight: 16,
                                    marginTop: 16
                                }}
                            >
                                <Text style={defaultStyle.bold_text_10}>Next Session</Text>

                                <View style={defaultStyle.line_style} />

                                {sessionArray}

                            </View>
                        </CustomeCard>
                        : null}



                    {this.state.strenthList.length != 0 ?
                        <View style={{ margin: 10 }}>
                            <Card>
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

                                //console.warn("Touch Press")
                                this.props.navigation.navigate('CurrentBooking')

                            }}>
                                <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>

                                    <Image source={require('../../images/book_play.png')}
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

                                    <Image source={require('../../images/view_academy_player.png')}
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

                        <CustomeCard >
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
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={[defaultStyle.bold_text_14, { color: "#707070" }]}>{academy_feedback_data.target.name}</Text>

                                    <View style={{ flexDirection: 'row', }}>

                                        <Rating
                                            type='custom'
                                            ratingColor='#F4FC9A'
                                            ratingBackgroundColor='#D7D7D7'
                                            ratingCount={5}
                                            imageSize={14}
                                            readonly={true}
                                            startingValue={academy_feedback_data.target.avgFeedbackEntities[0].avgRating}
                                            style={{ height: 20, width: 80 }}
                                        />

                                        <Text style={{
                                            borderColor: '#DFDFDF',
                                            borderWidth: 1,
                                            height: 19, width: 30, textAlign: 'center',
                                            fontSize: 12,
                                            color: '#707070',
                                            paddingTop: 0,
                                            borderRadius: 12,
                                            fontFamily: 'Quicksand-Medium'
                                        }}>{academy_feedback_data.target.avgFeedbackEntities[0].avgRating}</Text>

                                    </View>
                                </View>
                                <View>

                                    <View style={{ marginTop: 10 }}>
                                        <Text style={
                                            [defaultStyle.bold_text_10, { marginTop: 5, color: '#A3A5AE' }]
                                        }>Top Reviews</Text>
                                        <Text style={[defaultStyle.bold_text_12, { marginTop: 5, color: '#707070' }]} >{academy_feedback_data.source.name}</Text>

                                        <Text style={[defaultStyle.regular_text_12, {
                                            marginTop: 5,
                                            color: '#707070'

                                        }]}>{academy_feedback_data.review}</Text>

                                    </View>


                                    <View style={{
                                        elevation: 4,
                                        marginTop: 10
                                    }}>

                                        <TouchableOpacity onPress={() => {

                                        }}>
                                            <Text
                                                style={[defaultStyle.bold_text_12,
                                                { textAlign: 'center', flex: 1, padding: 16, color: '#707070' }]}>
                                                View Academy
                                        </Text>

                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                        </CustomeCard>
                        : null
                    }

                    {/* ================================ COACH FEEDBACk =================== */}

                    {coach_feedback_data != null ?

                        <CustomeCard >
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
                                    <Text style={[defaultStyle.bold_text_14, { color: "#707070" }]}>{coach_feedback_data.target.name}</Text>

                                    <View style={{ flexDirection: 'row', }}>

                                        <Rating
                                            type='custom'
                                            ratingColor='#F4FC9A'
                                            ratingBackgroundColor='#D7D7D7'
                                            ratingCount={5}
                                            imageSize={14}
                                            readonly={true}
                                            startingValue={coach_feedback_data.target.avgFeedbackEntities[0].avgRating}
                                            style={{ height: 20, width: 80 }}
                                        />

                                        <Text style={{
                                            borderColor: '#DFDFDF',
                                            borderWidth: 1,
                                            height: 19, width: 30, textAlign: 'center',
                                            fontSize: 12,
                                            color: '#707070',
                                            paddingTop: 0,
                                            borderRadius: 12,
                                            fontFamily: 'Quicksand-Medium'
                                        }}>{coach_feedback_data.target.avgFeedbackEntities[0].avgRating.toFixed(1)}</Text>

                                    </View>
                                </View>
                                <View>

                                    <View style={{ marginTop: 10 }}>
                                        <Text style={
                                            [defaultStyle.bold_text_10, { marginTop: 5, color: '#A3A5AE' }]
                                        }>Top Reviews</Text>
                                        <Text style={[defaultStyle.bold_text_12, { marginTop: 5, color: '#707070' }]} >{coach_feedback_data.source.name}</Text>

                                        <Text style={[defaultStyle.regular_text_12, {
                                            marginTop: 5,
                                            color: '#707070'

                                        }]}>{coach_feedback_data.review}</Text>

                                    </View>


                                    <View style={{
                                        elevation: 4,
                                        marginTop: 10
                                    }}>

                                        <TouchableOpacity onPress={() => {

                                        }}>
                                            <Text
                                                style={[defaultStyle.bold_text_12,
                                                { textAlign: 'center', flex: 1, padding: 16, color: '#707070' }]}>
                                                View Coach
                </Text>

                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                        </CustomeCard>
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