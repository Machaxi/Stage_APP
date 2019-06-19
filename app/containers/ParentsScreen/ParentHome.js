import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import {View,ImageBackground,Text,StyleSheet,Image,TouchableOpacity,Dimensions,FlatList,ScrollView,ActivityIndicator} from 'react-native';
import {CustomeCard} from '../../components/Home/Card'
import {SwitchButton ,CustomeButtonB} from  '../../components/Home/SwitchButton'
import {Card} from 'react-native-paper'
import {getData, storeData} from "../../components/auth";
import {getCoachSWitcher, getPlayerSWitcher} from "../../redux/reducers/switchReducer";
import {getPlayerDashboard} from "../../redux/reducers/dashboardReducer";
import { connect } from 'react-redux';
import moment from 'moment';

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

class  ParentHome extends React.Component {

    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {

            userData:null,
            country: undefined,
            player_profile:null,
            strenthList : null
        }
    }

    componentDidMount(){
        var userData;
        getData('header',(value)=>{
            console.log("header",value);
        });

        console.log("PARENTDashboard");
        getData('userInfo',(value) => {
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user",userData.user['user_type'])
            if(userData.user['user_type'] =='PLAYER'){
                this.getPlayerDashboardData(userData['academy_id'],userData['player_id'])

            }else if(userData.user['user_type']=='FAMILY'){
                this.getPlayerDashboardData(userData['academy_id'],userData['player_id'])

            }


        });
    }




    getPlayerDashboardData(academy_id,player_id,){
        getData('header',(value)=>{
            console.log("header",value,academy_id,player_id);
            this.props.getPlayerDashboard(value,player_id,academy_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.dashboardData);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if(user1.success == true){
                    this.setState({
                        player_profile:user1.data['player_profile'],
                        strenthList:user1.data.player_profile['stats']

                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }

    renderItem = ({ item }) => (
        <TouchableOpacity key={item} onPress={() => {

            console.warn("Touch Press")

            // this.props.navigation.navigate('OrderTracking', {
            //     order_id: item.increment_id
            // })

        }}>
            <View style={{margin:10,flexDirection:'row',height:60}}>

                <Image source={require('../../images/Mysatus.png')}
                       style={{
                           width: 50,
                           height: 50,marginRight:20}}/>
                <View>

                    <View  style={{
                        marginLeft: 8,
                        marginRight: 15,
                        marginBottom:5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text>
                            {item.name}
                        </Text>
                        <Text>
                            {item.score}
                        </Text>
                    </View>
                    <Progress.Bar style={{backgroundColor:'#E1E1E1',color:'#305F82',borderRadius:11,borderWidth:0}} progress={item.score / 100 } width={deviceWidth -130} height = {14} />
                </View>
                <View style={{height:50,width:30,alignItems:'center',marginTop:20,marginBottom:20,marginRight:10,marginLeft:10}}>
                    <Image source ={require('../../images/forward.png')}
                           style={{
                               width: 3,
                               height: 8,marginRight:10}}/>
                </View>

            </View>
        </TouchableOpacity>

    );






    render() {
        if (this.props.data.loading && !this.state.player_profile) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#67BAF5"/>
                </View>
            )
        }
        if (this.state.player_profile) {
            const {name,academy_name,badge,rank,score,player_level,reward_point,player_category,is_reward_point_due,
                is_payment_due,reward_detail,payment_detail,operations } = this.state.player_profile

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

                    <View style={{width: '100%', height: 335,}}>
                        <ImageBackground
                            source={require('../../images/RectangleImg.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}>

                            <View style={styles.navBar}>
                                <View style={styles.leftContainer}>
                                    {/*<Text style={[styles.text, {textAlign: 'left'}]}>*/}
                                    {/*{'<'}*/}
                                    {/*</Text>*/}
                                </View>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('SwitchPlayer')


                                }}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{color:'white',fontSize:14,marginRight:5}}>{academy_name}</Text>
                                        <Image source={require('../../images/dropdown.png')}
                                               style={{
                                                   width: 8,
                                                   height: 6, marginRight: 20
                                               }}>
                                        </Image>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.rightContainer}>

                                    <TouchableOpacity style={styles.rightIcon}>
                                        <Image source={require('../../images/bellicon.png')}
                                               style={{
                                                   width: 25,
                                                   height: 25, marginRight: 20
                                               }}>

                                        </Image>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={{position: 'relative'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require('../../images/playerimg.png')}
                                           style={{
                                               width: 201,
                                               height: 238, marginRight: 20, marginTop: 0, display: 'flex'
                                           }}>

                                    </Image>
                                    <View style={{display: 'flex', flex: 1, marginBottom: 100}}>
                                        <Text style={{
                                            color: 'white',
                                            marginRight: 0,
                                            textAlign: 'center', fontSize: 22, fontWeight: 'bold'
                                        }}>{name}</Text>
                                        <Image source={require('../../images/Rank.png')}
                                               style={{
                                                   width: 119,
                                                   height: 84,
                                                   alignItems: 'center',
                                                   display: 'flex',
                                                   marginBottom: 20,
                                                   marginTop: 20
                                               }}>

                                        </Image>
                                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                                            <Text style={{
                                                color: 'white',
                                                marginRight: 10,
                                                textAlign: 'center',
                                                fontSize: 12,
                                                fontWeight: 'bold'
                                            }}>{player_level}</Text>
                                            <View
                                                style={{
                                                    backgroundColor: 'red',
                                                    width: 60,
                                                    marginRight: 20,
                                                    marginTop: -5
                                                }}>
                                                <Text style={{
                                                    color: 'white',
                                                    marginRight: 0,
                                                    textAlign: 'center',
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
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

                                            <Text style={{margin: 15, color: 'white'}}>Rank</Text>
                                            {rank ? <Text style={styles.scoreBox}>{rank}</Text> : <Text style={styles.scoreBox}>00</Text>}


                                        </ImageBackground>

                                    </View>
                                    <ImageBackground source={require('../../images/box.png')}
                                                     style={{
                                                         width: deviceWidth / 3,
                                                         height: 80,
                                                     }}>
                                        <Text style={{margin: 15, color: 'white'}}>Score</Text>
                                        {score ?<Text style={styles.scoreBox}>{score}</Text>:<Text style={styles.scoreBox}>00</Text>}

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

                                            <Text style={{margin: 15, color: 'white'}}>Reward</Text>
                                            {reward_point ?<Text style={styles.scoreBox}>{reward_point}</Text>:<Text style={styles.scoreBox}>00</Text>}


                                        </ImageBackground>

                                    </View>


                                </View>


                            </View>
                        </ImageBackground>

                    </View>
                    <View style={{margin: 10, marginTop: 20}}>

                        <SwitchButton onPress={() => this.props.navigation.navigate('SwitchPlayer', {
                            userType: 'coach'
                        })}>
                            Switch Player
                        </SwitchButton>
                    </View>
                    <View style={{margin: 10}}>
                        <CustomeCard >
                            <View style={{margin: 10}}>
                                <Text>Next Session:</Text>
                            </View>

                            <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>
                            {sessionArray}

                        </CustomeCard>
                    </View>
                    {is_payment_due ?  <CustomeCard>
                        <View style={{margin: 10, marginTop: 20, flexDirection: 'row',justifyContent:'space-between'}}>
                            <View style={{flexDirection: 'row'}}>
                            <Text>Payment</Text>
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
                            <Text style={{color:'#667DDB',marginRight:10,fontSize:14}}>View Details</Text>
                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                        <View style={{flexDirection: 'row', margin: 10, marginBottom: 20}}>
                            <Text style={{marginRight: 20, fontSize: 14}}>{name}</Text>

                        </View>
                        <View style={{flexDirection:'row'}}>

                            <View style={{width:'50%',margin:10}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text>Due Date</Text>
                                <Text>Amount</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                                <Text style={{marginRight:0}}>{moment(Date(payment_detail.due_date)).format('DD-MMM-YYYY')}</Text>
                                <Text>{payment_detail.amount}</Text>
                            </View>
                            </View>
                            <View style={{width:'40%'}}>
                                <CustomeButtonB onPress={() => console.log("title")}>
                                    Pay </CustomeButtonB>
                            </View>
                        </View>

                    </CustomeCard>:null}

                    {is_reward_point_due ?  <CustomeCard>
                        <View style={{margin: 10, marginTop: 20, flexDirection: 'row',justifyContent:'space-between'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text>Reward Points</Text>
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
                            <Text style={{color:'#667DDB',marginRight:10,fontSize:14}}>View Details</Text>
                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                        <View style={{flexDirection: 'row', margin: 10, marginBottom: 20}}>
                            <Text style={{marginRight: 20, fontSize: 14}}>{name}</Text>

                        </View>
                        <View style={{flexDirection:'row'}}>

                            <View style={{width:'50%',margin:10}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text>Month</Text>
                                    <Text>Available</Text>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                                    <Text style={{marginRight:0}}>{reward_detail.month}</Text>
                                    <Text>{reward_detail.points + 'pts'}</Text>
                                </View>
                            </View>
                            <View style={{width:'40%'}}>
                                <CustomeButtonB onPress={() => console.log("title")}>
                                    Reward </CustomeButtonB>
                            </View>
                        </View>

                    </CustomeCard>:null}



                    <View style={{margin:10}}>
                        <CustomeCard>
                            <Text style={{fontSize: 14, margin: 10}}>My Stats </Text>
                            <FlatList
                                data={this.state.strenthList}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => item.id}
                            />
                        </CustomeCard>
                    </View>
                    <View style={{margin: 5}}>
                        <CustomeCard>
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
                        </CustomeCard>
                    </View>
                    <View style={{margin: 5}}>
                        <CustomeCard>
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
                        </CustomeCard>
                    </View>
                    <View style={{margin: 5}}>
                        <CustomeCard>
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
                        </CustomeCard>
                    </View>
                    <View style={{margin: 5}}>
                        <CustomeCard>
                            <View style={{margin: 10}}>
                                <Text style={{marginTop:10}}>Academy Feedback</Text>
                            </View>
                            <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>
                            <View style={{margin: 10}}>
                                <View style={{flexDirection: 'row',margin:10}}>
                                    <Text>Feather Academy</Text>
                                    <Text>Feather Academy</Text>
                                </View>
                                <View>

                                    <View style={{margin: 10}}>
                                        <Text style={{
                                            marginTop: 5

                                        }}>Top rating</Text>
                                        <Text style={{
                                            marginTop: 5

                                        }}> Manish A.</Text>
                                        <Text style={{
                                            marginTop: 5

                                        }}>Vestibulum rutrum quam vitae fringilla tincidunt.
                                            Suspendisse nec tortor urna.
                                            Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae.
                                            Donec …….</Text>

                                    </View>
                                    <TouchableOpacity style={styles.buttomButton} onPress={() => {
                                        // this.setState({
                                        //     isShowAddress: true
                                        // })


                                        //this.props.navigation.navigate('RegisterScreen')
                                    }}>
                                        <Text
                                            style={{textAlign: 'center', flex: 1}}>

                                            View Academy
                                        </Text>

                                    </TouchableOpacity>
                                </View>


                            </View>
                        </CustomeCard>
                    </View>
                    <View style={{margin: 5}}>
                        <CustomeCard >
                            <View style={{margin: 10}}>
                                <Text style={{marginTop:10}}>Coach Feedback</Text>
                            </View>
                            <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>
                            <View style={{margin: 10}}>
                                <View style={{flexDirection: 'row',margin:10}}>
                                    <Text>Suman Kumar</Text>
                                    <Text>Feather Academy</Text>
                                </View>
                                <View>

                                    <View style={{margin: 10}}>
                                        <Text style={{
                                            marginTop: 5

                                        }}>Top rating</Text>
                                        <Text style={{
                                            marginTop: 5

                                        }}> Manish A.</Text>
                                        <Text style={{
                                            marginTop: 5

                                        }}>Vestibulum rutrum quam vitae fringilla tincidunt.
                                            Suspendisse nec tortor urna.
                                            Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae.
                                            Donec …….</Text>

                                    </View>
                                    <TouchableOpacity style={styles.buttomButton} onPress={() => {
                                        // this.setState({
                                        //     isShowAddress: true
                                        // })


                                        // this.props.navigation.navigate('SwitchPlayer', {
                                        //     userType: 'player'
                                        // })
                                    }}>
                                        <Text
                                            style={{textAlign: 'center', flex: 1}}>

                                            View Coach
                                        </Text>

                                    </TouchableOpacity>
                                </View>


                            </View>
                        </CustomeCard>
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
    getPlayerDashboard,
};
export default connect(mapStateToProps, mapDispatchToProps)(ParentHome);


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