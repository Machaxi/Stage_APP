import React from 'react'

import { View, ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { CustomeCard } from '../../components/Home/Card'
import moment from 'moment'
import BaseComponent, { defaultStyle } from '../BaseComponent';

class PlayerBatchComponent extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {

            batchdata: null,
            coactList: []
        }

    }

    componentDidMount() {

        console.warn('hjhc', this.props.jumpTo)
        this.setState({
            coactList: this.props.jumpTo.coaches
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
    renderItem = ({ item }) => (
        <TouchableOpacity key={item} onPress={() => {

            console.warn("Touch Press")

            // this.props.navigation.navigate('OrderTracking', {
            //     order_id: item.increment_id
            // })

        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <View style={{ marginRight: 20, flexDirection: 'row', height: 50, alignItems: 'center' }}>

                    <Image source={require('../../images/coach_small_pic.png')}
                        style={{
                            width: 36,
                            borderRadius: 6,
                            height: 36, marginRight: 10
                        }} />
                    <Text style={[defaultStyle.regular_text_14]}>{item.name}</Text>
                    <View style={{ fontFamily: 'Quicksand-Medium', backgroundColor: '#CDB473', borderRadius: 10, marginRight: 0, marginLeft: 6, alignItems: 'center', justifyContent: 'center' }}>
                        {item.is_head ? <Text style={{ fontFamily: 'Quicksand-Medium', fontSize: 10, color: 'white', marginRight: 6, marginLeft: 6, textAlign: 'center' }}>Head Coach</Text> : null}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../images/ic_star.png')}
                        style={{
                            width: 14,
                            height: 14, marginRight: 6
                        }} />
                    <View style={{
                        borderColor: '#DFDFDF',
                        marginTop: 2, marginBottom: 2,
                        borderWidth: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: '#707070',
                                fontFamily: 'Quicksand-Bold',
                                marginRight: 10,
                                marginLeft: 10,

                            }}>{item.ratings}</Text>

                    </View>
                    <Image source={require('../../images/right_icon.png')}
                        style={{
                            width: 6,
                            height: 13,
                            marginLeft: 10
                        }} />
                </View>

            </View>

        </TouchableOpacity>

    );

    sessionMangement(operations) {

        sessionArray = [];
        // for (let i = 0; i < operations.next_sessions.length; i++)
        // {
        const { routine_name, session_date, is_canceled, end_time, start_time } = operations
        console.log("is_canceled", { is_canceled })
        if (is_canceled == true) {
            sessionArray.push(
                <View style={{
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
                        <Text style={[defaultStyle.regular_text_14, {
                            textDecorationLine: 'line-through'
                        }]}>
                            {moment.utc(session_date).local().format("ddd, DD MMM YYYY")}
                        </Text>
                        <Text style={[defaultStyle.regular_text_14, {
                            textDecorationLine: 'line-through',
                            marginLeft: 10,
                        }]}>
                            {moment.utc(session_date + " " + start_time).local().format("hh:mm a")
                                + " - " +
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
                    }]}>
                        {routine_name}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={defaultStyle.regular_text_14}>{moment.utc(session_date).local().format("ddd, DD MMM YYYY")}
                        </Text>
                        <Text style={[defaultStyle.regular_text_14, { marginLeft: 10 }]}>
                            {moment.utc(session_date + " " + start_time).local().format("hh:mm a")
                                + " - " +
                                moment.utc(session_date + " " + end_time).local().format("hh:mm a")}
                        </Text>

                    </View>

                </View>
            );
        }
        // }
    }
    render() {

        const { session, attendance, operations } = this.props.jumpTo
        // const {routine_name, batch_name, batch_category,batch_id} = this.state.coach_profile.attandence_batch[0]
        // const {is_canceled, end_time,session_date, start_time} = this.state.coach_profile.attandence_batch[0].session



        this.sessionMangement(session)
        // this.scoreMangement(tournaments)

        return <View style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
            <ScrollView style={{ flex: 1, marginTop: 0, backgroundColor: '#F7F7F7' }}>
                {/*// <View style={{margin: 10}}>*/}
                <CustomeCard >
                    <View
                        style={{
                            marginLeft: 12,
                            marginRight: 12,
                            marginTop: 16
                        }}
                    >
                        <Text style={defaultStyle.bold_text_10}>Next Session:</Text>


                        <View style={defaultStyle.line_style} />
                        {sessionArray}
                    </View>
                </CustomeCard>
                {/*</View>*/}

                <CustomeCard onPress={() => { this.props.navigation.navigate('PlayerAttendance') }}>
                    <View
                        style={{
                            marginLeft: 12,
                            marginRight: 12,
                            marginTop: 16
                        }}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={defaultStyle.bold_text_10}>Attendance Summary</Text>
                            <Text style={[defaultStyle.regular_text_12, { color: '#667DDB' }]} onPress={() => { this.props.navigation.navigate('PlayerAttendance') }}>View Details </Text>
                        </View>

                        <View style={defaultStyle.line_style} />

                        <View style={{ flexDirection: 'row', felx: 1, marginTop: 10, marginBottom: 10 }}>
                            <View >
                                <Text style={[defaultStyle.regular_text_10, {
                                    marginBottom: 5
                                }]}>Overall</Text>
                                <Text style={defaultStyle.regular_text_14}>{attendance.overall_attendance + '%'}</Text>
                            </View>
                            <View style={{ width: 1, felx: 1, backgroundColor: '#DFDFDF', marginLeft: 10, marginRight: 10 }} />
                            <View>
                                <Text style={[defaultStyle.regular_text_10, {
                                    marginBottom: 5
                                }]}>This Month</Text>
                                <Text style={defaultStyle.regular_text_14}>{attendance.attendance + '%'}</Text>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={[defaultStyle.regular_text_10, {
                                    marginBottom: 5
                                }]}>Sessions attended</Text>

                                <Text style={defaultStyle.regular_text_14}>{attendance.session_attended + ' of' + attendance.total_session + '(' + attendance.month + ')'}</Text>
                            </View>

                        </View>
                    </View>
                </CustomeCard>

                <CustomeCard >
                    <View
                        style={{
                            marginLeft: 12,
                            marginRight: 12,
                            marginTop: 16
                        }}
                    >
                        <Text style={defaultStyle.bold_text_10}>Timing</Text>

                        <View style={defaultStyle.line_style} />

                        <View style={{ flexDirection: 'row', felx: 1, marginTop: 10, marginBottom: 10 }}>
                            <View style={{ width: '60%' }}>
                                <Text style={[defaultStyle.regular_text_10, {
                                    marginBottom: 5
                                }]}>Weekdays</Text>
                                <Text style={[defaultStyle.regular_text_14, { marginBottom: 5 }]}>{operations.weekday.days.join(' ')}</Text>
                                <Text style={defaultStyle.regular_text_14}>
                                    {moment.utc("01/01/1970 " + operations.weekday.start_time).local().format("hh:mm a")
                                        + ' - ' +
                                        moment.utc("01/01/1970 " + operations.weekday.end_time).local().format("hh:mm a")
                                    }</Text>
                            </View>
                            {operations.weekend ?

                                <View style={{ width: '40%' }}>
                                    <Text style={[defaultStyle.regular_text_10, {
                                        marginBottom: 5
                                    }]}>Weekends</Text>
                                    <Text style={[defaultStyle.regular_text_14, { marginBottom: 5 }]}>{operations.weekend.days.join(' ')}</Text>
                                    <Text style={defaultStyle.regular_text_14}>

                                        {moment.utc("01/01/1970 " + operations.weekend.start_time).local().format("hh:mm a")
                                            + ' - ' +
                                            moment.utc("01/01/1970 " + operations.weekend.end_time).local().format("hh:mm a")
                                        }</Text>
                                </View> : null
                            }
                        </View>
                    </View>
                </CustomeCard>

                {this.state.coactList.length > 0 ?
                    <CustomeCard>
                        <View
                            style={{
                                marginLeft: 12,
                                marginRight: 12,
                                marginTop: 16
                            }}
                        >
                            <Text style={defaultStyle.bold_text_10}>Coach</Text>

                            <View style={defaultStyle.line_style} />

                            <FlatList
                                data={this.state.coactList}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => item.id}
                            />
                        </View>
                    </CustomeCard> : null}

                <View style={{ margin: 5 }}>
                    <CustomeCard>
                        <TouchableOpacity onPress={() => {

                            console.warn("Touch Press")
                            this.props.navigation.navigate('PlayersListing', { batch_id: this.props.jumpTo.batch_id, List_type: 'BATCH' })

                        }}>
                            <View style={{ marginLeft: 10, marginTop: 8, marginBottom: 8, flexDirection: 'row', height: 40 }}>

                                <View style={{ flex: 1 }}>

                                    <View style={{
                                        marginTop: 10,
                                        flex: 1,
                                        marginRight: 15,
                                        marginBottom: 5,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Text
                                            style={defaultStyle.regular_text_14}>
                                            View Batchmates
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
                    </CustomeCard>
                </View>

            </ScrollView>
        </View>

    }
}

export default PlayerBatchComponent;

const styles = StyleSheet.create({
    labelText: {
        marginBottom: 5,
        color: '#A3A5AE',
        fontSize: 10,

        // backgroundColor: 'blue',
    },
}
);