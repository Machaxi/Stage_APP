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

export const RatePeersTabView = ({ userId, ratingData, proficiencyData, updateRating }) => {
         var selectedSportRelatedRating = null;
         var selectedPeers = []
        
         if (ratingData?.length > 0)
           ratingData.map((val) => {
             if (val?.isSelected) {
               selectedSportRelatedRating = val;
               for (var i = 0; i < val?.players?.length; i++) {
                 if (userId != val?.players[i]?.id) {
                   selectedPeers.push(val?.players[i]);
                 }
               }
             }
           });
       
         const renderItems = ({ item }) => {
          
           var playerItem = item;
        
           return (
             <View>
               <View
                 style={{ flexDirection: "row", marginVertical: 11 }}
               >
                 <Text style={styles.playerName}>
                   {playerItem?.name}
                 </Text>
                 <Text style={styles.proficiencyStyle}>
                   {getProficiencyName(playerItem?.proficiency ? playerItem?.proficiency.toLowerCase() : '')}
                 </Text>
               </View>
               <FlatList
                 data={proficiencyData}
                 numColumns={2}
                 contentContainerStyle={{}}
                 renderItem={({ item }) => {
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
                           playerItem.peerRating != null &&
                           playerItem.peerRating != "" && item?.proficiency == playerItem?.peerRating
                             ? //item.isSelected == false
                             item?.colors :
                              ["#ffffff11", "#ffffff03"]
                             
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
               {selectedSportRelatedRating != null &&
               <Text style={styles.dateTimeInfo}>
                 {`${moment(selectedSportRelatedRating?.date).format(
                   "Do MMMM YYYY"
                 )} | ${selectedSportRelatedRating?.displayTime}`}
               </Text>
                }
               {selectedPeers?.length > 0 ? (
                 <FlatList
                   data={selectedPeers}
                   contentContainerStyle={{}}
                   horizontal={false}
                   renderItem={renderItems}
                 />
               ) : (
                 <Text
                   style={[
                     styles.ratePartners,
                     { marginVertical: 14, textAlign: "center" },
                   ]}
                 >
                   {"No peers found."}
                 </Text>
               )}
               { selectedSportRelatedRating != null &&
               <View>
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
               </View>
                }
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
