import React from "react";
import {
    View,
    Text,
    Image, 
    StyleSheet,
  } from "react-native";
import { yellowVariant } from "../util/colors";
import { Nunito_SemiBold } from "../util/fonts";

  
export const ProfileSction = ({ image , name}) => {
  return(
    <View style={styles.container}>
        <View  style={styles.imageContainer} >
          <Image style={styles.image} 
            source={image} 
            resizeMethod="auto"
          />
        </View>
        <Text style={styles.title}>
          {name}
        </Text>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 37,
    alignItems: "center",
    marginBottom: 23,
    paddingHorizontal: 36,
  },
  image: {
    height: 110,
    width: 110,
    borderRadius: 110,
    resizeMode: 'cover',
  },
  imageContainer: {
    flex:1,
    height: 115,
    width: 115,
    borderRadius: 115,
    justifyContent: 'center',
    alignItems:'center',
    borderWidth: 3,
    borderColor: yellowVariant,
    overflow:'hidden'
  },

  title: {
    color: "white",
    fontSize: 20,
    fontFamily: Nunito_SemiBold,
    marginTop: 11,
    fontWeight: "600",
  },
});