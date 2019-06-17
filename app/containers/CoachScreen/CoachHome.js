
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import {View,ImageBackground,Text,StyleSheet,Image,TouchableOpacity,Dimensions,FlatList,ScrollView} from 'react-native';
import {Card} from 'react-native-paper'
import {SwitchButton ,CustomeButtonB} from  '../../components/Home/SwitchButton'
import {CustomeCard } from  '../../components/Home/Card'
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


            country: undefined,
            strenthList : [
                {
                    progress_parameter: 'India',
                    id: '0',
                    score:80,
                },{
                    progress_parameter: 'India1',
                    id: '1',
                    score:80,
                },{
                    progress_parameter: 'India1',
                    id: '2',
                    score:60,
                }
                ,{
                    progress_parameter: 'India1',
                    id: '3',
                    score:60,
                },{
                    progress_parameter: 'India1',
                    id: '4',
                    score:60,
                }]
        }
    }


    render() {
        return <View style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
            <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
                <View style={{margin: 10,marginTop:20}}>

                    <SwitchButton  onPress={() =>  this.props.navigation.navigate('SwitchPlayer',{
                        userType:'coach'
                    })} >
                        Switch Acedemi
                    </SwitchButton>
                </View>
                    <CustomeCard>
                        <View style={{margin: 10,marginTop:20}}>
                            <Text>Attendance</Text>
                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{
                            margin: 10,fontSize:14,fontWeight:'bold'
                        }}>Batch 1 : Fitness</Text>
                            <Text style={{
                                margin: 10,marginRight: 20,fontSize:14,fontWeight:'bold'
                            }}>U-13</Text>
                        </View>
                        <View style={{flexDirection: 'row', margin: 10,marginBottom:20}}>
                            <Text style={{marginRight: 20,fontSize:14}}>Wensday 12 April’19</Text>
                            <Text style={{fontSize:14}}>09:30 PM   -   10:30 PM</Text>
                        </View>
                        <CustomeButtonB onPress ={() => console.log("title")} >
                            Mark Attendance</CustomeButtonB>
                    </CustomeCard>



                <CustomeCard>
                    <View style={{margin: 10,marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Next Session:</Text>
                            <Text style={{color:'#667DDB'}}>Attendance - 80% (Jul)</Text>
                        </View>
                        <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                        <Text style={{
                            margin: 10,fontSize:14,fontWeight:'bold'
                        }}>Fitness</Text>
                        <View style={{flexDirection: 'row', margin: 10,marginBottom:20}}>
                            <Text style={{marginRight: 20,fontSize:14}}>Wensday 12 April’19</Text>
                            <Text  style={{marginRight: 20,fontSize:14,}}>09:30 PM   -   10:30 PM</Text>
                        </View>
                    </CustomeCard>


                <CustomeCard>
                    <View style={{margin: 10,marginTop:20,flexDirection:'row'}}>
                        <Text>Update Player Performance</Text>
                        <View style={{backgroundColor:'#FF7373',marginRight:10,marginLeft:10,borderRadius:5}}>
                            <Text style={{margin: 5,fontSize:10,color:'white',marginRight:10,marginLeft:10,}}>Due</Text>
                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                    <View style={{flexDirection: 'row', margin: 10,marginBottom:20}}>
                        <Text style={{marginRight: 20,fontSize:14}}>You are yet to update performance of players.</Text>

                    </View>
                    <CustomeButtonB onPress ={() => console.log("title")} >
                        Mark Attendance</CustomeButtonB>
                </CustomeCard>


                <CustomeCard>
                    <View style={{margin: 10,marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text>Scorer</Text>
                        {/*<Text style={{color:'#667DDB'}}>Attendance - 80% (Jul)</Text>*/}
                    </View>
                    <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                    <Text style={{
                        margin: 10,fontSize:14,fontWeight:'bold'
                    }}>Feather academy tournament</Text>
                    <View style={{flexDirection: 'row', margin: 10,marginBottom:20}}>
                        <Text style={{marginRight: 20,fontSize:14}}>10 - 12th May 19</Text>
                        <Text  style={{marginRight: 20,fontSize:14,}}>09:30 AM   -   04:30 PM</Text>
                    </View>
                    <CustomeButtonB onPress ={() => console.log("title")} >
                        View Fixtures</CustomeButtonB>
                </CustomeCard>

                <CustomeCard>
                    <View style={{margin: 10,marginTop:20,flexDirection:'row'}}>
                        <Text>Reward Point</Text>
                        <View style={{backgroundColor:'#FF7373',marginRight:10,marginLeft:10,borderRadius:5}}>
                            <Text style={{margin: 5,fontSize:10,color:'white',marginRight:10,marginLeft:10,}}>Due</Text>
                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor: '#DFDFDF', margin: 10}}/>

                    <View style={{flexDirection: 'row', margin: 10,marginBottom:20}}>
                        <Text style={{marginRight: 20,fontSize:14}}>You are yet to Reward the players .</Text>

                    </View>
                    <CustomeButtonB onPress ={() => console.log("title")} >
                        Reward Players</CustomeButtonB>
                </CustomeCard>

                <View style={{margin: 5}}>
                    <Card style={{margin: 5,borderRadius:10}}>
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
                    <Card style={{margin: 5,borderRadius:10}}>
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
                    <Card style={{margin: 5,borderRadius:10}}>
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
    }
}
export default CoachHome;

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