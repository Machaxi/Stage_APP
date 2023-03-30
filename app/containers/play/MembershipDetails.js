import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Pressable,
    Image
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Progress from 'react-native-progress';
// import ProgressCircle from 'react-native-progress-circle';

  
export const MembershipDetails = ({ purchasedDate, expiryDate ,profilePrecentage}) => {

    const [profileComplelete, setProfileComplelete] = useState('');

    useEffect(() => {
        setProfileComplelete(profilePrecentage);
      }, []);

    return(<View style={{marginHorizontal:20,borderRadius:10,marginTop:25,marginBottom:32}}>
        <LinearGradient
            colors={['rgba(255, 255, 255, 0.068)', ' rgba(255, 255, 255, 0.0102)']}
            style={{borderRadius:10,paddingBottom:14,paddingTop:12,paddingHorizontal:11}}
        >
            <View style={{}}>
                <Text
                style={{
                    color: '#E38D33',
                    paddingLeft:14,
                    marginTop:12,marginBottom:14,
                    fontFamily: 'Quicksand-Medium',
                }}>
                    Membership Details 
                </Text>
                <View style={{flexDirection:'row',}}>
                    {/* <Image
                        resizeMode="contain"
                        style={{
                            width: 81,
                            height: 81, borderRadius: 8
                        }}
                        source={require('../../images/edit_profile.png')}
                    ></Image> */}
                     <View style={{
                        flex: 1.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Progress.Circle
                        size={80}
                        // indeterminate={true}
                        progress={profileComplelete}
                        // borderWidth={10}
                        // unfilledColor={Colors.progressUnfilledColor}
                        unfilledColor={'#262051'}
                        // borderColor={'red'}
                        showsText={true}
                        textStyle={{ color: 'white',fontSize: 12 }}
                        color={'#70D9E6'}
                        formatText={() => {
                            return (profileComplelete *100) + '%';
                        }}
                        />
                    </View>
                    <View style={{marginLeft:28}}>
                        <Text
                            style={{
                                color: '#FFFFFF',
                                // textAlign: 'center',
                                // paddingLeft:14,
                                marginTop:4,
                                fontFamily: 'Quicksand-Medium',
                            }}>
                                Monthly Membership 
                        </Text>
                        <View style={{height: 0.2, marginTop: 7, marginBottom: 11, backgroundColor:'white',paddingLeft:15 ,marginRight:20}}></View>
                        <View style={{flexDirection:'row'}}>
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    // textAlign: 'center',
                                    // paddingLeft:14,
                                    fontFamily: 'Quicksand-Medium',
                                }}>
                                    Purchased on : 
                            </Text>
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    // textAlign: 'center',
                                    paddingLeft:2,
                                    fontFamily: 'Quicksand-Medium',
                                }}>
                                   {purchasedDate}
                            </Text>
                        </View>
                        <View style={{flexDirection:'row' ,marginTop:5}}>
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    // textAlign: 'center',
                                    // paddingLeft:14,
                                    fontFamily: 'Quicksand-Medium',
                                }}>
                                    Expires on :
                            </Text>
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    // textAlign: 'center',
                                    paddingLeft:2,
                                    fontFamily: 'Quicksand-Medium',
                                }}>
                                    {expiryDate}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
        </View> 
    ) 
}