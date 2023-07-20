import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  lightYellow1,
  white,
  whiteGreyBorder,
  yellowVariant2,
  yellowVariant5,
} from "../../containers/util/colors";
import Strings from "../../containers/util/strings";
import RedeemInfo from "./redeemInfo";
import {
  Nunito_Medium,
  Nunito_Regular,
  Nunito_SemiBold,
} from "../../containers/util/fonts";

const HowToRedeem = ({ name }) => {
  const redeemNotes = [
    "Reward points earned have a 180 day validity period from the day it has been credited. Please redeem it prior to the expiry of Reward points.",
    "Reward points can be redeemed as per the following slab: ",
  ];
  const redeemSmallNotes = [
    "Purchase value of Rs 1000 to Rs 1999 – 50% of total available reward points",
    "Purchase value of Rs 2,000 to Rs 4,999 – 75% of total available reward points",
    "Purchase value of Rs 5,000 and above – 100% of total available reward points",
  ];
  return (
    <LinearGradient
      colors={["#ffffff11", "#ffffff03"]}
      style={styles.rewardContainer}
    >
      <View style={styles.outerView}>
        <View style={styles.howToRedeemView}>
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
      <Text style={styles.header}>Notes:</Text>
      {redeemNotes.map((index) => (
        <View style={styles.items}>
          <Image
            source={require("../../images/playing/dot.png")}
            style={{ width: 6, height: 6, marginRight: 10, marginTop: 8 }}
          />
          <Text style={styles.content}>{index}</Text>
        </View>
      ))}
      {redeemSmallNotes.map((index) => (
        <View style={[styles.items, { marginLeft: 15, marginRight: 10 }]}>
          <Image
            source={require("../../images/playing/dot.png")}
            style={{
              width: 5,
              height: 5,
              marginRight: 10,
              marginTop: 8,
            }}
          />
          <Text style={[styles.content, { fontSize: 12 }]}>{index}</Text>
        </View>
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  balanceTxt: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: Nunito_SemiBold,
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
  content: {
    fontSize: 13,
    color: "#DDDDDD",
    fontFamily: Nunito_Regular,
  },
  items: {
    flexDirection: "row",
    paddingTop: 4,
  },
  outerView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 31,
  },
  redeemInfo: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: Nunito_Medium,
    color: white,
  },
  howToRedeemTxt: {
    fontSize: 16,
    marginLeft: 11,
    fontWeight: "600",
    fontFamily: Nunito_SemiBold,
    color: yellowVariant2,
  },
  interrogation: {
    color: yellowVariant5,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: Nunito_Medium,
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
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: yellowVariant2,
  },
});

export default HowToRedeem;
