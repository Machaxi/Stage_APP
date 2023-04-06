import React from "react";
import {
    View,
    Text,
    Image, 
    StyleSheet,
  } from "react-native";

  
export const ProfileSction = ({ image , name}) => {
  return(
    <View style={styles.container}>
        <View  style={styles.imageContainer} >
        <Image style={styles.image} 
        source={image} 
        resizeMode='contain'
        />
        </View>
        <Text style={styles.title}>
          {name}
        </Text>

    </View>
  )
}


const styles = StyleSheet.create({

    container:{
        marginHorizontal:20, 
        alignItems:'center', 
        paddingHorizontal:16, 
        paddingVertical:16,
        paddingTop:37
    },
    image:{
        height: 110, 
        width: 110 ,
        borderRadius:55 ,
        resizeMode:'cover'
    },
    imageContainer:{
        height: 113, 
        width: 113 ,
        borderRadius:56 ,
        borderWidth:3,
        borderColor:'#FFCB6A',
    },


    title:{
        color:'white',
        fontSize: 20,
        color:'white',
        fontFamily:'Nunito-Regular',
        paddingTop:11,
        fontWeight:'600'
    },
}
)