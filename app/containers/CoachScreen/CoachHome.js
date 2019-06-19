
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import {View,ImageBackground,Text,StyleSheet,Image,TouchableOpacity,Dimensions,ActivityIndicator,FlatList,ScrollView} from 'react-native';
import {Card} from 'react-native-paper'
import {SwitchButton ,CustomeButtonB} from  '../../components/Home/SwitchButton'
import {CustomeCard } from  '../../components/Home/Card'
import {getCoachDashboard} from "../../redux/reducers/dashboardReducer";
import {getData} from "../../components/auth";
import { connect } from 'react-redux';
const acedemicList = [
    {
        label: 'India',
        value: 'IN',
    }

];

const placeholder = {
    label: 'Select Option',
    value: null,
    color: '#9EA0A4',
};
var deviceWidth = Dimensions.get('window').width -20;

class  CoachHome extends React.Component {

    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {

            coach_profile:null,
            country: undefined,
            strenthList : null
        }
    }

    componentDidMount(){
        var userData;
        getData('header',(value)=>{
            console.log("header",value);
        });

        console.log("CoachDashboard");
        getData('userInfo',(value) => {
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user",userData.user['user_type'])
            if(userData.user['user_type'] =='COACH'){
                this.getCoachDashboardData(userData['academy_id'],userData['coach_id'])

            }


        });
    }

    getCoachDashboardData(academy_id,player_id,){
        getData('header',(value)=>{
            console.log("header",value,academy_id,player_id);
            this.props.getCoachDashboard(value,player_id,academy_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.dashboardData);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if(user1.success == true){
                    this.setState({
                        coach_profile:user1.data['coach_profile'],
                       // strenthList:user1.data.player_profile['stats']

                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }
    render() {
        if (this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#67BAF5"/>
                </View>
            )
        }
        if (this.state.coach_profile) {
            const {is_attandence_due, is_performance_due, is_reward_point_due, is_scorer,operations,tournaments,attandence_batch} = this.state.coach_profile
            const {routine_name, batch_name, batch_category,batch_id} = this.state.coach_profile.attandence_batch[0]
            const {is_canceled, end_time,session_date, start_time} = this.state.coach_profile.attandence_batch[0].session

            attendenceArray = [];
            for (let i = 0; i < attandence_batch.length; i++)
            {
                const {routine_name, batch_name, batch_category,batch_id,session} = this.state.coach_profile.attandence_batch[i]
                const {is_canceled, end_time,session_date, start_time} = session

                attendenceArray.push(
                    <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{
                margin: 10, fontSize: 14, fontWeight: 'bold'
            }}>{batch_name +' : ' + routine_name}</Text>
            <Text style={{
                margin: 10, marginRight: 20, fontSize: 14, fontWeight: 'bold'
            }}>{batch_category}</Text>
            </View>

                        { is_canceled ?  <View style={{flexDirection: 'row', margin: 10, marginBottom: 20}}>
                    <Text style={{marginRight: 20, fontSize: 14,textDecorationLine: 'line-through'}}>{session_date}</Text>
                    <Text style={{fontSize: 14,textDecorationLine: 'line-through'}}>{start_time + "  -   " + end_time}</Text>
                </View> : <View style={{flexDirection: 'row', margin: 10, marginBottom: 20}}>
                            <Text style={{marginRight: 20, fontSize: 14}}>{session_date}</Text>
                            <Text style={{fontSize: 14}}>{start_time + "  -   " + end_time}</Text>
                        </View> }


                    </View>
            );
            }

            sessionArray = [];
            for (let i = 0; i < operations.next_sessions.length; i++)
            {
                const {routine_name,session_date,is_canceled,end_time,start_time } = operations.next_sessions[i]
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
            }
            return <View style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
                <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
                    <View style={{margin: 10, marginTop: 20}}>

                        <SwitchButton onPress={() => this.props.navigation.navigate('SwitchPlayer', {
                            userType: 'coach'
                        })}>
                            Switch Acedemi
                        </SwitchButton>
                    </View>
                    <CustomeCard>
                        <View style={{margin: 10, marginTop: 20,flexDirection:'row'}}>
                            <Text>Attendance</Text>
                            {is_attandence_due ? <View
                                style={{backgroundColor: '#FF7373', marginRight: 10, marginLeft: 10, borderRadius: 5}}>
                                <Text style={{
                                    margin: 5,
                                    fontSize: 10,
                                    color: 'white',
                                    marginRight: 10,
                                    marginLeft: 10,
                                }}>Due</Text>
                            </View> :null}
                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                        {attendenceArray}
                        <CustomeButtonB onPress={() => console.log("title")}>
                            Mark Attendance</CustomeButtonB>
                    </CustomeCard>


                    <CustomeCard>
                        <View
                            style={{margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Next Session:</Text>
                            <Text style={{color: '#667DDB'}}>{'Attendance  - '+ operations.attendance.attendance + '% (' + operations.attendance.month + ')'}</Text>
                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>
                        {sessionArray}

                    </CustomeCard>


                    {is_performance_due ? <CustomeCard>
                        <View style={{margin: 10, marginTop: 20, flexDirection: 'row'}}>
                            <Text>Update Player Performance</Text>
                            <View
                                style={{backgroundColor: '#FF7373', marginRight: 10, marginLeft: 10, borderRadius: 5}}>
                                <Text style={{
                                    margin: 5,
                                    fontSize: 10,
                                    color: 'white',
                                    marginRight: 10,
                                    marginLeft: 10,
                                }}>Due</Text>
                            </View>
                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                        <View style={{flexDirection: 'row', margin: 10, marginBottom: 20}}>
                            <Text style={{marginRight: 20, fontSize: 14}}>You are yet to update performance of
                                players.</Text>

                        </View>
                        <CustomeButtonB onPress={() => console.log("title")}>
                            Mark Attendance</CustomeButtonB>
                    </CustomeCard>:null}


                    {is_scorer ? <CustomeCard>
                        <View
                            style={{margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Scorer</Text>
                            {/*<Text style={{color:'#667DDB'}}>Attendance - 80% (Jul)</Text>*/}
                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                        <Text style={{
                            margin: 10, fontSize: 14, fontWeight: 'bold'
                        }}>{tournaments[0].name}</Text>
                        <View style={{flexDirection: 'row', margin: 10, marginBottom: 20}}>
                            <Text style={{marginRight: 20, fontSize: 14}}>{tournaments[0].start_date + ' - ' + tournaments[0].end_date}</Text>
                            <Text style={{marginRight: 20, fontSize: 14,}}>{tournaments[0].start_time + ' - ' + tournaments[0].end_time}</Text>
                        </View>
                        <CustomeButtonB onPress={() => console.log("title")}>
                            View Fixtures</CustomeButtonB>
                    </CustomeCard>:null}

                    {is_reward_point_due ?  <CustomeCard>
                        <View style={{margin: 10, marginTop: 20, flexDirection: 'row'}}>
                            <Text>Reward Point</Text>
                            <View
                                style={{backgroundColor: '#FF7373', marginRight: 10, marginLeft: 10, borderRadius: 5}}>
                                <Text style={{
                                    margin: 5,
                                    fontSize: 10,
                                    color: 'white',
                                    marginRight: 10,
                                    marginLeft: 10,
                                }}>Due</Text>
                            </View>
                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                        <View style={{flexDirection: 'row', margin: 10, marginBottom: 20}}>
                            <Text style={{marginRight: 20, fontSize: 14}}>You are yet to Reward the players .</Text>

                        </View>
                        <CustomeButtonB onPress={() => console.log("title")}>
                            Reward Players</CustomeButtonB>
                    </CustomeCard>:null}

                    <View style={{margin: 5}}>
                        <Card style={{margin: 5, borderRadius: 10}}>
                            <TouchableOpacity onPress={() => {

                                console.warn("Touch Press")


                            }}>
                                <View style={{margin: 10, flexDirection: 'row', height: 40}}>

                                    <Image source={require('../../images/booking.png')}
                                           style={{
                                               width: 30,
                                               height: 30, marginRight: 20, marginTop: 5
                                           }}/>
                                    <View style={{flex: 1}}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={{fontSize: 14}}>
                                                Book and Play
                                            </Text>

                                            <Image source={require('../../images/forwardArrow.png')}
                                                   style={{
                                                       width: 19,
                                                       height: 13, marginRight: 0, marginTop: 5
                                                   }}/>

                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        </Card>
                    </View>
                    <View style={{margin: 5}}>
                        <Card style={{margin: 5, borderRadius: 10}}>
                            <TouchableOpacity onPress={() => {

                                console.warn("Touch Press")


                            }}>
                                <View style={{margin: 10, flexDirection: 'row', height: 40}}>

                                    <Image source={require('../../images/booking.png')}
                                           style={{
                                               width: 30,
                                               height: 30, marginRight: 20, marginTop: 5
                                           }}/>
                                    <View style={{flex: 1}}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={{fontSize: 14}}>
                                                View other Players Progress
                                            </Text>

                                            <Image source={require('../../images/forwardArrow.png')}
                                                   style={{
                                                       width: 19,
                                                       height: 13, marginRight: 0, marginTop: 5
                                                   }}/>

                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        </Card>
                    </View>
                    <View style={{margin: 5}}>
                        <Card style={{margin: 5, borderRadius: 10}}>
                            <TouchableOpacity onPress={() => {

                                console.warn("Touch Press")


                            }}>
                                <View style={{margin: 10, flexDirection: 'row', height: 40}}>

                                    <Image source={require('../../images/booking.png')}
                                           style={{
                                               width: 30,
                                               height: 30, marginRight: 20, marginTop: 5
                                           }}/>
                                    <View style={{flex: 1}}>

                                        <View style={{
                                            marginTop: 10,
                                            flex: 1,
                                            marginRight: 15,
                                            marginBottom: 5,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <Text style={{fontSize: 14}}>
                                                Browse other Academies
                                            </Text>

                                            <Image source={require('../../images/forwardArrow.png')}
                                                   style={{
                                                       width: 19,
                                                       height: 13, marginRight: 0, marginTop: 5
                                                   }}/>

                                        </View>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        </Card>
                    </View>


                </ScrollView>
            </View>;
        }else{
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

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
    getCoachDashboard
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
        alignSelf:'center',
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
        marginRight:20
        //backgroundColor: 'white',
    },

    scoreBox:{
        color:'white',
        marginRight:20,
        textAlign:'right',fontSize:24,fontWeight:'bold'
    },
    buttomButton:{
        flexDirection: 'row',
        alignItems: 'center',
        height:45,

        backgroundColor: 'white',
        marginTop:10,
        marginBottom:-5,
        marginLeft:-5,
        marginRight:-5,
        shadowColor:'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 1 },borderBottomRightRadius:10,borderBottomLeftRadius:10

    }


});