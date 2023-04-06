import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const RequestHeaderLeft = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ marginRight: 8, padding: 7 }}
      onPress={() => {
        navigation.toggleDrawer();
      }}
      activeOpacity={0.8}
    >
      <Image
        resizeMode="contain"
        source={require("../images/hamburger_white.png")}
        style={{ width: 20, height: 16, marginLeft: 12 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
});

export default RequestHeaderLeft;
