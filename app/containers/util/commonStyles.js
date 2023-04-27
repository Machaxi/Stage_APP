import { greyVariant5, greyVariant9, offWhite, redVariant, whiteGreyBorder } from "./colors";
import { StyleSheet } from "react-native";
import { Nunito_Medium, Nunito_Regular, Nunito_SemiBold } from "./fonts";
export const commonStyles = StyleSheet.create({
         cancelBooking: {
           fontSize: 14,
           fontWeight: "400",
           color: redVariant,
           fontFamily: Nunito_Regular,
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
         flexRowSpaceBtw: {
           flexDirection: "row",
           justifyContent: "space-between",
           alignItems: "center",
         },
         flexRowNormal: {
           flexDirection: "row",
           alignItems: "center",
         },
         flexRowAlignStart: {
           flexDirection: "row",
         },
         flexRowSpaceBtwAlignStart: {
           flexDirection: "row",
           justifyContent: "space-between",
           alignItems: "center",
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
             fontFamily: Nunito_Medium,

             // to ensure the text is never behind the icon
           },
           inputAndroid: {
             paddingVertical: 4,
             fontSize: 14,
             fontFamily: Nunito_Medium,
             borderColor: greyVariant5,
             borderRadius: 8,
             color: offWhite,
             paddingRight: 10, // to ensure the text is never behind the icon
           },
         });

  export const pickerSelectStylesSelectUser = StyleSheet.create({
           inputIOS: {
             fontSize: 16,
             paddingVertical: 8,
             //paddingHorizontal: 10,
             borderColor: greyVariant5,
             borderRadius: 8,
             color: "transparent",
             //marginBottom: 4,
             //alignItems: 'center',
             //textAlign: 'center',
             fontFamily: Nunito_SemiBold,

             // to ensure the text is never behind the icon
           },
           inputAndroid: {
             paddingVertical: 4,
             fontSize: 16,
             fontFamily: Nunito_SemiBold,
             borderColor: "transparent",
             borderRadius: 8,
             color: offWhite,
             paddingRight: 10, // to ensure the text is never behind the icon
           },
         });

