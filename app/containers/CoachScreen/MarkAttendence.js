
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
import { CheckBox } from 'react-native-elements'
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

class  MarkAttendence extends React.Component {

    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {

          //  coach_profile:null,
            country: undefined,
            billingchecked:false,
            playerList : [{name:'Niranjan',id:1,isPresent:false},
                {name:'Niranjan',id:2,isPresent:false},
                {name:'AJay',id:3,isPresent:false},
                {name:'Ashish',id:4,isPresent:false},
                {name:'Lokesh',id:5,isPresent:false},
                {name:'Vijay',id:6,isPresent:false}]
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
              //  this.getCoachDashboardData(userData['academy_id'],userData['coach_id'])

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




    renderItem = ({ item }) => (
        <TouchableOpacity key={item} onPress={() => {

            console.warn("Touch Press")

            // this.props.navigation.navigate('OrderTracking', {
            //     order_id: item.increment_id
            // })

        }}>
            <View style={{marginLeft:0,marginRight:10,flex:1,flexDirection:'row',height:50}}>

                    <View  style={{
                        flex:1,
                        marginLeft: 8,
                        marginRight: 15,
                        marginBottom:5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text>
                            {item.name}
                        </Text>
<View style={{backgroundColor:'white',marginTop:-10}}>
                            <CheckBox style={{ height: 30,width: 30, alignItems: 'center', backgroundColor: 'red' }}
                                     // title='a'
                                      checked={item.isPresent}
                                      onPress={() => {
                                          let playerList = [...this.state.playerList];
                                          let index = playerList.findIndex(el => el.id === item.id);
                                          playerList[index] = {...playerList[index], isPresent: !item.isPresent};
                                          this.setState({ playerList });

                                        //   item.isPresent = !item.isPresent
                                        // this.setState({
                                        //     playerList:item
                                        // })

                                      console.log("he;eleleo",item.isPresent)
                                      }


                                      }
                            />
</View>

                    </View>


            </View>
        </TouchableOpacity>

    );

    render() {
        // if (this.props.data.loading && !this.state.player_profile) {
        //     return (
        //         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //             <ActivityIndicator size="large" color="#67BAF5"/>
        //         </View>
        //     )
        // }
        // if (this.state.coach_profile) {
        //     const {is_attandence_due, is_performance_due, is_reward_point_due, is_scorer,operations,tournaments,attandence_batch} = this.state.coach_profile
        //     const {routine_name, batch_name, batch_category,batch_id} = this.state.coach_profile.attandence_batch[0]
        //     const {is_canceled, end_time,session_date, start_time} = this.state.coach_profile.attandence_batch[0].session
        //
        //     this.attedenceMangement(attandence_batch)
        //
        //     this.sessionMangement(operations)
        //     this.scoreMangement(tournaments)

            return <View style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>


                    <View style={{backgroundColor:'white'}}>
                        <View style={{margin:20,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:14,fontWeight:'bold'}}>Batch 1 : Fitness </Text>
                        <Text style={{fontSize:14,fontWeight:'bold'}}>U-15 </Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',margin:20,marginTop:-10,}}>
                        <View style={{margin:5}}>
                            <Text style={{fontSize:10,marginBottom:10}}>Date </Text>
                            <Text style={{fontSize:14}}>Wensday 12 April’19 </Text>

                        </View>
                        <View style={{margin:5}}>
                            <Text style={{fontSize:10,marginBottom:10}}>Time slot </Text>
                            <Text style={{fontSize:14}}>09:30 PM - 10 :30 PM </Text>
                        </View>
                        </View>
                    </View>

                    <View style={{margin:20,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:14,marginBottom:10}}>Player </Text>
                        <Text style={{fontSize:14}}>Present </Text>
                    </View>

                <View style={{backgroundColor:'white',marginTop:-10}}>
                    <CustomeCard>

                        <FlatList
                            data={this.state.playerList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => item.id}
                        />
                    </CustomeCard>

                </View>

                    <View style={{flex:1, marginBottom: 30,marginRight:20,marginLeft:20,justifyContent:'flex-end'}}>

                           <CustomeButtonB>
                              Update
                           </CustomeButtonB>


                    </View>











            </View>;
        // }else{
        //     return (
        //         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        //
        //         </View>
        //     )
        // }
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
export default connect(mapStateToProps, mapDispatchToProps)(MarkAttendence);


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