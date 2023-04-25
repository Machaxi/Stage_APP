import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { redVariant2, yellowVariant4 } from "../util/colors";
import NamedRoundedGradientContainer from "../../components/molecules/roundedNamedGradientContainer";
import { getProficiencyGradients, getProficiencyName } from "../util/utilFunctions";

  
export const PrefSport = ({
         gradientColors, 
         icon,
         sportTitle,
         currentRating,
         currentRatingColor,
       }) => {
         return (
           <View style={styles.container}>
             <LinearGradient
               colors={[
                 "rgba(255, 255, 255, 0.24)",
                 "rgba(255, 255, 255, 0.036)",
               ]}
               style={styles.gradient}
             >
               <View>
                 <Text style={styles.preferredSport}>
                   Preferred sport
                 </Text>
                 <View
                   style={[styles.rounded_button, styles.sportTitleView]}
                 >
                   <Image
                     style={{ height: 16, width: 16 }}
                     source={icon}
                     resizeMode="cover"
                   />
                   <Text style={styles.sportTitle}>{sportTitle}</Text>
                 </View>
               </View>

               <View style={styles.seperator} />

               <View>
                 <Text style={styles.currentRating}>Current rating</Text>
                 <NamedRoundedGradientContainer
                   name={currentRating}
                   colors={gradientColors}
                   txtColor={currentRatingColor}
                 />
               </View>
             </LinearGradient>
           </View>
         );
       };


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 16,
    borderColor: "#616161",
  },
  sportTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#FFFFFF",
  },
  gradient: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
  },
  preferredSport: {
    color: "#F3F2F5",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
    fontFamily: "Nunito-Regular",
    fontWeight: "600",
  },
  sportTitle: {
    color: "#CDCDCD",
    textAlign: "center",
    paddingLeft: 10,
    fontSize: 12,
    fontFamily: "Nunito-Regular",
    fontWeight: "400",
  },
  seperator: {
    backgroundColor: "#616161",
    height: 50,
    width: 1,
  },
  currentRating: {
    color: "#F3F2F5",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
    fontFamily: "Nunito-Regular",
    fontWeight: "400",
  },
  currentRatingDesc: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Nunito-Regular",
    fontWeight: "400",
  },
  rounded_button: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 0.2,
    borderColor: "#67BAF5",
    paddingVertical: 4,
    borderRadius: 20,
  },
});