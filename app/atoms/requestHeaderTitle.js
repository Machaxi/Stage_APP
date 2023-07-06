import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Nunito_SemiBold } from "../containers/util/fonts";

const RequestHeaderTitle = ({ title }) => {
  return (
    <View style={styles.constainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    //alignItems: 'center'
  },
  title: {
    fontFamily: Nunito_SemiBold,
    fontSize: 20,
    fontWeight: "600",
    color: "#F2F2F2",
  },
});

export default RequestHeaderTitle;
