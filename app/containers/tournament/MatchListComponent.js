import React from 'react'

import { View, ScrollView, BackHandler, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { CustomeCard } from '../../components/Home/Card'
import moment from 'moment'
import BaseComponent, {
    defaultStyle, SESSION_DATE_FORMAT,
    formattedName,
    checkProfilePic, getFormatTimeDate, getFormatTime, getUtcDateFromTime
} from '../BaseComponent';
import { getData } from "../../components/auth";
import ProgressIngreeDialog from '../../components/custom/ProgressIngreeDialog'

class MatchListComponent extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {

            batchdata: null,
            coactList: [],
            academy_id: '',
            performance_dialog: false,
            matchList: [],
        }

        getData('userInfo', (value) => {
            let userData = JSON.parse(value)
            this.state.academy_id = userData['academy_id']

        });

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        let performance_dialog = this.state.performance_dialog

        if (performance_dialog) {
            this.setState({
                performance_dialog: !performance_dialog
            })
        } else {
            this.props.navigation.goBack(null);
            return true;
        }
    }

    goToPlayerDetail(id) {
        console.log('goToPlayerDetail======================', id);
        this.props.navigation.navigate('OtherPlayerDeatils', {
            player_id: id,
            fixture: true
        })

    }

    componentDidMount() {

        //console.warn('hjhc', this.props.jumpTo)
        this.setState({
            matchList: this.props.jumpTo.data
        })

        // var userData;
        // getData('header',(value)=>{
        //     console.log("header",value);
        // });
        //
        // console.log("CoachDashboard");
        // getData('userInfo',(value) => {
        //     userData = JSON.parse(value)
        //     this.setState({
        //         userData: JSON.parse(value)
        //     });
        //     console.log("userData.user",userData.user['user_type'])
        //     if(userData.user['user_type'] =='PLAYER' || userData.user['user_type'] =='PARENT'){
        //        // this.getPlayerBatchData(userData['academy_id'],userData['player_id'])
        //
        //     }
        //
        //
        // });

        //let date = moment.utc("01/01/1970 12:00 PM").local().format("hh:mm a")
        //console.warn(date)
    }
    renderMatchItem = ({ item, index }) => {

        if (item.tournament_match_scores.length == 0 && item.bye_given == false) {
            item.tournament_match_scores = [{
                "round": 1,
                "player1_score": 0,
                "player2_score": 0
            }, {
                "round": 2,
                "player1_score": 0,
                "player2_score": 0
            },
            {
                "round": 3,
                "player1_score": 0,
                "player2_score": 0
            }]
        }

        //console.log('item', item);

        // let profile_pic = checkProfilePic(item.profile_pic)
        // let ratings = item.ratings
        // if (ratings == null)
        //     ratings = 0
        // ratings = ratings.toFixed(1)

        return (

            <CustomeCard>
                <View
                    style={{
                        marginLeft: 12,
                        marginRight: 12,
                        marginTop: 16,
                        flex: 1,
                    }}
                >

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                item.match_number ? <View><Text style={defaultStyle.bold_text_10}>{'Match No. ' + item.match_number}</Text></View> :
                                    <View><Text style={defaultStyle.bold_text_10}>{'Match No. ' + (index + 1)}</Text></View>
                            }
                            {
                                item.bye_given &&
                                <View>
                                    <View
                                        style={{
                                            backgroundColor: '#9b9eA8',
                                            borderRadius: 4, marginLeft: 10
                                        }}>
                                        <Text style={{
                                            paddingLeft: 6,
                                            paddingRight: 6,
                                            paddingTop: 2,
                                            paddingBottom: 2,
                                            fontFamily: 'Quicksand-Medium',
                                            fontSize: 10,
                                            color: '#fff',
                                        }}>Bye
                                    </Text>
                                    </View>
                                </View>

                            }
                        </View>
                        <View>
                            {
                                !!item.venue &&
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <Text style={[defaultStyle.bold_text_10, { marginLeft: 5, textAlign: 'right' }]}>
                                        {item.venue}
                                    </Text>
                                </View>

                            }
                            {
                                item.start_datetime &&
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[defaultStyle.bold_text_10, { marginLeft: 5 }]}>
                                        {moment.utc(item.start_datetime).local().format(SESSION_DATE_FORMAT) + ','}
                                    </Text>
                                    <Text style={[defaultStyle.bold_text_10, { marginLeft: 5 }]}>
                                        {moment.utc(item.start_datetime).local().format("hh:mm a")}
                                    </Text>
                                </View>
                            }
                        </View>
                    </View>



                    <View style={defaultStyle.line_style} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        {
                            item.player1 ?
                                <View style={{ width: '50%' }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[defaultStyle.heavy_bold_text_14, item.player1.user_type == "PLAYER" ? {color: 'blue'} : {}]} onPress={() => {
                                            if(item.player1.user_type == "PLAYER") {
                                                this.goToPlayerDetail(item.player1.user_id)
                                            }
                                        }}>{item.player1_description}</Text>
                                        {
                                            item.winner && item.winner.id == item.player1.id &&
                                            <Image source={require('../../images/trophy.png')}
                                                resizeMode='contain'
                                                style={{
                                                    width: 14, height: 18, marginLeft: 10
                                                }}></Image>
                                        }

                                    </View>
                                </View> : (
                                    item.player1_match ?
                                        <View style={{ width: '50%', alignItems: 'center' }}>
                                            <Text style={[defaultStyle.heavy_bold_text_14,]}> {'Match ' + item.player1_match.match_number + ' winner'}</Text>
                                        </View> :
                                        ((item.winner && item.bye_given) ?
                                            <View style={{ width: '50%', alignItems: 'center' }}>
                                                <Text style={[defaultStyle.heavy_bold_text_14,]}> {'No player'}</Text>
                                            </View> :
                                            <View style={{ width: '50%', alignItems: 'center' }}>
                                                <Text style={[defaultStyle.heavy_bold_text_14,]}> {'To be decided'}</Text>
                                            </View>)
                                )
                        }
                        {
                            item.player2 ?
                                <View style={{ width: '50%' }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[defaultStyle.heavy_bold_text_14,item.player2.user_type == "PLAYER" ? {color: 'blue'}: {}]} onPress={() => {
                                            if(item.player2.user_type == "PLAYER") {
                                                this.goToPlayerDetail(item.player2.user_id)
                                            }
                                        }}>{item.player2_description}</Text>
                                        {
                                            item.winner && item.winner.id == item.player2.id &&
                                            <Image source={require('../../images/trophy.png')}
                                                resizeMode='contain'
                                                style={{
                                                    width: 14, height: 18, marginLeft: 10
                                                }}></Image>
                                        }
                                    </View>
                                </View> : (
                                    item.player2_match ?
                                        <View style={{ width: '50%', alignItems: 'center' }}>
                                            <Text style={[defaultStyle.heavy_bold_text_14,]}> {'Match ' + item.player2_match.match_number + ' winner'}</Text>
                                        </View>
                                        : (
                                            (item.winner && item.bye_given) ?
                                                <View style={{ width: '50%', alignItems: 'center' }}>
                                                    <Text style={[defaultStyle.heavy_bold_text_14,]}> {'No player'}</Text>
                                                </View> :
                                                <View style={{ width: '50%', alignItems: 'center' }}>
                                                    <Text style={[defaultStyle.heavy_bold_text_14,]}> {'To be decided'}</Text>
                                                </View>
                                        )
                                )
                        }
                    </View>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View style={{ width: '50%' }}
                            >
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={[defaultStyle.heavy_bold_text_14,]}> {'Match ' + item.player1_match.match_number + ' winner'}</Text>
                                </View>
                            </View>
                            <View style={{ width: '50%' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={defaultStyle.heavy_bold_text_14}>{'Match ' + item.player2_match.match_number + ' winner'}</Text>
                                </View>
                            </View>
                            </View> */}
                    <View style={{ marginTop: 10 }}>
                        {!item.bye_given && item.tournament_match_scores.map((matchScore, index) => {
                            return (<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 3 }}>
                                <View style={{}}>
                                    <Text style={defaultStyle.bold_text_12}>{matchScore.player1_score}</Text>
                                </View>
                                <View style={{ marginLeft: 62, marginRight: 62 }}>
                                    <Text style={[defaultStyle.bold_text_10, { color: '#C4C4C5' }]}>{'Set ' + (index + 1)} </Text>
                                </View>
                                <View style={{}}>
                                    <Text style={defaultStyle.bold_text_12}>{matchScore.player2_score}</Text>
                                </View>
                            </View>)
                        })}
                    </View>

                    {/* <View style={{ marginTop: 10 }}>
                                {item.tournament_match_scores.map((matchScore, index) => {
                                    return (<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 3 }}>
                                        <View style={{}}>
                                            <Text style={defaultStyle.bold_text_12}>{matchScore.player1_score}</Text>
                                        </View>
                                        <View style={{ marginLeft: 62, marginRight: 62 }}>
                                            <Text style={[defaultStyle.bold_text_10, { color: '#C4C4C5' }]}>{'Set ' + (index + 1)} </Text>
                                        </View>
                                        <View style={{}}>
                                            <Text style={defaultStyle.bold_text_12}>{matchScore.player2_score}</Text>
                                        </View>
                                    </View>)
                                })}
                            </View> */}

                    <View style={defaultStyle.line_style} />

                    {
                        (this.props.jumpTo.can_update_score && item.player1 && item.player2) &&
                        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                            <Text style={[defaultStyle.rounded_button, styles.confirmBtn]} onPress={() => {
                                this.props.navigation.navigate('TournamentScorer', {
                                    match_id: item.id
                                })

                            }}>Update Score</Text>
                        </View>
                    }
                </View>

            </CustomeCard>
        )
    };

    sessionMangement(operations) {


        console.log('sessionMangement=>', JSON.stringify(operations))
        sessionArray = [];
        // for (let i = 0; i < operations.next_sessions.length; i++)
        // {
        const { routine_name, session_date, is_canceled, end_time, start_time } = operations
        console.log("is_canceled", { is_canceled })
        if (is_canceled == true) {
            sessionArray.push(
                <View style={{
                    marginTop: 0,
                    marginBottom: 16
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* <Text style={[defaultStyle.bold_text_14, {
                            textDecorationLine: 'line-through'
                        }]}
                        >{routine_name == null ? "" : routine_name}</Text> */}
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

                    <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                        <Text style={[defaultStyle.regular_text_14, {
                            textDecorationLine: 'line-through',

                        }]}>
                            {/* {moment.utc(session_date).local().format(SESSION_DATE_FORMAT)} */}
                            {getUtcDateFromTime(session_date, start_time)}
                        </Text>
                        <Text style={[defaultStyle.regular_text_14, {
                            textDecorationLine: 'line-through',
                            marginLeft: 10,
                        }]}>
                            {getFormatTimeDate(session_date, start_time)
                                + " - " + getFormatTimeDate(session_date, end_time)}
                        </Text>

                    </View>

                </View>
            );
        } else {
            sessionArray.push(
                <View style={{
                    marginTop: 0,
                    marginBottom: 16
                }}>

                    {/* <Text style={[defaultStyle.bold_text_14, {
                    }]}>
                        {routine_name == null ? "" : routine_name}
                    </Text> */}
                    <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                        <Text style={defaultStyle.regular_text_14}>
                            {/* {moment.utc(session_date).local().format(SESSION_DATE_FORMAT)} */}
                            {getUtcDateFromTime(session_date, start_time)}
                        </Text>
                        <Text style={[defaultStyle.regular_text_14, { marginLeft: 10 }]}>
                            {getFormatTimeDate(session_date, start_time)
                                + " - " + getFormatTimeDate(session_date, end_time)}
                        </Text>

                    </View>

                </View>
            );
        }
        // }
    }
    render() {

        console.log(' this.props.jumpTo', this.props.jumpTo)
        // const { session } = this.props.jumpTo
        // const {routine_name, batch_name, batch_category,batch_id} = this.state.coach_profile.attandence_batch[0]
        // const {is_canceled, end_time,session_date, start_time} = this.state.coach_profile.attandence_batch[0].session

        //console.log('session=> ',JSON.stringify(session))
        // if (session != undefined)
        //     this.sessionMangement(session)
        // this.scoreMangement(tournaments)

        return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>

            {/*<ProgressIngreeDialog*/}
            {/*touchOutside={(item) => {*/}
            {/*this.setState({*/}
            {/*performance_dialog: false*/}
            {/*})*/}
            {/*setTimeout(() => {*/}

            {/*if (item != null) {*/}
            {/*item.score = 0*/}
            {/*item.batchId = batch_id*/}
            {/*this.props.navigation.navigate('ViewPlayerPerformance',*/}
            {/*{ performance_data: item });*/}
            {/*}*/}
            {/*}, 50)*/}
            {/*}}*/}
            {/*performance_data={this.props.jumpTo.progress_attrstateibutes}*/}
            {/*visible={this.state.performance_dialog}*/}
            {/*/>*/}

            <ScrollView style={{ flex: 1, marginTop: 0, height: '100%', backgroundColor: '#F7F7F7' }}>
                {/*// <View style={{margin: 10}}>*/}

                {this.state.matchList ?
                    <FlatList
                        data={this.props.jumpTo.data}
                        //  extraData={this.state.is_refresh}
                        renderItem={this.renderMatchItem}
                    /> : null
                }


            </ScrollView>
        </View>

    }
}

export default MatchListComponent;

const styles = StyleSheet.create({
    labelText: {
        marginBottom: 5,
        color: '#A3A5AE',
        fontSize: 10,

        // backgroundColor: 'blue',
    },
    confirmBtn: { width: "100%", marginLeft: 0, marginRight: 0, fontFamily: 'Quicksand-Regular', },
}
);