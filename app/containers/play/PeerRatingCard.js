import React from "react";
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
    <View style={styles.container}>

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
        <View style={styles.descBox}>

          <Text style={styles.desc}>Rated by </Text>
          <Text style={styles.desc}>{item['by']}</Text>
          <Text style={styles.desc}> players</Text>
        </View>

      </View>

    </View>
  )
}



const styles = StyleSheet.create ({
  container:{
    flexDirection:'row',
    marginHorizontal:20,
    paddingVertical:16
  },
  rounded_button: {
      alignItems: 'center',
      justifyContent:'center',
      marginLeft: 5,
      marginRight: 5,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: '#67BAF5',
      paddingVertical:6,
      backgroundColor: 'red',
      height: 42,
      borderRadius: 20,
  },
  desc:{
    color:'white',
    fontSize: 12,
  },
  descBox:{
    flexDirection:'row', 
    marginTop:10 
  },
})