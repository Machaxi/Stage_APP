
import React from 'react'


import {View,ImageBackground,Text,StyleSheet,Image,TouchableOpacity,Dimensions,ActivityIndicator,FlatList,ScrollView} from 'react-native';
import {Card} from 'react-native-paper'

import {CustomeCard } from  '../../../components/Home/Card'
import {getCoachPerformenceList} from "../../../redux/reducers/PerformenceReducer";
import {getData} from "../../../components/auth";
import { connect } from 'react-redux';
import moment from "moment/moment";
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

class  PerformenceScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            batchList :null,
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
                this.getCoachBatchList(userData['academy_id'],userData['coach_id'])

            }


        });
    }

    getCoachBatchList(academy_id,player_id,){
        getData('header',(value)=>{
            console.log("header",value,academy_id,player_id);
            this.props.getCoachPerformenceList(value,academy_id,player_id).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.performencedata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if(user1.success == true){
                    this.setState({
                        batchList:user1.data['dues'],
                        // strenthList:user1.data.player_profile['stats']

                    })
                }

            }).catch((response) => {
                //handle form errors
                console.log(response);
            })

        });

    }

    renderItemSection = ({ item }) => (
        <View>
        <View style={{margin: 10, marginTop: 20}}>
        <Text>
            {moment('06-'+item.month +'-'+item.year).format('MMM YY')}
        </Text>
        </View>
            <FlatList
                data={item.batches}
                renderItem={this.renderItem}
                keyExtractor1={(item, index) => item.month}
            />
        </View>

    );

    renderItem = ({ item ,index}) => (
        <TouchableOpacity key={item} onPress={() => {

            console.warn("Touch Press",index)

           // this.props.navigation.navigate('BatchDetails',{batch_id:item.batch_id})

        }}>
            <CustomeCard>




                <View  style={{
                    marginLeft: 8,
                    marginRight: 15,
                    margin:10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text>
                        {item.batch_name}
                    </Text>
                    <Image source ={require('../../../images/forward.png')}
                           style={{
                               width: 3,
                               height: 8,marginRight:10,marginTop:5}}/>


                </View>
                <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10,marginTop:0}}/>
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                    {/*<View>*/}
                    {/*<Text style={{fontSize:10,color:'#A3A5AE',marginBottom:10}}>Attendance</Text>*/}
                    {/*<Text style={{fontSize:14,marginBottom:10}}>80%</Text>*/}
                    {/*</View>*/}
                    <View>
                        <Text style={{fontSize:10,color:'#A3A5AE',marginBottom:10}}>Level</Text>
                        <Text style={{fontSize:14,marginBottom:10}}>{item.level}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize:10,color:'#A3A5AE',marginBottom:10}}>Player</Text>
                        <Text style={{fontSize:14,marginBottom:10}}>{item.total_players}</Text>
                    </View>
                </View>

            </CustomeCard>
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
        // if (this.state.coach_profile) {



        return <View style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
            <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
                {/*<View style={{margin: 10, marginTop: 20}}>*/}

                    {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('PlayersListing',*/}
                    {/*{batch_id:'1',month:'6',year:'2019'}*/}
                    {/*)}>*/}
                        {/*<Text style={{color:'#667DDB',textAlign:'right'}}> Cancel Session</Text>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}

                <FlatList
                    data={this.state.batchList}
                    renderItem={this.renderItemSection}
                    keyExtractor={(item, index) => item.id}
                />



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
        data: state.PerformenceReducer,
    };
};
const mapDispatchToProps = {
    getCoachPerformenceList
};
export default connect(mapStateToProps, mapDispatchToProps)(PerformenceScreen);


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