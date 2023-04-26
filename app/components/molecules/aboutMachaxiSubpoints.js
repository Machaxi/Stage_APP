import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { greyVariant12 } from "../../containers/util/colors";
import { Nunito_Regular } from "../../containers/util/fonts";

export const SubPointsAboutMachaxi = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={{marginLeft: 28}}
      activeOpacity={0.8}
      onPress={() => onPress()}
    >
      <View style={styles.drawercell}>
        <Text style={styles.menu}>{title}</Text>

        <Image
          style={styles.arrow_img}
          source={require("../../images/ic_drawer_arrow.png")}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menu: {
    color: greyVariant12,
    alignItems: "flex-start",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: Nunito_Regular,
  },
  drawercell: {
    // backgroundColor:'green',
    //padding: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seperateFunction: {
    color: "#AFAFAF",
    fontSize: 16,
    fontFamily: "Quicksand-Medium",
    marginTop: 2,
    textAlign: "center",
  },
  arrow_img: {
    height: 12,
    width: 5,
    resizeMode: "contain",
  },
});
