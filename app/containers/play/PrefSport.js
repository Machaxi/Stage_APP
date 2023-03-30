import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Pressable,
    Image,
    TouchableOpacity,
    FlatList,
    ImageBackground
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PeerRatingCard } from "./PeerRatingCard";
import Intermediate from './../../images/intermediate.svg';
import { GameNameBox } from "./GameNameBox";
import { SelfRatingBox } from "./SelfRatingBox";

  
export const PrefSport = ({icon,sportTitle,currentRating,currentRatingColor}) => {
    return(
        <View style={{ 
            flexDirection:'row',
            paddingTop:14,
            paddingBottom:14,
            paddingHorizontal:28, 
            borderWidth:1,
            borderRadius:12,
            marginLeft:12,
            marginRight:12,
            marginTop:16 ,
            justifyContent:'space-between',
            borderColor:'#616161',
            backgroundColor:'rgba(255, 255, 255, 0.068)'
        }}>
          
            <View style={{}}>
                <Text style={{color:'#F3F2F5',fontSize:12 ,textAlign:'center',marginBottom:6 ,fontFamily: 'Quicksand-Medium',}}>Preferred sport</Text>
            <View  style={[styles.rounded_button ,{flexDirection:'row',justifyContent:'space-between',borderColor:'#FFFFFF'}]}>
                <Image style={{ height: 16, width: 16 }} 
                    source={icon} 
                    resizeMode='cover'
                />
                <Text
                    style={{
                        color: '#CDCDCD',
                        textAlign: 'center',
                        paddingLeft:10,
                        fontSize:12,
                        fontFamily: 'Quicksand-Regular',
                    }}>
                    {sportTitle}
                </Text>
            </View>
            </View>
            <View style={{backgroundColor:'#616161', height:50,width:1}}></View>

            <View style={{}}><Text style={{color:'#F3F2F5',fontSize:12,textAlign:'center',marginBottom:6,fontFamily: 'Quicksand-Medium'}}>Current rating</Text>
            <View  style={[styles.rounded_button ,{borderColor:currentRatingColor}]}>
            <Text
                style={{
                    color: currentRatingColor,
                    textAlign: 'center',
                    fontSize:12,
                    fontFamily: 'Quicksand-Medium',
                }}>
                {currentRating}
            </Text></View></View>
        </View>
        // </ImageBackground>
    )
}


const styles = {
    rounded_button: {
        alignItems: 'center',
        justifyContent:'center',
        // borderRadius: 20,
        marginLeft: 5,
        marginRight: 5,
        // backgroundColor: '#67BAF5',
        paddingLeft: 12,
        paddingRight: 12,
        borderWidth: 0.2,
        borderColor: '#67BAF5',
        paddingVertical:4,
        // backgroundColor: 'red',
        // height: 42,
        borderRadius: 20,

    },
  }