import React, { useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PeerRatingCard } from "./PeerRatingCard";
import { SelfRatingBox } from "./SelfRatingBox";
import { SeperatingLine } from "./SeperatingLine";
import { advanceColor, beginnersColor, blueVariant, greyVariant11, intermediatesColor, professionalsColor, white } from "../util/colors";
import { Nunito_Regular } from "../util/fonts";
import { commonStyles } from "../util/commonStyles";
import { GradientLine } from "../../components/molecules/gradientLine";
import { getProficiencyColor, getProficiencyEmoji, getProficiencyName } from "../util/utilFunctions";
import NamedRoundedGradientContainer from "../../components/molecules/roundedNamedGradientContainer";

  
export const SelfRatingCard = ({
         onRatingSelection, proficiencyData,
         editSelfRating,
         onEditPress,
         onSavePress,
         ratingData,
         userId,
       }) => {
     
         var selectedSportRelatedRating = null;
         ratingData.map((val) => {
           if (val?.isSelected) {
             selectedSportRelatedRating = val;
           }
         });
         if(selectedSportRelatedRating != null){
           if(proficiencyData?.length > 0){
            //check whether any proficiency is selected
            var alreadySelected = false
            for (var i = 0; i < proficiencyData?.length; i++) {
              if (
                proficiencyData[i].isSelected == true
              ) {
                alreadySelected = true;
              }
            }
            //if no prof is selected on edit mode then set the original api prof for selected sport
            if(!alreadySelected){
              for(var i = 0; i < proficiencyData?.length; i++){
                if(selectedSportRelatedRating?.self == proficiencyData[i].proficiency){
                  proficiencyData[i].isSelected = true;
                }
              }
            }
           }
         }
         const data = [
           {
             icon: require("./../../images/beginner.png"),
             title: "Beginner",
             id: 1,
             by: selectedSportRelatedRating?.peers?.BASIC,
             titleColor: beginnersColor,
           },
           {
             icon: require("./../../images/intermediate.png"),
             title: "Intermediate",
             by: selectedSportRelatedRating?.peers?.INTERMEDIATE,
             titleColor: intermediatesColor,
           },
           {
             icon: require("./../../images/advance.png"),
             title: "Advance",
             by: selectedSportRelatedRating?.peers?.ADVANCED,
             titleColor: advanceColor,
           },
          //  {
          //    // icon:<Intermediate height={50} width={50} />,
          //    icon: require("./../../images/professional.png"),
          //    title: "Professional",
          //    by: selectedSportRelatedRating?.peers?.PROFESSIONAL,
          //    titleColor: professionalsColor,
          //  },
         ];
         useEffect(() => {}, []);

         const renderSocialFeedCard = ({ item }) => {
           return <PeerRatingCard item={item} />;
         };

         console.log("++"+editSelfRating);
         console.log({ selectedSportRelatedRating });
         console.log({ data });

         return (
           <View style={styles.container}>
             <LinearGradient
               colors={[
                 "rgba(255, 255, 255, 0.068)",
                 " rgba(255, 255, 255, 0.0102)",
               ]}
               style={styles.gradient}
             >
               <View style={styles.headerContainer}>
                 <Text style={styles.header}>Self Rating </Text>

                 <TouchableOpacity
                   style={{paddingVertical: 10}}
                   activeOpacity={0.8}
                   onPress={() => {
                      if (editSelfRating) {
                        onSavePress(selectedSportRelatedRating);
                      } else {
                        onEditPress();
                      }
                   }}
                 >
                   {editSelfRating ? (
                     <Text style={[styles.edit, { marginLeft: 14 }]}>
                       Save
                     </Text>
                   ) : (
                     <View style={commonStyles.flexRowNormal}>
                       <Image
                         resizeMode="contain"
                         style={styles.image}
                         source={require("../../images/edit_profile.png")}
                       />
                       <Text style={styles.edit}>Edit</Text>
                     </View>
                   )}
                 </TouchableOpacity>
               </View>
               {editSelfRating && (
                 <FlatList
                   data={proficiencyData}
                   numColumns={2}
                   contentContainerStyle={{}}
                   renderItem={({ item }) => {
                     return (
                       <TouchableOpacity
                         onPress={() => {
                           onRatingSelection(item);
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
               )}
               {!editSelfRating  &&
               <SelfRatingBox
                 title={getProficiencyName(
                   selectedSportRelatedRating?.self
                 )}
                 titleColor={getProficiencyColor(
                   selectedSportRelatedRating?.self
                 )}
                 imageSize={20}
                 icon={getProficiencyEmoji(
                   selectedSportRelatedRating?.self
                 )}
               />
                 }
               <GradientLine
                 marginTop={22}
                 colors={["#6b6a76", "#2a273a"]}
               />
               <Text style={[styles.header, {marginVertical: 15}]}>Peers rating</Text>

               <FlatList data={data} renderItem={renderSocialFeedCard} />
             </LinearGradient>
           </View>
         );
       };

const styles = StyleSheet.create({
  gradient: {
    shadowOpacity: 0.2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(0, 0, 0, 0.2)",
    padding: 20
  },
  container: {
    marginHorizontal: 12,
    marginTop: 20,
    borderColor: "#70765788",
    borderWidth: 1,
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  header: {
    color: greyVariant11,
    fontFamily: Nunito_Regular,
    fontWeight: '500',
    fontSize: 14,
    marginRight: 14
  },
  image: {
    width: 9,
    height: 9,
    borderRadius: 8,
  },
  edit: {
    color: blueVariant,
    fontFamily: Nunito_Regular,
    fontSize: 10,
    marginLeft: 4,
  },
  peersRating: {
    color: "#DFDFDF",
    marginBottom: 9,
    fontSize: 12,
    marginTop: 21,
    fontFamily: Nunito_Regular,
    fontWeight: "500",
  },
});