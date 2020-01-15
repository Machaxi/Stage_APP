import React from 'react'
import * as Progress from 'react-native-progress';

import {
    View, ImageBackground, Text, StyleSheet, Image, RefreshControl, StatusBar, TouchableOpacity,
    Dimensions, FlatList, ScrollView, ActivityIndicator, BackHandler, Linking
} from 'react-native';
import { CustomeCard } from '../../components/Home/Card'
import { Card } from 'react-native-paper'
import { getData, storeData } from "../../components/auth";
import { getPlayerDashboard } from "../../redux/reducers/dashboardReducer";
import { getNotificationCount } from '../../redux/reducers/CommonReducer'
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import BaseComponent, {
    defaultStyle, getFormattedLevel,
    getStatsImageById,
    EVENT_EDIT_PROFILE, SESSION_DATE_FORMAT, REFRESH_SCREEN_CALLBACK, getUtcDateFromTime,
    PROFILE_PIC_UPDATED, getFormatTimeDate, EVENT_UPDATE_DIALOG
} from '../BaseComponent';
import { Rating } from 'react-native-ratings';
import moment from 'moment'
import Events from '../../router/events';
import PlayerHeader from '../../components/custom/PlayerHeader'
import { RateViewFill } from '../../components/Home/RateViewFill'
import { RateViewBorder } from '../../components/Home/RateViewBorder';
import firebase from 'react-native-firebase'
import CustomAnimationProgress from '../../components/custom/CustomAnimationProgress';
import StarRating from 'react-native-star-rating';
import CustomProgres, { captureRef } from '../../components/custom/CustomProgress';
import ViewShot from "react-native-view-shot";
import ImgToBase64 from 'react-native-image-base64';
import Share from 'react-native-share';
import branch, { BranchEvent } from 'react-native-branch';
import UpdateAppDialog from '../../components/custom/UpdateAppDialog'

var deviceWidth = Dimensions.get('window').width - 20;

