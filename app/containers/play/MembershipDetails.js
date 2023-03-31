import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Progress from 'react-native-progress';
import { SeperatingLine } from "./SeperatingLine";
// import ProgressCircle from 'react-native-progress-circle';

  
export const MembershipDetails = ({ purchasedDate, expiryDate ,profilePrecentage,hoursLeft}) => {

    const [profileComplelete, setProfileComplelete] = useState('');

    useEffect(() => {
        setProfileComplelete(profilePrecentage);
      }, []);

    return(<View style={styles.container}>
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.068)', ' rgba(255, 255, 255, 0.0102)']}
                    style={styles.gradient}
                >
                    <View>
                        <Text
                        style={styles.title}>
                            Membership Details 
                        </Text>
                        <View style={{flexDirection:'row',}}>
                            <View style={{
                                // flex: 1.5,
                                marginLeft:14,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                <Progress.Circle
                                size={80}
                                progress={profileComplelete}
                                unfilledColor={'#262051'}
                                showsText={true}
                                textStyle={{ color: 'white',fontSize: 12 }}
                                color={'#70D9E6'}
                                formatText={() => {
                                    return (<Text  style={{
                                            color: '#FFFFFF',
                                            marginTop:4,
                                            fontWeight:500,
                                            fontFamily: 'Nunito-Regular'}}>
                                            {hoursLeft}</Text>);
                                        }}
                                />
                            
                            </View>
                            <View style={{marginLeft:28}}>
                                <Text
                                    style={styles.monthlyMembershipText}>
                                        Monthly Membership 
                                </Text>

                                <SeperatingLine />

                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.staticDate}>
                                        Purchased on : 
                                    </Text>
                                    <Text style={styles.dynamicDate}>
                                        {purchasedDate}
                                    </Text>
                                </View>

                                <View style={{flexDirection:'row' ,marginTop:5}}>
                                    <Text style={styles.staticDate}>
                                        Expires on :
                                    </Text>
                                    <Text style={styles.dynamicDate}>
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

const styles = StyleSheet.create({
    container:{
        marginHorizontal:12,
        borderRadius:10,
        marginTop:25,
        // marginBottom:32,
    },
    gradient:{
        borderRadius:10,
        paddingBottom:14,
        paddingTop:12,
        paddingHorizontal:11
    },
    title:{
        color: '#E38D33',
        paddingLeft:14,
        marginTop:12,
        marginBottom:14,
        fontFamily: 'Nunito-Regular',
        fontWeight:600
    },
    dynamicDate:{
        color: '#FFFFFF',
        paddingLeft:2,
        fontSize:10,
        fontFamily: 'Nunito-Regular', 
        fontWeight:400
    },
    staticDate:{
        color: '#FFFFFF',
        fontSize:10,
        fontFamily: 'Nunito-Regular',
        fontWeight:400
    },
    monthlyMembershipText:{
        color: '#FFFFFF', 
        marginTop:4, 
        fontSize:14,
        fontFamily: 'Nunito-Regular',
        fontWeight:500
    },

})
