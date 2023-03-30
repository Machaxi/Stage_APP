import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Pressable,
    Image,
    TouchableOpacity
  } from "react-native";

  
export const GameNameBox = ({ item, navigation }) => {
   
  // const [isSelected,setIsSelected]=useState(false)
  console.log({item})
  console.log('in game box')
  return(
    <TouchableOpacity activeOpacity={.8}
            style={[styles.rounded_button ,{borderColor:item['color']}]}
        
              onPress={()=>{setIsSelected(true)}}
         
            >
            <Text
                style={{
                    color: item['color'],
                    textAlign: 'center',
                    fontFamily: 'Quicksand-Medium',
                }}>
                {item['title']}
            </Text>
        </TouchableOpacity>
  )}

  const styles = {
    rounded_button: {
        alignItems: 'center',
        justifyContent:'center',
        // borderRadius: 20,
        marginLeft: 5,
        marginRight: 5,
        // backgroundColor: '#67BAF5',
        paddingHorizontal: 20,
        borderWidth: 1,
        paddingVertical:6,
       height: 42,
        borderRadius: 20,

    },
  }