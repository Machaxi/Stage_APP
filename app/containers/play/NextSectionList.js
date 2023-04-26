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
               onCancelPress={() => {
                 onCancelPress(item);
               }}
               item={item}
             />
           );
         };

         return (
           <FlatList
             extraData={refresh}
             data={NextSessionData}
             renderItem={renderNextScreenCard}
           />
         );
       };
