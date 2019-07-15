import React from 'react'

import { View, ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { CustomeCard } from '../../components/Home/Card'
import moment from 'moment'

class PlayerBatchComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            batchdata: null,
            coactList: null
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <View style={{ marginRight: 20, flexDirection: 'row', height: 50 }}>

                    <Image source={require('../../images/Mysatus.png')}
                        style={{
                            width: 50,
                            height: 50, marginRight: 10
                        }} />
                    <Text style={{ fontSize: 14, marginBottom: 10, marginTop: 10 }}>{item.name}</Text>
                    <View style={{ backgroundColor: '#CDB473', borderRadius: 10, marginBottom: 20, marginTop: 5, marginRight: 10, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                        {item.is_head ? <Text style={{ fontSize: 10, color: 'white', marginRight: 10, marginLeft: 10, textAlign: 'center' }}>Head Coach</Text> : null}

                    </View>
                </View>
                <View style={{ borderColor: '#DFDFDF', borderWidth: 1, borderRadius: 20, marginBottom: 20, marginTop: 5, marginRight: 10, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#A3A5AE', marginBottom: 0, marginRight: 10, marginLeft: 10 }}>{item.ratings}</Text>

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
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{
                            margin: 10, textDecorationLine: 'line-through'
                        }}>{routine_name}</Text>
                        <View style={{ backgroundColor: '#FF7373', margin: 0, borderRadius: 10 }}>
                            <Text style={{
                                margin: 10, color: 'white'
                            }}>Canceled</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Text style={{
                            marginRight: 20,
                            fontSize: 14,
                            textDecorationLine: 'line-through'
                        }}>
                            {moment.utc(session_date).local().format("dddd, DD MMM YYYY")}
                        </Text>
                        <Text style={{
                            marginRight: 20,
                            fontSize: 14,
                            textDecorationLine: 'line-through'
                        }}>
                            {moment.utc(session_date + " " + start_time).local().format("hh:mm a")
                                + "  -   " +
                                moment.utc(session_date + " " + end_time).local().format("hh:mm a")}
                        </Text>

                    </View>

                </View>
            );
        } else {
            sessionArray.push(
                <View>

                    <Text style={{
                        margin: 10,
                    }}>{routine_name}</Text>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Text style={{
                            marginRight: 20,
                            fontSize: 14,

                        }}>
                            {moment.utc(session_date).local().format("dddd, DD MMM YYYY")}
                        </Text>
                        <Text style={{
                            marginRight: 20,
                            fontSize: 14,

                        }}>
                            {moment.utc(session_date + " " + start_time).local().format("hh:mm a")
                                + "  -   " +
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
                    <View style={{ margin: 10 }}>
                        <Text>Next Session:</Text>
                    </View>

                    <View style={{ height: 1, backgroundColor: '#DFDFDF', margin: 10 }} />
                    {sessionArray}

                </CustomeCard>
                {/*</View>*/}

                <CustomeCard >
                    <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Attendance Summary</Text>
                        <Text style={{ color: '#667DDB' }}>View Details</Text>
                    </View>

                    <View style={{ height: 1, backgroundColor: '#DFDFDF', margin: 10 }} />
                    <View style={{ flexDirection: 'row', felx: 1, margin: 10 }}>
                        <View >
                            <Text style={styles.labelText}>Overall</Text>
                            <Text>{attendance.overall_attendance + '%'}</Text>
                        </View>
                        <View style={{ width: 1, felx: 1, backgroundColor: '#DFDFDF', marginLeft: 10, marginRight: 10 }} />
                        <View>
                            <Text style={styles.labelText}>This Month</Text>
                            <Text>{attendance.attendance + '%'}</Text>
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.labelText}>Sessions attended</Text>
                            <Text>{attendance.session_attended + ' of' + attendance.total_session + '(' + attendance.month + ')'}</Text>
                        </View>

                    </View>
                </CustomeCard>

                <CustomeCard >
                    <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Timing</Text>
                    </View>

                    <View style={{ height: 1, backgroundColor: '#DFDFDF', margin: 10 }} />
                    <View style={{ flexDirection: 'row', felx: 1, margin: 10 }}>
                        <View style={{ width: '60%' }}>
                            <Text style={styles.labelText}>Weekdays</Text>
                            <Text style={{ marginBottom: 5 }}>{operations.weekday.days.join(' ')}</Text>
                            <Text>
                                {moment.utc("01/01/1970 " + operations.weekday.start_time).local().format("hh:mm a")
                                    + ' - ' +
                                    moment.utc("01/01/1970 " + operations.weekday.end_time).local().format("hh:mm a")
                                }</Text>
                        </View>

                        <View style={{ width: '40%' }}>
                            <Text style={styles.labelText}>Weekends</Text>
                            <Text style={{ marginBottom: 5 }}>{operations.weekend.days.join(' ')}</Text>
                            <Text>

                                {moment.utc("01/01/1970 " + operations.weekend.start_time).local().format("hh:mm a")
                                    + ' - ' +
                                    moment.utc("01/01/1970 " + operations.weekend.end_time).local().format("hh:mm a")
                                }</Text>
                        </View>

                    </View>
                </CustomeCard>

                <CustomeCard>
                    <View
                        style={{ margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Coach</Text>

                    </View>
                    <View style={{ height: 1, backgroundColor: '#DFDFDF', margin: 10 }} />

                    <FlatList
                        data={this.state.coactList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => item.id}
                    />

                </CustomeCard>

                <View style={{ margin: 5 }}>
                    <CustomeCard>
                        <TouchableOpacity onPress={() => {

                            console.warn("Touch Press")
                            this.props.navigation.navigate('PlayersListing', { batch_id: this.props.jumpTo.batch_id, List_type: 'BATCH' })

                        }}>
                            <View style={{ margin: 10, flexDirection: 'row', height: 40 }}>

                                <View style={{ flex: 1 }}>

                                    <View style={{
                                        marginTop: 10,
                                        flex: 1,
                                        marginRight: 15,
                                        marginBottom: 5,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Text style={{ fontSize: 14 }}>
                                            View Batchmates
                                            </Text>

                                        <Image source={require('../../images/forwardArrow.png')}
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