import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
  } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Progress from 'react-native-progress';
import { blueVariant1, lightPurpleColor, redVariant2, redVariant4, white, yellowVariant4 } from "../util/colors";
import { Nunito_Regular } from "../util/fonts";
import { GradientLine } from "../../components/molecules/gradientLine";
import RoundedGradientBtn from "../../components/molecules/roundedGradientBtn";
import { commonStyles } from "../util/commonStyles";
import { deviceWidth } from "../util/dimens";
import NamedRoundedContainer from "../../atoms/namedRoundedContainer";
import moment from "moment";

  
export const MembershipDetails = ({
         packageRemainingDays,
         totalHrs,
         aboutToExpire,
         onRenewPress,
         onMorePlansPress,
         slotsExhaused,
         purchasedDate,
         expiryDate,
         hoursLeft,
         planExpired,
         currentPlanPrice,
       }) => {
         var totalHoursVal =
           typeof totalHrs == undefined ||
           totalHrs == null ||
           totalHrs == 0
             ? 1
             : totalHrs;
         var hoursLeftVal =
           typeof hoursLeft == undefined || hoursLeft == null
             ? 0
             : hoursLeft;

       

         return (
           <View style={styles.container}>
             <LinearGradient
               colors={[
                 "rgba(255, 255, 255, 0.068)",
                 " rgba(255, 255, 255, 0.0102)",
               ]}
               style={[
                 styles.gradient,
                 planExpired || slotsExhaused
                   ? { borderColor: redVariant4 }
                   : null,
               ]}
             >
               {aboutToExpire && planExpired == false && (
                 <View
                   style={[
                     commonStyles.flexRowNormal,
                     { marginBottom: 13 },
                   ]}
                 >
                   <NamedRoundedContainer
                     width={deviceWidth * 0.3}
                     paddingVertical={6}
                     name={
                       moment(expiryDate).format("Mo MMMM YYYY") ==
                       moment(Date()).format("Mo MMMM YYYY")
                         ? "Expiring today"
                         : `Expire in ${packageRemainingDays} days`
                     }
                     bgColor={"rgba(79, 0, 25, 0.4)"}
                     txtColor={redVariant2}
                   />
                   <Text style={styles.renew}>Renew Plan</Text>
                 </View>
               )}
               {(planExpired || slotsExhaused) && !aboutToExpire && (
                 <View>
                   <Text
                     style={[
                       styles.title,
                       { color: redVariant4, marginBottom: 7 },
                     ]}
                   >
                     Membership Details
                   </Text>
                   {planExpired ? (
                     <Text style={styles.expiryDesc}>
                       {
                         "Your membership plan has expired. Do you want to renew the same plan at "
                       }
                       <Text
                         style={[
                           styles.expiryDesc,
                           {
                             color: yellowVariant4,
                             fontWeight: "700",
                           },
                         ]}
                       >
                         {"₹ " + currentPlanPrice}
                       </Text>
                     </Text>
                   ) : (
                     <Text style={styles.expiryDesc}>
                       {
                         "All of your slots for this package have been used. To keep playing, please renew your plan."
                       }
                     </Text>
                   )}
                   <View
                     style={[
                       commonStyles.flexRowSpaceBtw,
                       {
                         width: "100%",
                         flex: 1,
                         marginHorizontal: 19,
                         width: deviceWidth * 0.7,
                         marginTop: 22,
                       },
                     ]}
                   >
                     <RoundedGradientBtn
                       text={"Renew Plan"}
                       colors={["#48acf1", "#3e53d9"]}
                       onBtnPress={() => onRenewPress(false)}
                       width={140}
                     />
                     <RoundedGradientBtn
                       text={"Explore Plans"}
                       colors={["#575f61ed", "#2b293aed"]}
                       onBtnPress={() => onMorePlansPress(false)}
                       width={140}
                     />
                   </View>
                 </View>
               )}
               {((aboutToExpire && slotsExhaused == false) || (aboutToExpire == false && slotsExhaused == false && planExpired == false)) && (
                 <View>
                   <Text style={styles.title}>Membership Details</Text>
                   <View style={{ flexDirection: "row" }}>
                     <View style={styles.progressView}>
                       <Progress.Circle
                         size={80}
                         progress={hoursLeftVal / totalHoursVal}
                         borderWidth={0}
                         unfilledColor={"#404040"}
                         showsText={true}
                         textStyle={{ color: "white", fontSize: 10, textAlign:'center' }}
                         color={"#70D9E6"}
                         formatText={() => {
                           return (
                             <Text style={[styles.hrsLeft, {fontSize: 10}]}>
                               {"Hours Left\n"}
                               <Text style={[styles.hrsLeftValue,{fontSize:12}]}>
                                 {`${hoursLeftVal} / ${totalHoursVal}`}
                               </Text>
                             </Text>
                           );
                         }}
                       />
                     </View>
                     <View style={{ marginLeft: 24 }}>
                       <Text style={styles.monthlyMembershipText}>
                         Monthly Membership
                       </Text>
                       <GradientLine
                         marginBottom={12}
                         marginTop={11}
                         marginLeft={0}
                         colors={["#6b6a76", "#2a273a"]}
                       />

                       <View style={styles.subscriptionInfo}>
                         <Text style={styles.staticDate}>
                           Purchased on :
                         </Text>
                         <Text style={styles.dynamicDate}>
                           {purchasedDate}
                         </Text>
                       </View>

                       <View
                         style={{ flexDirection: "row", marginTop: 5 }}
                       >
                         <Text style={styles.staticDate}>
                           Expires on :
                         </Text>
                         <Text style={styles.dynamicDate}>
                           {expiryDate}
                         </Text>
                       </View>
                     </View>
                   </View>
                 </View>
               )}
             </LinearGradient>
           </View>
         );
       };

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    borderRadius: 10,
    marginTop: 25,
    borderColor: "#70765788",
    borderWidth: 1,
  },
  renew: {
    fontSize: 14,
    color: blueVariant1,
    fontFamily: Nunito_Regular,
    fontWeight: "500",
    marginLeft: 13
  },
  expiryDesc: {
    fontSize: 14,
    color: white,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
  },
  progressView: {
    // flex: 1.5,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  subscriptionInfo: { flexDirection: "row", marginTop: 11 },
  hrsLeft: {
    color: lightPurpleColor,
    fontWeight: "400",
    fontFamily: Nunito_Regular,
    textAlign: "center",
  },
  hrsLeftValue: {
    color: "#FFFFFF",
    marginTop: 4,
    fontWeight: "500",
    fontSize: 16,
    fontFamily: Nunito_Regular,
    textAlign: "center",
  },
  gradient: {
    borderRadius: 10,
    paddingBottom: 14,
    paddingTop: 12,
    paddingHorizontal: 11,
  },
  title: {
    color: "#E38D33",
    marginBottom: 20,
    fontFamily: Nunito_Regular,
    fontWeight: "600",
  },
  dynamicDate: {
    color: "#FFFFFF",
    paddingLeft: 2,
    fontSize: 12,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
  },
  staticDate: {
    color: white,
    fontSize: 12,
    fontFamily: Nunito_Regular,
    fontWeight: "400",
  },
  monthlyMembershipText: {
    color: white,
    marginTop: 4,
    fontSize: 14,
    fontFamily: Nunito_Regular,
    fontWeight: "500",
  },
});
