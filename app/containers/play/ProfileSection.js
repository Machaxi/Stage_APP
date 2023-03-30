import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image
  } from "react-native";

  
export const ProfileSction = ({ image , name}) => {
  return(
    <View style={{marginHorizontal:20, alignItems:'center', paddingHorizontal:16, paddingVertical:16,paddingTop:37}}>
        <View  style={{ height: 110, width: 110 ,borderRadius:55 ,borderColor:'yellow',borderWidth:1}} >
        <Image style={{height: 110, width: 110 ,borderRadius:55 }} 
        source={image} 
        resizeMode='cover'
        /></View>
        <Text style={{color:'white',fontSize: 20,color:'white',paddingTop:11}}>
          {name}
        </Text>

    </View>
  )
}
