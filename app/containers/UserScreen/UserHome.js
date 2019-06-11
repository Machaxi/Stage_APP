import React from 'react'
import RNPickerSelect from 'react-native-picker-select';

import {View,ImageBackground,Text,StyleSheet,Image,TouchableOpacity,Dimensions} from 'react-native';
import {Card} from 'react-native-paper'


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

class  UserHome extends React.Component {

    constructor(props) {
        super(props)
        this.inputRefs = {

            acedemic: null

        };
        this.state = {


            country: undefined,
        }
    }
    render() {
        return (
            <View style={{flex:1,marginTop:0,backgroundColor:'#F7F7F7' }}>

                <View style={{ width:'100%',height:'50%', }}>
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
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                            <RNPickerSelect
                                placeholder={placeholder}
                                items={acedemicList}
                                onValueChange={(value) => {
                                    this.setState({
                                        acedemic: value,
                                    });
                                }}
                                style={pickerSelectStyles}
                                value={this.state.acedemic}
                                useNativeAndroidPickerStyle={false}
                                ref={(el) => {
                                    this.inputRefs.acedemic = el;
                                }}
                            />
                                <Image  source={require('../../images/dropdown.png')}
                                        style={{
                                            width: 8,
                                            height: 6,marginRight:20}}>
                                </Image>
                            </View>
                            <View style={styles.rightContainer}>

                                    <TouchableOpacity style={styles.rightIcon}>
                                <Image  source={require('../../images/bellicon.png')}
                                        style={{
                                            width: 25,
                                            height: 25,marginRight:20}}>

                                </Image>
                                    </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{position:'relative'}}>
                        <View style={{flexDirection:'row'}}>
                            <Image  source={require('../../images/playerimg.png')}
                                    style={{
                                        width: 201,
                                        height: 238,marginRight:20,marginTop:0,display:'flex'}}>

                            </Image>
                        <View style={{display:'flex',flex:1,marginBottom:100}}>
                            <Text style={{ color:'white',
                                marginRight:20,
                                textAlign:'center',fontSize:26,fontWeight:'bold'}}>Niranjan K</Text>
                            <Image  source={require('../../images/Rank.png')}
                                    style={{
                                        width: 119,
                                        height: 84,alignItems:'center',display:'flex',marginBottom:20,marginTop:20}}>

                            </Image>
                            <View style={{flexDirection:'row',marginBottom:10}}>
                            <Text style={{color:'white', marginRight:10,textAlign:'center',fontSize:12,fontWeight:'bold'}}>State Player</Text>
                                <View style={{backgroundColor:'red',width:60,marginRight:20}}>
                            <Text style={{ color:'white',
                                marginRight:0,textAlign:'center',fontSize:12,fontWeight:'bold',}}> U-13 </Text>
                                </View>
                            </View>
                        </View>
                        </View>
                            <View style={{flex:1,flexDirection:'row',position:'absolute',bottom: 20, justifyContent: 'space-between',
                                alignItems: 'center',selfAlign:'center'}}>
                                {console.log("width",deviceWidth/3)}
                                <View style={{
                                    width: deviceWidth/3,
                                    height: 80,marginLeft:10}}>

                                    <ImageBackground source={require('../../images/box.png')}
                                                     style={{
                                                         width: '100%',
                                                         height: 80,}}>

                                        <Text style={{margin:15,color:'white'}}>Reward</Text>
                                        <Text style={styles.scoreBox}>00</Text>


                                    </ImageBackground>

                                </View>
                                <ImageBackground source={require('../../images/box.png')}
                                                 style={{
                                                     width: deviceWidth/3,
                                                     height: 80,}}>
                                    <Text style={{margin:15,color:'white'}}>Score</Text>
                                    <Text style={styles.scoreBox}>00</Text>

                                </ImageBackground>
                                <View style={{
                                    width: deviceWidth/3,
                                    height: 80,marginRight:0}}>
                                    <ImageBackground source={require('../../images/box.png')}
                                                     style={{
                                                         width: '100%',
                                                         height: 80,}}>

                                        <Text style={{margin:15,color:'white'}}>Reward</Text>
                                        <Text style={styles.scoreBox}>00</Text>


                                    </ImageBackground>

                                    </View>


                            </View>



                        </View>
                    </ImageBackground>

                </View>
                <View style={{margin:10}}>
                <Card style={{margin:5}}>
                <View style={{margin:5}}>
                    <Text>Next Session:</Text>
                </View>
                    <View style={{height:1,backgroundColor:'#DFDFDF',margin:5}}/>

                    <Text style={{margin:5
                    }}>Fitness</Text>
                    <View style={{flexDirection:'row',margin:5}}>
                        <Text style={{marginRight:20}}>Fitness</Text>
                        <Text>Fitness</Text>
                    </View>
                </Card>
                </View>

                <View style={{margin:10}}>
                    <Card style={{margin:5}}>
                        <FlatList></FlatList>
                    </Card>
                </View>


            </View>
        );
    }
}
export default UserHome;

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
    }


});