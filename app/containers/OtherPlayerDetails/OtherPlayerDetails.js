import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import {View,ImageBackground,Text,StyleSheet,Image,TouchableOpacity,Dimensions,FlatList,ScrollView,ActivityIndicator} from 'react-native';
import {CustomeCard} from '../../components/Home/Card'
import {Card} from 'react-native-paper'
import {getData, storeData} from "../../components/auth";
import {getCoachSWitcher, getPlayerSWitcher} from "../../redux/reducers/switchReducer";
import {getPlayerDashboard} from "../../redux/reducers/dashboardReducer";
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

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

class  OtherPlayerDetails extends React.Component {

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

        console.log("PlayerDashboard");
        getData('userInfo',(value) => {
            userData = JSON.parse(value)
            this.setState({
                userData: JSON.parse(value)
            });
            console.log("userData.user",userData.user['user_type'])
            if(userData.user['user_type'] =='PLAYER'){
                this.getPlayerDashboardData(userData['academy_id'],userData['player_id'])

            }else if(userData.user['user_type']=='PARENT'){
                this.getParentSwitchingData();

            }else{
                this.getPlayerDashboardData(userData['academy_id'],userData['player_id'])
            }


        });
    }




    getPlayerDashboardData(academy_id,player_id,){
        getData('header',(value)=>{
            console.log("header",value,academy_id,player_id);
            this.props.getPlayerDashboard(value,1,1).then(() => {
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
            const {name,academy_name,badge,rank,score,player_level,reward_point,player_category,operations } = this.state.player_profile

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
export default connect(mapStateToProps, mapDispatchToProps)(OtherPlayerDetails);


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
        marginBottom:20,
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