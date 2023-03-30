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
import { NextSessionCard } from "./NextSessionCard";

  
export const NextSessionList = (onPlayingLevelPress,onCancelPress) => {

    const Data= [
        {
            // icon:require("./../../images/beginner.png"),
            title: "Next Session - Today",
            id:1,
            by:'4',
            titleColor:'#21D096',
            sportsName:'erioubyft',
            sportsTime:'3pm',
            centreName:'Machaxi Play9 Sports Centre, Whitefield',
            centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
            numberOfGuests:'None',
            gameNameitem:{
                title: "Swimming",
                id:1,
                color:'green',
                // bgColor:'yellow'
            },
        },
        {
            // icon:require("./../../images/intermediate.png"),
            title: "Intermediate",
            by:'2',
            titleColor:'#FF9C33',
            sportsName:'erioubyft',
            sportsTime:'3pm',
            centreName:'Machaxi Play9 Sports Centre, Whitefield',
            centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
            numberOfGuests:'None'
        },
        {
            // icon:require("./../../images/advance.png"),
            title: "Advance",
            by:'8',
            titleColor:'#FE6E88',
            sportsName:'erioubyft',
            sportsTime:'3pm',
            centreName:'Machaxi Play9 Sports Centre, Whitefield',
            centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
            numberOfGuests:'None'
        },
        {
            // icon:<Intermediate height={50} width={50} />,
            // icon:'./../../images/intermediate.svg',
            title: "Professional",
            by:'5',
            titleColor:'#DB64FF',
            sportsName:'erioubyft',
            sportsTime:'3pm',
            centreName:'Machaxi Play9 Sports Centre, Whitefield',
            centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
            numberOfGuests:'5',
          },
      ];
    //   useEffect(() => {       
        
    //   }, [])
    const renderNextScreenCard = ({item}) => {
        console.log('renderNextScreenCard')
        console.log({item})
        return (
        <NextSessionCard
        onPlayingLevelPress={null}
        onCancelPress={null}
        item={item}
        />
        )
    };
  return(<>
    <FlatList
                data={Data}
                renderItem={renderNextScreenCard}
            />
           {/* <Text>eryuiyuhtrfdgyunhmi</Text> */}
        </>
    )
}

const styles = StyleSheet.create({

    
    menu: {
      color: '#AFAFAF',
      alignItems: 'flex-start',
      fontSize: 14,
      fontFamily: 'Quicksand-Medium',
    },
    heading:{
      color: '#FF9C33',
      fontSize: 16,
      fontFamily: 'Quicksand-Medium',
      marginTop:2,
      textAlign:'center',
    },
    cancelText:{
        color: '#FF7373',
        fontSize: 16,
        fontFamily: 'Quicksand-Medium',
        marginTop:2,
        textAlign:'center',
      },
    })