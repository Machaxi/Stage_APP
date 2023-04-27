import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { deviceWidth } from "../containers/util/dimens";
import { greyVariant1, white } from "../containers/util/colors";
import { Nunito_Regular } from "../containers/util/fonts";

const MainBookingDetails = ({ details, width }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        width: width ?? deviceWidth * 0.3,
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
    fontFamily: Nunito_Regular,
  },
  detailsTxt: {
    fontWeight: "400",
    fontSize: 14,
    color: white,
    fontFamily: Nunito_Regular,
  },
});

export default MainBookingDetails;
