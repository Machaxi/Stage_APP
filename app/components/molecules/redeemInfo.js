import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import {
  white,
} from "../../containers/util/colors";
import { deviceWidth } from "../../containers/util/dimens";

const RedeemInfo = ({ info }) => {
  return (
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 31 }}>
        <Image
          style={styles.redeemInfoImage}
          source={info.image}
        />
        <View style={{ width: deviceWidth * 0.5 }}>
          <Text style={styles.redeemInfo}>{info.text}</Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  redeemInfo: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Nunito-500",
    color: white,
  },
  redeemInfoImage: {
    width: 75,
    height: 68,
    resizeMode: "contain",
    marginRight: 18,
  },
});

export default RedeemInfo;
