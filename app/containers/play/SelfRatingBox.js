import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet
  } from "react-native";
  // import SvgUri from "react-native-svg-uri";

  
export const SelfRatingBox = ({ title,titleColor,icon,imageSize }) => {
  return(
    <View style={styles.container}>
        <View style={{ height: imageSize?imageSize: 50, width: imageSize?imageSize: 50 ,borderRadius:imageSize?imageSize/2: 0}}>
            <Image style={{ height: imageSize?imageSize: 50, width: imageSize?imageSize: 50 ,borderRadius:imageSize?imageSize/2: 0}} 
            source={icon} 
            resizeMode='cover'
            />
        </View>
        <Text style={{color:{titleColor},fontSize: 14,marginLeft:12 ,color:titleColor ,fontFamily:'Nunito-Regular' ,fontWeight:'500'}}>
          {title}
        </Text>

    </View>
  )
}

const styles = StyleSheet.create({

    container:{
        flexDirection:'row',
        marginHorizontal:20
    },

})
