import { greyVariant5, offWhite, redVariant, whiteGreyBorder } from "./colors";
import { StyleSheet } from "react-native";
export const commonStyles = StyleSheet.create({
         cancelBooking: {
           fontSize: 14,
           fontWeight: "400",
           color: redVariant,
           fontFamily: "Nunito-400",
         },
         requestOuterView: {
           //width: "100%",
           marginTop: 20,
           borderColor: whiteGreyBorder,
           borderWidth: 1,
           borderRadius: 10,
           marginHorizontal: 13,
           paddingHorizontal: 12,
           paddingVertical: 17,
         },
       });

  export const pickerSelectStylesShopScreen = StyleSheet.create({
           inputIOS: {
             fontSize: 14,
             paddingVertical: 8,
             //paddingHorizontal: 10,
             borderColor: greyVariant5,
             borderRadius: 8,
             color: offWhite,
             //marginBottom: 4,
             //alignItems: 'center',
             //textAlign: 'center',
             fontFamily: "Nunito-500",

             // to ensure the text is never behind the icon
           },
           inputAndroid: {
             paddingVertical: 4,
             fontSize: 14,
             fontFamily: "Nunito-500",
             borderColor: greyVariant5,
             borderRadius: 8,
             color: offWhite,
             paddingRight: 10, // to ensure the text is never behind the icon
           },
         });

