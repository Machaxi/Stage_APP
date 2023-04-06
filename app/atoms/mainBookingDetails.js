import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { deviceWidth } from "../containers/util/dimens";
import { greyVariant1, white } from "../containers/util/colors";

const MainBookingDetails = ({ details }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        width: deviceWidth * 0.3,
      }}
    >
      <Text style={styles.detailsTitle}>{details?.name}</Text>
      <Text style={styles.detailsTxt}>{details?.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsTitle: {
    fontWeight: "400",
    fontSize: 10,
    color: greyVariant1,
    fontFamily: "Nunito-400",
  },
  detailsTxt: {
    fontWeight: "400",
    fontSize: 14,
    color: white,
    fontFamily: "Nunito-400",
  },
});

export default MainBookingDetails;
