import React from "react";
import {
    View,
  } from "react-native";

  
export const SeperatingLine = ({
    height,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    backgroundColor,
    paddingLeft,
    paddingRight,
}) => {
    return(
        <View 
            style={{
                height: height ? height:0.2, 
                marginTop: marginTop?marginTop:7, 
                marginBottom: marginBottom?marginBottom:11, 
                backgroundColor:backgroundColor?backgroundColor:'white',
                marginLeft:marginLeft?marginLeft:0 ,
                paddingLeft:paddingLeft?paddingLeft:15,
                paddingRight:paddingRight?paddingRight:0,
                marginRight:marginRight?marginRight:20
                }}>

         </View>
                        
    )}