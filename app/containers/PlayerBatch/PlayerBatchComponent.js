import React from 'react'

import {View,ScrollView,Text} from 'react-native'
import {CustomeCard} from '../../components/Home/Card'

class  PlayerBatchComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            batchdata :null
        }

    }

    componentDidMount(){

        console.warn('hjhc',this.props.jumpTo)

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
    }

    sessionMangement(operations)
    {

        sessionArray = [];
        // for (let i = 0; i < operations.next_sessions.length; i++)
        // {
            const {routine_name,session_date,is_canceled,end_time,start_time } =operations
            console.log("is_canceled",{is_canceled})
            if( is_canceled == true ){
                sessionArray.push(
                    <View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{
                                margin: 10, textDecorationLine: 'line-through'
                            }}>{routine_name}</Text>
                            <View style={{backgroundColor:'#FF7373',margin:0,borderRadius:10}}>
                                <Text style={{
                                    margin: 10,color:'white'
                                }}>Canceled</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={{
                                marginRight: 20,
                                fontSize: 14,
                                textDecorationLine: 'line-through'
                            }}>{session_date}</Text>
                            <Text style={{
                                marginRight: 20,
                                fontSize: 14,
                                textDecorationLine: 'line-through'
                            }}>{start_time + "  -   " + end_time}</Text>

                        </View>

                    </View>
                );
            }else{
                sessionArray.push(
                    <View>

                        <Text style={{
                            margin: 10,
                        }}>{routine_name}</Text>
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={{
                                marginRight: 20,
                                fontSize: 14,

                            }}>{session_date}</Text>
                            <Text style={{
                                marginRight: 20,
                                fontSize: 14,

                            }}>{start_time + "  -   " + end_time}</Text>

                        </View>

                    </View>
                );
            }
       // }
    }
    render() {

            const {  session} = this.props.jumpTo
            // const {routine_name, batch_name, batch_category,batch_id} = this.state.coach_profile.attandence_batch[0]
            // const {is_canceled, end_time,session_date, start_time} = this.state.coach_profile.attandence_batch[0].session



             this.sessionMangement(session)
            // this.scoreMangement(tournaments)

            return <View style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
                <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
                <View style={{margin: 10}}>
                    <CustomeCard >
                        <View style={{margin: 10}}>
                            <Text>Next Session:</Text>
                        </View>

                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>
                        {sessionArray}

                    </CustomeCard>
                </View>
                </ScrollView>
            </View>

    }
}

export default  PlayerBatchComponent;