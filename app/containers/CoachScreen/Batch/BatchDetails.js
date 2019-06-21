
import React from 'react'


import {View,ImageBackground,Text,StyleSheet,Image,TouchableOpacity,Dimensions,ActivityIndicator,FlatList,ScrollView} from 'react-native';
import {Card} from 'react-native-paper'

import {CustomeCard } from  '../../../components/Home/Card'
import {getCoachDashboard} from "../../../redux/reducers/dashboardReducer";
import {getData} from "../../../components/auth";
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

class  BatchDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            batchList :[{batch_name:'XYZ',id:1 },
                {batch_name:'XYZ',id:2},
                {batch_name:'XYZ',id:3},
                {batch_name:'XYZ',id:4},
                {batch_name:'XYZ',id:5},
               ],
            userData:null

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
              //  this.getCoachBatchList(userData['academy_id'],userData['coach_id'])

            }


        });
    }

    getCoachBatchList(academy_id,player_id,){
        getData('header',(value)=>{
            console.log("header",value,academy_id,player_id);
            this.props.getCoachBatchList(value,player_id,academy_id).then(() => {
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

    sessionMangement(operations)
    {

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
    }
    render() {
        if (this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#67BAF5"/>
                </View>
            )
        }
       // if (this.state.coach_profile) {

       // const {is_attandence_due, is_performance_due, is_reward_point_due, is_scorer,operations,tournaments,attandence_batch} = this.state.coach_profile


            return <View style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
                <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
                    <View style={{margin: 10, marginTop: 20}}>


                    <CustomeCard>
                        <View
                            style={{margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Next Session:</Text>

                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>
                        {/*{sessionArray}*/}

                    </CustomeCard>

                    </View>

                    <CustomeCard>
                        <View
                            style={{margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Time</Text>

                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>
                        {/*{sessionArray}*/}
                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                            <View  style={{width:'50%'}}>
                                <Text style={{fontSize:10,color:'#A3A5AE',marginBottom:10}}>Weekdays</Text>
                                <Text style={{fontSize:14,marginBottom:10}}>08:30 AM  -  10:30 AM</Text>
                            </View>
                            <View style={{width:'50%'}}>
                                <Text style={{fontSize:10,color:'#A3A5AE',marginBottom:10}}>Weekend</Text>
                                <Text style={{fontSize:14,marginBottom:10}}>08:30 PM  -  10:30 PM</Text>
                            </View>

                        </View>
                        <View style={{margin:10}}>
                            <Text style={{fontSize:10,color:'#A3A5AE',marginBottom:10}}>Operational days</Text>
                            <Text style={{fontSize:14,marginBottom:10}}>MON TUE WED THUS</Text>
                        </View>

                    </CustomeCard>
                    <CustomeCard>
                        <View
                            style={{margin: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Coach</Text>

                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                            <View style={{marginRight:20,flexDirection:'row',height:50}}>

                                <Image source={require('../../../images/Mysatus.png')}
                                       style={{
                                           width: 50,
                                           height: 50,marginRight:10}}/>
                                <Text style={{fontSize:14,marginBottom:10,marginTop:10}}>Niranjan</Text>
                                <View style={{backgroundColor:'#CDB473',borderRadius:10,marginBottom:20,marginTop:5,marginRight:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize:10,color:'white',marginRight:10,marginLeft:10,textAlign:'center'}}>Head Coach</Text>

                                </View>
                            </View>
                            <View style={{borderColor:'#DFDFDF',borderWidth:1,borderRadius:20,marginBottom:20,marginTop:5,marginRight:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:14,color:'#A3A5AE',marginBottom:0,marginRight:10,marginLeft:10}}>4.5</Text>

                            </View>

                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                            <View style={{marginRight:20,flexDirection:'row',height:50}}>

                                <Image source={require('../../../images/Mysatus.png')}
                                       style={{
                                           width: 50,
                                           height: 50,marginRight:10}}/>
                                <Text style={{fontSize:14,marginBottom:10,marginTop:10}}>Niranjan</Text>
                                <View style={{backgroundColor:'#CDB473',borderRadius:10,marginBottom:20,marginTop:5,marginRight:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{fontSize:10,color:'white',marginRight:10,marginLeft:10,textAlign:'center'}}>Head Coach</Text>

                                </View>
                            </View>
                            <View style={{borderColor:'#DFDFDF',borderWidth:1,borderRadius:20,marginBottom:20,marginTop:5,marginRight:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:14,color:'#A3A5AE',marginBottom:0,marginRight:10,marginLeft:10}}>4.5</Text>

                            </View>

                        </View>


                    </CustomeCard>

                </ScrollView>
            </View>;
        // }else{
        //     return (
        //         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //
        //         </View>
        //     )
      //  }
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
export default connect(mapStateToProps, mapDispatchToProps)(BatchDetails);


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