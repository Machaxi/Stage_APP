
import React from 'react'

import {View,TextInput,Text,StyleSheet,Image,TouchableOpacity,Dimensions,ActivityIndicator,FlatList,ScrollView} from 'react-native';
import {Card} from 'react-native-paper'
import {SwitchButton ,CustomeButtonB} from  '../../../components/Home/SwitchButton'
import {CustomeCard } from  '../../../components/Home/Card'
import {getPerformenceOption,saveCoachBatchAttendence} from "../../../redux/reducers/PerformenceReducer";
import {getData} from "../../../components/auth";
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements'
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

class  UpdatePlayerPerformence extends React.Component {

    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {

            //  coach_profile:null,
            country: undefined,
            billingchecked:false,
            playerList : null,
            batchDetails:null,
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

                this.getCoachPerformenceData(this.props.navigation.getParam('batch_id'),this.props.navigation.getParam('player_id'),this.props.navigation.getParam('month'),this.props.navigation.getParam('year'))

            }


        });
    }

    getCoachPerformenceData(btach_id,player_id,month,year){
        getData('header',(value)=>{
            console.log("header",value,btach_id);
            this.props.getPerformenceOption(value,btach_id,player_id,month,year).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.performencedata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if(user1.success == true){
                    this.setState({
                        playerList:user1.data['attributes'],
                        batchDetails:user1.data

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
            <View style={{marginLeft:0,marginTop:10,marginRight:10,flex:1,flexDirection:'row',height:50}}>

                <View  style={{
                    flex:1,
                    marginLeft: 8,
                    marginRight: 15,
                    marginBottom:5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={{width:'60%'}}>
                    <Text>
                        {item.name}
                    </Text>
                    </View>

                    <View style={{backgroundColor:'white',marginTop:0,flexDirection:'row',justifyContent:'space-between', width:'35%',marginRight:20,}}>
                            <View>
                        <TextInput
                            style={{borderColor:'#CECECE',borderWidth:0.5,borderRadius:12,height:36,width:70,padding:10}}
                            // mode='outlined'
                            label='name'

                            // theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: '#ffffff80', background: '#ffffff80' } }}
                            value={this.state.txtname}
                            onChangeText={(txtname) => this.setState({ txtname: txtname })}
                        />
                            </View>
                        <Text style={{textAlign:'center'}}>{item.prev_month_score}</Text>

                        {/*<CheckBox style={{ height: 30,width: 30, alignItems: 'center', backgroundColor: 'red' }}*/}
                            {/*// title='a'*/}
                                  {/*checked={item.is_present}*/}
                                  {/*onPress={() => {*/}
                                      {/*console.log("he;eleleo",item.is_present)*/}
                                      {/*let playerList = [...this.state.playerList];*/}
                                      {/*let index = playerList.findIndex(el => el.id === item.id);*/}
                                      {/*playerList[index] = {...playerList[index], is_present: !item.is_present};*/}
                                      {/*this.setState({ playerList });*/}

                                      {/*//   item.isPresent = !item.isPresent*/}
                                      {/*// this.setState({*/}
                                      {/*//     playerList:item*/}
                                      {/*// })*/}

                                     {/*// console.log("he;eleleo",playerList[0].is_present)*/}
                                  {/*}*/}


                                  {/*}*/}
                        {/*/>*/}
                    </View>

                </View>


            </View>
        </TouchableOpacity>

    );



    savePlayerAttendence()
    {

        getData('header',(value)=>{
            console.log("savePlayerAttendence header",value);
            const yourDate = Date()
            console.log("savePlaye",yourDate)
            const NewDate = moment(yourDate).format('YYYY-MM-DD')
            console.log("savePlayerAttendence",NewDate);
            var dataDic = {};
            var dict = {};
            dict['batch_id'] = this.props.navigation.getParam('batch_id')//user.phoneNumber;
            dict['attendance_date'] = NewDate;
            dict['players'] = this.state.playerList



            dataDic['data'] = dict;
            console.log("dicttttc ", dict)

            this.props.saveCoachBatchAttendence(value,this.props.navigation.getParam('batch_id'),dataDic).then(() => {
                // console.log(' user response payload ' + JSON.stringify(this.props.data));
                // console.log(' user response payload ' + JSON.stringify(this.props.data.user));
                let user = JSON.stringify(this.props.data.performencedata);
                console.log(' user response payload ' + user);
                let user1 = JSON.parse(user)

                if(user1.success == true){
                    this.setState({
                        playerList:user1.data['attributes'],
                         batchDetails:user1.data

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
            <View style={{margin: 10, marginTop: 0,marginBottom:0,flexDirection:'row'}}>
                <View style={{width:'60%'}}>
                <Text>
                    {item.name}
                </Text>
                </View>
                <View style={{flexDirection:'row',width:'35%',justifyContent:'space-between',marginRight:20}}>
                    <Text >
                        {moment(this.props.navigation.getParam('month')+'-'+this.props.navigation.getParam('month') +'-'+this.props.navigation.getParam('year')).format('MMM')}
                    </Text>
                    <Text>
                        {moment(this.state.batchDetails.prev_month + '-' +this.state.batchDetails.prev_month +'-'+this.state.batchDetails.prev_year).format('MMM')}
                    </Text>
                </View>
            </View>
            <View style={{backgroundColor:'white',marginTop:10,marginBottom:10}}>
            <FlatList
                data={item.parameters}
                renderItem={this.renderItem}
                keyExtractor1={(item, parmeterindex) => item.parameter_id}
            />
            </View>
        </View>

    );


    render() {
        if (this.props.data.loading && !this.state.batchDetails) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#67BAF5"/>
                </View>
            )
        }
        if (this.state.batchDetails) {
            const {batch_name, batch_category, batch_id, session} = this.state.batchDetails

            // this.attedenceMangement(attandence_batch)
            //
            // this.sessionMangement(operations)
            // this.scoreMangement(tournaments)

            return <View style={{flex: 1, marginBottom: 0, backgroundColor: '#F7F7F7'}}>
                <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>

                <View style={{backgroundColor:'white'}}>
                    <View style={{margin:20,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:14,fontWeight:'bold'}}>{'Update '+ batch_name+'`s progress' } </Text>
                    </View>
                    <View style={{margin:20,marginTop:-10,}}>
                        <View style={{margin:5}}>
                            <Text style={{fontSize:10,marginBottom:10,color:'#A3A5AE'}}>Month </Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:0,marginTop:-10,}}>
                            <Text style={{fontSize:14,marginBottom:10}}> {moment('06-'+this.props.navigation.getParam('month') +'-'+this.props.navigation.getParam('year')).format('MMM YY')} </Text>
                            <Text style={{fontSize:14,color:'#A3A5AE'}}>(Enter Percentage)</Text>
                        </View>
                    </View>
                </View>


                <View style={{marginTop:10}}>


                        <FlatList
                            data={this.state.playerList}

                            renderItem={this.renderItemSection}
                            keyExtractor={(item,index) => item.attribute_id}

                        />


                </View>

                <View style={{flex:1, marginBottom: 30,marginRight:20,marginLeft:20,justifyContent:'flex-end'}}>

                    <CustomeButtonB onPress={() => {this.savePlayerAttendence()}}>
                        Update
                    </CustomeButtonB>


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
        data: state.PerformenceReducer,
    };
};
const mapDispatchToProps = {
    getPerformenceOption,saveCoachBatchAttendence
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePlayerPerformence);


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