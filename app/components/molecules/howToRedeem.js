import React from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  greyVariant3,
  greyVariant4,
  lightYellow1,
  white,
  whiteGreyBorder,
  yellowVariant2,
  yellowVariant5,
} from "../../containers/util/colors";
import Strings from "../../containers/util/strings";
import RedeemInfo from "./redeemInfo";

const HowToRedeem = ({ name }) => {
  return (
    <LinearGradient
      colors={["#ffffff11", "#ffffff03"]}
      style={styles.rewardContainer}
    >
      <View
        style={styles.outerView}
      >
        <View
          style={styles.howToRedeemView}
        >
          <Text style={styles.interrogation}>{"?"}</Text>
        </View>
        <Text style={styles.howToRedeemTxt}>{Strings.howToRedeem}</Text>
      </View>
      {[
        {
          text: Strings.pointsVsRupee,
          image: require("../../images/rewardRupee.png"),
        },
        {
          text: Strings.showAndGetDiscount,
          image: require("../../images/rewardEmoji.png"),
        },
        {
          text: Strings.checkBal,
          image: require("../../images/rewardWallet.png"),
        },
      ].map((val) => (
        <RedeemInfo info={val} />
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  balanceTxt: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Nunito-600",
    color: white,
  },
  howToRedeemView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightYellow1,
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  outerView: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 31,
    },
  redeemInfo: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Nunito-500",
    color: white,
  },
  howToRedeemTxt: {
    fontSize: 16,
    marginLeft: 11,
    fontWeight: "600",
    fontFamily: "Nunito-600",
    color: yellowVariant2,
  },
  interrogation: {
    color: yellowVariant5,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Nunito-500",
  },
  rewardContainer: {
    marginTop: 12,
    paddingHorizontal: 22,
    marginHorizontal: 15,
    paddingVertical: 14,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default HowToRedeem;
