import React, {  useState } from "react";
import {
  Alert,
    FlatList, Text
  } from "react-native";
import { NextSessionCard } from "./NextSessionCard";

  
export const NextSessionList = ({NextSessionData ,onCancelPress}) => {

      
    const renderNextScreenCard = ({item}) => {
        console.log('renderNextScreenCard')
        console.log({item})
        return (
        <NextSessionCard
        onCancelPress={()=>{onCancelPress(item)}}
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
