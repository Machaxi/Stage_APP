import React from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Pressable,
    Image
  } from "react-native";
import { Nunito_Regular } from "../util/fonts";
import { greyVariant1 } from "../util/colors";

  
export const PeerRatingCard = ({ item,  }) => {
  return(
    <View style={styles.container}>
      <Image style={{ height: 50, width: 50 }} 
        source={item['icon']} 
        resizeMode='cover'
      />
      <View style={{marginLeft:12,}}>
        <Text style={[{color:item['titleColor'],}, styles.proficiencyTxt]}>
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
    alignItems:'center',
    marginBottom:18,

  },
  proficiencyTxt: {fontSize: 14, fontFamily: Nunito_Regular, fontWeight: '500'},
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
    color: greyVariant1,
    fontSize: 12,
  },
  descBox:{
    flexDirection:'row', 
    marginTop:3
  },
})