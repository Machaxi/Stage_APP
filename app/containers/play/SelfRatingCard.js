import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Pressable,
    Image,
    TouchableOpacity,
    FlatList
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PeerRatingCard } from "./PeerRatingCard";
import Intermediate from './../../images/intermediate.svg';
import { GameNameBox } from "./GameNameBox";
import { SelfRatingBox } from "./SelfRatingBox";

  
export const SelfRatingCard = ({editSelfRating}) => {

    const data= [
        {
            icon:require("./../../images/beginner.png"),
            title: "Beginner",
            id:1,
            by:'4',
            titleColor:'#21D096'
        },
        {
            icon:require("./../../images/intermediate.png"),
            title: "Intermediate",
            by:'2',
            titleColor:'#FF9C33'
        },
        {
            icon:require("./../../images/advance.png"),
            title: "Advance",
            by:'8',
            titleColor:'#FE6E88'
        },
        {
            // icon:<Intermediate height={50} width={50} />,
            icon:'./../../images/intermediate.svg',
            title: "Professional",
            by:'5',
            titleColor:'#DB64FF'
          }
      ]
      useEffect(() => {       
        
      }, [])

      const renderSocialFeedCard = ({ item }) => {
        console.log({item})
        return (<PeerRatingCard 
        item={item} />)
    };
  
  return(
    <View style={{shadowColor:'rgba(0, 0, 0, 0.2)' ,marginHorizontal:12, borderRadius:20,marginTop:20}}>
        <LinearGradient
            colors={['rgba(255, 255, 255, 0.068)', 'rgba(255, 255, 255, 0.0102)']}
            style={{borderRadius:10}}
        >
        <View style={{flexDirection:'row',marginTop:20,alignItems:'center',marginBottom:13}}>
            <Text 
                style={{
                    color: '#DFDFDF',
                    fontFamily: 'Quicksand-Medium',
                    fontSize: 14, marginLeft: 20,
                }}
            >Self Rating </Text>
            <TouchableOpacity activeOpacity={.8} onPress={() => {
                    {editSelfRating}
                    }}>

                <View style={{ flexDirection: 'row',marginLeft:20 }}>
                    <Image
                        resizeMode="contain"
                        style={{
                            width: 9,
                            height: 9, borderRadius: 8
                        }}
                        source={require('../../images/edit_profile.png')}
                    ></Image>

                    <Text
                        style={{
                            color: '#667DDB',
                            fontFamily: 'Quicksand-Medium',
                            fontSize: 10, marginLeft: 4
                        }}
                    >
                        Edit
                    </Text>
                </View>
		    </TouchableOpacity>
        </View>
            <SelfRatingBox
                title={'Beginner'}
                titleColor={'#21D096'}
                imageSize={17}
               icon={require("./../../images/beginner.png")}/>

      <View style={{height: 1, marginTop: 22, marginBottom: 21, backgroundColor:'white',paddingLeft:15 ,marginLeft:20,marginRight:20}}></View>
      <Text style={{color:'#DFDFDF',fontSize: 12, marginTop:21,marginLeft:20}}>Peers rating</Text>
      
        <FlatList
                data={data}
                renderItem={renderSocialFeedCard}
            />

        </LinearGradient>
    </View>
  )
}
