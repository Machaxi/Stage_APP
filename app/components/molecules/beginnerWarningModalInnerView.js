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

const BeginnerWarningModalInnerView = ({ onBtnPress, forBeginner, onRequestBookSlot, setModalVisibility }) => {
  return (
    <TouchableOpacity activeOpacity={1}>
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
            {forBeginner ? "Oops! No Slot Available" : "Oops!"}
          </Text>
          <Text style={styles.desc}>
            {forBeginner
              ? "No slot available as per your playing level. Would you like to play with an \n"
              : "No slot available as per your playing level. Would you like to play with\n"}
            <Text style={[styles.desc, { color: yellowVariant4 }]}>
              {forBeginner
                ? "Advanced player"
                : "beginner/intermediate level players"}
            </Text>
            {"?"}
          </Text>
          {forBeginner ? (
            <View>
              <RoundedGradientBtn
                colors={["#48acf1", "#3e53d9"]}
                text={"Request Slot"}
                onBtnPress={() => onRequestBookSlot()}
                width={280}
              />
            </View>
          ) : null}
          {!forBeginner ? (
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
                text={"Book Slot"}
                colors={["#575f61ed", "#2b293aed"]}
                onBtnPress={() => onBtnPress()}
                width={140}
              />
              <RoundedGradientBtn
                text={"No"}
                colors={["#48acf1", "#3e53d9"]}
                onBtnPress={() => setModalVisibility(false)}
                width={140}
              />
            </View>
          ) : null}
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
    fontFamily: "Nunito-700",
    marginBottom: 15,
  },
  reqTxt: {
    color: lightBlueColor,
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "Nunito-800",
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
    fontFamily: "Nunito-400",
    textAlign: "center",
    marginBottom: 53,
  },
  modalView: {},
});

export default BeginnerWarningModalInnerView;
