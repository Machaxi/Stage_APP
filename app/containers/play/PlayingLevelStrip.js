import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import * as Progress from "react-native-progress";

import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  RefreshControl,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  Linking,
} from "react-native";
import { PeerRatingCard } from "./PeerRatingCard";
import { SelfRatingCard } from "./SelfRatingCard";
import { SkyFilledButton } from "../../components/Home/SkyFilledButton";
import LinearGradient from "react-native-linear-gradient";
import { GameNameBox } from "./GameNameBox";
import { PrefSport } from "./PrefSport";
import { ProfileSction } from "./ProfileSection";
import { MembershipDetails } from "./MembershipDetails";
import { NextSessionList } from "./NextSectionList";
// import { createMaterialTopTabNavigator } from "react-navigation";

export default PlayingLevelStrip =({onPress,image,justifyContent,title,playDataVisibility})=>{
    return(
        <TouchableOpacity activeOpacity={0.8} 
            onPress={() => onPress}>
            <View style={styles.drawercell}>
              <View style={{flexDirection:'row',justifyContent:justifyContent?justifyContent:'space-between' ,alignItems:'center',marginLeft:13,marginRight:19,marginTop:32}}>
              <Text style={styles.menuHeading}>
                {title}
              </Text>

              <Image
                style={[styles.arrow_img,{ transform: [{ rotate: playDataVisibility?"180deg":"0deg" }]}]}
                source={image}
              />

            </View></View>
          </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    arrow_img: {
      height: 5,
      width: 12,
      resizeMode: 'contain',
    },
    menu: {
      color: '#AFAFAF',
      alignItems: 'flex-start',
      fontSize: 14,
      fontFamily: 'Quicksand-Medium',
    },
    menuHeading:{
      color: '#FF9C33',
      fontSize: 16,
      fontFamily: 'Quicksand-Medium',
      marginTop:2,
      textAlign:'center',
      fontWeight:600
    },
    skyFilledButtonView:{
      position:'absolute',
      width:"80%",
      alignSelf:'center',
      bottom:12,
    
    },
    })