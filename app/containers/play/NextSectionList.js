import React, {  useState } from "react";
import {
    FlatList
  } from "react-native";
import { NextSessionCard } from "./NextSessionCard";

  
export const NextSessionList = () => {

    const NextSessionData= [
        {
            // icon:require("./../../images/beginner.png"),
            title: "Next Session - Today",
            id:1,
            by:'4',
            titleColor:'#21D096',
            sportsName:'Swimming - Pool',
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
            sportsName:'Swimming - Pool',
            sportsTime:'2-3pm',
            centreName:'Machaxi Play9 Sports Centre, Whitefield',
            centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
            numberOfGuests:'None'
        },
        {
            // icon:require("./../../images/advance.png"),
            title: "Advance",
            by:'8',
            titleColor:'#FE6E88',
            sportsName:'Swimming - Pool',
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
            sportsName:'Swimming - Pool',
            sportsTime:'3pm',
            centreName:'Machaxi Play9 Sports Centre, Whitefield',
            centreAddress:'68/1, 1, near Parijatha Farm, Whitefield, Siddapura.',
            numberOfGuests:'5',
          },
      ];
    const [showPlayingLevel,setShowPlayingLevel] =useState(false);


      const onPlayingLevelPress=()=>{
        setShowPlayingLevel(!showPlayingLevel)
      }

      const onCancelPress=()=>{
        null
      }
      
    const renderNextScreenCard = ({item}) => {
        console.log('renderNextScreenCard')
        console.log({item})
        return (
        <NextSessionCard
        showPlayingLevel={showPlayingLevel}
        onPlayingLevelPress={onPlayingLevelPress}
        onCancelPress={onCancelPress}
        item={item}
        />
        )
    };
  return(<>
    <FlatList
        data={NextSessionData}
        renderItem={renderNextScreenCard}
    />
        </>
    )
}
