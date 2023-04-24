import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet
  } from "react-native";
import { Nunito_Regular } from "../util/fonts";
  
export const SelfRatingBox = ({ title,titleColor,icon,imageSize }) => {
  return(
    <View style={styles.container}>
        <Image style={styles.imageStyle} 
          source={icon} 
          resizeMode='contain'
        />
        <Text style={[{color:titleColor}, styles.proficiencyTxt]}>
          {title}
        </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  proficiencyTxt: {
    fontSize: 14,
    fontFamily: Nunito_Regular,
    fontWeight: "500",
  },
  imageStyle: { height: 19, width: 19, marginRight: 10 },
});
