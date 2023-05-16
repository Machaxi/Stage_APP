import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import NamedRoundedGradientContainer from "../../components/molecules/roundedNamedGradientContainer";
import { Nunito_Regular } from "../util/fonts";

export const PrefSport = ({
  gradientColors,
  icon,
  sportTitle,
  currentRating,
  currentRatingColor,
}) => {
  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.24)", "rgba(255, 255, 255, 0.036)"]}
      style={{ marginHorizontal: 20, borderRadius: 12 }}
    >
      <View
        style={{ flexDirection: "row-reverse", marginTop: 5, paddingRight: 20 }}
      >
        <Text style={styles.editText}>Edit</Text>
        <Image
          resizeMode="contain"
          style={{ width: 12, height: 12 }}
          source={require("../../images/edit_profile.png")}
        />
      </View>
      <View style={styles.gradient}>
        <View>
          <Text style={styles.preferredSport}>Preferred sport</Text>
          <View style={[styles.rounded_button, styles.sportTitleView]}>
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
      </View>
    </LinearGradient>
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
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-around",
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
  editText: {
    color: "#667DDB",
    fontFamily: Nunito_Regular,
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 4,
    marginRight: 10,
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
