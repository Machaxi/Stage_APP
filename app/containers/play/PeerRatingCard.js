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

  
export const PeerRatingCard = ({ item,  }) => {
  console.log({item})
  return(
    <View style={{flexDirection:'row',marginHorizontal:20,paddingVertical:16}}>

      <Image style={{ height: 50, width: 50 }} 
        source={item['icon']} 
        resizeMode='cover'
      />
      {/* <SvgUri
          width="30"
          height="22"
          source={item['icon']}
          style={{ transform: [{ rotate: "180deg" }] }}
        /> */}
      <View style={{marginLeft:12,}}>
        <Text style={{color:item['titleColor'],fontSize: 14,}}>
          {item['title']}
        </Text>
        <View style={{flexDirection:'row', marginTop:10 }}>
          <Text style={{color:'white',fontSize: 12,}}>Rated by </Text>
          <Text style={{color:'white',fontSize: 12,}}>{item['by']}</Text>
          <Text style={{color:'white',fontSize: 12,}}> players</Text>
        </View>

      </View>

    </View>
  )
}



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
      borderColor: '#67BAF5',
      paddingVertical:6,
      backgroundColor: 'red',
      height: 42,
      borderRadius: 20,

  },
}