var is_show_badge = false
var notification_count = 0

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
                    <View style={{
                        flexDirection: 'row',
                        //alignItems: 'center'
                    }}>

                        <Text
                            style={{
                                fontFamily: 'Quicksand-Medium',
                                fontSize: 14,
                                color: 'white'
                            }}
                        >{navigation.getParam('Title', '') == '' ? '' :
                            navigation.getParam('Title', '')}</Text>

                        {navigation.getParam('Title', '') == null ? '' :
                            <Image
                                source={require('../../images/white_drop_down.png')}
                                resizeMode="contain"
                                style={{
                                    width: 8,
                                    marginLeft: 6,
                                    height: 6,
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    marginTop: 3,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            />}

                    </View>

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

                <ImageBackground
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    source={require('../../images/toolbar_bg.png')}
                />
            ),
            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.toggleDrawer();
                    }}
                    style={{padding: 7}}
                    activeOpacity={.8}
                >

                    <Image

                        source={require('../../images/hamburger_white.png')}
                        style={{ width: 20, height: 16, marginLeft: 12 }}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => {
                            navigation.navigate('NotificationList')
                        }}
                        activeOpacity={.8} >
                        <ImageBackground
                            resizeMode="contain"
                            source={require('../../images/ic_notifications.png')}
                            style={{
                                width: 22, height: 22, marginLeft: 12,
                                marginRight: 12,
                                alignItems: 'flex-end'
                            }}>

                            {navigation.getParam('notification_count', 0) > 0 ? <View style={{
                                width: 16,
                                height: 16,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30 / 2,
                                backgroundColor: '#ED2638'
                            }}>
                                <Text style={[defaultStyle.bold_text_10, { fontSize: 8, color: 'white' }]}>
                                    {navigation.getParam('notification_count', '') > 99 ? '99+' : navigation.getParam('notification_count', '')}</Text>
                            </View> : null}


                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginRight: 8 }}
                        onPress={() => {
                            navigation.getParam('shareProfile')();
                        }}
                        activeOpacity={.8} >
                        <ImageBackground
                            resizeMode="contain"
                            source={require('../../images/share-profile.png')}
                            style={{
                                width: 22, height: 22, marginLeft: 0,
                                marginRight: 12,
                                alignItems: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>
                </View>

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
            userData: null,
            country: undefined,
            player_profile: null,
            strenthList: null,
            acedemy_name: '',
            academy_feedback_data: null,
            coach_feedback_data: null,
            academy_id: '',
            academy_user_id: '',
            screenShot: null,
            show_must_update_alert: false,
        }

        const { navigation } = this.props.navigation.setParams({ shareProfile: this.shareProfile })
        //StatusBar.setBackgroundColor("#262051")
        //StatusBar.setBarStyle('light-content', true)
    }
    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }
    componentDidMount() {
        getData('userInfo', (value) => {
            var userData = JSON.parse(value)
            if (userData.user) {
                var userid = userData.user['id']
                var username = userData.user['name']
                firebase.analytics().logEvent("PlayerHome", { userid: userid, username: username })
            }
        })
        // firebase.analytics().logEvent("PlayerHome", {})
        // getData('userInfo',(value)=>{
        //     firebaseAnalytics.logEvent('DASHBOARD',value );

        // })

        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.getNotifications()
            }
        );


        this.refreshEvent = Events.subscribe('NOTIFICATION_CALL', (msg) => {
            this.getNotifications()
        });

        // this.refreshEvent = Events.subscribe('FROM_REGISTRATION', () => {
        //     this.props.navigation.navigate('Tournament')
        // });

        this.refreshEvent = Events.subscribe('FROM_REGISTRATION', (deep_data) => {
            //alert('event')
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

        this.refreshEvent = Events.subscribe('REFRESH_DASHBOARD', () => {
            this.selfComponentDidMount()
        });

        this.getNotifications()
        this.selfComponentDidMount()

        this.refreshEvent = Events.subscribe(REFRESH_SCREEN_CALLBACK, (msg) => {
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
        
        setTimeout(() => {
            console.log('component did mount')
            if(this.viewShot && this.props.data.dashboardData !== '') {
                this.viewShot.capture().then(uri => {
                    this.onCapture(uri)
                })
            } else {
                console.log('viewshot reference not fount')
            }
        }, 5000)
        
    }

    // componentWillReceiveProps(nextProps, nextState){
    //     if(nextProps.data !== this.props.data || nextProps.common !== this.props.common){
    //         console.log('will recieve props', nextProps)
    //         setTimeout(()=>{
    //             this.viewShot.capture().then(uri => {
    //                 this.onCapture(uri)
    //             })
    //         }, 100)
    //     }
    // }

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
            console.log('notification_count', count);
        })
    }

    selfComponentDidMount() {
        var userData;
        getData('header', (value) => {
            console.log("header", value);
        });

        console.log("PlayerDashboard");
        getData('userInfo', (value) => {
            userData = JSON.parse(value)
            global.SELECTED_PLAYER_ID = userData['player_id']
            global.USER_TYPE = userData.user['user_type']

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
                    try {
                        this.setState({
                            coach_feedback_data: user1.data['coach_data'].coach_feedback[0],
                        })
                    }
                    catch (err) {
                        //document.getElementById("demo").innerHTML = err.message;
                    }

                }

                if (user1.data['academy_data'] != null && user1.data['academy_data'].feedback) {
                    this.setState({
                        academy_feedback_data: user1.data['academy_data'].feedback[0],
                    })
                }

                try {
                    const profile_pic = user1.data.player_profile.profile_pic
                    Events.publish(PROFILE_PIC_UPDATED, profile_pic);
                } catch (err) {

                }

                if (user1.data.player_profile['stats'] != null &&
                    user1.data.player_profile['stats']) {
                    this.setState({
                        strenthList: user1.data.player_profile['stats'],
                    })
                }



                if (user1.success == true) {

                    global.SELECTED_PLAYER_NAME = user1.data['player_profile'].name
                    this.state.academy_user_id = user1.data['player_profile'].academy_user_id

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
                        userData['academy_user_id'] = user1.data['player_profile'].academy_user_id
                        userData['academy_rating'] = user1.data['player_profile'].academy_rating
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

    shareProfile = async () => {
        this.setState({ refreshing: true })
        console.log('screenshot', this.state.screenShot)
        if(this.state.screenShot !== null){
            this.buo = await branch.createBranchUniversalObject("machaxi-app", {
                locallyIndex: true,
                //canonicalUrl:  'https://google.com',
                title: 'Machaxi',
                contentImageUrl: 'data:image/png;base64,' + this.state.screenShot,
                contentMetadata: {
                    customMetadata: { type: 'profile', player_id: global.SELECTED_PLAYER_ID + '', academy_id: this.state.academy_id + '' }
                }
            })
            this.buo.logEvent(BranchEvent.ViewItem)
            console.log("Created Branch Universal Object and logged standard view item event.", BranchEvent.ViewItem)
            let linkProperties = {
                feature: 'share',
                channel: 'whatsapp'
                //userId: "125",
            }

            let controlParams = {
                $desktop_url: Platform.OS === 'android' ? 
                    'https://play.google.com/store/apps/details?id=com.machaxi&hl=en' :
                    'https://apps.apple.com/in/app/machaxi-sports-technology/id1484093762',
                $ios_url: 'https://apps.apple.com/in/app/machaxi-sports-technology/id1484093762'
            }

            let { url } = await this.buo.generateShortUrl(linkProperties, controlParams)
            //let {url} = await branchUniversalObject.generateShortUrl(linkProperties)
            console.log("URL ", url)
            const shareOptions = {
                title: 'Machaxi App',
                message: 'Click to see my detailed Badminton Stats ' + url,
                url: 'data:image/png;base64,' + this.state.screenShot,
                subject: 'Machaxi',
                //quote:'hello',
                //   social: Share.Social.WHATSAPP
            }
            Share.open(shareOptions);
            this.setState({ refreshing: false })
        } else{
            setTimeout(()=> this.shareProfile(), 1000)
        }
        
    }

    onCapture = uri => {
        console.log('uri=>', uri);
        // setTimeout(() => {
            ImgToBase64.getBase64String(`file://${uri}`)
                .then(base64String => {
                    this.setState({ screenShot: base64String })
                })
                .catch(err => doSomethingWith(err))
        // }, 10)
    }

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

    renderItem = ({ item }) => (
        <TouchableOpacity key={item}
            activeOpacity={.8}
            onPress={() => {
                this.props.navigation.navigate('ViewPlayerPerformance',
                    { performance_data: item });

            }}>
            <View style={{ margin: 10, flexDirection: 'row', height: 60 }}>

                <Image
                    resizeMode="contain"
                    source={getStatsImageById(item.id)}
                    style={{
                        width: 40,
                        height: 40, marginRight: 20,
                        alignItems: 'center'
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
                    {/* <Progress.Bar style={{
                        backgroundColor: '#E1E1E1',
                        color: '#305F82', borderRadius: 11, borderWidth: 0
                    }}
                        progress={item.score / 100}
                        width={deviceWidth - 130} height={14} /> */}

                    <CustomAnimationProgress
                        percent={item.score}
                        width={deviceWidth - 120}
                        height={14}
                    />


                </View>
                <View style={{
                    height: 50,
                    //width: 30,
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
        let show_must_update_alert = this.state.show_must_update_alert

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
            if (operations != null && operations.next_sessions != null) {

                for (let i = 0; i < operations.next_sessions.length; i++) {
                    const { routine_name, session_date, is_canceled, end_time, start_time } = operations.next_sessions[i]

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
                                        {/* {moment.utc(session_date).local().format(SESSION_DATE_FORMAT)} */}
                                        {getUtcDateFromTime(session_date, start_time)}
                                    </Text>
                                    <Text
                                        style={[defaultStyle.regular_text_14, {
                                            textDecorationLine: 'line-through',
                                            marginLeft: 10,
                                        }]}>
                                        {getFormatTimeDate(session_date, start_time)
                                            + "  -   " +
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
                                        {/* {moment.utc(session_date).local().format(SESSION_DATE_FORMAT)} */}
                                        {getUtcDateFromTime(session_date, start_time)}
                                    </Text>

                                    <Text style={[defaultStyle.regular_text_14, { marginLeft: 10 }]}>
                                        {getFormatTimeDate(session_date, start_time)
                                            + "  -   " +
                                            getFormatTimeDate(session_date, end_time)}
                                    </Text>

                                </View>

                            </View >

                        );
                    }
                }
            }


            return (<View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
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
                    
                        <ViewShot 
                            ref={(ref) => this.viewShot = ref}
                            style={{ opacity: 0, position: 'absolute', width: '100%', zIndex: -1 }}
                        >
                            <PlayerHeader
                                is_tooblar={true}
                                player_profile={this.state.player_profile}
                            />
                            {/* {this.state.strenthList.length != 0 ?
                                <CustomeCard>
                                    <View
                                        style={{
                                            marginLeft: 12,
                                            marginRight: 12,
                                            marginTop: 16
                                        }}
                                    >
                                        <Text style={{ fontSize: 14, margin: 10 }}>My Stats </Text>
                                        <FlatList
                                            data={this.state.strenthList}
                                            renderItem={this.renderItem}
                                            keyExtractor={(item, index) => item.id}
                                        />
                                    </View>
                                </CustomeCard>
                                : null
                            } */}
                        </ViewShot>
                    
                    <PlayerHeader
                        is_tooblar={true}
                        player_profile={this.state.player_profile}
                    />

                    {sessionArray.length != 0 ?
                        <CustomeCard >

                            <TouchableOpacity
                                onPress={() => {
                                    global.click_batch_id = operations.batch_id;
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
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                        paddingTop: 16,
                                        paddingBottom: 12
                                    }}
                                >
                                    <Text style={defaultStyle.bold_text_10}>Next Session : {operations.next_sessions[0].routine_name}</Text>
                                    <Text style={defaultStyle.bold_text_10}>{operations.batch_name}</Text>
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
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View>
                                            <Text style={[defaultStyle.bold_text_14, { marginLeft: 10, marginTop: 10 }]}>My Stats </Text>
                                            <View style={{
                                                width: 60,
                                                height: 3, marginLeft: 10,
                                                marginTop: 2, marginBottom: 8, backgroundColor: '#404040'
                                            }}></View>
                                        </View>
                                    </View>
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
                                <View style={{
                                    margin: 10,
                                    alignItems: 'center',
                                    flexDirection: 'row', height: 40
                                }}>

                                    <Image source={require('../../images/view_academy_player.png')}
                                        resizeMode="contain"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            marginRight: 20,
                                        }} />
                                    <View style={{ flex: 1 }}>

                                        <View style={{
                                            flex: 1,
                                            marginRight: 15,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={defaultStyle.bold_text_14}>
                                                View Academy Players
                                        </Text>

                                            <Image
                                                resizeMode="contain"
                                                source={require('../../images/path.png')}
                                                style={{
                                                    width: 19,
                                                    height: 13, marginRight: 0,
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
                                <View style={{
                                    margin: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    height: 40
                                }}>

                                    <Image source={require('../../images/browse_academy.png')}
                                        resizeMode="contain"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            marginRight: 20,

                                        }} />
                                    <View style={{ flex: 1 }}>

                                        <View style={{
                                            flex: 1,
                                            marginRight: 15,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={defaultStyle.bold_text_14}>
                                                Browse Academies
                                        </Text>

                                            <Image
                                                resizeMode="contain"
                                                source={require('../../images/path.png')}
                                                style={{
                                                    width: 19,
                                                    height: 13,
                                                    marginRight: 0,
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

                                        {/* <Rating
                                            type='custom'
                                            ratingColor='#F4FC9A'
                                            ratingBackgroundColor='#D7D7D7'
                                            ratingCount={5}
                                            imageSize={12}
                                            readonly={true}
                                            startingValue={academy_feedback_data.target.avgFeedbackEntities[0].avgRating}//
                                            style={{ width: 80 }}
                                        /> */}
                                        <StarRating
                                            style={{
                                                //height: 24, 
                                                width: 70,
                                                marginRight: 6,
                                            }}
                                            containerStyle={{
                                                width: 70,
                                                marginRight: 6
                                            }}
                                            starSize={14}
                                            disabled={true}
                                            emptyStar={require('../../images/ic_empty_star.png')}
                                            fullStar={require('../../images/ic_star.png')}
                                            halfStar={require('../../images/ic_half_star.png')}
                                            iconSet={'Ionicons'}
                                            maxStars={5}
                                            rating={academy_feedback_data.target.avgFeedbackEntities[0] ? academy_feedback_data.target.avgFeedbackEntities[0].avgRating : 0}
                                            ratingBackgroundColor={"#ff2200"}
                                            fullStarColor={'#F4FC9A'}
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
                                        }}>{academy_feedback_data.target.avgFeedbackEntities[0].avgRating.toFixed(1)}</Text>
                                        academy_feedback_data.target.avgFeedbackEntities[0].avgRating
                                        */}
                                        <RateViewBorder>
                                            {academy_feedback_data.target.avgFeedbackEntities[0] ? academy_feedback_data.target.avgFeedbackEntities[0].avgRating : 0}
                                        </RateViewBorder>
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
                                                //marginTop: 4,
                                                alignItems: 'center'
                                            }}>

                                                {/* <Rating
                                                    type='custom'
                                                    ratingColor='#F4FC9A'
                                                    ratingBackgroundColor='#D7D7D7'
                                                    ratingCount={5}
                                                    imageSize={12}
                                                    readonly={true}
                                                    startingValue={academy_feedback_data.rating}
                                                    style={{ width: 80 }}
                                                /> */}
                                                <StarRating
                                                    style={{
                                                        //height: 24, 
                                                        width: 70,
                                                        marginRight: 6,
                                                    }}
                                                    containerStyle={{
                                                        width: 70,
                                                        marginRight: 6
                                                    }}
                                                    starSize={14}
                                                    disabled={true}
                                                    emptyStar={require('../../images/ic_empty_star.png')}
                                                    fullStar={require('../../images/ic_star.png')}
                                                    halfStar={require('../../images/ic_half_star.png')}
                                                    iconSet={'Ionicons'}
                                                    maxStars={5}
                                                    rating={academy_feedback_data.rating}
                                                    ratingBackgroundColor={"#ff2200"}
                                                    fullStarColor={'#F4FC9A'}
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

                                        {/* <Rating
                                            type='custom'
                                            ratingColor='#F4FC9A'
                                            ratingBackgroundColor='#D7D7D7'
                                            ratingCount={5}
                                            imageSize={12}
                                            readonly={true}
                                            startingValue={coach_feedback_data.target.avgFeedbackEntities[0].avgRating}//coach_feedback_data.target.avgFeedbackEntities[0].avgRating
                                            style={{ width: 80 }}
                                        /> */}
                                        <StarRating
                                            style={{
                                                //height: 24, 
                                                width: 70,
                                                marginRight: 6,
                                            }}
                                            containerStyle={{
                                                width: 70,
                                                marginRight: 6
                                            }}
                                            starSize={14}
                                            disabled={true}
                                            emptyStar={require('../../images/ic_empty_star.png')}
                                            fullStar={require('../../images/ic_star.png')}
                                            halfStar={require('../../images/ic_half_star.png')}
                                            iconSet={'Ionicons'}
                                            maxStars={5}
                                            rating={coach_feedback_data.target.avgFeedbackEntities[0].avgRating}
                                            ratingBackgroundColor={"#ff2200"}
                                            fullStarColor={'#F4FC9A'}
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
                                        }}>{coach_feedback_data.target.avgFeedbackEntities[0].avgRating.toFixed(1)}</Text>
                                        coach_feedback_data.target.avgFeedbackEntities[0].avgRating */}
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
                                                //marginTop: 4,
                                            }}>

                                                {/* <Rating
                                                    type='custom'
                                                    ratingColor='#F4FC9A'
                                                    ratingBackgroundColor='#D7D7D7'
                                                    ratingCount={5}
                                                    imageSize={12}
                                                    readonly={true}
                                                    startingValue={coach_feedback_data.rating}
                                                    style={{ width: 80 }}
                                                /> */}
                                                <StarRating
                                                    style={{
                                                        //height: 24, 
                                                        width: 70,
                                                        marginRight: 6,
                                                    }}
                                                    containerStyle={{
                                                        width: 70,
                                                        marginRight: 6
                                                    }}
                                                    starSize={14}
                                                    disabled={true}
                                                    emptyStar={require('../../images/ic_empty_star.png')}
                                                    fullStar={require('../../images/ic_star.png')}
                                                    halfStar={require('../../images/ic_half_star.png')}
                                                    iconSet={'Ionicons'}
                                                    maxStars={5}
                                                    rating={coach_feedback_data.rating}
                                                    ratingBackgroundColor={"#ff2200"}
                                                    fullStarColor={'#F4FC9A'}
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
                                        coach_id: coach_feedback_data.target.entity_id
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
                    <UpdateAppDialog
                        navigation={this.state.navigation}
                        exitPressed={() => {
                            this.setState({ show_must_update_alert: false })
                            BackHandler.exitApp()
                            //this.props.navigation.goBack(null)
                        }}
                        updatePressed={() => {
                            this.setState({ show_must_update_alert: false })
                            this.handleClick()
                        }}
                        visible={show_must_update_alert}
                    />
                    
                </ScrollView>
            </View >
            )
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
        common: state.CommonReducer
    };
};
const mapDispatchToProps = {
    getPlayerDashboard, getNotificationCount
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

    },
    confirmBtnOuter: {
        marginHorizontal: 16,
        //marginTop: 20,
        marginBottom: 15
    },



});