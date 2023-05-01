import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  lightBlueColor,
  lightGreyVariant,
  yellowVariant4,
  yellowVariant6,
} from "../../containers/util/colors";
import { commonStyles } from "../../containers/util/commonStyles";
import { deviceWidth } from "../../containers/util/dimens";
import LinearGradient from "react-native-linear-gradient";
import RoundedGradientBtn from "./roundedGradientBtn";
import { Nunito_Bold, Nunito_ExtraBold, Nunito_Regular } from "../../containers/util/fonts";

const AddGuestUserModalInnerView = ({
  onBtnPress,
  onExplorePlansPressed,
  playHoursRemaining,
}) => {
  return (
    <TouchableOpacity activeOpacity={1}>
      {/* <ImageBackground
            resizeMode="cover"
            source={require("../../images/blur_bg.png")}
            style={styles.modalBg}
          > */}
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={["#575f61ed", "#2b293aed"]}
        style={styles.modalBg}
      >
        <View style={styles.container}>
          <Text
            style={[
              styles.heading,
              {
                textAlign: "center",
                color: yellowVariant6,
              },
            ]}
          >
            {"Need to add Guests?"}
          </Text>
          <Text style={styles.desc}>
            {"You have only "}{" "}
            <Text style={[styles.desc, { color: yellowVariant4 }]}>
              {playHoursRemaining + " hours "}
            </Text>
            {
              "remaining in your current plan. Please renew or buy a new plan. Any remaining hours will get added in the new plan."
            }
          </Text>
          <View
            style={[
              commonStyles.flexRowSpaceBtw,
              {
                marginHorizontal: 19,
                width: deviceWidth * 0.7,
                marginBottom: 20,
              },
            ]}
          >
            <RoundedGradientBtn
              text={"Renew Plan"}
              colors={["#48acf1", "#3e53d9"]}
              onBtnPress={() => onBtnPress()}
              width={140}
            />
            <RoundedGradientBtn
              text={"Explore Plans"}
              colors={["#575f61ed", "#2b293aed"]}
              onBtnPress={() => onExplorePlansPressed()}
              width={140}
            />
          </View>
        </View>
      </LinearGradient>
      {/* </ImageBackground> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rightArrow: { height: 25, width: 25 },
  container: {
    paddingHorizontal: 12,
    alignItems: "center",
    marginTop: 150,
  },
  modalBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: deviceWidth * 0.6,
  },
  heading: {
    marginTop: 28,
    fontSize: 22,
    fontWeight: "700",
    fontFamily: Nunito_Bold,
    marginBottom: 15,
  },
  reqTxt: {
    color: lightBlueColor,
    fontSize: 16,
    fontWeight: "800",
    fontFamily: Nunito_ExtraBold,
  },
  modalBg: {
    overflow: "hidden",
    width: deviceWidth - 36,
    paddingBottom: 30,
    borderRadius: 15,
    alignItems: "center",
  },
  desc: {
    color: lightGreyVariant,
    fontSize: 16,
    fontFamily: Nunito_Regular,
    textAlign: "center",
    marginBottom: 53,
  },
  modalView: {},
});

export default AddGuestUserModalInnerView;
