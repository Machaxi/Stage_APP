import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as Progress from 'react-native-progress';

import {View,ImageBackground,Text,StyleSheet,Image,TouchableOpacity,Dimensions,FlatList,ScrollView} from 'react-native';
import {Card} from 'react-native-paper'
import { Rating } from 'react-native-ratings';
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


            country: undefined,
            strenthList : [
                {
                    progress_parameter: 'India',
                    id: '0',
                    score:80,
                },{
                    progress_parameter: 'India1',
                    id: '0',
                    score:80,
                },{
                    progress_parameter: 'India1',
                    id: '0',
                    score:60,
                }
                ,{
                    progress_parameter: 'India1',
                    id: '0',
                    score:60,
                },{
                    progress_parameter: 'India1',
                    id: '0',
                    score:60,
                }]

        }
    }

    renderItemAcedemic = ({ item }) => (
        <Card style={{marginTop:20,borderRadius:10,margin:10}}>
        <TouchableOpacity onPress={() => {

            console.warn("Touch Press")

            this.props.navigation.navigate('UHome')

        }}>

            <View style={{margin:10,marginTop:20,marginBottom:10}}>
                <Text style={{fontSize:16}}> Acedmic Page </Text>
            </View>
            <View style={{ paddingLeft: 12, paddingTop: 8, flexDirection: 'row', flex: 1 }}>

                <Rating
                    type='custom'
                    ratingColor='#F4FC9A'
                    ratingBackgroundColor='#D7D7D7'
                    ratingCount={5}
                    imageSize={14}
                    style={{ height: 30, width: 80 }}
                />

                <Text style={{
                    backgroundColor: '#DFDFDF', height: 19, width: 30, textAlign: 'center',
                    fontSize: 12,
                    color: '#707070',
                    paddingTop:2,
                    borderRadius: 12,
                }}>4.5</Text>

            </View>

            <View style={{margin: 10,height:80,flexDirection:'row'}}>

                <View style={{ margin: 5}}>
                    <Text style={{fontSize:10,marginRight: 20}}>Next Session</Text>

                    <Text style={{marginRight: 20,fontSize:14,marginTop:10}}>Wensday 12 April’19</Text>
                    <Text style={{marginRight: 20,fontSize:14,marginTop:10}}>09:30 PM   -   10:30 PM</Text>
                </View>

            </View>
        </TouchableOpacity>
    </Card>);
    renderItem = ({ item }) => (
        <Card style={{marginTop:20,borderRadius:10}}>
        <TouchableOpacity onPress={() => {

            console.warn("Touch Press")

             this.props.navigation.navigate('UHome')

        }}>
            <View style={{margin:10,marginTop:20,marginBottom:20}}><Text>{item.progress_parameter} </Text></View>
            <View style={{width: '100%', height: 300,}}>
                <ImageBackground
                    source={require('../../images/RectangleImg.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}>
                     <View style={{marginTop:20,flex:1,height: '100%'}}>

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
                                    marginRight: 20,
                                    textAlign: 'center', fontSize: 26, fontWeight: 'bold'
                                }}>Niranjan K</Text>
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
                                    }}>State Player</Text>
                                    <View
                                        style={{backgroundColor: 'red', width: 60, marginRight: 20, marginTop: -5}}>
                                        <Text style={{
                                            color: 'white',
                                            marginRight: 0,
                                            textAlign: 'center',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            marginTop: 5,
                                            marginBottom: 5
                                        }}> U-13 </Text>
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

                                    <Text style={{margin: 15, color: 'white'}}>Reward</Text>
                                    <Text style={styles.scoreBox}>00</Text>


                                </ImageBackground>

                            </View>
                            <ImageBackground source={require('../../images/box.png')}
                                             style={{
                                                 width: deviceWidth / 3,
                                                 height: 80,
                                             }}>
                                <Text style={{margin: 15, color: 'white'}}>Score</Text>
                                <Text style={styles.scoreBox}>00</Text>

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
                                    <Text style={styles.scoreBox}>00</Text>


                                </ImageBackground>

                            </View>


                        </View>

                    </View>
                    </View>
                </ImageBackground>

            </View>
            <View style={{margin: 10,height:80,flexDirection:'row'}}>


                    <View style={{margin: 5}}>
                        <Text style={{fontSize:10}}>Attendance</Text>
                        <Text style={{fontSize:14,marginTop:10}}>80%(JUL)</Text>
                    </View>
                    <View style={{width: 1, backgroundColor: '#DFDFDF', margin: 10}}/>
                <View style={{ margin: 5}}>
                    <Text style={{fontSize:10,marginRight: 20}}>Next Session</Text>

                        <Text style={{marginRight: 20,fontSize:14,marginTop:10}}>Fitness</Text>
                        <Text style={{marginRight: 20,fontSize:14,marginTop:10}}>Fitness</Text>
                    </View>

            </View>
        </TouchableOpacity>
        </Card>

    );
    render() {
        const { navigation } = this.props;
        const otherParam = navigation.getParam('userType');
        return <View style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>
            <ScrollView style={{flex: 1, marginTop: 0, backgroundColor: '#F7F7F7'}}>

                { (otherParam == 'player') ? null :  <View style={{marginTop:15,marginBottom:0,flex:1,alignItems:'center'}}><Text>Select Academy</Text></View> }

           <View>


                        <FlatList
                            data={this.state.strenthList}
                            renderItem={(otherParam == 'player') ? this.renderItem : this.renderItemAcedemic}
                            keyExtractor={(item, index) => item.id}
                        />
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
export default ParentHome;

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