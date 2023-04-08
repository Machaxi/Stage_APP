import React from "react";
import { Text,View, StyleSheet } from "react-native";
import { greenVariant, lightGreenBg } from "../containers/util/colors";
import { deviceWidth } from "../containers/util/dimens";

const NamedRoundedContainer = ({ name, bgColor, txtColor }) => {
  return (
    <View
      style={[
        styles.requestContainer,
        {
          backgroundColor: bgColor ?? lightGreenBg,
          borderColor: txtColor ?? greenVariant,
        },
      ]}
    >
      <Text style={[styles.requestType, { color: txtColor ?? greenVariant }]}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  requestContainer: {
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
    width: deviceWidth * 0.35,
  },
  requestType: {
    fontSize: 12,
    fontWeight: "400",
    textAlign:'center',
    fontFamily: 'Nunito-400'
  },
});

export default NamedRoundedContainer;
