import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { commonStyles } from "../../containers/util/commonStyles";
import { greyVariant3, greyVariant4, white, whiteGreyBorder, yellowVariant2 } from "../../containers/util/colors";
import Strings from "../../containers/util/strings";

const ShopRewardsView = ({ balance, rewardPoints, rewardRedeemed }) => {
  return (
    <LinearGradient
      colors={["#ffffff11", "#ffffff03"]}
      style={styles.rewardContainer}
    >
      <View style={styles.rewardView}>
        <View>
          <Text style={[styles.balanceTxt]}>{Strings.rewardBalance}</Text>
          <Text style={[styles.pts]}>{balance + " pts"}</Text>
          <View style={styles.rewardInfo}>
            <View>
              <Text style={[styles.rewardRedeem]}>
                {Strings.rewardRedeemed}
              </Text>
              <Text style={[styles.rewardPts]}>{rewardPoints + " pts"}</Text>
            </View>
            <View style={styles.verticalBar} />
            <View>
              <Text style={[styles.rewardRedeem]}>
                {Strings.rewardEarned}
              </Text>
              <Text style={[styles.rewardPts]}>{rewardRedeemed + " pts"}</Text>
            </View>
          </View>
        </View>
        <View>
          <Image
            source={require("../../images/rocket_purple.png")}
            style={[styles.rocketImg, styles.fixedPosition]}
          />
          <View style={{}}>
            <View
              style={styles.purpleView}
            />
          </View>
        </View>
      </View>
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
  fixedPosition: { position: "absolute", right: 20, top:18, zIndex: 4 },
  rewardInfo: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  rewardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  purpleView: {
    height: 93,
    width: 69,
    borderRadius: 7,
    marginRight: 10,
    backgroundColor: "rgba(109, 75, 162, 0.49)",
  },
  rewardPts: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Nunito-700",
    color: yellowVariant2,
  },
  rewardRedeem: {
    fontSize: 8,
    fontWeight: "400",
    fontFamily: "Nunito-400",
    color: greyVariant4,
  },
  verticalBar: {
    backgroundColor: greyVariant3,
    height: 30,
    width: 1,
    marginHorizontal: 13
  },
  rocketImg: {
    width: 86,
    height: 97,
  },
  pts: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "Nunito-700",
    color: yellowVariant2,
  },
  rewardContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
    marginHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 20,
    borderColor: whiteGreyBorder,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default ShopRewardsView;
