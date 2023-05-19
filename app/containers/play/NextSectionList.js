import React, {  useState } from "react";
import {
  Alert,
    FlatList, Text
  } from "react-native";
import { NextSessionCard } from "./NextSessionCard";

  
export const NextSessionList = ({
         NextSessionData,
         onCancelPress,
         expandList,
         cancelDisplayTime,
         userId
       }) => {
        const [refresh, setRefresh] = useState(false)
         const renderNextScreenCard = ({ item }) => {
           return (
             <NextSessionCard
               userId={userId}
               expandList={() => {
                setRefresh(!refresh)
                expandList(item)}}
               onCancelPress={(val) => {
                 onCancelPress(val);
                 cancelDisplayTime(item?.displayTime, item?.sport.name)
               }}
               item={item}
             />
           );
         };

         return (
           <FlatList
             extraData={refresh}
             data={NextSessionData.length > 0 ? [NextSessionData[0]] : []}
             renderItem={renderNextScreenCard}
           />
         );
       };
