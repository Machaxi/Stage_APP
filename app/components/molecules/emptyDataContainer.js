import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { greyVariant2, white } from "../../containers/util/colors";
import { deviceHeight } from "../../containers/util/dimens";
import { Nunito_Regular } from "../../containers/util/fonts";

const EmptyDataContainer = ({ msg }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={[styles.msg,{marginTop: deviceHeight * 0.43}]}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  msg: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: Nunito_Regular,
    color: white,
  },
});

export default EmptyDataContainer;
