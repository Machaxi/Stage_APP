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
            matchList:[],
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

    componentDidMount() {

        //console.warn('hjhc', this.props.jumpTo)
        this.setState({
            matchList: this.props.jumpTo
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
    renderMatchItem = ({ item,index }) => {

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

                        <Text style={defaultStyle.bold_text_10}>{'Match NO'+index }</Text>
                        {/*<TouchableOpacity*/}
                            {/*onPress={() => {*/}
                                {/*this.props.navigation.navigate('PlayerAttendance',*/}
                                    {/*{ batch_id: this.props.jumpTo.batch_id })*/}
                            {/*}}>*/}
                            {/*<Text style={[defaultStyle.regular_text_12, { color: '#667DDB' }]}>View Details </Text>*/}
                        {/*</TouchableOpacity>*/}

                    <View style={defaultStyle.line_style} />
                    <View style={{  flexDirection: 'row', justifyContent: 'space-between' }}>

                       <View style={{width:'50%',borderRightWidth:1, borderRightColor: '#DFDFDF'}}
                       >
                           <View style={{alignItems:'center'}}>
                           <Text style={[defaultStyle.heavy_bold_text_14,]}>{item.player1.name}</Text>
                           </View>
                           { item.tournament_match_scores.map((matchScore, index) => {

                             return ( <View style={{  flexDirection: 'row', justifyContent: 'space-between',marginRight:5 }}>
                                   <Text style={defaultStyle.bold_text_10}>{'set'+ (index + 1)} </Text>
                                   <Text style={defaultStyle.bold_text_10}>{matchScore.player1_score}</Text>
                               </View> )
                           })}

                       </View>
                        <View style={{width:'50%'}}>
                            <View style={{alignItems:'center'}}>
                            <Text style={defaultStyle.heavy_bold_text_14}>{item.player2.name}</Text>
                            </View>
                            { item.tournament_match_scores.map((matchScore, index) => {
                            return ( <View style={{  flexDirection: 'row', justifyContent: 'space-between',marginLeft:5,marginRight:5 }}>
                            <Text style={defaultStyle.bold_text_10}>{'set'+ (index + 1)} </Text>
                            <Text style={defaultStyle.bold_text_10}>{matchScore.player2_score}</Text>
                        </View> )
                            })}
                        </View>
                    </View>
                    <View style={defaultStyle.line_style} />
                    <View  style={{alignItems:'center',marginTop:10,marginBottom:20}}>
                    <TouchableOpacity
                    onPress={() => {
                    this.props.navigation.navigate('PlayerAttendance',
                    { batch_id: this.props.jumpTo.batch_id })
                    }}>
                    <Text style={[defaultStyle.regular_text_12, { color: '#667DDB' }]}>Update Score </Text>
                    </TouchableOpacity>
                    </View>
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

                    <View style={{ flexDirection: 'row', marginTop: 5,justifyContent: 'space-between' }}>
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

        console.log( ' this.props.jumpTo',this.props.jumpTo)
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
                {/*performance_data={this.props.jumpTo.progress_attributes}*/}
                {/*visible={this.state.performance_dialog}*/}
            {/*/>*/}

            <ScrollView style={{ flex: 1, marginTop: 0,height:'100%', backgroundColor: '#F7F7F7' }}>
                {/*// <View style={{margin: 10}}>*/}

                {this.state.matchList ?
                    <FlatList
                        data={this.state.matchList}
                      //  extraData={this.state.is_refresh}
                        renderItem={this.renderMatchItem}
                    /> :null
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
    }
);