import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Pressable,
    Image
  } from "react-native";
  // import SvgUri from "react-native-svg-uri";

  
export const SelfRatingBox = ({ title,titleColor,icon,imageSize, navigation }) => {
  return(
    <View style={{flexDirection:'row',marginHorizontal:20}}>
        <View style={{ height: imageSize?imageSize: 50, width: imageSize?imageSize: 50 ,borderRadius:imageSize?imageSize/2: 0}}>
        <Image style={{ height: imageSize?imageSize: 50, width: imageSize?imageSize: 50 ,borderRadius:imageSize?imageSize/2: 0}} 
        source={icon} 
        resizeMode='cover'
        /></View>
        <Text style={{color:{titleColor},fontSize: 14,marginLeft:12 ,color:titleColor}}>
          {title}
        </Text>

    </View>
  )
}
