import React from "react";
import { Text,View, StyleSheet } from "react-native";
import { greenVariant, lightGreenBg } from "../containers/util/colors";
import { deviceWidth } from "../containers/util/dimens";

const NamedRoundedContainer = ({ name }) => {
  return (
    <View style={styles.requestContainer}>
      <Text style={styles.requestType}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  requestContainer: {
    borderColor: greenVariant,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: lightGreenBg,
    paddingHorizontal: 12,
    paddingVertical: 2,
    width: deviceWidth * 0.35,
  },
  requestType: {
    fontSize: 12,
    fontWeight: "400",
    color: greenVariant,
    textAlign:'center'
  },
});

export default NamedRoundedContainer;
