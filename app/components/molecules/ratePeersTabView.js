import React, {  } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { cyanVariant, greyVariant1, greyVariant11, white } from "../../containers/util/colors";
import { Nunito_Regular } from "../../containers/util/fonts";
import NamedRoundedGradientContainer from "./roundedNamedGradientContainer";
import { GradientLine } from "./gradientLine";
import moment from "moment";
import { getProficiencyName } from "../../containers/util/utilFunctions";
// import ProgressCircle from 'react-native-progress-circle';

export const RatePeersTabView = ({ ratingData, proficiencyData, updateRating }) => {



         var selectedSportRelatedRating = null;
         ratingData.map((val) => {
           if (val?.isSelected) {
             selectedSportRelatedRating = val;
           }
         });
         

         const renderItems = ({ item }) => {
           var playerItem = item;
           return (
             <View>
               <View
                 style={{ flexDirection: "row", marginVertical: 11 }}
               >
                 <Text style={styles.playerName}>{getProficiencyName(item?.name)}</Text>
                 <Text style={styles.proficiencyStyle}>
                   {item?.proficiency}
                 </Text>
               </View>
               <FlatList
                 data={proficiencyData}
                 numColumns={2}
                 contentContainerStyle={{}}
                 renderItem={ ({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          updateRating(
                            playerItem,
                            item,
                            selectedSportRelatedRating
                          );
                        }}
                        style={{
                          marginRight: 9,
                          marginBottom: 10,
                        }}
                      >
                        <NamedRoundedGradientContainer
                          name={item?.level}
                          txtColor={white}
                          colors={
                            item.isSelected == false
                              ? ["#ffffff11", "#ffffff03"]
                              : item?.colors
                          }
                          image={item?.img}
                          isImg={true}
                        />
                      </TouchableOpacity>
                    );
                 }}
               />
             </View>
           );
         };

         return (
           <View style={styles.container}>
             <LinearGradient
               colors={[
                 "rgba(255, 255, 255, 0.068)",
                 " rgba(255, 255, 255, 0.0102)",
               ]}
               style={styles.gradient}
             >
               <Text style={styles.ratePartners}>
                 {"Rate playing partners"}
               </Text>
               <Text style={styles.dateTimeInfo}>
                 {`${moment(selectedSportRelatedRating?.date).format(
                   "Mo MMMM YYYY"
                 )} | ${selectedSportRelatedRating?.displayTime}`}
               </Text>
               <FlatList
                 data={selectedSportRelatedRating?.players}
                 contentContainerStyle={{}}
                 horizontal={false}
                 renderItem={renderItems}
               />
               <GradientLine
                 marginBottom={14}
                 marginTop={16}
                 marginLeft={0}
                 colors={["#6b6a76", "#2a273a"]}
               />
               <Text style={[styles.ratePartners, { marginTop: 14 }]}>
                 {`${selectedSportRelatedRating?.academy?.name}`}
               </Text>
               <Text style={styles.dateTimeInfo}>
                 {`${selectedSportRelatedRating?.academy?.address}`}
               </Text>
             </LinearGradient>
           </View>
         );
       };

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    borderRadius: 10,
    marginTop: 23,
    borderColor: "#70765788",
    borderWidth: 1,
  },
  ratePartners: {
    color: greyVariant11,
    fontSize: 12,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
  },
  playerName: {
    color: white,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    fontWeight: "500",
  },
  proficiencyStyle: {
    color: greyVariant1,
    marginLeft: 12,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
  },
  dateTimeInfo: {
    color: greyVariant1,
    fontSize: 10,
    fontFamily: Nunito_Regular,
    marginTop: 4,
    marginBottom: 18,
    fontWeight: "400",
  },
  gradient: {
    borderRadius: 10,
    paddingBottom: 14,
    padding: 12,
  },
});
